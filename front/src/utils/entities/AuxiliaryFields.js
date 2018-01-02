import { Validators } from 'ap-react-bootstrap'
import Civility from 'utils/constants/Civility'
import Diploma from 'utils/constants/Diploma'
import AccountType from 'utils/constants/AccountType'
import AuxiliaryStatus from 'utils/constants/AuxiliaryStatus'

/* This class was auto-generated by the JavaScriptWriter */
/* DO NOT MODIFY THIS FILE IT WILL BE REGENERATED IN THE FUTURE */
class AuxiliaryFields {

	static get COUNTRY() {
		return _COUNTRY
	}

	static get LAST_NAME() {
		return _LAST_NAME
	}

	static get CIVILITY() {
		return _CIVILITY
	}

	static get CITY() {
		return _CITY
	}

	static get LAST_UPDATE_DATE() {
		return _LAST_UPDATE_DATE
	}

	static get POSTAL_CODE() {
		return _POSTAL_CODE
	}

	static get IS_TUTO_SKIPPED() {
		return _IS_TUTO_SKIPPED
	}

	static get DESCRIPTION() {
		return _DESCRIPTION
	}

	static get SOCIAL_NUMBER() {
		return _SOCIAL_NUMBER
	}

	static get ACCOUNT_EXPIRY_DATE() {
		return _ACCOUNT_EXPIRY_DATE
	}

	static get PROFIL_PROGRESSION() {
		return _PROFIL_PROGRESSION
	}

	static get SKILL_SHOPPING() {
		return _SKILL_SHOPPING
	}

	static get NOTIFY_OFFERS_SMS() {
		return _NOTIFY_OFFERS_SMS
	}

	static get NOTIFY_AUXPROS() {
		return _NOTIFY_AUXPROS
	}

	static get BIRTH_COUNTRY() {
		return _BIRTH_COUNTRY
	}

	static get PROFIL_COMPLETED() {
		return _PROFIL_COMPLETED
	}

	static get ID() {
		return _ID
	}

	static get DIPLOMA() {
		return _DIPLOMA
	}

	static get SKILL_DOITYOURSELF() {
		return _SKILL_DOITYOURSELF
	}

	static get LONGITUDE() {
		return _LONGITUDE
	}

	static get ADDRESS() {
		return _ADDRESS
	}

	static get SKILL_NURSING() {
		return _SKILL_NURSING
	}

	static get LATTITUDE() {
		return _LATTITUDE
	}

	static get ACCOUNT_TYPE() {
		return _ACCOUNT_TYPE
	}

	static get NOTIFY_PARTNERS() {
		return _NOTIFY_PARTNERS
	}

	static get BIRTH_CITY() {
		return _BIRTH_CITY
	}

	static get AVATAR() {
		return _AVATAR
	}

	static get CREATION_DATE() {
		return _CREATION_DATE
	}

	static get ARE_SKILL_SET() {
		return _ARE_SKILL_SET
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

	static get FIRST_NAME() {
		return _FIRST_NAME
	}

	static get SKILL_ANSWERS() {
		return _SKILL_ANSWERS
	}

	static get NATIONALITY() {
		return _NATIONALITY
	}

	static get IS_ENTREPRENEUR() {
		return _IS_ENTREPRENEUR
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

	static get NOTIFY_OFFERS_MAIL() {
		return _NOTIFY_OFFERS_MAIL
	}

	static get VALUES() {
		return [
			_COUNTRY,
			_LAST_NAME,
			_CIVILITY,
			_CITY,
			_LAST_UPDATE_DATE,
			_POSTAL_CODE,
			_IS_TUTO_SKIPPED,
			_DESCRIPTION,
			_SOCIAL_NUMBER,
			_ACCOUNT_EXPIRY_DATE,
			_PROFIL_PROGRESSION,
			_SKILL_SHOPPING,
			_NOTIFY_OFFERS_SMS,
			_NOTIFY_AUXPROS,
			_BIRTH_COUNTRY,
			_PROFIL_COMPLETED,
			_ID,
			_DIPLOMA,
			_SKILL_DOITYOURSELF,
			_LONGITUDE,
			_ADDRESS,
			_SKILL_NURSING,
			_LATTITUDE,
			_ACCOUNT_TYPE,
			_NOTIFY_PARTNERS,
			_BIRTH_CITY,
			_AVATAR,
			_CREATION_DATE,
			_ARE_SKILL_SET,
			_BIRTH_DATE,
			_SKILL_CHILDHOOD,
			_SKILL_COMPAGNY,
			_FIRST_NAME,
			_SKILL_ANSWERS,
			_NATIONALITY,
			_IS_ENTREPRENEUR,
			_PHONE,
			_SKILL_ADMINISTRATIVE,
			_SKILL_HOUSEWORK,
			_NOTIFY_OFFERS_MAIL,
		]
	}

	static get(id) {
		for (let i = 0 ; i < AuxiliaryFields.VALUES.length ; i++) {
			if (AuxiliaryFields.VALUES[i].key === id) {
				return AuxiliaryFields.VALUES[i]
			}
		}
	}

}
let _COUNTRY = {
	key: 'country',
	type: 'string',
	validator: Validators.NonEmptyString,
}
let _LAST_NAME = {
	key: 'lastName',
	type: 'string',
	validator: Validators.NonEmptyString,
}
let _CIVILITY = {
	key: 'civility',
	type: 'string',
	values: Civility.VALUES,
	validator: Validators.NonNull,
}
let _CITY = {
	key: 'city',
	type: 'string',
	validator: Validators.NonEmptyString,
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
let _IS_TUTO_SKIPPED = {
	key: 'isTutoSkipped',
	type: 'boolean',
}
let _DESCRIPTION = {
	key: 'description',
	type: 'string',
	validator: Validators.Tweet,
}
let _SOCIAL_NUMBER = {
	key: 'socialNumber',
	type: 'string',
	validator: Validators.SocialNumberShort,
}
let _ACCOUNT_EXPIRY_DATE = {
	key: 'accountExpiryDate',
	type: 'Date',
}
let _PROFIL_PROGRESSION = {
	key: 'profilProgression',
	type: 'number',
}
let _SKILL_SHOPPING = {
	key: 'skillShopping',
	type: 'number',
}
let _NOTIFY_OFFERS_SMS = {
	key: 'notifyOffersSms',
	type: 'boolean',
}
let _NOTIFY_AUXPROS = {
	key: 'notifyAuxpros',
	type: 'boolean',
}
let _BIRTH_COUNTRY = {
	key: 'birthCountry',
	type: 'string',
	validator: Validators.NonEmptyString,
}
let _PROFIL_COMPLETED = {
	key: 'profilCompleted',
	type: 'boolean',
}
let _ID = {
	key: 'id',
	type: 'string',
}
let _DIPLOMA = {
	key: 'diploma',
	type: 'string',
	values: Diploma.VALUES,
	validator: Validators.NonEmptyArray,
}
let _SKILL_DOITYOURSELF = {
	key: 'skillDoityourself',
	type: 'number',
}
let _LONGITUDE = {
	key: 'longitude',
	type: 'number',
}
let _ADDRESS = {
	key: 'address',
	type: 'string',
	validator: Validators.NonEmptyString,
}
let _SKILL_NURSING = {
	key: 'skillNursing',
	type: 'number',
}
let _LATTITUDE = {
	key: 'lattitude',
	type: 'number',
}
let _ACCOUNT_TYPE = {
	key: 'accountType',
	type: 'string',
	values: AccountType.VALUES,
}
let _NOTIFY_PARTNERS = {
	key: 'notifyPartners',
	type: 'boolean',
}
let _BIRTH_CITY = {
	key: 'birthCity',
	type: 'string',
	validator: Validators.NonEmptyString,
}
let _AVATAR = {
	key: 'avatar',
	type: 'string',
}
let _CREATION_DATE = {
	key: 'creationDate',
	type: 'Date',
}
let _ARE_SKILL_SET = {
	key: 'areSkillSet',
	type: 'boolean',
}
let _BIRTH_DATE = {
	key: 'birthDate',
	type: 'Date',
	validator: Validators.BeforeToday,
}
let _SKILL_CHILDHOOD = {
	key: 'skillChildhood',
	type: 'number',
}
let _SKILL_COMPAGNY = {
	key: 'skillCompagny',
	type: 'number',
}
let _FIRST_NAME = {
	key: 'firstName',
	type: 'string',
	validator: Validators.NonEmptyString,
}
let _SKILL_ANSWERS = {
	key: 'skillAnswers',
	type: 'number',
}
let _NATIONALITY = {
	key: 'nationality',
	type: 'string',
	validator: Validators.NonNull,
}
let _IS_ENTREPRENEUR = {
	key: 'isEntrepreneur',
	type: 'string',
	values: AuxiliaryStatus.VALUES,
	validator: Validators.NonNull,
}
let _PHONE = {
	key: 'phone',
	type: 'string',
	validator: Validators.Phone,
}
let _SKILL_ADMINISTRATIVE = {
	key: 'skillAdministrative',
	type: 'number',
}
let _SKILL_HOUSEWORK = {
	key: 'skillHousework',
	type: 'number',
}
let _NOTIFY_OFFERS_MAIL = {
	key: 'notifyOffersMail',
	type: 'boolean',
}
export default AuxiliaryFields
