import AppHelper from 'helpers/AppHelper'
import CustomerHelper from 'helpers/CustomerHelper'

import { BaseData, Formatters, Nationality, MomentHelper } from 'ap-react-bootstrap'

import CustomerFields from 'utils/entities/CustomerFields'
import CustomerUtils from 'utils-lib/entities/CustomerUtils'
import NationalityUtils from 'utils-lib/geo/NationalityUtils'

let FIELDS_FORM1 = [
	CustomerFields.CIVILITY,
	CustomerFields.LAST_NAME,
	CustomerFields.FIRST_NAME,
	Object.assign({ formatter: MomentHelper.localDateToHumanDate }, CustomerFields.BIRTH_DATE),
	Object.assign({ formatter: NationalityUtils.getNationalityFem }, CustomerFields.NATIONALITY),
	Object.assign({ formatter: Formatters.Phone.getFormattedValue }, CustomerFields.PHONE)
]
let FIELDS_FORM2 = [
	CustomerFields.ADDRESS,
	CustomerFields.POSTAL_CODE,
	CustomerFields.CITY,
	CustomerFields.COUNTRY,
	CustomerFields.EMAIL
]
let FIELDS_FORM3 = [
	CustomerFields.SKILL_ADMINISTRATIVE,
	CustomerFields.SKILL_CHILDHOOD,
	CustomerFields.SKILL_COMPAGNY,
	CustomerFields.SKILL_HOUSEWORK,
	CustomerFields.SKILL_NURSING,
	CustomerFields.SKILL_SHOPPING
]
let FIELDS = FIELDS_FORM1.concat(FIELDS_FORM2).concat(FIELDS_FORM3)

class ServiceCustomerData extends BaseData {

	register(obj, customerId) {
		super.register(obj)

		this.customerId = customerId

		this.obj.onBack = AppHelper.navigateBack.bind(AppHelper)
		
		this._onCustomerUpdate()
	}

	unregister() {
	}


	// Store notifications //
	// --------------------------------------------------------------------------------

	onCustomerUpdate() {
		this._onCustomerUpdate()
		this.setState({})
	}

	_onCustomerUpdate() {
		let customer = CustomerHelper.getData(this.customerId) || {}
		this.obj.state.fullName = CustomerUtils.getFullName(customer)
		for (let i = 0; i < FIELDS.length; i++) {
			let field = FIELDS[i]
			if (field.formatter) {
				this.obj.state[field.key] = field.formatter(customer[field.key])
			} else {
				this.obj.state[field.key] = customer[field.key]
			}
		}
	}

}
let ServiceCustomerObj = new ServiceCustomerData()
ServiceCustomerObj.FIELDS = FIELDS
ServiceCustomerObj.FIELDS_FORM1 = FIELDS_FORM1
ServiceCustomerObj.FIELDS_FORM2 = FIELDS_FORM2
ServiceCustomerObj.FIELDS_FORM3 = FIELDS_FORM3
export default ServiceCustomerObj
