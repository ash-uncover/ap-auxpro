import ValidatorTypes from 'ap-validators'

/* This class was auto-generated by the JavaScriptWriter */
/* DO NOT MODIFY THIS FILE IT WILL BE REGENERATED IN THE FUTURE */
class Validators {

	static get DEFAULT() {
		return _DEFAULT
	}

	static get PASSWORD() {
		return _PASSWORD
	}

	static get EMAIL() {
		return _EMAIL
	}

	static get NON_NULL() {
		return _NON_NULL
	}

	static get NON_EMPTY_STRING() {
		return _NON_EMPTY_STRING
	}

	static get NON_EMPTY_ARRAY() {
		return _NON_EMPTY_ARRAY
	}

	static get BOOLEAN() {
		return _BOOLEAN
	}

	static get PHONE() {
		return _PHONE
	}

	static get SOCIAL_NUMBER() {
		return _SOCIAL_NUMBER
	}

	static get POSTAL_CODE() {
		return _POSTAL_CODE
	}

	static get POSITIVE_INTEGER() {
		return _POSITIVE_INTEGER
	}

	static get ID_CARD_NUMBER() {
		return _ID_CARD_NUMBER
	}

	static get SIRET_NUMBER() {
		return _SIRET_NUMBER
	}

	static get TWEET() {
		return _TWEET
	}

	static get BEFORE_TODAY() {
		return _BEFORE_TODAY
	}

	static get BEFORE_TODAY_OR_TODAY() {
		return _BEFORE_TODAY_OR_TODAY
	}

	static get AFTER_TODAY() {
		return _AFTER_TODAY
	}

	static get AFTER_TODAY_OR_TODAY() {
		return _AFTER_TODAY_OR_TODAY
	}

}
const _DEFAULT = {
	ERRORS: {},
	VALIDATOR: ValidatorTypes.any
}

const _PASSWORD = {
	ERRORS: {
		MUST_BE_A_STRING: 'MUST_BE_A_STRING',
		CANNOT_BE_NULL: 'CANNOT_BE_NULL',
		MIN_LENGTH_EXCEEDED: 'MIN_LENGTH_EXCEEDED',
		CONTAIN_FORBIDDEN_CHARS: 'CONTAIN_FORBIDDEN_CHARS',
		MUST_CONTAIN_LOWERCASE: 'MUST_CONTAIN_LOWERCASE',
		MUST_CONTAIN_UPPERCASE: 'MUST_CONTAIN_UPPERCASE',
		MUST_CONTAIN_SPECIAL: 'MUST_CONTAIN_SPECIAL',
	},
	VALIDATOR: ValidatorTypes.string.
		isRequired.
		hasMinLength(8).
		matchesNot(/\W/, 'CONTAIN_FORBIDDEN_CHARS').
		matches(/[a-z]/, 'MUST_CONTAIN_LOWERCASE').
		matches(/[A-Z]/, 'MUST_CONTAIN_UPPERCASE').
		matches(/[0-9_]/, 'MUST_CONTAIN_SPECIAL')
}

const _EMAIL = {
	ERRORS: {
		MUST_BE_A_STRING: 'MUST_BE_A_STRING',
		CANNOT_BE_NULL: 'CANNOT_BE_NULL',
		INVALID_EMAIL: 'INVALID_EMAIL',
	},
	VALIDATOR: ValidatorTypes.string.
		isRequired.
		matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'INVALID_EMAIL')
}

const _NON_NULL = {
	ERRORS: {
		CANNOT_BE_NULL: 'CANNOT_BE_NULL',
	},
	VALIDATOR: ValidatorTypes.any.
		isRequired
}

const _NON_EMPTY_STRING = {
	ERRORS: {
		MUST_BE_A_STRING: 'MUST_BE_A_STRING',
		CANNOT_BE_NULL: 'CANNOT_BE_NULL',
		MIN_LENGTH_EXCEEDED: 'MIN_LENGTH_EXCEEDED',
	},
	VALIDATOR: ValidatorTypes.string.
		isRequired.
		hasMinLength(1)
}

const _NON_EMPTY_ARRAY = {
	ERRORS: {
		MUST_BE_AN_ARRAY: 'MUST_BE_AN_ARRAY',
		CANNOT_BE_NULL: 'CANNOT_BE_NULL',
		MIN_LENGTH_EXCEEDED: 'MIN_LENGTH_EXCEEDED',
	},
	VALIDATOR: ValidatorTypes.array.
		isRequired.
		hasMinLength(1)
}

const _BOOLEAN = {
	ERRORS: {
		MUST_BE_A_BOOLEAN: 'MUST_BE_A_BOOLEAN',
	},
	VALIDATOR: ValidatorTypes.boolean
}

const _PHONE = {
	ERRORS: {
		MUST_BE_A_STRING: 'MUST_BE_A_STRING',
		CANNOT_BE_NULL: 'CANNOT_BE_NULL',
		MAX_LENGTH_EXCEEDED: 'MAX_LENGTH_EXCEEDED',
		INVALID_PHONE: 'INVALID_PHONE',
	},
	VALIDATOR: ValidatorTypes.string.
		isRequired.
		hasMaxLength(10).
		matches(/^0[1-9]([0-9]){8}$/, 'INVALID_PHONE')
}

const _SOCIAL_NUMBER = {
	ERRORS: {
		MUST_BE_A_STRING: 'MUST_BE_A_STRING',
		CANNOT_BE_NULL: 'CANNOT_BE_NULL',
		MAX_LENGTH_EXCEEDED: 'MAX_LENGTH_EXCEEDED',
		INVALID_SOCIAL_NUMBER: 'INVALID_SOCIAL_NUMBER',
	},
	VALIDATOR: ValidatorTypes.string.
		isRequired.
		hasMaxLength(7).
		matches(/^[1-2][0-9]{6}$/, 'INVALID_SOCIAL_NUMBER')
}

const _POSTAL_CODE = {
	ERRORS: {
		MUST_BE_A_STRING: 'MUST_BE_A_STRING',
		CANNOT_BE_NULL: 'CANNOT_BE_NULL',
		MAX_LENGTH_EXCEEDED: 'MAX_LENGTH_EXCEEDED',
		INVALID_POSTAL_CODE: 'INVALID_POSTAL_CODE',
	},
	VALIDATOR: ValidatorTypes.string.
		isRequired.
		hasMaxLength(5).
		matches(/^[0-9]{5}$/, 'INVALID_POSTAL_CODE')
}

const _POSITIVE_INTEGER = {
	ERRORS: {
		MUST_BE_A_NUMBER: 'MUST_BE_A_NUMBER',
		CANNOT_BE_NULL: 'CANNOT_BE_NULL',
		MIN_VALUE_EXCEEDED: 'MIN_VALUE_EXCEEDED',
	},
	VALIDATOR: ValidatorTypes.number.
		isRequired.
		hasMinValue(1)
}

const _ID_CARD_NUMBER = {
	ERRORS: {
		MUST_BE_A_STRING: 'MUST_BE_A_STRING',
		CANNOT_BE_NULL: 'CANNOT_BE_NULL',
		MAX_LENGTH_EXCEEDED: 'MAX_LENGTH_EXCEEDED',
		INVALID_IDCARD_NUMBER: 'INVALID_IDCARD_NUMBER',
	},
	VALIDATOR: ValidatorTypes.string.
		isRequired.
		hasMaxLength(12).
		matches(/^[0-9]{12}$/, 'INVALID_IDCARD_NUMBER')
}

const _SIRET_NUMBER = {
	ERRORS: {
		MUST_BE_A_STRING: 'MUST_BE_A_STRING',
		CANNOT_BE_NULL: 'CANNOT_BE_NULL',
		MAX_LENGTH_EXCEEDED: 'MAX_LENGTH_EXCEEDED',
		INVALID_SIRET_NUMBER: 'INVALID_SIRET_NUMBER',
	},
	VALIDATOR: ValidatorTypes.string.
		isRequired.
		hasMaxLength(14).
		matches(/^[0-9]{14}$/, 'INVALID_SIRET_NUMBER')
}

const _TWEET = {
	ERRORS: {
		MUST_BE_A_STRING: 'MUST_BE_A_STRING',
		CANNOT_BE_NULL: 'CANNOT_BE_NULL',
		MIN_LENGTH_EXCEEDED: 'MIN_LENGTH_EXCEEDED',
		MAX_LENGTH_EXCEEDED: 'MAX_LENGTH_EXCEEDED',
	},
	VALIDATOR: ValidatorTypes.string.
		isRequired.
		hasMinLength(1).
		hasMaxLength(140)
}

const _BEFORE_TODAY = {
	ERRORS: {
		MUST_BE_A_DATE: 'MUST_BE_A_DATE',
		CANNOT_BE_NULL: 'CANNOT_BE_NULL',
		MAX_DATE_EXCEEDED: 'MAX_DATE_EXCEEDED',
	},
	VALIDATOR: ValidatorTypes.date.
		isRequired.
		isBeforeNow
}

const _BEFORE_TODAY_OR_TODAY = {
	ERRORS: {
		MUST_BE_A_DATE: 'MUST_BE_A_DATE',
		CANNOT_BE_NULL: 'CANNOT_BE_NULL',
		MAX_DATE_EXCEEDED: 'MAX_DATE_EXCEEDED',
	},
	VALIDATOR: ValidatorTypes.date.
		isRequired.
		isBeforeNow.
		isBeforeInclusive
}

const _AFTER_TODAY = {
	ERRORS: {
		MUST_BE_A_DATE: 'MUST_BE_A_DATE',
		CANNOT_BE_NULL: 'CANNOT_BE_NULL',
		MIN_DATE_EXCEEDED: 'MIN_DATE_EXCEEDED',
	},
	VALIDATOR: ValidatorTypes.date.
		isRequired.
		isAfterNow
}

const _AFTER_TODAY_OR_TODAY = {
	ERRORS: {
		MUST_BE_A_DATE: 'MUST_BE_A_DATE',
		CANNOT_BE_NULL: 'CANNOT_BE_NULL',
		MIN_DATE_EXCEEDED: 'MIN_DATE_EXCEEDED',
	},
	VALIDATOR: ValidatorTypes.date.
		isRequired.
		isAfterNow.
		isAfterInclusive
}

export default Validators
