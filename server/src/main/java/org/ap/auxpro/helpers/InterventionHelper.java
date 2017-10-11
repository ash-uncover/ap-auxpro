package org.ap.auxpro.helpers;

import static com.mongodb.client.model.Filters.and;
import static com.mongodb.client.model.Filters.eq;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.core.Response.Status;

import org.ap.auxpro.bean.InterventionBean;
import org.ap.auxpro.constants.EInterventionStatus;
import org.ap.auxpro.constants.EMissionStatus;
import org.ap.auxpro.constants.EOfferStatusSad;
import org.ap.auxpro.constants.ERecurencePeriod;
import org.ap.auxpro.storage.AuxiliaryCollection;
import org.ap.auxpro.storage.AuxiliaryData;
import org.ap.auxpro.storage.CustomerCollection;
import org.ap.auxpro.storage.CustomerData;
import org.ap.auxpro.storage.GeozoneCollection;
import org.ap.auxpro.storage.GeozoneData;
import org.ap.auxpro.storage.IndisponibilityCollection;
import org.ap.auxpro.storage.IndisponibilityData;
import org.ap.auxpro.storage.InterventionCollection;
import org.ap.auxpro.storage.InterventionData;
import org.ap.auxpro.storage.MissionCollection;
import org.ap.auxpro.storage.MissionData;
import org.ap.auxpro.storage.OfferCollection;
import org.ap.auxpro.storage.OfferData;
import org.ap.auxpro.storage.ServiceCollection;
import org.ap.auxpro.storage.ServiceData;
import org.ap.common.GeoHelper;
import org.ap.common.TimeHelper;
import org.ap.web.internal.APWebException;
import org.ap.web.internal.UUIDGenerator;

public class InterventionHelper {

	public static Object getInterventionMatch(SecurityContext sc, String id) throws APWebException {
		InterventionData intervention = InterventionCollection.getById(id);
		
		// Check the call can be made
		ServiceData service = ServiceCollection.getById(intervention.serviceId);
		if (service == null || !sc.isUserInRole(service.id) || !Boolean.TRUE.equals(service.profilCompleted)) {
			throw new APWebException("forbidden", Status.FORBIDDEN);
		}
		
		//
		CustomerData customer = CustomerCollection.getById(intervention.customerId);
		List<AuxiliaryData> auxiliaries = AuxiliaryCollection.get(and(eq("profilCompleted", true),eq("accountType", "Premium")));
		Map<AuxiliaryData, AuxiliaryMatchScore> scores = new HashMap<AuxiliaryData, AuxiliaryMatchScore>();

		// Compute geo score
		for (AuxiliaryData aux : auxiliaries) {
			AuxiliaryMatchScore score = new AuxiliaryMatchScore();
			scores.put(aux, score);
			score.auxiliaryId = aux.getId();
			List<GeozoneData> geozones = GeozoneCollection.get(eq("auxiliaryId", aux.getId()));
			for (GeozoneData geozone : geozones) {
				// Postal check
				if (geozone.getPostalCode() != null && new Integer(geozone.getPostalCode()).intValue() == new Integer(customer.getPostalCode()).intValue()) {
					score.geoScore = 100;
					continue;
				}
				long dist = Math.round(GeoHelper.getDistance(
						new Double(geozone.getLattitude()), 
						new Double(geozone.getLongitude()), 
						new Double(customer.getLattitude()), 
						new Double(customer.getLongitude())));
				// Distance check
				int radius = (geozone.getRadius() != null) ? geozone.getRadius() : 0;  
				if (dist <= radius) {
					score.geoScore = 100;
					continue;
				} else if (dist <= radius + 2000) {
					score.geoScore = Math.round(Math.max(100 - (dist - radius) * 50 / 2000, score.geoScore));
					continue;
				} else if (dist <= radius + 5000) {
					score.geoScore = Math.round(Math.max(50 - (dist - radius) * 50 / 5000, score.geoScore));
					continue;
				}
			}
			if (score.geoScore == 100) {
				continue;
			}
		}

		// Compute time score
		for (AuxiliaryData aux : auxiliaries) {
			List<MissionData> missions = MissionCollection.get(eq("auxiliaryId", aux.getId()));
			List<IndisponibilityData> indisponibilities = IndisponibilityCollection.get(eq("auxiliaryId", aux.getId()));
			Event[] interventionEvents = Event.buildEvents(intervention);
			int overlaps = 0;

			for (Event interventionEvent : interventionEvents) {
				boolean overlaped = false;
				for (MissionData mission : missions) {
					InterventionData mIntervention = InterventionCollection.getById(mission.getInterventionId());
					if (EMissionStatus._CANCELED.equals(EMissionStatus.getByName(mIntervention.getSadStatus()))) {
						break;
					}
					Event[] missionEvents = Event.buildEvents(mission, mIntervention);
					if (Event.hasOverlap(missionEvents, interventionEvent)) {
						overlaped = true;
						break;
					}
				}
				if (overlaped) {
					overlaps++;
					continue;
				}
				for (IndisponibilityData indisponibility : indisponibilities) {
					Event[] indisponibilityEvents = Event.buildEvents(indisponibility);
					if (Event.hasOverlap(indisponibilityEvents, interventionEvent)) {
						overlaps++;
						break;
					}
				}				
			}	
			scores.get(aux).timeScore = 100 - 100 * overlaps / interventionEvents.length;
		}

		// Compute skill score
		for (AuxiliaryData aux : auxiliaries) {
			if (Boolean.TRUE.equals(aux.getAreSkillSet())) {
				int score = 0;
				score += getSkillScore(aux.getSkillAdministrative(), customer.getSkillAdministrative());
				score += getSkillScore(aux.getSkillChildhood(), customer.getSkillChildhood());
				score += getSkillScore(aux.getSkillCompagny(), customer.getSkillCompagny());
				score += getSkillScore(aux.getSkillDoityourself(), customer.getSkillDoityourself());
				score += getSkillScore(aux.getSkillHousework(), customer.getSkillHousework());
				score += getSkillScore(aux.getSkillNursing(), customer.getSkillNursing());
				score += getSkillScore(aux.getSkillShopping(), customer.getSkillShopping());
				scores.get(aux).skillScore = Math.max(0, score * 100 / 7);
			} else {
				scores.get(aux).skillScore = 40;
			}
		}
		// Sort auxiliaries
		Collections.sort(auxiliaries, new Comparator<AuxiliaryData>() {
			@Override
			public int compare(AuxiliaryData aux1, AuxiliaryData aux2) {
				AuxiliaryMatchScore score1 = scores.get(aux1);
				AuxiliaryMatchScore score2 = scores.get(aux2);
				return score2.getTotal().compareTo(score1.getTotal());
			}
		});
		// Return everything
		List<AuxiliaryMatchScore> result = new ArrayList<AuxiliaryMatchScore>();
		for (AuxiliaryData auxiliary : auxiliaries) {
			AuxiliaryMatchScore score = scores.get(auxiliary);
			if (score.getTotal() > 0) {				
				result.add(score);
			}
		}
		return result;
	}
	
	public static int getSkillScore(Integer auxScore, Integer custScore) {
		int aScore = auxScore == null ? 0 : auxScore;
		int cScore = custScore == null ? 0 : custScore;
		return (aScore >= cScore) ? 1 : (aScore - cScore);
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
			EInterventionStatus status = EInterventionStatus.getByName(intervention.sadStatus);
			if (EInterventionStatus._PENDING.equals(status)) {
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
						offer.setSadStatus(EOfferStatusSad._CONFIRMED.getName());
					} else {
						offer.setSadStatus(EOfferStatusSad._REJECTED.getName());
					}
					offer.setHideToSad(true);
					OfferCollection.update(offer);
				}
			} else if (EOfferStatusSad._CANCELED.equals(status)) {
				// Cancel missions
				List<MissionData> missions = MissionCollection.get(eq("interventionId", intervention.getId()));
				for (MissionData mission : missions) {
					if (TimeHelper.toLocalDate(mission.getDate()).isAfter(LocalDate.now())) {
						mission.setSadStatus(EOfferStatusSad._CANCELED.getName());
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
