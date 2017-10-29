package org.ap.auxpro.helpers;

import static com.mongodb.client.model.Filters.*;

import java.time.LocalDate;
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
import org.ap.auxpro.constants.EInterventionStatus;
import org.ap.auxpro.constants.EMissionStatus;
import org.ap.auxpro.constants.EOfferStatusSad;
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
import org.bson.conversions.Bson;

import com.mongodb.MongoWriteException;

public class InterventionHelper {
	
	public static Object createIntervention(SecurityContext sc, InterventionPostBean interventionBean) throws APWebException {
		BasicBean result = new BasicBean();
		try {
			String id = UUIDGenerator.nextId();
			Date now = new Date();

			InterventionData intervention = new InterventionData();
			intervention.setId(id);
			intervention.setCreationDate(now);
			intervention.setLastUpdateDate(now);
			
			intervention.setCustomerId(interventionBean.customerId);
			intervention.setServiceId(interventionBean.serviceId);
			intervention.setPeriod(interventionBean.period);
			intervention.setStartDate(TimeHelper.toDate(interventionBean.startDate));
			intervention.setEndDate(TimeHelper.toDate(interventionBean.endDate));
			intervention.setStartTime(interventionBean.startTime);
			intervention.setEndTime(interventionBean.endTime);
			intervention.setDays(interventionBean.days);
			intervention.setDiplomas(interventionBean.diplomas);
			
			intervention.setSadStatus(EInterventionStatus._PENDING.getName());
			intervention.setSadStatusChanged(now);
			intervention.setHideToSad(false);
			InterventionCollection.create(intervention);
			
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
		if (diplomas != null && diplomas.size() > 0) {
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
