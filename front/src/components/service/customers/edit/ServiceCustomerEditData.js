import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'

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
	Object.assign({ defaultValue: 'Mme', form: 'select' }, CustomerFields.CIVILITY),
	Object.assign({ defaultValue: '', form: 'input' }, CustomerFields.LAST_NAME),
	Object.assign({ defaultValue: '', form: 'input' }, CustomerFields.FIRST_NAME),
	Object.assign({ defaultValue: [1950,1,1], form: 'date' }, CustomerFields.BIRTH_DATE),
	Object.assign({ defaultValue: 'FR', form: 'select', values: NationalityUtils.getNationalities() }, CustomerFields.NATIONALITY),
	Object.assign({ defaultValue: '', form: 'input' }, CustomerFields.PHONE),
]
let FIELDS_FORM2 = [
	{ form: 'address', key: 'addressSearch', name: 'Adresse', isCustom: true },
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

		CustomerHelper.register('', this, this.onCustomerUpdate.bind(this))
	}

	unregister() {
		CustomerHelper.unregister(this)
	}

	onChangeDirty(id, event, value) {
		let data = {
			dirty: true,
			customerValid: true
		}
		data[id] = value
		data[id + 'Default'] = null
		this.setState(data)
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

	buildCustomer() {
		let result = {
			serviceId: AuthHelper.getEntityId()
		}
		if (this.customerId !== 'new') {
			result.id = this.customerId
		}
		for (let i = 0 ; i < FIELDS.length ; i++) {
			let field = FIELDS[i]
			if (!field.isCustom && typeof this.getState(field.key) !== 'undefined') {
				result[field.key] = this.getState(field.key)
			}
		}
		return result
	}

	onSubmit() {
		AppHelper.setBusy(true).
		then(function() {
			let customer = this.buildCustomer()
			if (this.getState('mode') === MODES.CREATE) {
				return CustomerHelper.postCustomer(customer)
			} else {
				return CustomerHelper.putCustomer(customer)
			}
		}.bind(this)).
		then(function () {
			return CustomerHelper.getServiceCustomers(AuthHelper.getEntityId())
		}).
		then(function () {
			AppHelper.navigateBack()
			setTimeout(AppHelper.setBusy, 200)
		}).
		catch(function (error) {
			setTimeout(AppHelper.setBusy, 200)
			console.error('Customer submit error')
			console.error(error)
		})
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
			let value = customer && customer[field.key]
			this.obj.state[field.key] = value || field.defaultValue
			if (field.defaultValue && this.obj.state[field.key] === field.defaultValue && this.obj.state.mode === MODES.CREATE) {
				this.obj.state[field.key + 'Default'] = 'warning'
			}
		}
	}
}

let ServiceCustomerEditObj = new ServiceCustomerEditData()
ServiceCustomerEditObj.FIELDS = FIELDS
ServiceCustomerEditObj.FIELDS_FORM1 = FIELDS_FORM1
ServiceCustomerEditObj.FIELDS_FORM2 = FIELDS_FORM2
ServiceCustomerEditObj.FIELDS_FORM3 = FIELDS_FORM3
ServiceCustomerEditObj.MODES = MODES
export default ServiceCustomerEditObj