package org.ap.auxpro.storage.intervention;

import org.ap.common.validators.EValidators;
import org.ap.common.validators.IValidator;
import org.ap.common.storage.IFieldEnum;

/* This class was auto-generated by the JavaWriter */
public enum InterventionFields implements IFieldEnum {

	PERIOD ("period", "String", EValidators.DEFAULT.getValidator()),
	AUXILIARY_ID ("auxiliaryId", "String", EValidators.DEFAULT.getValidator()),
	END_DATE ("endDate", "List<Integer>", EValidators.DEFAULT.getValidator()),
	LAST_UPDATE_DATE ("lastUpdateDate", "List<Integer>", EValidators.DEFAULT.getValidator()),
	SAD_STATUS_CHANGED ("sadStatusChanged", "List<Integer>", EValidators.DEFAULT.getValidator()),
	CREATION_DATE ("creationDate", "List<Integer>", EValidators.DEFAULT.getValidator()),
	CUSTOMER_ID ("customerId", "String", EValidators.DEFAULT.getValidator()),
	DAYS ("days", "String", EValidators.DEFAULT.getValidator()),
	DIPLOMAS ("diplomas", "String", EValidators.DEFAULT.getValidator()),
	SAD_STATUS ("sadStatus", "String", EValidators.DEFAULT.getValidator()),
	START_TIME ("startTime", "Integer", EValidators.DEFAULT.getValidator()),
	ID ("id", "String", EValidators.DEFAULT.getValidator()),
	END_TIME ("endTime", "Integer", EValidators.DEFAULT.getValidator()),
	SERVICE_ID ("serviceId", "String", EValidators.DEFAULT.getValidator()),
	HIDE_TO_SAD ("hideToSad", "Boolean", EValidators.DEFAULT.getValidator()),
	START_DATE ("startDate", "List<Integer>", EValidators.DEFAULT.getValidator()),
	;

	private String _id;
	private String _type;
	private IValidator _validator;

	private InterventionFields(String id, String type, IValidator validator) {
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

	public IValidator getValidator() {
		return _validator;
	}

	public static InterventionFields byId(String id) {
		for (InterventionFields value : InterventionFields.values()) {
			if (value.getId().equals(id)) {
				return value;
			}
		}
		return null;
	}

}
