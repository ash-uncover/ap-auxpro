package org.ap.auxpro.bean;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;

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

}
