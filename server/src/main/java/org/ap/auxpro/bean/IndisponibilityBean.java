package org.ap.auxpro.bean;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;
import org.ap.auxpro.storage.indisponibility.IndisponibilityData;
import org.ap.common.time.TimeHelper;

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

}
