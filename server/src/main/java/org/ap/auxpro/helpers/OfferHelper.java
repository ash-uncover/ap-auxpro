package org.ap.auxpro.helpers;

import static com.mongodb.client.model.Filters.and;
import static com.mongodb.client.model.Filters.eq;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;

import javax.ws.rs.core.SecurityContext;

import org.ap.auxpro.bean.BasicBean;
import org.ap.auxpro.bean.OfferEmptyBean;
import org.ap.auxpro.bean.OfferPostBean;
import org.ap.auxpro.constants.EInterventionRecurencePeriod;
import org.ap.auxpro.constants.EInterventionStatus;
import org.ap.auxpro.constants.EMissionStatus;
import org.ap.auxpro.constants.EOfferStatusAux;
import org.ap.auxpro.constants.EOfferStatusSad;
import org.ap.auxpro.internal.MailSender;
import org.ap.auxpro.storage.apauth.ApauthCollection;
import org.ap.auxpro.storage.apauth.ApauthData;
import org.ap.auxpro.storage.auxiliary.AuxiliaryCollection;
import org.ap.auxpro.storage.auxiliary.AuxiliaryData;
import org.ap.auxpro.storage.intervention.InterventionCollection;
import org.ap.auxpro.storage.intervention.InterventionData;
import org.ap.auxpro.storage.mission.MissionCollection;
import org.ap.auxpro.storage.mission.MissionData;
import org.ap.auxpro.storage.offer.OfferCollection;
import org.ap.auxpro.storage.offer.OfferData;
import org.ap.auxpro.storage.service.ServiceCollection;
import org.ap.auxpro.storage.service.ServiceData;
import org.ap.common.time.TimeHelper;
import org.ap.common.util.UUIDGenerator;
import org.ap.common.web.exception.APWebException;

import com.mongodb.MongoWriteException;

public class OfferHelper {

	public static Object createOffer(SecurityContext sc, OfferPostBean offerBean) throws APWebException {
		BasicBean result = new BasicBean();
		try {
			String id = UUIDGenerator.nextId();
			Date now = new Date();

			OfferData offer = new OfferData();
			offer.setId(id);
			offer.setCreationDate(now);
			offer.setAuxiliaryId(offerBean.auxiliaryId);
			offer.setCustomerId(offerBean.customerId);
			offer.setServiceId(offerBean.serviceId);
			offer.setInterventionId(offerBean.interventionId);
			offer.setAuxStatus(EOfferStatusAux._PENDING.getName());
			offer.setAuxStatusChanged(now);
			offer.setHideToAux(false);
			offer.setSadStatus(EOfferStatusSad._PENDING.getName());
			offer.setSadStatusChanged(now);
			offer.setHideToSad(false);
			OfferCollection.create(offer);
			
			InterventionData intervention = InterventionCollection.getById(offerBean.interventionId);
			intervention.setSadStatus(EInterventionStatus._MATCHING.getName());
			intervention.setSadStatusChanged(now);
			InterventionCollection.update(intervention);
			
			result.id = id;
		} catch (MongoWriteException e) {
			throw APWebException.MONGO_WRITE_EXCEPTION;
		}
		try {
			// Send notification mail if needed
			AuxiliaryData auxiliary = AuxiliaryCollection.getById(offerBean.auxiliaryId);
			ApauthData apauth = ApauthCollection.get(and(eq("entityId", auxiliary.getId()))).get(0);
			if (auxiliary.getNotifyOffersMail()) {
				MailSender.getInstance().sendAuxiliaryOffer(apauth.getEmail(), auxiliary.getFirstName());
			}
		} catch (Exception e) {
			// Still the offer was created so we dont want to crash here
			e.printStackTrace();
		}		
		return result;
	}

	public static Object putOfferAccept(SecurityContext sc, String id, OfferEmptyBean offerBean) throws APWebException {
		Date now = new Date();

		OfferData offer = OfferCollection.getById(id);
		offer.lastUpdateDate = now;
		offer.auxStatus = EOfferStatusAux._ACCEPTED.getName();
		offer.auxStatusChanged = now;
		OfferCollection.update(offer);
		
		try {
			// Send notification mail
			ServiceData service = ServiceCollection.getById(offer.getServiceId());
			ApauthData apauth = ApauthCollection.get(and(eq("entityId", service.getId()))).get(0);
			MailSender.getInstance().sendServiceOffer(apauth.getEmail());
		} catch (Exception e) {
			// Still the offer was updated so we dont want to crash here
			e.printStackTrace();
		}
		
		return "";
	}

	public static Object putOfferDecline(SecurityContext sc, String id, OfferEmptyBean offerBean) throws APWebException {
		Date now = new Date();

		OfferData offer = OfferCollection.getById(id);
		offer.lastUpdateDate = now;
		offer.auxStatus = EOfferStatusAux._DECLINED.getName();
		offer.auxStatusChanged = now;
		offer.hideToAux = true;
		OfferCollection.update(offer);
		
		return "";
	}

	public static Object putOfferConfirm(SecurityContext sc, String id, OfferEmptyBean offerBean) throws APWebException {
		Date now = new Date();

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
			MissionCollection.create(newMission(intervention, TimeHelper.toIntegers(intervention.getStartDate())));
			break;
		case _WEEK1:
		case _WEEK2:
		case _WEEK3:
		case _WEEK4:
			List<DayOfWeek> days = TimeHelper.toDayOfWeeks(intervention.getDays());
			Date startDate = intervention.getStartDate();
			LocalDate startLocalDate = startDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
			Date endDate = intervention.getEndDate();
			LocalDate endLocalDate = endDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
			LocalDate currentDate = startLocalDate.plusDays(0);
			while (!currentDate.isAfter(endLocalDate)) {
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
		Date now = new Date();
		
		MissionData mission = new MissionData();
		mission.setCreationDate(now);
		mission.setLastUpdateDate(now);
		mission.setAuxiliaryId(intervention.getAuxiliaryId());
		mission.setCustomerId(intervention.getCustomerId());
		mission.setInterventionId(intervention.getId());
		mission.setServiceId(intervention.getServiceId());
		mission.setDate(TimeHelper.toDate(date));
		mission.setSadStatus(EMissionStatus._PENDING.getName());
		mission.setAuxStatus(EMissionStatus._PENDING.getName());
		mission.setId(UUIDGenerator.nextId());
		
		return mission;
	}
	
	public static MissionData newMission(InterventionData intervention, LocalDate date) {
		return newMission(intervention, TimeHelper.toIntegers(date));
	}

}
