package org.ap.auxpro.storage.mission;

import org.ap.common.storage.IFieldEnum;
import org.ap.common.validators.ValidatorProvider;
import org.ap.auxpro.internal.Validators;

/* This class was auto-generated by the JavaWriter */
public enum MissionFields implements IFieldEnum {

	DATE ("date", "List<Integer>", new Validators.DEFAULT()),
	AUX_STATUS ("auxStatus", "String", new Validators.DEFAULT()),
	AUX_STATUS_CHANGED ("auxStatusChanged", "List<Integer>", new Validators.DEFAULT()),
	AUXILIARY_ID ("auxiliaryId", "String", new Validators.DEFAULT()),
	HIDE_TO_AUX ("hideToAux", "Boolean", new Validators.DEFAULT()),
	LAST_UPDATE_DATE ("lastUpdateDate", "List<Integer>", new Validators.DEFAULT()),
	SAD_STATUS_CHANGED ("sadStatusChanged", "List<Integer>", new Validators.DEFAULT()),
	CREATION_DATE ("creationDate", "List<Integer>", new Validators.DEFAULT()),
	CUSTOMER_ID ("customerId", "String", new Validators.DEFAULT()),
	SAD_STATUS ("sadStatus", "String", new Validators.DEFAULT()),
	ID ("id", "String", new Validators.DEFAULT()),
	SERVICE_ID ("serviceId", "String", new Validators.DEFAULT()),
	INTERVENTION_ID ("interventionId", "String", new Validators.DEFAULT()),
	HIDE_TO_SAD ("hideToSad", "Boolean", new Validators.DEFAULT()),
	;

	private String _id;
	private String _type;
	private ValidatorProvider _validator;

	private MissionFields(String id, String type, ValidatorProvider validator) {
		_id = id;
		_type = type;
		_validator = validator;
	}

	public String getId() {
		return _id;
	}

	public String getType() {
		return _type;
	}

	public ValidatorProvider getValidator() {
		return _validator;
	}

	public static MissionFields byId(String id) {
		for (MissionFields value : MissionFields.values()) {
			if (value.getId().equals(id)) {
				return value;
			}
		}
		return null;
	}

}
