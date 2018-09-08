package org.ap.auxpro.bean;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;
import org.ap.auxpro.storage.indisponibility.IndisponibilityData;
import org.ap.common.time.TimeHelper;
import org.ap.common.web.exception.APWebException;
import org.ap.common.validators.ValidationState;
import org.ap.common.validators.EValidatorState;
import org.ap.common.web.exception.APWebError;
import java.util.ArrayList;
import javax.ws.rs.core.Response.Status;
import org.ap.auxpro.storage.indisponibility.IndisponibilityFields;

/* This class was auto-generated by the JavaWriter */
@JsonIgnoreProperties(ignoreUnknown=true)
public class IndisponibilityBean {

	public String auxiliaryId;
	public String period;
	public List<Integer> endDate;
	public List<Integer> lastUpdateDate;
	public List<String> days;
	public List<Integer> startTime;
	public List<Integer> endTime;
	public String id;
	public List<Integer> creationDate;
	public List<Integer> startDate;

	public IndisponibilityBean() {
	}

	public IndisponibilityBean(IndisponibilityData data) {
		auxiliaryId = data.getAuxiliaryId();
		period = data.getPeriod();
		endDate = TimeHelper.toIntegers(data.getEndDate());
		lastUpdateDate = TimeHelper.toIntegers(data.getLastUpdateDate());
		days = data.getDays();
		startTime = data.getStartTime();
		endTime = data.getEndTime();
		id = data.getId();
		creationDate = TimeHelper.toIntegers(data.getCreationDate());
		startDate = TimeHelper.toIntegers(data.getStartDate());
	}

	public IndisponibilityData toData() {
		IndisponibilityData data = new IndisponibilityData();
		fillData(data);
		return data;
	}

	public void fillData(IndisponibilityData data) {
		data.setAuxiliaryId(auxiliaryId);
		data.setPeriod(period);
		data.setEndDate(TimeHelper.toDate(endDate));
		data.setDays(days);
		data.setStartTime(startTime);
		data.setEndTime(endTime);
		data.setStartDate(TimeHelper.toDate(startDate));
	}

	public void check() throws APWebException {
		List<APWebError> errors = new ArrayList<APWebError>();
		ValidationState periodState = IndisponibilityFields.PERIOD.getValidator().check(period);
		if (!periodState.getState().equals(EValidatorState.SUCCESS)) {
			errors.add(new APWebError("AP_INDISPONIBILITY_INVALID_FIELDS", "Invalid field 'period'"));
		}
		ValidationState endDateState = IndisponibilityFields.END_DATE.getValidator().check(endDate);
		if (!endDateState.getState().equals(EValidatorState.SUCCESS)) {
			errors.add(new APWebError("AP_INDISPONIBILITY_INVALID_FIELDS", "Invalid field 'endDate'"));
		}
		ValidationState daysState = IndisponibilityFields.DAYS.getValidator().check(days);
		if (!daysState.getState().equals(EValidatorState.SUCCESS)) {
			errors.add(new APWebError("AP_INDISPONIBILITY_INVALID_FIELDS", "Invalid field 'days'"));
		}
		ValidationState startTimeState = IndisponibilityFields.START_TIME.getValidator().check(startTime);
		if (!startTimeState.getState().equals(EValidatorState.SUCCESS)) {
			errors.add(new APWebError("AP_INDISPONIBILITY_INVALID_FIELDS", "Invalid field 'startTime'"));
		}
		ValidationState endTimeState = IndisponibilityFields.END_TIME.getValidator().check(endTime);
		if (!endTimeState.getState().equals(EValidatorState.SUCCESS)) {
			errors.add(new APWebError("AP_INDISPONIBILITY_INVALID_FIELDS", "Invalid field 'endTime'"));
		}
		ValidationState startDateState = IndisponibilityFields.START_DATE.getValidator().check(startDate);
		if (!startDateState.getState().equals(EValidatorState.SUCCESS)) {
			errors.add(new APWebError("AP_INDISPONIBILITY_INVALID_FIELDS", "Invalid field 'startDate'"));
		}
		if (errors.size() > 0) {
			throw new APWebException("AP_INDISPONIBILITY_INVALID_FIELDS", "Invalid fields within 'indisponibility'", errors, Status.BAD_REQUEST);
		}
	}

}
