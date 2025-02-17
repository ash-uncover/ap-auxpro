package org.ap.auxpro.bean;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;
import org.ap.auxpro.storage.intervention.InterventionData;
import org.ap.common.time.TimeHelper;
import org.ap.common.web.exception.APWebException;

/* This class was auto-generated by the JavaWriter */
@JsonIgnoreProperties(ignoreUnknown=true)
public class InterventionEmptyBean {

	public List<Integer> lastUpdateDate;
	public String id;
	public List<Integer> creationDate;

	public InterventionEmptyBean() {
	}

	public InterventionEmptyBean(InterventionData data) {
		lastUpdateDate = TimeHelper.toIntegers(data.getLastUpdateDate());
		id = data.getId();
		creationDate = TimeHelper.toIntegers(data.getCreationDate());
	}

	public InterventionData toData() {
		InterventionData data = new InterventionData();
		fillData(data);
		return data;
	}

	public void fillData(InterventionData data) {
	}

	public void check() throws APWebException {
	}

}
