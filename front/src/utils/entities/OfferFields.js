import { Validators } from 'ap-react-bootstrap'
import OfferStatusAux from 'utils/constants/OfferStatusAux'
import OfferStatusSad from 'utils/constants/OfferStatusSad'

/* This class was auto-generated by the JavaScriptWriter */
/* DO NOT MODIFY THIS FILE IT WILL BE REGENERATED IN THE FUTURE */
class OfferFields {

	static get AUX_STATUS() {
		return _AUX_STATUS
	}

	static get AUX_STATUS_CHANGED() {
		return _AUX_STATUS_CHANGED
	}

	static get AUXILIARY_ID() {
		return _AUXILIARY_ID
	}

	static get HIDE_TO_AUX() {
		return _HIDE_TO_AUX
	}

	static get CUSTOMER_ID() {
		return _CUSTOMER_ID
	}

	static get SAD_STATUS() {
		return _SAD_STATUS
	}

	static get SAD_STATUS_CHANGED() {
		return _SAD_STATUS_CHANGED
	}

	static get ID() {
		return _ID
	}

	static get SERVICE_ID() {
		return _SERVICE_ID
	}

	static get CREATION_DATE() {
		return _CREATION_DATE
	}

	static get INTERVENTION_ID() {
		return _INTERVENTION_ID
	}

	static get HIDE_TO_SAD() {
		return _HIDE_TO_SAD
	}

	static get VALUES() {
		return [
			_AUX_STATUS,
			_AUX_STATUS_CHANGED,
			_AUXILIARY_ID,
			_HIDE_TO_AUX,
			_CUSTOMER_ID,
			_SAD_STATUS,
			_SAD_STATUS_CHANGED,
			_ID,
			_SERVICE_ID,
			_CREATION_DATE,
			_INTERVENTION_ID,
			_HIDE_TO_SAD,
		]
	}

	static get(id) {
		for (let i = 0 ; i < OfferFields.VALUES.length ; i++) {
			if (OfferFields.VALUES[i].key === id) {
				return OfferFields.VALUES[i]
			}
		}
	}

}
let _AUX_STATUS = {
	key: 'auxStatus',
	type: 'string',
	values: OfferStatusAux.VALUES,
}
let _AUX_STATUS_CHANGED = {
	key: 'auxStatusChanged',
	type: 'number',
}
let _AUXILIARY_ID = {
	key: 'auxiliaryId',
	type: 'string',
}
let _HIDE_TO_AUX = {
	key: 'hideToAux',
	type: 'boolean',
}
let _CUSTOMER_ID = {
	key: 'customerId',
	type: 'string',
}
let _SAD_STATUS = {
	key: 'sadStatus',
	type: 'string',
	values: OfferStatusSad.VALUES,
}
let _SAD_STATUS_CHANGED = {
	key: 'sadStatusChanged',
	type: 'number',
}
let _ID = {
	key: 'id',
	type: 'string',
}
let _SERVICE_ID = {
	key: 'serviceId',
	type: 'string',
}
let _CREATION_DATE = {
	key: 'creationDate',
	type: 'number',
}
let _INTERVENTION_ID = {
	key: 'interventionId',
	type: 'string',
}
let _HIDE_TO_SAD = {
	key: 'hideToSad',
	type: 'boolean',
}
export default OfferFields
