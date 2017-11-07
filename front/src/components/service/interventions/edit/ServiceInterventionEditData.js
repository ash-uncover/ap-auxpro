import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import CustomerHelper from 'helpers/CustomerHelper'
import InterventionHelper from 'helpers/InterventionHelper'
import moment from 'moment'
import { BaseData, Day, Formatters, Utils, MomentHelper } from 'ap-react-bootstrap'

import InterventionRecurencePeriod from 'utils/constants/InterventionRecurencePeriod'

import InterventionType from 'utils-lib/constants/InterventionType'

import CustomerUtils from 'utils-lib/entities/CustomerUtils'
import DiplomaUtils from 'utils-lib/entities/DiplomaUtils'
import InterventionFields from 'utils/entities/InterventionFields'
import InterventionUtils from 'utils-lib/entities/InterventionUtils'
import InterventionRecurencePeriodUtils from 'utils-lib/entities/InterventionRecurencePeriodUtils'

class ServiceInterventionEditData extends BaseData {

	constructor() {
		super()
		this.FIELDS_FORM0 = []
		this.FIELDS_FORM1 = []
		this.FIELDS_FORM2 = []
		this.FIELDS_FORM3 = []
		this.FIELDS = []
		this.MODES = {
			CREATE: 'CREATE',
			EDIT: 'EDIT'
		}
	}

	register(obj, interventionId) {
		super.register(obj)

		this.interventionId = interventionId

		this.declareFunction('onCancel')
		this.declareFunction('onSubmit')

		this.obj.state = {
			mode: interventionId !== 'new' ? this.MODES.EDIT : this.MODES.CREATE
		}

		if (this.getState('mode') === this.MODES.EDIT) {
			let type = InterventionUtils.getType(InterventionHelper.getData(interventionId))
			if (type === InterventionType.OFFERED || type === InterventionType.PLANNED) {
				AppHelper.navigate('/service/interventions/' + interventionId)
				return
			}
		}
		let defaultDate = MomentHelper.toLocalDate(moment())
		let customers = this.getCustomers()

		this.FIELDS_FORM0 = [
			Object.assign(
				{ defaultValue: customers['0'].key, form: 'select', values: customers }, 
				InterventionFields.CUSTOMER_ID
			)
		]

		this.FIELDS_FORM1 = [
			Object.assign(
				{ defaultValue: InterventionRecurencePeriod.HOURS.key, form: 'select' }, 
				InterventionFields.PERIOD, 
				{ values: InterventionRecurencePeriod.VALUES.map(this.getRecurence) }
			),
			Object.assign(
				{ defaultValue: defaultDate, form: 'date' }, 
				InterventionFields.START_DATE,
				{ validator: this.getStartDateValidator() }
			),
			Object.assign(
				{ defaultValue: defaultDate, form: 'date', hidden: function() {
                    return this.getState(InterventionFields.PERIOD.key) === InterventionRecurencePeriod.HOURS.key
                }.bind(this) }, 
				InterventionFields.END_DATE,
				{ validator: this.getEndDateValidator() }
			),
			Object.assign(
				{ defaultValue: [0, 0], form: 'time' }, 
				InterventionFields.START_TIME,
				{ validator: this.getStartTimeValidator() }
			),
			Object.assign(
				{ defaultValue: [0, 0], form: 'time' }, 
				InterventionFields.END_TIME,
				{ validator: this.getEndTimeValidator() }
			)
		]
		this.FIELDS_FORM2 = [
			Object.assign(
				{ defaultValue: [], values: Day.VALUES }, 
				InterventionFields.DAYS,
				{ validator: this.getDaysValidator() }
			)
		]
		this.FIELDS_FORM3 = [
			Object.assign(
				{ defaultValue: [], form: 'selectmulti' }, 
				InterventionFields.DIPLOMAS,
				{ values: DiplomaUtils.getDiplomas() }
			)
		]
		this.FIELDS = this.FIELDS_FORM0.concat(this.FIELDS_FORM1).concat(this.FIELDS_FORM2).concat(this.FIELDS_FORM3)

		this.onInterventionUpdate()
	}

	unregister() {
	}


	// Store notifications //
	// --------------------------------------------------------------------------------

	onInterventionUpdate() {
		let intervention = InterventionHelper.getData(this.interventionId) || {}
		for (let i = 0; i < this.FIELDS.length; i++) {
			let field = this.FIELDS[i]
			let value = intervention && intervention[field.key]
			if (field.formatter) {
				this.obj.state[field.key] = field.formatter(intervention[field.key])
			} else {
				this.obj.state[field.key] = value || field.defaultValue
			}
		}
	}


	// View callbacks //
	// --------------------------------------------------------------------------------

	onChange(id, event, value) {
		this.obj.state.dirty = true,
		this.obj.state.customerValid = true
		this.obj.state[id] = value
		this.obj.state[id + 'Default'] = null
		this.forceUpdate()
	}

	onCancel() {
		AppHelper.navigateBack()
	}

	onSubmit() {
		AppHelper.setBusy(true).
		then(function() {
			let intervention = this.buildIntervention()
			if (this.getState('mode') === this.MODES.CREATE) {
				return InterventionHelper.postIntervention(intervention)
			} else {
				return InterventionHelper.putIntervention(intervention)
			}
		}.bind(this)).
		then(function () {
			return InterventionHelper.getServiceInterventions(AuthHelper.getEntityId())
		}).
		then(function () {
			AppHelper.navigateBack()
			setTimeout(AppHelper.setBusy, 200)
		}).
		catch(function (error) {
			setTimeout(AppHelper.setBusy, 200)
			console.error('Intervention submit error')
			console.error(error)
		})
	}


	// Internal methods //
	// --------------------------------------------------------------------------------

	getRecurence(value) {
		return {
			key: value.key,
			value: InterventionRecurencePeriodUtils.getShortName(value.key)
		}
	}
	getCustomer(customer) {
		return {
			key: customer.id,
			value: CustomerUtils.getFullName(customer)
		}
	}
	getCustomers() {
		return Utils.map(CustomerHelper.getData(), this.getCustomer)
	}

	buildIntervention() {
		let intervention = (this.getState('mode') === this.MODES.CREATE) ?
			{ serviceId: AuthHelper.getEntityId() } :
			InterventionHelper.getData(this.interventionId)
			
		for (let i = 0 ; i < this.FIELDS.length ; i++) {
			let field = this.FIELDS[i]
			if (InterventionFields.get(field.key)) {
				intervention[field.key] = this.getState(field.key)
			}
		}
		if (intervention.period === InterventionRecurencePeriod.HOURS.key) {
			delete intervention.days
			delete intervention.endDate
		}
		return intervention
	}

	getStartDateValidator() {
		return {
			getState: function (value) {
				let currentDate = moment().startOf('day')
				let startDate = MomentHelper.fromLocalDate(value)
				if (currentDate.isAfter(startDate)) {
					return 'error'
				}
				if (this.getState('period') !== InterventionRecurencePeriod.HOURS.key) {
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
				if (this.getState('period') !== InterventionRecurencePeriod.HOURS.key) {
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
				if (this.getState('period') !== InterventionRecurencePeriod.HOURS.key &&
					!value.length) {
					return 'error'
				}
				return 'success'
			}.bind(this)
		}
	}
}

let ServiceInterventionEditObj = new ServiceInterventionEditData()
export default ServiceInterventionEditObj
