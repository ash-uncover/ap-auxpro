package org.ap.auxpro.storage;

import org.ap.common.validators.EValidators;
import org.ap.common.validators.IValidator;

/* This class was auto-generated by the JavaWriter */
public enum GeozoneFields {

	AUXILIARY_ID ("auxiliaryId", "String", EValidators.DEFAULT.getValidator()),
	ADDRESS ("address", "String", EValidators.NON_EMPTY_STRING.getValidator()),
	LATTITUDE ("lattitude", "Double", EValidators.NON_NULL.getValidator()),
	CITY ("city", "String", EValidators.NON_EMPTY_STRING.getValidator()),
	LAST_UPDATE_DATE ("lastUpdateDate", "List<Integer>", EValidators.DEFAULT.getValidator()),
	POSTAL_CODE ("postalCode", "String", EValidators.POSTAL_CODE.getValidator()),
	ID ("id", "String", EValidators.DEFAULT.getValidator()),
	TYPE ("type", "String", EValidators.NON_NULL.getValidator()),
	RADIUS ("radius", "Integer", EValidators.POSITIVE_INTEGER.getValidator()),
	CREATION_DATE ("creationDate", "List<Integer>", EValidators.DEFAULT.getValidator()),
	LONGITUDE ("longitude", "Double", EValidators.NON_NULL.getValidator()),
	;

	private String _id;
	private String _type;
	private IValidator<?> _validator;

	private  GeozoneFields(String id, String type, IValidator<?> validator) {
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

	public IValidator<?> getValidator() {
		return _validator;
	}

	public static GeozoneFields byId(String id) {
		for (GeozoneFields value : GeozoneFields.values()) {
			if (value.getId().equals(id)) {
				return value;
			}
		}
		return null;
	}

}
