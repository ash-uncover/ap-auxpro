package org.ap.auxpro.storage;

import org.ap.common.validators.EValidators;
import org.ap.common.validators.IValidator;

/* This class was auto-generated by the JavaWriter */
public enum IndisponibilityFields {

	PERIOD (EValidators.NON_NULL.getValidator()),
	AUXILIARY_ID (EValidators.DEFAULT.getValidator()),
	END_DATE (EValidators.DEFAULT.getValidator()),
	LAST_UPDATE_DATE (EValidators.DEFAULT.getValidator()),
	DAYS (EValidators.DEFAULT.getValidator()),
	START_TIME (EValidators.DEFAULT.getValidator()),
	END_TIME (EValidators.DEFAULT.getValidator()),
	ID (EValidators.DEFAULT.getValidator()),
	CREATION_DATE (EValidators.DEFAULT.getValidator()),
	START_DATE (EValidators.DEFAULT.getValidator()),
	;

	private IValidator<?> _validator;

	private  IndisponibilityFields(IValidator<?> validator) {
		_validator = validator;
	}

	public IValidator<?> getValidator() {
		return _validator;
	}

}
