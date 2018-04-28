import validators from 'utils/validators'
import Civility from 'utils/constants/Civility'

/* This class was auto-generated by the JavaScriptWriter */
/* DO NOT MODIFY THIS FILE IT WILL BE REGENERATED IN THE FUTURE */
class CustomerFields {

	static get LAST_NAME() {
		return _LAST_NAME
	}

	static get COUNTRY() {
		return _COUNTRY
	}

	static get CIVILITY() {
		return _CIVILITY
	}

	static get ADDRESS() {
		return _ADDRESS
	}

	static get SKILL_NURSING() {
		return _SKILL_NURSING
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

	static get CREATION_DATE() {
		return _CREATION_DATE
	}

	static get BIRTH_DATE() {
		return _BIRTH_DATE
	}

	static get SKILL_CHILDHOOD() {
		return _SKILL_CHILDHOOD
	}

	static get SKILL_COMPAGNY() {
		return _SKILL_COMPAGNY
	}

	static get SKILL_SHOPPING() {
		return _SKILL_SHOPPING
	}

	static get FIRST_NAME() {
		return _FIRST_NAME
	}

	static get NATIONALITY() {
		return _NATIONALITY
	}

	static get PHONE() {
		return _PHONE
	}

	static get SKILL_ADMINISTRATIVE() {
		return _SKILL_ADMINISTRATIVE
	}

	static get SKILL_HOUSEWORK() {
		return _SKILL_HOUSEWORK
	}

	static get SKILL_DOITYOURSELF() {
		return _SKILL_DOITYOURSELF
	}

	static get ID() {
		return _ID
	}

	static get SERVICE_ID() {
		return _SERVICE_ID
	}

	static get EMAIL() {
		return _EMAIL
	}

	static get LONGITUDE() {
		return _LONGITUDE
	}

	static get VALUES() {
		return [
			_LAST_NAME,
			_COUNTRY,
			_CIVILITY,
			_ADDRESS,
			_SKILL_NURSING,
			_CITY,
			_LATTITUDE,
			_LAST_UPDATE_DATE,
			_POSTAL_CODE,
			_CREATION_DATE,
			_BIRTH_DATE,
			_SKILL_CHILDHOOD,
			_SKILL_COMPAGNY,
			_SKILL_SHOPPING,
			_FIRST_NAME,
			_NATIONALITY,
			_PHONE,
			_SKILL_ADMINISTRATIVE,
			_SKILL_HOUSEWORK,
			_SKILL_DOITYOURSELF,
			_ID,
			_SERVICE_ID,
			_EMAIL,
			_LONGITUDE,
		]
	}

	static get(id) {
		for (let i = 0 ; i < CustomerFields.VALUES.length ; i++) {
			if (CustomerFields.VALUES[i].key === id) {
				return CustomerFields.VALUES[i]
			}
		}
	}

}
let _LAST_NAME = {
	key: 'lastName',
	type: 'string',
	validator: validators.NON_EMPTY_STRING,
}
let _COUNTRY = {
	key: 'country',
	type: 'string',
	validator: validators.NON_EMPTY_STRING,
}
let _CIVILITY = {
	key: 'civility',
	type: 'string',
	values: Civility.VALUES,
	validator: validators.NON_NULL,
}
let _ADDRESS = {
	key: 'address',
	type: 'string',
	validator: validators.NON_EMPTY_STRING,
}
let _SKILL_NURSING = {
	key: 'skillNursing',
	type: 'number',
	validator: validators.DEFAULT,
}
let _CITY = {
	key: 'city',
	type: 'string',
	validator: validators.NON_EMPTY_STRING,
}
let _LATTITUDE = {
	key: 'lattitude',
	type: 'number',
	validator: validators.DEFAULT,
}
let _LAST_UPDATE_DATE = {
	key: 'lastUpdateDate',
	type: 'Date',
	validator: validators.DEFAULT,
}
let _POSTAL_CODE = {
	key: 'postalCode',
	type: 'string',
	validator: validators.POSTAL_CODE,
}
let _CREATION_DATE = {
	key: 'creationDate',
	type: 'Date',
	validator: validators.DEFAULT,
}
let _BIRTH_DATE = {
	key: 'birthDate',
	type: 'Date',
	validator: validators.BEFORE_TODAY,
}
let _SKILL_CHILDHOOD = {
	key: 'skillChildhood',
	type: 'number',
	validator: validators.DEFAULT,
}
let _SKILL_COMPAGNY = {
	key: 'skillCompagny',
	type: 'number',
	validator: validators.DEFAULT,
}
let _SKILL_SHOPPING = {
	key: 'skillShopping',
	type: 'number',
	validator: validators.DEFAULT,
}
let _FIRST_NAME = {
	key: 'firstName',
	type: 'string',
	validator: validators.NON_EMPTY_STRING,
}
let _NATIONALITY = {
	key: 'nationality',
	type: 'string',
	validator: validators.NON_NULL,
}
let _PHONE = {
	key: 'phone',
	type: 'string',
	validator: validators.PHONE,
}
let _SKILL_ADMINISTRATIVE = {
	key: 'skillAdministrative',
	type: 'number',
	validator: validators.DEFAULT,
}
let _SKILL_HOUSEWORK = {
	key: 'skillHousework',
	type: 'number',
	validator: validators.DEFAULT,
}
let _SKILL_DOITYOURSELF = {
	key: 'skillDoityourself',
	type: 'number',
	validator: validators.DEFAULT,
}
let _ID = {
	key: 'id',
	type: 'string',
	validator: validators.DEFAULT,
}
let _SERVICE_ID = {
	key: 'serviceId',
	type: 'string',
	validator: validators.DEFAULT,
}
let _EMAIL = {
	key: 'email',
	type: 'string',
	validator: validators.DEFAULT,
}
let _LONGITUDE = {
	key: 'longitude',
	type: 'number',
	validator: validators.DEFAULT,
}
export default CustomerFields
