import { Validators } from 'ap-react-bootstrap'
import AccountType from 'utils/constants/AccountType'
import SocFunction from 'utils/constants/SocFunction'

/* This class was auto-generated by the JavaScriptWriter */
/* DO NOT MODIFY THIS FILE IT WILL BE REGENERATED IN THE FUTURE */
class ServiceFields {

	static get COUNTRY() {
		return _COUNTRY
	}

	static get ADDRESS() {
		return _ADDRESS
	}

	static get CITY() {
		return _CITY
	}

	static get LATTITUDE() {
		return _LATTITUDE
	}

	static get LAST_UPDATE_DATE() {
		return _LAST_UPDATE_DATE
	}

	static get POSTAL_CODE() {
		return _POSTAL_CODE
	}

	static get ACCOUNT_TYPE() {
		return _ACCOUNT_TYPE
	}

	static get IS_TUTO_SKIPPED() {
		return _IS_TUTO_SKIPPED
	}

	static get NOTIFY_PARTNERS() {
		return _NOTIFY_PARTNERS
	}

	static get AVATAR() {
		return _AVATAR
	}

	static get ACCOUNT_EXPIRY_DATE() {
		return _ACCOUNT_EXPIRY_DATE
	}

	static get CREATION_DATE() {
		return _CREATION_DATE
	}

	static get SIRET() {
		return _SIRET
	}

	static get NOTIFY_AUXPROS() {
		return _NOTIFY_AUXPROS
	}

	static get PHONE() {
		return _PHONE
	}

	static get FUNCTION() {
		return _FUNCTION
	}

	static get PROFIL_COMPLETED() {
		return _PROFIL_COMPLETED
	}

	static get ID() {
		return _ID
	}

	static get SOCIAL_REASON() {
		return _SOCIAL_REASON
	}

	static get LONGITUDE() {
		return _LONGITUDE
	}

	static get VALUES() {
		return [
			_COUNTRY,
			_ADDRESS,
			_CITY,
			_LATTITUDE,
			_LAST_UPDATE_DATE,
			_POSTAL_CODE,
			_ACCOUNT_TYPE,
			_IS_TUTO_SKIPPED,
			_NOTIFY_PARTNERS,
			_AVATAR,
			_ACCOUNT_EXPIRY_DATE,
			_CREATION_DATE,
			_SIRET,
			_NOTIFY_AUXPROS,
			_PHONE,
			_FUNCTION,
			_PROFIL_COMPLETED,
			_ID,
			_SOCIAL_REASON,
			_LONGITUDE,
		]
	}

	static get(id) {
		for (let i = 0 ; i < ServiceFields.VALUES.length ; i++) {
			if (ServiceFields.VALUES[i].key === id) {
				return ServiceFields.VALUES[i]
			}
		}
	}

}
let _COUNTRY = {
	key: 'country',
	type: 'string',
	validator: Validators.NonEmptyString,
}
let _ADDRESS = {
	key: 'address',
	type: 'string',
	validator: Validators.NonEmptyString,
}
let _CITY = {
	key: 'city',
	type: 'string',
	validator: Validators.NonEmptyString,
}
let _LATTITUDE = {
	key: 'lattitude',
	type: 'number',
}
let _LAST_UPDATE_DATE = {
	key: 'lastUpdateDate',
	type: 'Date',
}
let _POSTAL_CODE = {
	key: 'postalCode',
	type: 'string',
	validator: Validators.PostalCode,
}
let _ACCOUNT_TYPE = {
	key: 'accountType',
	type: 'string',
	values: AccountType.VALUES,
}
let _IS_TUTO_SKIPPED = {
	key: 'isTutoSkipped',
	type: 'boolean',
}
let _NOTIFY_PARTNERS = {
	key: 'notifyPartners',
	type: 'boolean',
}
let _AVATAR = {
	key: 'avatar',
	type: 'string',
}
let _ACCOUNT_EXPIRY_DATE = {
	key: 'accountExpiryDate',
	type: 'number',
}
let _CREATION_DATE = {
	key: 'creationDate',
	type: 'Date',
}
let _SIRET = {
	key: 'siret',
	type: 'string',
	validator: Validators.SiretNumber,
}
let _NOTIFY_AUXPROS = {
	key: 'notifyAuxpros',
	type: 'boolean',
}
let _PHONE = {
	key: 'phone',
	type: 'string',
	validator: Validators.Phone,
}
let _FUNCTION = {
	key: 'function',
	type: 'string',
	values: SocFunction.VALUES,
	validator: Validators.NonNull,
}
let _PROFIL_COMPLETED = {
	key: 'profilCompleted',
	type: 'boolean',
}
let _ID = {
	key: 'id',
	type: 'string',
}
let _SOCIAL_REASON = {
	key: 'socialReason',
	type: 'string',
	validator: Validators.NonEmptyString,
}
let _LONGITUDE = {
	key: 'longitude',
	type: 'number',
}
export default ServiceFields
