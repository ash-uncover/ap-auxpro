package org.ap.auxpro.storage.offer;

import org.ap.common.storage.IFieldEnum;
import org.ap.common.validators.IValidator;
import org.ap.auxpro.internal.Validators;

/* This class was auto-generated by the JavaWriter */
public enum OfferFields implements IFieldEnum {

	AUX_STATUS ("auxStatus", "String", Validators.DEFAULT.VALIDATOR),
	AUX_STATUS_CHANGED ("auxStatusChanged", "List<Integer>", Validators.DEFAULT.VALIDATOR),
	AUXILIARY_ID ("auxiliaryId", "String", Validators.DEFAULT.VALIDATOR),
	HIDE_TO_AUX ("hideToAux", "Boolean", Validators.DEFAULT.VALIDATOR),
	LAST_UPDATE_DATE ("lastUpdateDate", "List<Integer>", Validators.DEFAULT.VALIDATOR),
	SAD_STATUS_CHANGED ("sadStatusChanged", "List<Integer>", Validators.DEFAULT.VALIDATOR),
	CREATION_DATE ("creationDate", "List<Integer>", Validators.DEFAULT.VALIDATOR),
	CUSTOMER_ID ("customerId", "String", Validators.DEFAULT.VALIDATOR),
	SAD_STATUS ("sadStatus", "String", Validators.DEFAULT.VALIDATOR),
	ID ("id", "String", Validators.DEFAULT.VALIDATOR),
	SERVICE_ID ("serviceId", "String", Validators.DEFAULT.VALIDATOR),
	INTERVENTION_ID ("interventionId", "String", Validators.DEFAULT.VALIDATOR),
	HIDE_TO_SAD ("hideToSad", "Boolean", Validators.DEFAULT.VALIDATOR),
	;

	private String _id;
	private String _type;
	private IValidator _validator;

	private OfferFields(String id, String type, IValidator validator) {
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

	public static OfferFields byId(String id) {
		for (OfferFields value : OfferFields.values()) {
			if (value.getId().equals(id)) {
				return value;
			}
		}
		return null;
	}

}
