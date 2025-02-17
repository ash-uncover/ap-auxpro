package org.ap.auxpro.storage.promotioncode;

import org.ap.common.storage.IFieldEnum;
import org.ap.common.validators.IValidator;
import org.ap.auxpro.internal.Validators;

/* This class was auto-generated by the JavaWriter */
public enum PromotioncodeFields implements IFieldEnum {

	LAST_UPDATE_DATE ("lastUpdateDate", "List<Integer>", Validators.DEFAULT.VALIDATOR),
	VALIDITY_DATE ("validityDate", "List<Integer>", Validators.DEFAULT.VALIDATOR),
	NAME ("name", "String", Validators.DEFAULT.VALIDATOR),
	ID ("id", "String", Validators.DEFAULT.VALIDATOR),
	CREATION_DATE ("creationDate", "List<Integer>", Validators.DEFAULT.VALIDATOR),
	;

	private String _id;
	private String _type;
	private IValidator _validator;

	private PromotioncodeFields(String id, String type, IValidator validator) {
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

	public static PromotioncodeFields byId(String id) {
		for (PromotioncodeFields value : PromotioncodeFields.values()) {
			if (value.getId().equals(id)) {
				return value;
			}
		}
		return null;
	}

}
