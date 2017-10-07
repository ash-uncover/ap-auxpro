import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import IndisponibilityHelper from 'helpers/IndisponibilityHelper'
import { BaseData, MomentHelper } from 'ap-react-bootstrap'

import RecurencePeriod from 'utils/constants/RecurencePeriod'

import IndisponibilityFields from 'utils/entities/IndisponibilityFields'

import IndisponibilityUtils from 'utils-lib/entities/IndisponibilityUtils'
import RecurencePeriodUtils from 'utils-lib/entities/RecurencePeriodUtils'

import moment from 'moment'

class AuxiliaryIndisponibilityEditData extends BaseData {

	constructor() {
		super(...arguments)

		this.MODES = {
			CREATE: 'CREATE',
			EDIT: 'EDIT'
		}

		this.FIELDS_FORM1 = [
			Object.assign(
				{ defaultValue: 'ONE', form: 'select' }, 
				IndisponibilityFields.PERIOD, 
				{ values: RecurencePeriod.VALUES.map(this.getRecurence) }
			),
			Object.assign(
				{ defaultValue: MomentHelper.toLocalDate(moment()), form: 'date' }, 
				IndisponibilityFields.START_DATE,
				{ validator: this.getStartDateValidator() }
			),
			Object.assign(
				{ defaultValue: MomentHelper.toLocalDate(moment()), form: 'date' }, 
				IndisponibilityFields.END_DATE,
				{ validator: this.getEndDateValidator() }
			),
			Object.assign(
				{ defaultValue: [0, 0], form: 'time' }, 
				IndisponibilityFields.START_TIME,
				{ validator: this.getStartTimeValidator() }
			),
			Object.assign(
				{ defaultValue: [0, 0], form: 'time' }, 
				IndisponibilityFields.END_TIME,
				{ validator: this.getEndTimeValidator() }
			)
		]

		this.FIELDS_FORM2 = [
			Object.assign(
				{ defaultValue: [], form: 'days' }, 
				IndisponibilityFields.DAYS,
				{ validator: this.getDaysValidator() }
			)
		]

		this.FIELDS = [].concat(this.FIELDS_FORM1).concat(this.FIELDS_FORM2)
	}

	register(obj, indisponibilityId) {
		super.register(obj)

		this.indisponibilityId = indisponibilityId

		this.declareFunction('onChangeDirty')

		this.declareFunction('onCancel')
		this.declareFunction('onDelete')
		this.declareFunction('onCancelDelete')
		this.declareFunction('onConfirmDelete')
		this.declareFunction('onSubmit')
		
		this.obj.state = {
			mode: indisponibilityId !== 'new' ? this.MODES.EDIT : this.MODES.CREATE
		}

		let indisponibility = IndisponibilityHelper.getData(this.indisponibilityId) || {}
		for (let i = 0; i < this.FIELDS.length; i++) {
			let field = this.FIELDS[i]
			let value = indisponibility && indisponibility[field.key]
			if (field.formatter) {
				this.obj.state[field.key] = field.formatter(indisponibility[field.key])
			} else {
				this.obj.state[field.key] = value || field.defaultValue
			}
		}
	}

	unregister() {
	}


	// View callbacks //
	// --------------------------------------------------------------------------------

	onCancel() {
		AppHelper.navigateBack()
	}

	onChangeDirty(id, event, value) {
		this.obj.state.dirty = true
		this.obj.state[id] = value
		this.obj.state[id + 'Default'] = null
		this.obj.state.indisponibilityValid = this.checkIndisponibility()
		this.forceUpdate()
	}

	onDelete() {
		this.setState({ showDelete: true })
	}
	onCancelDelete() {
		this.setState({ showDelete: false })
	}
	onConfirmDelete() {
		AppHelper.setBusy(true).
		then(function() {
			return IndisponibilityHelper.deleteIndisponibility(this.indisponibilityId)
		}.bind(this)).
		then(function (result) {
			return IndisponibilityHelper.getAuxiliaryIndisponibilitys(AuthHelper.getEntityId())
		}.bind(this)).
		then(function () {
			AppHelper.navigateBack()
			setTimeout(AppHelper.setBusy, 200)
		}).
		catch(function (error) {
			setTimeout(AppHelper.setBusy, 200)
			console.error('Indisponibility submit error')
			console.error(error)
		})

		this.setState({ showDelete: false })
	}

	onSubmit() {
		let indisponibility = this.buildIndisponibility()
		AppHelper.setBusy(true).
		then(function() {
			if (this.getState('mode') === this.MODES.CREATE) {
				return IndisponibilityHelper.postIndisponibility(indisponibility)
			} else {
				return IndisponibilityHelper.putIndisponibility(indisponibility)
			}
		}.bind(this)).
		then(function (result) {
			if (this.getState('mode') === this.MODES.CREATE) {
				return IndisponibilityHelper.getIndisponibility(result.id)
			} else {
				return IndisponibilityHelper.getIndisponibility(indisponibility.id)
			}
		}.bind(this)).
		then(function () {
			AppHelper.navigateBack()
			setTimeout(AppHelper.setBusy, 200)
		}).
		catch(function (error) {
			setTimeout(AppHelper.setBusy, 200)
			console.error('Indisponibility submit error')
			console.error(error)
		})
	}


	// Internal methods //
	// --------------------------------------------------------------------------------

	getRecurence(value) {
		return {
			key: value.key,
			value: RecurencePeriodUtils.getShortName(value.key)
		}
	}

	checkIndisponibility() {
		for (let i = 0 ; i < this.FIELDS.length ; i++) {
			let field = this.FIELDS[i]
			if (field.validator && field.validator.getState(this.getState(field.key)) === 'error') {
				console.log('field invalide')
				console.log(field)
				return false
			}
		}
		return true	
	}
	

	buildIndisponibility() {
		let indiponibility = (this.getState('mode') === this.MODES.CREATE) ?
			{ auxiliaryId: AuthHelper.getEntityId() } :
			IndisponibilityHelper.getData(this.indiponibilityId)
			
		for (let i = 0 ; i < this.FIELDS.length ; i++) {
			let field = this.FIELDS[i]
			if (IndisponibilityFields.get(field.key)) {
				indiponibility[field.key] = this.getState(field.key)
			}
		}
		if (indiponibility.period === 'ONE') {
			delete indiponibility.days
			delete indiponibility.endDate
		}
		return indiponibility
	}

	getStartDateValidator() {
		return {
			getState: function (value) {
				let currentDate = moment().startOf('day')
				let startDate = MomentHelper.fromLocalDate(value)
				if (currentDate.isAfter(startDate)) {
					return 'error'
				}
				if (this.getState('period') !== 'ONE') {
					let endDate = MomentHelper.fromLocalDate(this.getState('endDate'))
					if (startDate.isAfter(endDate)) {
						return 'error'
					}
				}
				return 'success'
			}.bind(this)
		}
	}
	getEndDateValidator() {
		return {
			getState: function (value) {
				if (this.getState('period') !== 'ONE') {
					let currentDate = moment().startOf('day')
					let endDate = MomentHelper.fromLocalDate(value)
					if (currentDate.isAfter(endDate)) {
						return 'error'
					}
					let startDate = MomentHelper.fromLocalDate(this.getState('startDate'))
					if (startDate.isAfter(endDate)) {
						return 'error'
					}
				}
				return 'success'
			}.bind(this)
		}
	}
	getStartTimeValidator() {
		return {
			getState: function (value) {
				let startTime = MomentHelper.fromLocalTime(value)
				let endTime = MomentHelper.fromLocalTime(this.getState('endTime'))
				if (endTime.isSameOrBefore(startTime)) {
					return 'error'
				}
				return 'success'
			}.bind(this)
		}	
	}
	getEndTimeValidator() {
		return {
			getState: function (value) {
				let startTime = MomentHelper.fromLocalTime(this.getState('startTime'))
				let endTime = MomentHelper.fromLocalTime(value)
				if (endTime.isSameOrBefore(startTime)) {
					return 'error'
				}
				return 'success'
			}.bind(this)
		}
	}
	getDaysValidator() {
		return {
			getState: function (value) {
				if (this.getState('period') !== 'ONE' && !value.length) {
					return 'error'
				}
				return 'success'
			}.bind(this)
		}
	}
}
let AuxiliaryIndisponibilityObj = new AuxiliaryIndisponibilityEditData()
export default AuxiliaryIndisponibilityObj