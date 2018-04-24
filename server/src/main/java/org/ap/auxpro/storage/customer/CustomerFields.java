package org.ap.auxpro.storage.customer;

import org.ap.common.storage.IFieldEnum;
import org.ap.common.validators.ValidatorProvider;
import org.ap.auxpro.internal.Validators;

/* This class was auto-generated by the JavaWriter */
public enum CustomerFields implements IFieldEnum {

	LAST_NAME ("lastName", "String", new Validators.NON_EMPTY_STRING()),
	COUNTRY ("country", "String", new Validators.NON_EMPTY_STRING()),
	CIVILITY ("civility", "String", new Validators.NON_NULL()),
	ADDRESS ("address", "String", new Validators.NON_EMPTY_STRING()),
	SKILL_NURSING ("skillNursing", "Integer", new Validators.DEFAULT()),
	CITY ("city", "String", new Validators.NON_EMPTY_STRING()),
	LATTITUDE ("lattitude", "Double", new Validators.DEFAULT()),
	LAST_UPDATE_DATE ("lastUpdateDate", "List<Integer>", new Validators.DEFAULT()),
	POSTAL_CODE ("postalCode", "String", new Validators.POSTAL_CODE()),
	CREATION_DATE ("creationDate", "List<Integer>", new Validators.DEFAULT()),
	BIRTH_DATE ("birthDate", "List<Integer>", new Validators.BEFORE_TODAY()),
	SKILL_CHILDHOOD ("skillChildhood", "Integer", new Validators.DEFAULT()),
	SKILL_COMPAGNY ("skillCompagny", "Integer", new Validators.DEFAULT()),
	SKILL_SHOPPING ("skillShopping", "Integer", new Validators.DEFAULT()),
	FIRST_NAME ("firstName", "String", new Validators.NON_EMPTY_STRING()),
	NATIONALITY ("nationality", "String", new Validators.NON_NULL()),
	PHONE ("phone", "String", new Validators.PHONE()),
	SKILL_ADMINISTRATIVE ("skillAdministrative", "Integer", new Validators.DEFAULT()),
	SKILL_HOUSEWORK ("skillHousework", "Integer", new Validators.DEFAULT()),
	SKILL_DOITYOURSELF ("skillDoityourself", "Integer", new Validators.DEFAULT()),
	ID ("id", "String", new Validators.DEFAULT()),
	SERVICE_ID ("serviceId", "String", new Validators.DEFAULT()),
	EMAIL ("email", "String", new Validators.DEFAULT()),
	LONGITUDE ("longitude", "Double", new Validators.DEFAULT()),
	;

	private String _id;
	private String _type;
	private ValidatorProvider _validator;

	private CustomerFields(String id, String type, ValidatorProvider validator) {
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

	public static CustomerFields byId(String id) {
		for (CustomerFields value : CustomerFields.values()) {
			if (value.getId().equals(id)) {
				return value;
			}
		}
		return null;
	}

}
