package org.ap.auxpro.helpers;

import static com.mongodb.client.model.Filters.and;
import static com.mongodb.client.model.Filters.eq;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.SecurityContext;

import org.ap.auxpro.bean.BasicBean;
import org.ap.auxpro.bean.InterventionEmptyBean;
import org.ap.auxpro.bean.InterventionPostBean;
import org.ap.auxpro.bean.InterventionPutBean;
import org.ap.auxpro.constants.EAuxiliarySkills;
import org.ap.auxpro.constants.EInterventionStatus;
import org.ap.auxpro.constants.EMissionStatus;
import org.ap.auxpro.constants.EOfferStatusSad;
import org.ap.auxpro.constants.EPeopleCategory;
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

			InterventionHelper.checkInterventionSkills(intervention);
			
			result.id = id;
		} catch (MongoWriteException e) {
			throw APWebException.MONGO_WRITE_EXCEPTION;
		}

		return result;
	}
	
	public static void beforePutIntervention(SecurityContext sc, String id, InterventionPutBean bean) throws APWebException {
		InterventionData intervention = bean.toData();
		checkInterventionSkills(intervention);
		bean.fillData(intervention);
	}

	public static void checkInterventionSkills(InterventionData intervention) throws APWebException {
		// Check category <> needs relation
		CustomerData customer = CustomerCollection.getById(intervention.getCustomerId());
		EPeopleCategory customerCategory = EPeopleCategory.getByName(customer.getCategory());
		Set<EAuxiliarySkills> skillsAvailable = DiplomaHelper.getCategorySkills(customerCategory);

		for (EAuxiliarySkills skill: EAuxiliarySkills.values()) {
			try {
				Field field = InterventionData.class.getField(skill.getName());
				Integer value = (Integer)field.get(intervention);
				if (value == null) {
					value = 0;
				}
				if (value < 0) value = 0;
				if (value > 5) value = 5;
				if (!skillsAvailable.contains(skill)) {
					value = 0;
				}
				field.set(intervention, value);
			} catch (Exception e) {
				System.err.println("Error while setting intervention skill: " + skill);
			}
		}
	}

	public static Object getInterventionMatch(SecurityContext sc, String id) throws APWebException {
		InterventionData intervention = InterventionCollection.getById(id);

		// Check the call can be made
		ServiceData service = ServiceCollection.getById(intervention.serviceId);
		if (service == null || !sc.isUserInRole(service.id) || !Boolean.TRUE.equals(service.profilCompleted)) {
			throw new APWebException("forbidden", Status.FORBIDDEN);
		}

		CustomerData customer = CustomerCollection.getById(intervention.customerId);
		List<AuxiliaryData> auxiliaries = AuxiliaryCollection.get(and(eq("profilCompleted", true), eq("accountType", "Premium")));
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
			if (intervention.getSkillBeauty() > 0) {
				score += getSkillScore(aux.getSkillBeauty(), intervention.getSkillBeauty());
				nbSkills++;
			}
			if (intervention.getSkillChildrenCare() > 0) {
				score += getSkillScore(aux.getSkillChildrenCare(), intervention.getSkillChildrenCare());
				nbSkills++;
			}
			if (intervention.getSkillChildrenGame() > 0) {
				score += getSkillScore(aux.getSkillChildrenGame(), intervention.getSkillChildrenGame());
				nbSkills++;
			}
			if (intervention.getSkillChildrenKeep() > 0) {
				score += getSkillScore(aux.getSkillChildrenKeep(), intervention.getSkillChildrenKeep());
				nbSkills++;
			}
			if (intervention.getSkillChildrenSchool() > 0) {
				score += getSkillScore(aux.getSkillChildrenSchool(), intervention.getSkillChildrenSchool());
				nbSkills++;
			}
			if (intervention.getSkillClothes() > 0) {
				score += getSkillScore(aux.getSkillClothes(), intervention.getSkillClothes());
				nbSkills++;
			}
			if (intervention.getSkillCompany() > 0) {
				score += getSkillScore(aux.getSkillCompany(), intervention.getSkillCompany());
				nbSkills++;
			}
			if (intervention.getSkillFood() > 0) {
				score += getSkillScore(aux.getSkillFood(), intervention.getSkillFood());
				nbSkills++;
			}
			if (intervention.getSkillHandicap() > 0) {
				score += getSkillScore(aux.getSkillHandicap(), intervention.getSkillHandicap());
				nbSkills++;
			}
			if (intervention.getSkillHouse() > 0) {
				score += getSkillScore(aux.getSkillHouse(), intervention.getSkillHouse());
				nbSkills++;
			}
			if (intervention.getSkillIllness() > 0) {
				score += getSkillScore(aux.getSkillIllness(), intervention.getSkillIllness());
				nbSkills++;
			}
			if (intervention.getSkillNursing() > 0) {
				score += getSkillScore(aux.getSkillNursing(), intervention.getSkillNursing());
				nbSkills++;
			}
			if (intervention.getSkillOldCare() > 0) {
				score += getSkillScore(aux.getSkillOldCare(), intervention.getSkillOldCare());
				nbSkills++;
			}
			if (intervention.getSkillPet() > 0) {
				score += getSkillScore(aux.getSkillPet(), intervention.getSkillPet());
				nbSkills++;
			}
			if (intervention.getSkillTransport() > 0) {
				score += getSkillScore(aux.getSkillTransport(), intervention.getSkillTransport());
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
