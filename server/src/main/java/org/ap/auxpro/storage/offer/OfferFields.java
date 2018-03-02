package org.ap.auxpro.storage.offer;

import org.ap.common.validators.EValidators;
import org.ap.common.validators.IValidator;

/* This class was auto-generated by the JavaWriter */
public enum OfferFields {

	AUX_STATUS ("auxStatus", "String", EValidators.DEFAULT.getValidator()),
	AUX_STATUS_CHANGED ("auxStatusChanged", "List<Integer>", EValidators.DEFAULT.getValidator()),
	AUXILIARY_ID ("auxiliaryId", "String", EValidators.DEFAULT.getValidator()),
	HIDE_TO_AUX ("hideToAux", "Boolean", EValidators.DEFAULT.getValidator()),
	LAST_UPDATE_DATE ("lastUpdateDate", "List<Integer>", EValidators.DEFAULT.getValidator()),
	SAD_STATUS_CHANGED ("sadStatusChanged", "List<Integer>", EValidators.DEFAULT.getValidator()),
	CREATION_DATE ("creationDate", "List<Integer>", EValidators.DEFAULT.getValidator()),
	CUSTOMER_ID ("customerId", "String", EValidators.DEFAULT.getValidator()),
	SAD_STATUS ("sadStatus", "String", EValidators.DEFAULT.getValidator()),
	ID ("id", "String", EValidators.DEFAULT.getValidator()),
	SERVICE_ID ("serviceId", "String", EValidators.DEFAULT.getValidator()),
	INTERVENTION_ID ("interventionId", "String", EValidators.DEFAULT.getValidator()),
	HIDE_TO_SAD ("hideToSad", "Boolean", EValidators.DEFAULT.getValidator()),
	;

	private String _id;
	private String _type;
	private IValidator<?> _validator;

	private OfferFields(String id, String type, IValidator<?> validator) {
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

	public static OfferFields byId(String id) {
		for (OfferFields value : OfferFields.values()) {
			if (value.getId().equals(id)) {
				return value;
			}
		}
		return null;
	}

}
