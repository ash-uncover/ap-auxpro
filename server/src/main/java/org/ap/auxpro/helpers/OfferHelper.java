package org.ap.auxpro.helpers;

import static com.mongodb.client.model.Filters.and;
import static com.mongodb.client.model.Filters.eq;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.List;

import javax.ws.rs.core.SecurityContext;

import org.ap.auxpro.bean.OfferBean;
import org.ap.auxpro.constants.EInterventionRecurencePeriod;
import org.ap.auxpro.constants.EInterventionStatus;
import org.ap.auxpro.constants.EMissionStatus;
import org.ap.auxpro.constants.EOfferStatusAux;
import org.ap.auxpro.constants.EOfferStatusSad;
import org.ap.auxpro.internal.MailSender;
import org.ap.auxpro.storage.InterventionCollection;
import org.ap.auxpro.storage.InterventionData;
import org.ap.auxpro.storage.MissionCollection;
import org.ap.auxpro.storage.MissionData;
import org.ap.auxpro.storage.OfferCollection;
import org.ap.auxpro.storage.OfferData;
import org.ap.auxpro.storage.ServiceCollection;
import org.ap.auxpro.storage.ServiceData;
import org.ap.common.TimeHelper;
import org.ap.web.internal.APWebException;
import org.ap.web.internal.UUIDGenerator;
import org.ap.web.storage.Mongo;
import org.bson.Document;

import com.mongodb.MongoWriteException;

public class OfferHelper {

	public static Object createOffer(SecurityContext sc, OfferBean offerBean) throws APWebException {
		String result = "";
		try {
			// Insert the new offer in database
			Document document = new Document();
			String id = UUIDGenerator.nextId();
			document.append("id", id);
			document.append("auxiliaryId", offerBean.auxiliaryId);
			document.append("hideToAux", offerBean.hideToAux);
			document.append("customerId", offerBean.customerId);
			document.append("serviceId", offerBean.serviceId);
			document.append("creationDate", TimeHelper.toIntegers(LocalDate.now()));
			document.append("interventionId", offerBean.interventionId);
			document.append("hideToSad", offerBean.hideToSad);
			document.append("sadStatus", EOfferStatusSad._PENDING.getName());
			document.append("auxStatus", EOfferStatusAux._PENDING.getName());
			document.append("sadStatusChanged", TimeHelper.toIntegers(LocalDate.now()));
			Mongo.get().collection("offer").insertOne(document);			
			result = "{\"id\": \"" + id + "\"}";
		} catch (MongoWriteException e) {
			throw APWebException.MONGO_WRITE_EXCEPTION;
		}
		try {
			// Send notification mail if needed
			Document documentAuxiliary = Mongo.get().collection("auxiliary").find(and(eq("id", offerBean.auxiliaryId))).first();
			boolean notify = documentAuxiliary.getBoolean("notifyOffersMail");
			if (notify) {
				MailSender.sendAuxiliaryOffer(documentAuxiliary.getString("email"), documentAuxiliary.getString("firstName"));
			}
		} catch (Exception e) {
			// Still the offer was created so we dont want to crash here
			e.printStackTrace();
		}		
		return result;
	}

	public static Object putOffer(SecurityContext sc, String id, OfferBean offerBean) throws APWebException {
		OfferData offer = new OfferData();
		offer.id = id;
		offer.auxStatus = offerBean.auxStatus;
		offer.auxStatusChanged = offerBean.auxStatusChanged;
		offer.auxiliaryId = offerBean.auxiliaryId;
		offer.hideToAux = offerBean.hideToAux;
		offer.customerId = offerBean.customerId;
		offer.sadStatus = offerBean.sadStatus;
		offer.sadStatusChanged = offerBean.sadStatusChanged;
		offer.serviceId = offerBean.serviceId;
		offer.creationDate = offerBean.creationDate;
		offer.interventionId = offerBean.interventionId;
		offer.hideToSad = offerBean.hideToSad;

		OfferCollection.update(offer);

		boolean isAuxAcc = offer.auxStatus != null && EOfferStatusAux._ACCEPTED.equals(EOfferStatusAux.getByName(offer.auxStatus));
		boolean isSadConf = offer.sadStatus != null && EOfferStatusSad._CONFIRMED.equals(EOfferStatusSad.getByName(offer.sadStatus));
		boolean isSadCan = offer.sadStatus != null && EOfferStatusSad._CANCELED.equals(EOfferStatusSad.getByName(offer.sadStatus));

		if (isAuxAcc && !isSadConf && !isSadCan) {
			try {
				// Send notification mail
				ServiceData service = ServiceCollection.getById(offerBean.serviceId);
				MailSender.sendServiceOffer(service.email);
			} catch (Exception e) {
				// Still the offer was updated so we dont want to crash here
				e.printStackTrace();
			}
		}

		return "";
	}

	public static Object putOfferAccept(SecurityContext sc, String id, OfferBean offerBean) throws APWebException {
		List<Integer> now = TimeHelper.nowDateTimeIntegers();

		OfferData offer = OfferCollection.getById(id);
		offer.lastUpdateDate = now;
		offer.auxStatus = EOfferStatusAux._ACCEPTED.getName();
		offer.auxStatusChanged = now;
		OfferCollection.update(offer);
		
		return "";
	}

	public static Object putOfferDecline(SecurityContext sc, String id, OfferBean offerBean) throws APWebException {
		List<Integer> now = TimeHelper.nowDateTimeIntegers();

		OfferData offer = OfferCollection.getById(id);
		offer.lastUpdateDate = now;
		offer.auxStatus = EOfferStatusAux._DECLINED.getName();
		offer.auxStatusChanged = now;
		offer.hideToAux = true;
		OfferCollection.update(offer);
		
		return "";
	}

	public static Object putOfferConfirm(SecurityContext sc, String id, OfferBean offerBean) throws APWebException {
		List<Integer> now = TimeHelper.nowDateTimeIntegers();

		// Update confirmed offer
		OfferData offer = OfferCollection.getById(id);
		offer.lastUpdateDate = now;
		offer.sadStatus = EOfferStatusSad._CONFIRMED.getName();
		offer.sadStatusChanged = now;
		offer.hideToSad = true;
		offer.hideToAux = false;
		OfferCollection.update(offer);

		// Update initial intervention
		InterventionData intervention = InterventionCollection.get(and(eq("id", offer.interventionId))).get(0);
		intervention.lastUpdateDate = now;
		intervention.auxiliaryId = offer.auxiliaryId;
		intervention.sadStatus = EInterventionStatus._ON_GOING.getName();
		intervention.sadStatusChanged = now;
		InterventionCollection.update(intervention);

		// Update other offers (rejected)
		List<OfferData> offers = OfferCollection.get(and(eq("interventionId", offer.interventionId)));
		for (OfferData o : offers) {
			if (!o.id.equals(offer.id)) {
				o.lastUpdateDate = now;
				o.sadStatus = EOfferStatusSad._REJECTED.getName();
				o.sadStatusChanged = now;
				o.hideToSad = true;
				OfferCollection.update(o);
			}
		}

		// Create Missions
		switch (EInterventionRecurencePeriod.getByName(intervention.getPeriod())) {
		case _HOURS:
			MissionCollection.create(newMission(intervention, intervention.getStartDate()));
			break;
		case _WEEK1:
		case _WEEK2:
		case _WEEK3:
		case _WEEK4:
			List<DayOfWeek> days = TimeHelper.toDayOfWeeks(intervention.getDays());
			LocalDate startDate = TimeHelper.toLocalDate(intervention.getStartDate());
			LocalDate endDate = TimeHelper.toLocalDate(intervention.getEndDate());
			LocalDate currentDate = startDate.plusDays(0);
			while (!currentDate.isAfter(endDate)) {
				if (days.contains(currentDate.getDayOfWeek())) {
					MissionCollection.create(newMission(intervention, currentDate));
				}
				currentDate = currentDate.plusDays(1);
			}
			break;
		}

		return "";
	}
	
	public static MissionData newMission(InterventionData intervention, List<Integer> date) {
		List<Integer> now = TimeHelper.nowDateTimeIntegers();
		
		MissionData mission = new MissionData();
		mission.setCreationDate(now);
		mission.setLastUpdateDate(now);
		mission.setAuxiliaryId(intervention.getAuxiliaryId());
		mission.setCustomerId(intervention.getCustomerId());
		mission.setInterventionId(intervention.getId());
		mission.setServiceId(intervention.getServiceId());
		mission.setDate(date);
		mission.setSadStatus(EMissionStatus._PENDING.getName());
		mission.setAuxStatus(EMissionStatus._PENDING.getName());
		mission.setId(UUIDGenerator.nextId());
		
		return mission;
	}
	
	public static MissionData newMission(InterventionData intervention, LocalDate date) {
		return newMission(intervention, TimeHelper.toIntegers(date));
	}

}
