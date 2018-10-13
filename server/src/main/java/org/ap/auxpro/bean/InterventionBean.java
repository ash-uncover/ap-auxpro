package org.ap.auxpro.bean;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;
import org.ap.auxpro.storage.intervention.InterventionData;
import org.ap.common.time.TimeHelper;
import org.ap.common.web.exception.APWebException;
import org.ap.common.validators.ValidationState;
import org.ap.common.validators.EValidatorState;
import org.ap.common.web.exception.APWebError;
import java.util.ArrayList;
import javax.ws.rs.core.Response.Status;
import org.ap.auxpro.storage.intervention.InterventionFields;

/* This class was auto-generated by the JavaWriter */
@JsonIgnoreProperties(ignoreUnknown=true)
public class InterventionBean {

	public String auxiliaryId;
	public List<Integer> endDate;
	public Integer skillChildrenGame;
	public Integer skillHouse;
	public List<Integer> lastUpdateDate;
	public List<Integer> sadStatusChanged;
	public Integer skillBeauty;
	public String missionType;
	public Integer skillHandicap;
	public Integer skillIllness;
	public Integer skillChildrenSchool;
	public String sadStatus;
	public List<Integer> startTime;
	public String id;
	public Integer skillChildrenKeep;
	public Integer skillOldCare;
	public String period;
	public Integer skillNursing;
	public Integer skillChildrenCare;
	public Integer skillFood;
	public Integer skillCompany;
	public List<Integer> creationDate;
	public Integer skillTransport;
	public Integer skillClothes;
	public List<String> days;
	public List<Integer> endTime;
	public Boolean hideToSad;
	public Integer skillPet;
	public List<Integer> startDate;
	public String customerId;
	public String serviceId;

	public InterventionBean() {
	}

	public InterventionBean(InterventionData data) {
		auxiliaryId = data.getAuxiliaryId();
		endDate = TimeHelper.toIntegers(data.getEndDate());
		skillChildrenGame = data.getSkillChildrenGame();
		skillHouse = data.getSkillHouse();
		lastUpdateDate = TimeHelper.toIntegers(data.getLastUpdateDate());
		sadStatusChanged = TimeHelper.toIntegers(data.getSadStatusChanged());
		skillBeauty = data.getSkillBeauty();
		missionType = data.getMissionType();
		skillHandicap = data.getSkillHandicap();
		skillIllness = data.getSkillIllness();
		skillChildrenSchool = data.getSkillChildrenSchool();
		sadStatus = data.getSadStatus();
		startTime = data.getStartTime();
		id = data.getId();
		skillChildrenKeep = data.getSkillChildrenKeep();
		skillOldCare = data.getSkillOldCare();
		period = data.getPeriod();
		skillNursing = data.getSkillNursing();
		skillChildrenCare = data.getSkillChildrenCare();
		skillFood = data.getSkillFood();
		skillCompany = data.getSkillCompany();
		creationDate = TimeHelper.toIntegers(data.getCreationDate());
		skillTransport = data.getSkillTransport();
		skillClothes = data.getSkillClothes();
		days = data.getDays();
		endTime = data.getEndTime();
		hideToSad = data.getHideToSad();
		skillPet = data.getSkillPet();
		startDate = TimeHelper.toIntegers(data.getStartDate());
		customerId = data.getCustomerId();
		serviceId = data.getServiceId();
	}

	public InterventionData toData() {
		InterventionData data = new InterventionData();
		fillData(data);
		return data;
	}

	public void fillData(InterventionData data) {
		data.setAuxiliaryId(auxiliaryId);
		data.setEndDate(TimeHelper.toDate(endDate));
		data.setSkillChildrenGame(skillChildrenGame);
		data.setSkillHouse(skillHouse);
		data.setSadStatusChanged(TimeHelper.toDate(sadStatusChanged));
		data.setSkillBeauty(skillBeauty);
		data.setMissionType(missionType);
		data.setSkillHandicap(skillHandicap);
		data.setSkillIllness(skillIllness);
		data.setSkillChildrenSchool(skillChildrenSchool);
		data.setSadStatus(sadStatus);
		data.setStartTime(startTime);
		data.setSkillChildrenKeep(skillChildrenKeep);
		data.setSkillOldCare(skillOldCare);
		data.setPeriod(period);
		data.setSkillNursing(skillNursing);
		data.setSkillChildrenCare(skillChildrenCare);
		data.setSkillFood(skillFood);
		data.setSkillCompany(skillCompany);
		data.setSkillTransport(skillTransport);
		data.setSkillClothes(skillClothes);
		data.setDays(days);
		data.setEndTime(endTime);
		data.setHideToSad(hideToSad);
		data.setSkillPet(skillPet);
		data.setStartDate(TimeHelper.toDate(startDate));
		data.setCustomerId(customerId);
		data.setServiceId(serviceId);
	}

	public void check() throws APWebException {
		List<APWebError> errors = new ArrayList<APWebError>();
		ValidationState endDateState = InterventionFields.END_DATE.getValidator().check(endDate);
		if (!endDateState.getState().equals(EValidatorState.SUCCESS)) {
			errors.add(new APWebError("AP_INTERVENTION_INVALID_FIELDS", "Invalid field 'endDate'"));
		}
		ValidationState missionTypeState = InterventionFields.MISSION_TYPE.getValidator().check(missionType);
		if (!missionTypeState.getState().equals(EValidatorState.SUCCESS)) {
			errors.add(new APWebError("AP_INTERVENTION_INVALID_FIELDS", "Invalid field 'missionType'"));
		}
		ValidationState startTimeState = InterventionFields.START_TIME.getValidator().check(startTime);
		if (!startTimeState.getState().equals(EValidatorState.SUCCESS)) {
			errors.add(new APWebError("AP_INTERVENTION_INVALID_FIELDS", "Invalid field 'startTime'"));
		}
		ValidationState periodState = InterventionFields.PERIOD.getValidator().check(period);
		if (!periodState.getState().equals(EValidatorState.SUCCESS)) {
			errors.add(new APWebError("AP_INTERVENTION_INVALID_FIELDS", "Invalid field 'period'"));
		}
		ValidationState daysState = InterventionFields.DAYS.getValidator().check(days);
		if (!daysState.getState().equals(EValidatorState.SUCCESS)) {
			errors.add(new APWebError("AP_INTERVENTION_INVALID_FIELDS", "Invalid field 'days'"));
		}
		ValidationState endTimeState = InterventionFields.END_TIME.getValidator().check(endTime);
		if (!endTimeState.getState().equals(EValidatorState.SUCCESS)) {
			errors.add(new APWebError("AP_INTERVENTION_INVALID_FIELDS", "Invalid field 'endTime'"));
		}
		ValidationState startDateState = InterventionFields.START_DATE.getValidator().check(startDate);
		if (!startDateState.getState().equals(EValidatorState.SUCCESS)) {
			errors.add(new APWebError("AP_INTERVENTION_INVALID_FIELDS", "Invalid field 'startDate'"));
		}
		if (errors.size() > 0) {
			throw new APWebException("AP_INTERVENTION_INVALID_FIELDS", "Invalid fields within 'intervention'", errors, Status.BAD_REQUEST);
		}
	}

}
