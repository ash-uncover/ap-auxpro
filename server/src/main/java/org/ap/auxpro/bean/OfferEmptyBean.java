package org.ap.auxpro.bean;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;
import org.ap.auxpro.storage.offer.OfferData;
import org.ap.common.time.TimeHelper;
import org.ap.common.exception.APWebException;

/* This class was auto-generated by the JavaWriter */
@JsonIgnoreProperties(ignoreUnknown=true)
public class OfferEmptyBean {

	public List<Integer> lastUpdateDate;
	public String id;
	public List<Integer> creationDate;

	public OfferEmptyBean() {
	}

	public OfferEmptyBean(OfferData data) {
		lastUpdateDate = TimeHelper.toIntegers(data.getLastUpdateDate());
		id = data.getId();
		creationDate = TimeHelper.toIntegers(data.getCreationDate());
	}

	public OfferData toData() {
		OfferData data = new OfferData();
		fillData(data);
		return data;
	}

	public void fillData(OfferData data) {
	}

	public void check() throws APWebException {
	}

}
