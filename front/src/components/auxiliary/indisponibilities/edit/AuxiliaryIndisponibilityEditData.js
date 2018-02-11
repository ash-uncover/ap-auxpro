import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import ErrorHelper from 'helpers/ErrorHelper'
import IndisponibilityHelper from 'helpers/IndisponibilityHelper'
import { BaseData, Day, MomentHelper } from 'ap-react-bootstrap'

// utils
import IndisponibilityRecurencePeriod from 'utils/constants/IndisponibilityRecurencePeriod'
import IndisponibilityFields from 'utils/entities/IndisponibilityFields'
// utils-lib
import IndisponibilityUtils from 'utils-lib/entities/IndisponibilityUtils'
import IndisponibilityRecurencePeriodUtils from 'utils-lib/entities/IndisponibilityRecurencePeriodUtils'

import moment from 'moment'

class AuxiliaryIndisponibilityEditData extends BaseData {

	constructor() {
		super(...arguments)

		this.MODES = {
			CREATE: 'CREATE',
			EDIT: 'EDIT'
		}

		let defaultDate = MomentHelper.toLocalDate(moment())

		this.FIELDS = {
			PERIOD: Object.assign(
				{ defaultValue: IndisponibilityRecurencePeriod.HOURS.key, form: 'select', name: IndisponibilityUtils.getFieldName(IndisponibilityFields.PERIOD) }, 
				IndisponibilityFields.PERIOD, 
				{ validator: this.checkPeriod.bind(this), values: IndisponibilityRecurencePeriod.VALUES.map(this.getRecurence) }
			),
			START_DATE: Object.assign(
				{ defaultValue: defaultDate, form: 'date', name: IndisponibilityUtils.getFieldName(IndisponibilityFields.START_DATE) },
				IndisponibilityFields.START_DATE,
				{ validator: this.checkStartDate.bind(this) }
			),
			END_DATE: Object.assign(
				{ defaultValue: defaultDate, form: 'date', hidden: function() {
					return this.getState(IndisponibilityFields.PERIOD.key) === IndisponibilityRecurencePeriod.HOURS.key
				}.bind(this), name: IndisponibilityUtils.getFieldName(IndisponibilityFields.END_DATE) },
				IndisponibilityFields.END_DATE,
				{ validator: this.checkEndDate.bind(this) }
			),
			START_TIME: Object.assign(
				{ defaultValue: [0, 0], form: 'time', name: IndisponibilityUtils.getFieldName(IndisponibilityFields.START_TIME) }, 
				IndisponibilityFields.START_TIME,
				{ validator: this.checkStartTime.bind(this) }
			),
			END_TIME: Object.assign(
				{ defaultValue: [12, 0], form: 'time', name: IndisponibilityUtils.getFieldName(IndisponibilityFields.END_TIME) }, 
				IndisponibilityFields.END_TIME,
				{ validator: this.checkEndTime.bind(this) }
			),
			DAYS: Object.assign(
				{ defaultValue: [], values: Day.VALUES, name: IndisponibilityUtils.getFieldName(IndisponibilityFields.DAYS) }, 
				IndisponibilityFields.DAYS,
				{ validator: this.checkDays.bind(this) }
			)
		}

		this.FIELDS_FORM1 = [
			this.FIELDS.PERIOD,
			this.FIELDS.START_DATE,
			this.FIELDS.END_DATE,
			this.FIELDS.START_TIME,
			this.FIELDS.END_TIME
		]

		this.FIELDS_FORM2 = [
			this.FIELDS.DAYS
		]
	}

	register(obj, indisponibilityId) {
		super.register(obj)

		this.declareFunction('onCancel')
		this.declareFunction('onDelete')
		this.declareFunction('onCancelDelete')
		this.declareFunction('onConfirmDelete')
		this.declareFunction('onSubmit')
		
		this.indisponibilityId = indisponibilityId
		this.obj.state.mode = indisponibilityId !== 'new' ? this.MODES.EDIT : this.MODES.CREATE

		this.onIndisponibilityUpdate()

		ErrorHelper.register('GET_INDISPONIBILITY', this, this.handleGetIndisponibilityError.bind(this))
		ErrorHelper.register('POST_INDISPONIBILITY', this, this.handlePostIndisponibilityError.bind(this))
		ErrorHelper.register('PUT_INDISPONIBILITY', this, this.handlePutIndisponibilityError.bind(this))
		ErrorHelper.register('DELETE_INDISPONIBILITY', this, this.handleDeleteIndisponibilityError.bind(this))
	}

	unregister() {
		ErrorHelper.unregister(this)
	}


	// Store notification //
	// --------------------------------------------------------------------------------

	onIndisponibilityUpdate() {
		this.checkIndisponibility(IndisponibilityHelper.getData(this.indisponibilityId))
	}

	handleGetIndisponibilityError() {
		let errorData = ErrorHelper.getData('GET_INDISPONIBILITY')
	}
	handlePutIndisponibilityError() {
		let errorData = ErrorHelper.getData('PUT_INDISPONIBILITY')
	}
	handlePostIndisponibilityError() {
		let errorData = ErrorHelper.getData('POST_INDISPONIBILITY')
	}
	handleDeleteIndisponibilityError() {
		let errorData = ErrorHelper.getData('DELETE_INDISPONIBILITY')
	}


	// View callbacks //
	// --------------------------------------------------------------------------------

	onCancel() {
		AppHelper.navigateBack()
	}

	onChange(id, event, value) {
		// State global update
		this.obj.state.dirty = true
		this.obj.state.errorShow = false
		this.obj.state.errorMsg = []
		this.obj.state.warningShow = false
		this.obj.state.warningMsg = []
		this.obj.state[id] = value
		// Check data consistency
		this.checkIndisponibility(this.obj.state)
		// Update component
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
			this.setState({
				showWarning: true
			})
			setTimeout(AppHelper.setBusy, 200)
			console.error('Indisponibility submit error')
			console.error(error)
		}.bind(this))
	}


	// Internal methods //
	// --------------------------------------------------------------------------------

	checkIndisponibility(indisponibility) {
		for (let f in this.FIELDS) {
			let field = this.FIELDS[f]
			
			let value = (indisponibility && indisponibility[field.key]) || field.defaultValue
			this.obj.state[field.key] = (field.formatter && field.formatter(value)) || value
			
			let isDefault = !!(indisponibility && indisponibility[field.key])
			this.obj.state[field.key + 'Default'] = isDefault

			let state = field.validator(value)
			this.obj.state[field.key + 'State'] = state.state
			this.obj.state[field.key + 'Warning'] = state.message

			if (state.message) {
				this.obj.state.warningMsg.push({
					key: field.key,
					value: state.message
				})
				this.obj.state.warningShow = true
			}
		}
		this.obj.state.indisponibilityNightly = false
		let startTime = MomentHelper.fromLocalTime(this.getState('startTime'))
		let endTime = MomentHelper.fromLocalTime(this.getState('endTime'))
		if (endTime.isSameOrBefore(startTime)) {
			this.obj.state.indisponibilityNightly = true
		}
	}
	checkPeriod() {
		return this.getState('period') ? { state: 'success' } : { state: 'error', message: 'Vous devez sélectionner une période' }
	}
	checkStartDate() {
		if (!this.getState('startDate')) {
			return { state: 'error', message: 'Vous devez spécifier une date de début' }
		}
		if (this.getState('period') === IndisponibilityRecurencePeriod.HOURS.key) {
			return { state: 'success' }
		}
		let startMoment = MomentHelper.fromLocalDate(this.getState('startDate'))
		let endMoment = this.getState('endDate') ? MomentHelper.fromLocalDate(this.getState('endDate')) : null
		if (endMoment && endMoment.isBefore(startMoment)) {
			return { state: 'error', message: 'La date de début doit être avant la date de fin' }
		}
		return { state: 'success' }
	}
	checkEndDate() {
		if (this.getState('period') === IndisponibilityRecurencePeriod.HOURS.key) {
			return { state: 'success' }
		}
		if (!this.getState('endDate')) {
			return { state: 'error', message: 'Vous devez spécifier une date de fin' }
		}
		let startMoment = MomentHelper.fromLocalDate(this.getState('startDate'))
		let endMoment = MomentHelper.fromLocalDate(this.getState('endDate'))
		if (endMoment.isBefore(startMoment)) {
			return { state: 'error' }
		}
		let currentMoment = moment().startOf('day')
		if (currentMoment.isAfter(endMoment)) {
			return { state: 'error', message: 'La date de fin ne peut pas être dans le passé' }
		}
		return { state: 'success' }
	}
	checkStartTime() {
		if (!this.getState('startTime')) {
			return { state: 'error', message: 'Vous devez spécifier un horaire de démarrage' }
		}
		return { state: 'success' }
	}
	checkEndTime(intervention) {
		if (!this.getState('endTime')) {
			return { state: 'error', message: 'Vous devez spécifier un horaire de fin' }
		}
		return { state: 'success' }
	}
	checkDays() {
		if (this.getState('period') === IndisponibilityRecurencePeriod.HOURS.key || 
			this.getState('period') === IndisponibilityRecurencePeriod.DAYS.key) {
			return { state: 'success' }
		}
		if (!this.getState('days') || !this.getState('days').length) {
			return { state: 'error', message: 'Vous devez sélectionner au moins un jour' }
		}
		return { state: 'success' }
	}

	getRecurence(value) {
		return {
			key: value.key,
			value: IndisponibilityRecurencePeriodUtils.getShortName(value.key)
		}
	}

	buildIndisponibility() {
		let indiponibility = (this.getState('mode') === this.MODES.CREATE) ?
			{ auxiliaryId: AuthHelper.getEntityId() } :
			Object.assign({}, IndisponibilityHelper.getData(this.indisponibilityId))
			
		for (let f in this.FIELDS) {
			let field = this.FIELDS[f]
			if (IndisponibilityFields.get(field.key)) {
				indiponibility[field.key] = this.getState(field.key)
			}
		}
		if (indiponibility.period === IndisponibilityRecurencePeriod.HOURS.key) {
			delete indiponibility.days
			delete indiponibility.endDate
		}
		if (indiponibility.period === IndisponibilityRecurencePeriod.DAYS.key) {
			delete indiponibility.days
			delete indiponibility.startTime
			delete indiponibility.endTime
		}
		return indiponibility
	}
}
let AuxiliaryIndisponibilityObj = new AuxiliaryIndisponibilityEditData()
export default AuxiliaryIndisponibilityObj