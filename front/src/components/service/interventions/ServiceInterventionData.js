import AppHelper from 'helpers/AppHelper'
import CustomerHelper from 'helpers/CustomerHelper'
import InterventionHelper from 'helpers/InterventionHelper'
import { BaseData, Day, Formatters, Utils } from 'ap-react-bootstrap'

import CustomerUtils from 'utils-lib/entities/CustomerUtils'
import InterventionFields from 'utils/entities/InterventionFields'
import InterventionUtils from 'utils-lib/entities/InterventionUtils'
import RecurencePeriodUtils from 'utils-lib/entities/RecurencePeriodUtils'

function getCustomerName (customerId) {
	let customer = CustomerHelper.getData(customerId)
	if (customer) {
		return CustomerUtils.getFullName(customer)
	}
	return ''
}

function getCustomer (customer) {
	return {
		key: customer.id,
		value: CustomerUtils.getFullName(customer)
	}
}

function getCustomers () {
	console.log('----------------------------------')
	console.log(CustomerHelper.getData())
	return Utils.map(CustomerHelper.getData(), getCustomer)
}

let FIELDS_FORM1 = [
	Object.assign({ formatter: getCustomerName, form: 'select', values: getCustomers() }, InterventionFields.CUSTOMER_ID),
	Object.assign({ formatter: RecurencePeriodUtils.getShortName, form: 'select' }, InterventionFields.PERIOD),
	Object.assign({ form: 'date' }, InterventionFields.START_DATE),
	Object.assign({ form: 'date' }, InterventionFields.END_DATE),
	Object.assign({ form: 'time' }, InterventionFields.START_TIME),
	Object.assign({ form: 'time' }, InterventionFields.END_TIME)
]
let FIELDS_FORM2 = [
	Object.assign({ values: Day.VALUES }, InterventionFields.DAYS)
]

let FIELDS = FIELDS_FORM1.concat(FIELDS_FORM2)

class ServiceInterventionData extends BaseData {

	register(obj, interventionId) {
		super.register(obj)

		this.interventionId = interventionId

		this.declareFunction('onChangeDirty')
		this.declareFunction('onCancel')
		this.declareFunction('onSubmit')

		this.obj.state = {}

		this._onInterventionUpdate()
	}

	unregister() {
	}


	// Store notifications //
	// --------------------------------------------------------------------------------

	_onInterventionUpdate() {
		let intervention = InterventionHelper.getData(this.interventionId) || {}
		for (let i = 0; i < FIELDS.length; i++) {
			let field = FIELDS[i]
			if (field.formatter) {
				this.obj.state[field.key] = field.formatter(intervention[field.key])
			} else {
				this.obj.state[field.key] = intervention[field.key]
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
		console.log(value)
		data[id] = value
		data[id + 'Default'] = null
		this.setState(data)
	}

	onCancel() {
		AppHelper.navigateBack()
	}
	onSubmit() {
	}
}

let ServiceInterventionObj = new ServiceInterventionData()
ServiceInterventionObj.FIELDS = FIELDS
ServiceInterventionObj.FIELDS_FORM1 = FIELDS_FORM1
ServiceInterventionObj.FIELDS_FORM2 = FIELDS_FORM2
export default ServiceInterventionObj
