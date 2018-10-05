package org.ap.auxpro.helpers;

import static com.mongodb.client.model.Filters.and;
import static com.mongodb.client.model.Filters.eq;
import static com.mongodb.client.model.Filters.in;
import static com.mongodb.client.model.Filters.or;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.SecurityContext;

import org.ap.auxpro.bean.BasicBean;
import org.ap.auxpro.bean.InterventionEmptyBean;
import org.ap.auxpro.bean.InterventionPostBean;
import org.ap.auxpro.constants.EDiploma;
import org.ap.auxpro.constants.EInterventionStatus;
import org.ap.auxpro.constants.EMissionStatus;
import org.ap.auxpro.constants.EOfferStatusSad;
import org.ap.auxpro.storage.auxiliary.AuxiliaryCollection;
import org.ap.auxpro.storage.auxiliary.AuxiliaryData;
import org.ap.auxpro.storage.customer.CustomerCollection;
import org.ap.auxpro.storage.customer.CustomerData;
import org.ap.auxpro.storage.geozone.GeozoneCollection;
import org.ap.auxpro.storage.geozone.GeozoneData;
import org.ap.auxpro.storage.indisponibility.IndisponibilityCollection;
import org.ap.auxpro.storage.indisponibility.IndisponibilityData;
import org.ap.auxpro.storage.intervention.InterventionCollection;
import org.ap.auxpro.storage.intervention.InterventionData;
import org.ap.auxpro.storage.mission.MissionCollection;
import org.ap.auxpro.storage.mission.MissionData;
import org.ap.auxpro.storage.offer.OfferCollection;
import org.ap.auxpro.storage.offer.OfferData;
import org.ap.auxpro.storage.service.ServiceCollection;
import org.ap.auxpro.storage.service.ServiceData;
import org.ap.common.geo.GeoHelper;
import org.ap.common.time.TimeEvent;
import org.ap.common.util.UUIDGenerator;
import org.ap.common.web.exception.APWebException;
import org.bson.conversions.Bson;

import com.mongodb.MongoWriteException;

public class InterventionHelper {

	private static final int _MAX_MATCHES = 10;

	public static Object createIntervention(SecurityContext sc, InterventionPostBean interventionBean) throws APWebException {
		BasicBean result = new BasicBean();
		try {
			// Load received values
			InterventionData intervention = interventionBean.toData();
			// Load default values
			String id = UUIDGenerator.nextId();
			Date now = new Date();
			intervention.setId(id);
			intervention.setCreationDate(now);
			intervention.setLastUpdateDate(now);
			intervention.setSadStatus(EInterventionStatus._PENDING.getName());
			intervention.setSadStatusChanged(now);
			intervention.setHideToSad(false);
			InterventionCollection.create(intervention);

			/*
			intervention.setCustomerId(interventionBean.customerId);
			intervention.setServiceId(interventionBean.serviceId);
			intervention.setPeriod(interventionBean.period);
			intervention.setStartDate(TimeHelper.toDate(interventionBean.startDate));
			intervention.setEndDate(TimeHelper.toDate(interventionBean.endDate));
			intervention.setStartTime(interventionBean.startTime);
			intervention.setEndTime(interventionBean.endTime);
			intervention.setDays(interventionBean.days);
			intervention.setDiplomas(interventionBean.diplomas);
			 */
			result.id = id;
		} catch (MongoWriteException e) {
			throw APWebException.MONGO_WRITE_EXCEPTION;
		}

		return result;
	}

	public static Object getInterventionMatch(SecurityContext sc, String id) throws APWebException {
		InterventionData intervention = InterventionCollection.getById(id);

		// Check the call can be made
		ServiceData service = ServiceCollection.getById(intervention.serviceId);
		if (service == null || !sc.isUserInRole(service.id) || !Boolean.TRUE.equals(service.profilCompleted)) {
			throw new APWebException("forbidden", Status.FORBIDDEN);
		}


		List<AuxiliaryData> auxiliaries = null;
		//
		List<String> diplomas = intervention.getDiplomas();
		if (diplomas != null && diplomas.size() > 0 && !diplomas.contains(EDiploma._DIPLOMA_NONE.getName()) && !diplomas.contains(EDiploma._DIPLOMA_STUDY.getName())) {
			List<Bson> conditions = new ArrayList<Bson>();
			for (String diploma : diplomas) {
				conditions.add(in("diploma", diploma));
			}			
			auxiliaries = AuxiliaryCollection.get(and(eq("profilCompleted", true), eq("accountType", "Premium"), or(conditions)));
		} else {
			auxiliaries = AuxiliaryCollection.get(and(eq("profilCompleted", true), eq("accountType", "Premium")));
		}
		CustomerData customer = CustomerCollection.getById(intervention.customerId);
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
			List<TimeEvent> interventionEvents = new TimeEventDefinition(intervention).getEvents();
			int overlaps = 0;

			for (TimeEvent interventionEvent : interventionEvents) {
				boolean overlaped = false;
				for (MissionData mission : missions) {
					InterventionData mIntervention = InterventionCollection.getById(mission.getInterventionId());
					if (EMissionStatus._CANCELED.equals(EMissionStatus.getByName(mIntervention.getSadStatus()))) {
						break;
					}
					List<TimeEvent> missionEvents = new TimeEventDefinition(mission, intervention).getEvents();
					if (TimeEvent.hasOverlap(missionEvents, interventionEvent)) {
						overlaped = true;
						break;
					}
				}
				if (overlaped) {
					overlaps++;
					continue;
				}
				for (IndisponibilityData indisponibility : indisponibilities) {
					List<TimeEvent> indisponibilityEvents = new TimeEventDefinition(indisponibility).getEvents();
					if (TimeEvent.hasOverlap(indisponibilityEvents, interventionEvent)) {
						overlaps++;
						break;
					}
				}				
			}	
			scores.get(aux).timeScore = 100 - 100 * overlaps / interventionEvents.size();
		}

		// Compute skill score
		for (AuxiliaryData aux : auxiliaries) {
			int score = 0;
			int nbSkills = 0;
			if (customer.getSkillBeauty() > 0) {
				score += getSkillScore(aux.getSkillBeauty(), customer.getSkillBeauty());
				nbSkills++;
			}
			if (customer.getSkillChildrenCare() > 0) {
				score += getSkillScore(aux.getSkillChildrenCare(), customer.getSkillChildrenCare());
				nbSkills++;
			}
			if (customer.getSkillChildrenGame() > 0) {
				score += getSkillScore(aux.getSkillChildrenGame(), customer.getSkillChildrenGame());
				nbSkills++;
			}
			if (customer.getSkillChildrenKeep() > 0) {
				score += getSkillScore(aux.getSkillChildrenKeep(), customer.getSkillChildrenKeep());
				nbSkills++;
			}
			if (customer.getSkillChildrenSchool() > 0) {
				score += getSkillScore(aux.getSkillChildrenSchool(), customer.getSkillChildrenSchool());
				nbSkills++;
			}
			if (customer.getSkillClothes() > 0) {
				score += getSkillScore(aux.getSkillClothes(), customer.getSkillClothes());
				nbSkills++;
			}
			if (customer.getSkillCompany() > 0) {
				score += getSkillScore(aux.getSkillCompany(), customer.getSkillCompany());
				nbSkills++;
			}
			if (customer.getSkillFood() > 0) {
				score += getSkillScore(aux.getSkillFood(), customer.getSkillFood());
				nbSkills++;
			}
			if (customer.getSkillHandicap() > 0) {
				score += getSkillScore(aux.getSkillHandicap(), customer.getSkillHandicap());
				nbSkills++;
			}
			if (customer.getSkillHouse() > 0) {
				score += getSkillScore(aux.getSkillHouse(), customer.getSkillHouse());
				nbSkills++;
			}
			if (customer.getSkillIllness() > 0) {
				score += getSkillScore(aux.getSkillIllness(), customer.getSkillIllness());
				nbSkills++;
			}
			if (customer.getSkillNursing() > 0) {
				score += getSkillScore(aux.getSkillNursing(), customer.getSkillNursing());
				nbSkills++;
			}
			if (customer.getSkillOldCare() > 0) {
				score += getSkillScore(aux.getSkillOldCare(), customer.getSkillOldCare());
				nbSkills++;
			}
			if (customer.getSkillPet() > 0) {
				score += getSkillScore(aux.getSkillPet(), customer.getSkillPet());
				nbSkills++;
			}
			if (customer.getSkillTransport() > 0) {
				score += getSkillScore(aux.getSkillTransport(), customer.getSkillTransport());
				nbSkills++;
			}
			if (nbSkills > 0) {					
				scores.get(aux).skillScore = Math.max(0, score * 100 / nbSkills);
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
		return result.subList(0, Math.min(_MAX_MATCHES, result.size()));
	}

	public static int getSkillScore(Integer auxScore, Integer custScore) {
		int aScore = auxScore == null ? 0 : auxScore;
		int cScore = custScore == null ? 0 : custScore;
		return (aScore >= cScore) ? 1 : (aScore - cScore);
	}

	public static Object putInterventionCancel(SecurityContext sc, String id, InterventionEmptyBean interventionBean) throws APWebException {
		Date now = new Date();

		InterventionData intervention = InterventionCollection.getById(id);

		EInterventionStatus currentStatus = EInterventionStatus.getByName(intervention.sadStatus);

		switch(currentStatus) {		
		case _MATCHING:
			intervention.sadStatus = EInterventionStatus._PENDING.getName();
			List<OfferData> offers = OfferCollection.get(and(eq("interventionId", intervention.id)));
			for (OfferData offer : offers) {
				offer.sadStatus = EOfferStatusSad._CANCELED.getName();
				offer.sadStatusChanged = now;
				offer.lastUpdateDate = now;
				OfferCollection.update(offer);
			}
			break;
		case _ON_GOING:
			intervention.sadStatus = EInterventionStatus._CANCELED.getName();
			intervention.hideToSad = true;
			List<MissionData> missions = MissionCollection.get(and(eq("interventionId", intervention.id)));
			for (MissionData mission : missions) {
				mission.sadStatus = EMissionStatus._CANCELED.getName();
				mission.sadStatusChanged = now;
				mission.hideToSad = true;
				mission.lastUpdateDate = now;
				MissionCollection.update(mission);
			}
			break;
		default:
			throw new APWebException("", "", Status.FORBIDDEN);
		}

		intervention.lastUpdateDate = now;
		intervention.sadStatusChanged = now;

		InterventionCollection.update(intervention);

		return "";
	}

}
