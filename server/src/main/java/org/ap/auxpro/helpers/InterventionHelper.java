package org.ap.auxpro.helpers;

import static com.mongodb.client.model.Filters.eq;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.List;

import javax.ws.rs.core.SecurityContext;

import org.ap.auxpro.bean.InterventionBean;
import org.ap.auxpro.constants.EMissionStatus;
import org.ap.auxpro.constants.EOfferStatus;
import org.ap.auxpro.constants.ERecurencePeriod;
import org.ap.auxpro.storage.InterventionCollection;
import org.ap.auxpro.storage.InterventionData;
import org.ap.auxpro.storage.MissionCollection;
import org.ap.auxpro.storage.MissionData;
import org.ap.auxpro.storage.OfferCollection;
import org.ap.auxpro.storage.OfferData;
import org.ap.common.TimeHelper;
import org.ap.web.internal.APWebException;
import org.ap.web.internal.UUIDGenerator;

public class InterventionHelper {

	public static Object getInterventionMatch(SecurityContext sc, String id) throws APWebException {
		// TODO Auto-generated method stub
		return null;
	}

	public static Object putIntervention(SecurityContext sc, String id, InterventionBean bean) throws APWebException {
		InterventionData intervention = new InterventionData();
		intervention.period = bean.period;
		intervention.auxiliaryId = bean.auxiliaryId;
		intervention.endDate = bean.endDate;
		intervention.customerId = bean.customerId;
		intervention.sadStatus = bean.sadStatus;
		intervention.sadStatusChanged = bean.sadStatusChanged;
		intervention.hideToSad = bean.hideToSad;
		intervention.days = bean.days;
		intervention.startTime = bean.startTime;
		intervention.endTime = bean.endTime;
		intervention.id = bean.id;
		intervention.serviceId = bean.serviceId;
		intervention.startDate = bean.startDate;

		if (intervention.getAuxiliaryId() != null) {
			EOfferStatus status = EOfferStatus.getByName(intervention.sadStatus);
			if (EOfferStatus._PENDING.equals(status)) {
				// Create Missions
				switch (ERecurencePeriod.getByName(intervention.getPeriod())) {
				case _O_N_E:
					MissionCollection.create(newMission(intervention, intervention.getStartDate()));
					break;
				case _P1_W:
				case _P2_W:
				case _P3_W:
				case _P4_W:
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

				// Update other offers
				List<OfferData> offers = OfferCollection.get(eq("interventionId", intervention.getId()));
				for (OfferData offer : offers) {
					offer.setSadStatusChanged(TimeHelper.toIntegers(LocalDate.now()));
					if (offer.getAuxiliaryId().equals(intervention.getAuxiliaryId())) {
						offer.setSadStatus(EOfferStatus._CONFIRMED.getName());
					} else {
						offer.setSadStatus(EOfferStatus._REJECTED.getName());
					}
					offer.setHideToSad(true);
					OfferCollection.update(offer);
				}
			} else if (EOfferStatus._CANCELED.equals(status)) {
				// Cancel missions
				List<MissionData> missions = MissionCollection.get(eq("interventionId", intervention.getId()));
				for (MissionData mission : missions) {
					if (TimeHelper.toLocalDate(mission.getDate()).isAfter(LocalDate.now())) {
						mission.setSadStatus(EOfferStatus._CANCELED.getName());
						mission.setSadStatusChanged(TimeHelper.toIntegers(LocalDate.now()));
						MissionCollection.update(mission);
					}
				}
			}
		}

		// Finally update the intervention
		InterventionCollection.updateNull(intervention);

		return null;
	}
	
	public static MissionData newMission(InterventionData intervention, List<Integer> date) {
		MissionData m = new MissionData();
		m.setAuxiliaryId(intervention.getAuxiliaryId());
		m.setCustomerId(intervention.getCustomerId());
		m.setInterventionId(intervention.getId());
		m.setServiceId(intervention.getServiceId());
		m.setDate(date);
		m.setSadStatus(EMissionStatus._PENDING.getName());
		m.setAuxStatus(EMissionStatus._PENDING.getName());
		m.setId(UUIDGenerator.nextId());
		return m;
	}
	public static MissionData newMission(InterventionData intervention, LocalDate date) {
		return newMission(intervention, TimeHelper.toIntegers(date));
	}

}
