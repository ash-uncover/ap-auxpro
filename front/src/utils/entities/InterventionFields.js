import validators from 'utils/validators'
import AuxiliaryStatus from 'utils/constants/AuxiliaryStatus'
import InterventionStatus from 'utils/constants/InterventionStatus'
import InterventionRecurencePeriod from 'utils/constants/InterventionRecurencePeriod'

/* This class was auto-generated by the JavaScriptWriter */
/* DO NOT MODIFY THIS FILE IT WILL BE REGENERATED IN THE FUTURE */
class InterventionFields {

	static get AUXILIARY_ID() {
		return _AUXILIARY_ID
	}

	static get END_DATE() {
		return _END_DATE
	}

	static get SKILL_CHILDREN_GAME() {
		return _SKILL_CHILDREN_GAME
	}

	static get SKILL_HOUSE() {
		return _SKILL_HOUSE
	}

	static get LAST_UPDATE_DATE() {
		return _LAST_UPDATE_DATE
	}

	static get SAD_STATUS_CHANGED() {
		return _SAD_STATUS_CHANGED
	}

	static get SKILL_BEAUTY() {
		return _SKILL_BEAUTY
	}

	static get MISSION_TYPE() {
		return _MISSION_TYPE
	}

	static get SKILL_HANDICAP() {
		return _SKILL_HANDICAP
	}

	static get SKILL_ILLNESS() {
		return _SKILL_ILLNESS
	}

	static get CUSTOMER_ID() {
		return _CUSTOMER_ID
	}

	static get SKILL_CHILDREN_SCHOOL() {
		return _SKILL_CHILDREN_SCHOOL
	}

	static get SAD_STATUS() {
		return _SAD_STATUS
	}

	static get START_TIME() {
		return _START_TIME
	}

	static get ID() {
		return _ID
	}

	static get SERVICE_ID() {
		return _SERVICE_ID
	}

	static get SKILL_CHILDREN_KEEP() {
		return _SKILL_CHILDREN_KEEP
	}

	static get SKILL_OLD_CARE() {
		return _SKILL_OLD_CARE
	}

	static get PERIOD() {
		return _PERIOD
	}

	static get SKILL_NURSING() {
		return _SKILL_NURSING
	}

	static get SKILL_CHILDREN_CARE() {
		return _SKILL_CHILDREN_CARE
	}

	static get SKILL_FOOD() {
		return _SKILL_FOOD
	}

	static get CREATION_DATE() {
		return _CREATION_DATE
	}

	static get SKILL_COMPANY() {
		return _SKILL_COMPANY
	}

	static get SKILL_TRANSPORT() {
		return _SKILL_TRANSPORT
	}

	static get SKILL_CLOTHES() {
		return _SKILL_CLOTHES
	}

	static get DAYS() {
		return _DAYS
	}

	static get END_TIME() {
		return _END_TIME
	}

	static get SKILL_PET() {
		return _SKILL_PET
	}

	static get HIDE_TO_SAD() {
		return _HIDE_TO_SAD
	}

	static get START_DATE() {
		return _START_DATE
	}

	static get VALUES() {
		return [
			_AUXILIARY_ID,
			_END_DATE,
			_SKILL_CHILDREN_GAME,
			_SKILL_HOUSE,
			_LAST_UPDATE_DATE,
			_SAD_STATUS_CHANGED,
			_SKILL_BEAUTY,
			_MISSION_TYPE,
			_SKILL_HANDICAP,
			_SKILL_ILLNESS,
			_CUSTOMER_ID,
			_SKILL_CHILDREN_SCHOOL,
			_SAD_STATUS,
			_START_TIME,
			_ID,
			_SERVICE_ID,
			_SKILL_CHILDREN_KEEP,
			_SKILL_OLD_CARE,
			_PERIOD,
			_SKILL_NURSING,
			_SKILL_CHILDREN_CARE,
			_SKILL_FOOD,
			_CREATION_DATE,
			_SKILL_COMPANY,
			_SKILL_TRANSPORT,
			_SKILL_CLOTHES,
			_DAYS,
			_END_TIME,
			_SKILL_PET,
			_HIDE_TO_SAD,
			_START_DATE,
		]
	}

	static get(id) {
		for (let i = 0 ; i < InterventionFields.VALUES.length ; i++) {
			if (InterventionFields.VALUES[i].key === id) {
				return InterventionFields.VALUES[i]
			}
		}
	}

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
let _SKILL_CHILDREN_GAME = {
	key: 'skillChildrenGame',
	type: 'number',
	validator: validators.DEFAULT,
}
let _SKILL_HOUSE = {
	key: 'skillHouse',
	type: 'number',
	validator: validators.DEFAULT,
}
let _LAST_UPDATE_DATE = {
	key: 'lastUpdateDate',
	type: 'Date',
	validator: validators.DEFAULT,
}
let _SAD_STATUS_CHANGED = {
	key: 'sadStatusChanged',
	type: 'Date',
	validator: validators.DEFAULT,
}
let _SKILL_BEAUTY = {
	key: 'skillBeauty',
	type: 'number',
	validator: validators.DEFAULT,
}
let _MISSION_TYPE = {
	key: 'missionType',
	type: 'string',
	values: AuxiliaryStatus.VALUES,
	validator: validators.NON_NULL,
}
let _SKILL_HANDICAP = {
	key: 'skillHandicap',
	type: 'number',
	validator: validators.DEFAULT,
}
let _SKILL_ILLNESS = {
	key: 'skillIllness',
	type: 'number',
	validator: validators.DEFAULT,
}
let _CUSTOMER_ID = {
	key: 'customerId',
	type: 'string',
	validator: validators.DEFAULT,
}
let _SKILL_CHILDREN_SCHOOL = {
	key: 'skillChildrenSchool',
	type: 'number',
	validator: validators.DEFAULT,
}
let _SAD_STATUS = {
	key: 'sadStatus',
	type: 'string',
	values: InterventionStatus.VALUES,
	validator: validators.DEFAULT,
}
let _START_TIME = {
	key: 'startTime',
	type: 'number',
	validator: validators.TIME_ARRAY,
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
let _SKILL_CHILDREN_KEEP = {
	key: 'skillChildrenKeep',
	type: 'number',
	validator: validators.DEFAULT,
}
let _SKILL_OLD_CARE = {
	key: 'skillOldCare',
	type: 'number',
	validator: validators.DEFAULT,
}
let _PERIOD = {
	key: 'period',
	type: 'string',
	values: InterventionRecurencePeriod.VALUES,
	validator: validators.NON_NULL,
}
let _SKILL_NURSING = {
	key: 'skillNursing',
	type: 'number',
	validator: validators.DEFAULT,
}
let _SKILL_CHILDREN_CARE = {
	key: 'skillChildrenCare',
	type: 'number',
	validator: validators.DEFAULT,
}
let _SKILL_FOOD = {
	key: 'skillFood',
	type: 'number',
	validator: validators.DEFAULT,
}
let _CREATION_DATE = {
	key: 'creationDate',
	type: 'Date',
	validator: validators.DEFAULT,
}
let _SKILL_COMPANY = {
	key: 'skillCompany',
	type: 'number',
	validator: validators.DEFAULT,
}
let _SKILL_TRANSPORT = {
	key: 'skillTransport',
	type: 'number',
	validator: validators.DEFAULT,
}
let _SKILL_CLOTHES = {
	key: 'skillClothes',
	type: 'number',
	validator: validators.DEFAULT,
}
let _DAYS = {
	key: 'days',
	type: 'string',
	validator: validators.NON_EMPTY_ARRAY,
}
let _END_TIME = {
	key: 'endTime',
	type: 'number',
	validator: validators.TIME_ARRAY,
}
let _SKILL_PET = {
	key: 'skillPet',
	type: 'number',
	validator: validators.DEFAULT,
}
let _HIDE_TO_SAD = {
	key: 'hideToSad',
	type: 'boolean',
	validator: validators.DEFAULT,
}
let _START_DATE = {
	key: 'startDate',
	type: 'Date',
	validator: validators.NON_NULL,
}
export default InterventionFields
