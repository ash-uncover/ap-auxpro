package org.ap.auxpro.bean;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;
import org.ap.auxpro.storage.intervention.InterventionData;
import org.ap.common.time.TimeHelper;
import org.ap.common.exception.APWebException;
import org.ap.common.exception.APWebError;
import java.util.ArrayList;
import javax.ws.rs.core.Response.Status;
import org.ap.auxpro.storage.intervention.InterventionFields;

/* This class was auto-generated by the JavaWriter */
@JsonIgnoreProperties(ignoreUnknown=true)
public class InterventionPostBean {

	public String customerId;
	public String serviceId;
	public String period;
	public String missionType;
	public List<Integer> endDate;
	public List<Integer> lastUpdateDate;
	public List<String> days;
	public List<String> diplomas;
	public List<Integer> startTime;
	public List<Integer> endTime;
	public String id;
	public List<Integer> creationDate;
	public List<Integer> startDate;

	public InterventionPostBean() {
	}

	public InterventionPostBean(InterventionData data) {
		customerId = data.getCustomerId();
		serviceId = data.getServiceId();
		period = data.getPeriod();
		missionType = data.getMissionType();
		endDate = TimeHelper.toIntegers(data.getEndDate());
		lastUpdateDate = TimeHelper.toIntegers(data.getLastUpdateDate());
		days = data.getDays();
		diplomas = data.getDiplomas();
		startTime = data.getStartTime();
		endTime = data.getEndTime();
		id = data.getId();
		creationDate = TimeHelper.toIntegers(data.getCreationDate());
		startDate = TimeHelper.toIntegers(data.getStartDate());
	}

	public InterventionData toData() {
		InterventionData data = new InterventionData();
		fillData(data);
		return data;
	}

	public void fillData(InterventionData data) {
		data.setCustomerId(customerId);
		data.setServiceId(serviceId);
		data.setPeriod(period);
		data.setMissionType(missionType);
		data.setEndDate(TimeHelper.toDate(endDate));
		data.setDays(days);
		data.setDiplomas(diplomas);
		data.setStartTime(startTime);
		data.setEndTime(endTime);
		data.setStartDate(TimeHelper.toDate(startDate));
	}

	public void check() throws APWebException {
		List<APWebError> errors = new ArrayList<APWebError>();
		if (InterventionFields.MISSION_TYPE.getValidator().getState(missionType)) {
			errors.add(new APWebError("AP_INTERVENTION_INVALID_FIELDS", "Invalid field 'missionType'"));
		}
		if (errors.size() > 0) {
			throw new APWebException("AP_INTERVENTION_INVALID_FIELDS", "Invalid fields within 'intervention'", errors, Status.BAD_REQUEST);
		}
	}

}
