package org.ap.auxpro.storage;

import org.ap.common.validators.EValidators;
import org.ap.common.validators.IValidator;

/* This class was auto-generated by the JavaWriter */
public enum CustomerFields {

	LAST_NAME (EValidators.NON_EMPTY_STRING.getValidator()),
	COUNTRY (EValidators.NON_EMPTY_STRING.getValidator()),
	CIVILITY (EValidators.NON_NULL.getValidator()),
	ADDRESS (EValidators.NON_EMPTY_STRING.getValidator()),
	SKILL_NURSING (EValidators.DEFAULT.getValidator()),
	CITY (EValidators.NON_EMPTY_STRING.getValidator()),
	LATTITUDE (EValidators.DEFAULT.getValidator()),
	LAST_UPDATE_DATE (EValidators.DEFAULT.getValidator()),
	POSTAL_CODE (EValidators.POSTAL_CODE.getValidator()),
	CREATION_DATE (EValidators.DEFAULT.getValidator()),
	BIRTH_DATE (EValidators.BEFORE_TODAY.getValidator()),
	SKILL_CHILDHOOD (EValidators.DEFAULT.getValidator()),
	SKILL_COMPAGNY (EValidators.DEFAULT.getValidator()),
	SKILL_SHOPPING (EValidators.DEFAULT.getValidator()),
	FIRST_NAME (EValidators.NON_EMPTY_STRING.getValidator()),
	NATIONALITY (EValidators.NON_NULL.getValidator()),
	PHONE (EValidators.PHONE.getValidator()),
	SKILL_ADMINISTRATIVE (EValidators.DEFAULT.getValidator()),
	SKILL_HOUSEWORK (EValidators.DEFAULT.getValidator()),
	SKILL_DOITYOURSELF (EValidators.DEFAULT.getValidator()),
	ID (EValidators.DEFAULT.getValidator()),
	SERVICE_ID (EValidators.DEFAULT.getValidator()),
	EMAIL (EValidators.DEFAULT.getValidator()),
	LONGITUDE (EValidators.DEFAULT.getValidator()),
	;

	private IValidator<?> _validator;

	private  CustomerFields(IValidator<?> validator) {
		_validator = validator;
	}

	public IValidator<?> getValidator() {
		return _validator;
	}

}
