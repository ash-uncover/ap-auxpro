package org.ap.auxpro.storage;

import org.ap.common.validators.EValidators;
import org.ap.common.validators.IValidator;

/* This class was auto-generated by the JavaWriter */
public enum ServiceFields {

	COUNTRY (EValidators.NON_EMPTY_STRING.getValidator()),
	ADDRESS (EValidators.NON_EMPTY_STRING.getValidator()),
	CITY (EValidators.NON_EMPTY_STRING.getValidator()),
	LATTITUDE (EValidators.DEFAULT.getValidator()),
	LAST_UPDATE_DATE (EValidators.DEFAULT.getValidator()),
	ACCOUNT_TYPE (EValidators.DEFAULT.getValidator()),
	POSTAL_CODE (EValidators.POSTAL_CODE.getValidator()),
	IS_TUTO_SKIPPED (EValidators.DEFAULT.getValidator()),
	NOTIFY_PARTNERS (EValidators.DEFAULT.getValidator()),
	AVATAR (EValidators.DEFAULT.getValidator()),
	ACCOUNT_EXPIRY_DATE (EValidators.DEFAULT.getValidator()),
	CREATION_DATE (EValidators.DEFAULT.getValidator()),
	SIRET (EValidators.SIRET_NUMBER.getValidator()),
	NOTIFY_AUXPROS (EValidators.DEFAULT.getValidator()),
	PHONE (EValidators.PHONE.getValidator()),
	PHONE_CHECKED (EValidators.DEFAULT.getValidator()),
	FUNCTION (EValidators.NON_NULL.getValidator()),
	PROFIL_COMPLETED (EValidators.DEFAULT.getValidator()),
	ADDRESS_CHECKED (EValidators.DEFAULT.getValidator()),
	ID (EValidators.DEFAULT.getValidator()),
	SOCIAL_REASON (EValidators.NON_EMPTY_STRING.getValidator()),
	EMAIL (EValidators.DEFAULT.getValidator()),
	LONGITUDE (EValidators.DEFAULT.getValidator()),
	;

	private IValidator<?> _validator;

	private  ServiceFields(IValidator<?> validator) {
		_validator = validator;
	}

	public IValidator<?> getValidator() {
		return _validator;
	}

}
