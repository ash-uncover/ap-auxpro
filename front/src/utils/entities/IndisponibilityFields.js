import validators from 'utils/validators'
import IndisponibilityRecurencePeriod from 'utils/constants/IndisponibilityRecurencePeriod'

/* This class was auto-generated by the JavaScriptWriter */
/* DO NOT MODIFY THIS FILE IT WILL BE REGENERATED IN THE FUTURE */
class IndisponibilityFields {

  static get PERIOD() {
    return _PERIOD
  }

  static get AUXILIARY_ID() {
    return _AUXILIARY_ID
  }

  static get END_DATE() {
    return _END_DATE
  }

  static get LAST_UPDATE_DATE() {
    return _LAST_UPDATE_DATE
  }

  static get DAYS() {
    return _DAYS
  }

  static get START_TIME() {
    return _START_TIME
  }

  static get END_TIME() {
    return _END_TIME
  }

  static get ID() {
    return _ID
  }

  static get CREATION_DATE() {
    return _CREATION_DATE
  }

  static get START_DATE() {
    return _START_DATE
  }

  static get VALUES() {
    return [
    	_PERIOD,
    	_AUXILIARY_ID,
    	_END_DATE,
    	_LAST_UPDATE_DATE,
    	_DAYS,
    	_START_TIME,
    	_END_TIME,
    	_ID,
    	_CREATION_DATE,
    	_START_DATE,
    ]
  }

  static get(id) {
    for (let i = 0 ; i < IndisponibilityFields.VALUES.length ; i++) {
    	if (IndisponibilityFields.VALUES[i].key === id) {
    		return IndisponibilityFields.VALUES[i]
    	}
    }
  }

}
let _PERIOD = {
	key: 'period',
	type: 'string',
	values: IndisponibilityRecurencePeriod.VALUES,
	validator: validators.NON_NULL,
}
let _AUXILIARY_ID = {
	key: 'auxiliaryId',
	type: 'string',
	validator: validators.DEFAULT,
}
let _END_DATE = {
	key: 'endDate',
	type: 'Date',
	validator: validators.NON_NULL,
}
let _LAST_UPDATE_DATE = {
	key: 'lastUpdateDate',
	type: 'Date',
	validator: validators.DEFAULT,
}
let _DAYS = {
	key: 'days',
	type: 'string',
	validator: validators.NON_EMPTY_ARRAY,
}
let _START_TIME = {
	key: 'startTime',
	type: 'number',
	validator: validators.TIME_ARRAY,
}
let _END_TIME = {
	key: 'endTime',
	type: 'number',
	validator: validators.TIME_ARRAY,
}
let _ID = {
	key: 'id',
	type: 'string',
	validator: validators.DEFAULT,
}
let _CREATION_DATE = {
	key: 'creationDate',
	type: 'Date',
	validator: validators.DEFAULT,
}
let _START_DATE = {
	key: 'startDate',
	type: 'Date',
	validator: validators.NON_NULL,
}
export default IndisponibilityFields
