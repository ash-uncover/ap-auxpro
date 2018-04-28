package org.ap.auxpro.storage.auxiliary;

import org.ap.common.storage.IFieldEnum;
import org.ap.common.validators.IValidator;
import org.ap.auxpro.internal.Validators;

/* This class was auto-generated by the JavaWriter */
public enum AuxiliaryFields implements IFieldEnum {

	COUNTRY ("country", "String", Validators.NON_EMPTY_STRING.VALIDATOR),
	LAST_NAME ("lastName", "String", Validators.NON_EMPTY_STRING.VALIDATOR),
	CIVILITY ("civility", "String", Validators.NON_NULL.VALIDATOR),
	CITY ("city", "String", Validators.NON_EMPTY_STRING.VALIDATOR),
	LAST_UPDATE_DATE ("lastUpdateDate", "List<Integer>", Validators.DEFAULT.VALIDATOR),
	POSTAL_CODE ("postalCode", "String", Validators.POSTAL_CODE.VALIDATOR),
	IS_TUTO_SKIPPED ("isTutoSkipped", "Boolean", Validators.BOOLEAN.VALIDATOR),
	DESCRIPTION ("description", "String", Validators.TWEET.VALIDATOR),
	SOCIAL_NUMBER ("socialNumber", "String", Validators.SOCIAL_NUMBER.VALIDATOR),
	ACCOUNT_EXPIRY_DATE ("accountExpiryDate", "List<Integer>", Validators.DEFAULT.VALIDATOR),
	PROFIL_PROGRESSION ("profilProgression", "Integer", Validators.DEFAULT.VALIDATOR),
	SKILL_SHOPPING ("skillShopping", "Integer", Validators.DEFAULT.VALIDATOR),
	NOTIFY_OFFERS_SMS ("notifyOffersSms", "Boolean", Validators.BOOLEAN.VALIDATOR),
	NOTIFY_AUXPROS ("notifyAuxpros", "Boolean", Validators.BOOLEAN.VALIDATOR),
	BIRTH_COUNTRY ("birthCountry", "String", Validators.NON_EMPTY_STRING.VALIDATOR),
	PROFIL_COMPLETED ("profilCompleted", "Boolean", Validators.DEFAULT.VALIDATOR),
	ID ("id", "String", Validators.DEFAULT.VALIDATOR),
	DIPLOMA ("diploma", "String", Validators.NON_EMPTY_ARRAY.VALIDATOR),
	SKILL_DOITYOURSELF ("skillDoityourself", "Integer", Validators.DEFAULT.VALIDATOR),
	LONGITUDE ("longitude", "Double", Validators.DEFAULT.VALIDATOR),
	ADDRESS ("address", "String", Validators.NON_EMPTY_STRING.VALIDATOR),
	SKILL_NURSING ("skillNursing", "Integer", Validators.DEFAULT.VALIDATOR),
	LATTITUDE ("lattitude", "Double", Validators.DEFAULT.VALIDATOR),
	ACCOUNT_TYPE ("accountType", "String", Validators.DEFAULT.VALIDATOR),
	NOTIFY_PARTNERS ("notifyPartners", "Boolean", Validators.BOOLEAN.VALIDATOR),
	BIRTH_CITY ("birthCity", "String", Validators.NON_EMPTY_STRING.VALIDATOR),
	AVATAR ("avatar", "String", Validators.DEFAULT.VALIDATOR),
	CREATION_DATE ("creationDate", "List<Integer>", Validators.DEFAULT.VALIDATOR),
	ARE_SKILL_SET ("areSkillSet", "Boolean", Validators.DEFAULT.VALIDATOR),
	BIRTH_DATE ("birthDate", "List<Integer>", Validators.BEFORE_TODAY.VALIDATOR),
	SKILL_CHILDHOOD ("skillChildhood", "Integer", Validators.DEFAULT.VALIDATOR),
	SKILL_COMPAGNY ("skillCompagny", "Integer", Validators.DEFAULT.VALIDATOR),
	FIRST_NAME ("firstName", "String", Validators.NON_EMPTY_STRING.VALIDATOR),
	SKILL_ANSWERS ("skillAnswers", "Integer", Validators.DEFAULT.VALIDATOR),
	NATIONALITY ("nationality", "String", Validators.NON_NULL.VALIDATOR),
	IS_ENTREPRENEUR ("isEntrepreneur", "String", Validators.NON_NULL.VALIDATOR),
	PHONE ("phone", "String", Validators.PHONE.VALIDATOR),
	SKILL_ADMINISTRATIVE ("skillAdministrative", "Integer", Validators.DEFAULT.VALIDATOR),
	SKILL_HOUSEWORK ("skillHousework", "Integer", Validators.DEFAULT.VALIDATOR),
	NOTIFY_OFFERS_MAIL ("notifyOffersMail", "Boolean", Validators.BOOLEAN.VALIDATOR),
	;

	private String _id;
	private String _type;
	private IValidator _validator;

	private AuxiliaryFields(String id, String type, IValidator validator) {
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

	public static AuxiliaryFields byId(String id) {
		for (AuxiliaryFields value : AuxiliaryFields.values()) {
			if (value.getId().equals(id)) {
				return value;
			}
		}
		return null;
	}

}
