package org.ap.auxpro.storage.indisponibility;

import org.ap.common.validators.EValidators;
import org.ap.common.validators.IValidator;

/* This class was auto-generated by the JavaWriter */
public enum IndisponibilityFields {

	PERIOD ("period", "String", EValidators.NON_NULL.getValidator()),
	AUXILIARY_ID ("auxiliaryId", "String", EValidators.DEFAULT.getValidator()),
	END_DATE ("endDate", "List<Integer>", EValidators.DEFAULT.getValidator()),
	LAST_UPDATE_DATE ("lastUpdateDate", "List<Integer>", EValidators.DEFAULT.getValidator()),
	DAYS ("days", "String", EValidators.DEFAULT.getValidator()),
	START_TIME ("startTime", "Integer", EValidators.DEFAULT.getValidator()),
	END_TIME ("endTime", "Integer", EValidators.DEFAULT.getValidator()),
	ID ("id", "String", EValidators.DEFAULT.getValidator()),
	CREATION_DATE ("creationDate", "List<Integer>", EValidators.DEFAULT.getValidator()),
	START_DATE ("startDate", "List<Integer>", EValidators.DEFAULT.getValidator()),
	;

	private String _id;
	private String _type;
	private IValidator _validator;

	private IndisponibilityFields(String id, String type, IValidator validator) {
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

	public static IndisponibilityFields byId(String id) {
		for (IndisponibilityFields value : IndisponibilityFields.values()) {
			if (value.getId().equals(id)) {
				return value;
			}
		}
		return null;
	}

}
