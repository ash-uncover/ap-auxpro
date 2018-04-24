package org.ap.auxpro.storage.indisponibility;

import org.ap.common.storage.IFieldEnum;
import org.ap.common.validators.ValidatorProvider;
import org.ap.auxpro.internal.Validators;

/* This class was auto-generated by the JavaWriter */
public enum IndisponibilityFields implements IFieldEnum {

	PERIOD ("period", "String", new Validators.NON_NULL()),
	AUXILIARY_ID ("auxiliaryId", "String", new Validators.DEFAULT()),
	END_DATE ("endDate", "List<Integer>", new Validators.DEFAULT()),
	LAST_UPDATE_DATE ("lastUpdateDate", "List<Integer>", new Validators.DEFAULT()),
	DAYS ("days", "String", new Validators.DEFAULT()),
	START_TIME ("startTime", "Integer", new Validators.DEFAULT()),
	END_TIME ("endTime", "Integer", new Validators.DEFAULT()),
	ID ("id", "String", new Validators.DEFAULT()),
	CREATION_DATE ("creationDate", "List<Integer>", new Validators.DEFAULT()),
	START_DATE ("startDate", "List<Integer>", new Validators.DEFAULT()),
	;

	private String _id;
	private String _type;
	private ValidatorProvider _validator;

	private IndisponibilityFields(String id, String type, ValidatorProvider validator) {
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

	public static IndisponibilityFields byId(String id) {
		for (IndisponibilityFields value : IndisponibilityFields.values()) {
			if (value.getId().equals(id)) {
				return value;
			}
		}
		return null;
	}

}
