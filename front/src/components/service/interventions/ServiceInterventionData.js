import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import CustomerHelper from 'helpers/CustomerHelper'
import InterventionHelper from 'helpers/InterventionHelper'
import moment from 'moment'
import { BaseData, Day, Formatters, Utils, MomentHelper } from 'ap-react-bootstrap'

import InterventionRecurencePeriod from 'utils/constants/InterventionRecurencePeriod'

import CustomerUtils from 'utils-lib/entities/CustomerUtils'
import InterventionFields from 'utils/entities/InterventionFields'
import InterventionUtils from 'utils-lib/entities/InterventionUtils'
import InterventionRecurencePeriodUtils from 'utils-lib/entities/InterventionRecurencePeriodUtils'

let MODES = {
	CREATE: 'CREATE',
	EDIT: 'EDIT'
}

class ServiceInterventionData extends BaseData {

	constructor() {
		super()
		this.FIELDS_FORM1 = []
		this.FIELDS_FORM2 = []
		this.FIELDS = []
	}

	register(obj, interventionId) {
		super.register(obj)

		this.interventionId = interventionId

		this.declareFunction('onChangeDirty')
		this.declareFunction('onCancel')
		this.declareFunction('onSubmit')

		this.setState({
			mode: interventionId !== 'new' ? MODES.EDIT : MODES.CREATE
		})

		let defaultDate = MomentHelper.toLocalDate(moment())
		let customers = this.getCustomers()

		this.FIELDS_FORM1 = [
			Object.assign(
				{ defaultValue: customers[0].id, form: 'select', values: customers }, 
				InterventionFields.CUSTOMER_ID
			),
			Object.assign(
				{ defaultValue: InterventionRecurencePeriod.HOURS.key, form: 'select' }, 
				InterventionFields.PERIOD, 
				{ values: InterventionRecurencePeriod.VALUES.map(this.getRecurence) }
			),
			Object.assign(
				{ defaultValue: defaultDate, form: 'date' }, 
				InterventionFields.START_DATE
			),
			Object.assign(
				{ defaultValue: defaultDate, form: 'date' }, 
				InterventionFields.END_DATE
			),
			Object.assign(
				{ defaultValue: [0, 0], form: 'time' }, 
				InterventionFields.START_TIME
			),
			Object.assign(
				{ defaultValue: [0, 0], form: 'time' }, 
				InterventionFields.END_TIME
			)
		]
		this.FIELDS_FORM2 = [
			Object.assign(
				{ defaultValue: [], values: Day.VALUES }, 
				InterventionFields.DAYS
			)
		]
		this.FIELDS = this.FIELDS_FORM1.concat(this.FIELDS_FORM2)

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

	onChangeDirty(id, event, value) {
		let data = {
			dirty: true,
			customerValid: true
		}
		data[id] = value
		data[id + 'Default'] = null
		this.setState(data)
	}

	onCancel() {
		AppHelper.navigateBack()
	}
	onSubmit() {
	}


	onSubmit() {
		AppHelper.setBusy(true).
		then(function() {
			let intervention = this.buildIntervention()
			if (this.getState('mode') === MODES.CREATE) {
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
		let intervention = (this.getState('mode') === MODES.CREATE) ?
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
}

let ServiceInterventionObj = new ServiceInterventionData()
export default ServiceInterventionObj
