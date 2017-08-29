import AppHelper from 'helpers/AppHelper'

import CustomerHelper from 'helpers/CustomerHelper'

import { BaseData, Nationality } from 'ap-react-bootstrap'

import CustomerFields from 'utils/entities/CustomerFields'
import CustomerUtils from 'utils-lib/entities/CustomerUtils'
import NationalityUtils from 'utils-lib/geo/NationalityUtils'

let MODES = {
	CREATE: 'CREATE',
	EDIT: 'EDIT'
}

let FIELDS_FORM0 = [
	CustomerFields.LATTITUDE,
	CustomerFields.LONGITUDE
]
let FIELDS_FORM1 = [
	Object.assign({ defaultValue: '', form: 'select' }, CustomerFields.CIVILITY),
	Object.assign({ defaultValue: '', form: 'input' }, CustomerFields.LAST_NAME),
	Object.assign({ defaultValue: '', form: 'input' }, CustomerFields.FIRST_NAME),
	Object.assign({ defaultValue: [undefined,undefined,undefined], form: 'date' }, CustomerFields.BIRTH_DATE),
	Object.assign({ defaultValue: 'FR', form: 'select', values: NationalityUtils.getNationalities() }, CustomerFields.NATIONALITY),
	Object.assign({ defaultValue: '', form: 'input' }, CustomerFields.PHONE),
]
let FIELDS_FORM2 = [
	{ form: 'address', key: 'addressSearch', name: 'Adresse' },
	Object.assign({ defaultValue: '', form: 'static' }, CustomerFields.ADDRESS),
	Object.assign({ defaultValue: '', form: 'static' }, CustomerFields.POSTAL_CODE),
	Object.assign({ defaultValue: '', form: 'static' }, CustomerFields.CITY),
	Object.assign({ defaultValue: '', form: 'static' }, CustomerFields.COUNTRY),	
	Object.assign({ defaultValue: '', form: 'input' }, CustomerFields.EMAIL)
]
let FIELDS_FORM3 = [
	CustomerFields.SKILL_ADMINISTRATIVE,
	CustomerFields.SKILL_CHILDHOOD,
	CustomerFields.SKILL_COMPAGNY,
	CustomerFields.SKILL_HOUSEWORK,
	CustomerFields.SKILL_NURSING,
	CustomerFields.SKILL_SHOPPING
]
let FIELDS = FIELDS_FORM0.concat(FIELDS_FORM1).concat(FIELDS_FORM2).concat(FIELDS_FORM3)

class ServiceCustomerEditData extends BaseData {

	register(obj, customerId) {
		super.register(obj)

		this.customerId = customerId

		this.obj.onBack = AppHelper.navigateBack.bind(AppHelper)
		this.obj.onChangeDirty = this.onChangeDirty.bind(this)
		this.obj.onChangeAddress = this.onChangeAddress.bind(this)
		this.obj.onSkillAdd = this.onSkillAdd.bind(this)

		this.obj.onSubmit = this.onSubmit.bind(this)
		
		this.obj.state = {
			mode: customerId !== 'new' ? MODES.EDIT : MODES.CREATE
		}

		this._onCustomerUpdate()
	}

	unregister() {
	}

	onChangeDirty() {
		this.onChange(...arguments)
		this.setState({
			dirty: true,
			customerValid: true
		})
	}

	onChangeAddress(address) {
		let data = {
			address: address.address,
			lattitude: address.lattitude,
			longitude: address.longitude,
			postalCode: address.postalCode,
			city: address.city,
			country: address.country,
			dirty: true,
			customerValid: true
		}
		this.setState(data)
	}

	onSkillAdd() {
		console.log('add skill')
	}

	onSubmit() {
		console.log('submit')
		//AppHelper.navigateBack.bind(AppHelper)
	}

	onCustomerUpdate() {
		this._onCustomerUpdate()
		this.setState({})
	}

	_onCustomerUpdate() {
		let customer = CustomerHelper.getData(this.customerId) || {}
		this.obj.state.customerName = this.customerId !== 'new' ? CustomerUtils.getFullName(customer) : 'Nouvel usager'
		for (let i = 0; i < FIELDS.length; i++) {
			let field = FIELDS[i]
			this.obj.state[field.key] = (customer && customer[field.key]) || field.defaultValue
		}
	}
}

let ServiceCustomerEditObj = new ServiceCustomerEditData()
ServiceCustomerEditObj.FIELDS_FORM1 = FIELDS_FORM1
ServiceCustomerEditObj.FIELDS_FORM2 = FIELDS_FORM2
ServiceCustomerEditObj.FIELDS_FORM3 = FIELDS_FORM3
ServiceCustomerEditObj.MODES = MODES
export default ServiceCustomerEditObj