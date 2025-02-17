package org.ap.auxpro.bean;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;
import org.ap.auxpro.storage.helptopic.HelptopicData;
import org.ap.common.time.TimeHelper;
import org.ap.common.web.exception.APWebException;

/* This class was auto-generated by the JavaWriter */
@JsonIgnoreProperties(ignoreUnknown=true)
public class HelpTopicBean {

	public List<Integer> lastUpdateDate;
	public String id;
	public String title;
	public List<Integer> creationDate;
	public String content;

	public HelpTopicBean() {
	}

	public HelpTopicBean(HelptopicData data) {
		lastUpdateDate = TimeHelper.toIntegers(data.getLastUpdateDate());
		id = data.getId();
		title = data.getTitle();
		creationDate = TimeHelper.toIntegers(data.getCreationDate());
		content = data.getContent();
	}

	public HelptopicData toData() {
		HelptopicData data = new HelptopicData();
		fillData(data);
		return data;
	}

	public void fillData(HelptopicData data) {
		data.setTitle(title);
		data.setContent(content);
	}

	public void check() throws APWebException {
	}

}
