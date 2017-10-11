package org.ap.auxpro.storage;

import org.ap.common.validators.EValidators;
import org.ap.common.validators.IValidator;

/* This class was auto-generated by the JavaWriter */
public enum HelptopicFields {

	LAST_UPDATE_DATE (EValidators.DEFAULT.getValidator()),
	ID (EValidators.DEFAULT.getValidator()),
	TITLE (EValidators.DEFAULT.getValidator()),
	CREATION_DATE (EValidators.DEFAULT.getValidator()),
	CONTENT (EValidators.DEFAULT.getValidator()),
	;

	private IValidator<?> _validator;

	private  HelptopicFields(IValidator<?> validator) {
		_validator = validator;
	}

	public IValidator<?> getValidator() {
		return _validator;
	}

}
