import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'

import CustomerHelper from 'helpers/CustomerHelper'

import { BaseData, Nationality } from 'ap-react-bootstrap'

import Skills from 'utils/constants/Skills'

import CustomerFields from 'utils/entities/CustomerFields'
import CustomerUtils from 'utils-lib/entities/CustomerUtils'
import NationalityUtils from 'utils-lib/geo/NationalityUtils'

class ServiceCustomerEditData extends BaseData {

	constructor() {
		super(...arguments)

		this.MODES = {
			CREATE: 'CREATE',
			EDIT: 'EDIT'
		}

		this.FIELDS_FORM0 = [
			CustomerFields.LATTITUDE,
			CustomerFields.LONGITUDE
		]
		this.FIELDS_FORM1 = [
			Object.assign({ defaultValue: 'Mme', form: 'select' }, CustomerFields.CIVILITY),
			Object.assign({ defaultValue: '', form: 'input' }, CustomerFields.LAST_NAME),
			Object.assign({ defaultValue: '', form: 'input' }, CustomerFields.FIRST_NAME),
			Object.assign({ defaultValue: [1950,1,1], form: 'date' }, CustomerFields.BIRTH_DATE),
			Object.assign({ defaultValue: 'FR', form: 'select', values: NationalityUtils.getNationalities() }, CustomerFields.NATIONALITY),
			Object.assign({ defaultValue: '', form: 'input' }, CustomerFields.PHONE),
		]
		this.FIELDS_FORM2 = [
			{ form: 'address', key: 'addressSearch', name: 'Adresse' },
			Object.assign({ defaultValue: '', form: 'static' }, CustomerFields.ADDRESS),
			Object.assign({ defaultValue: '', form: 'static' }, CustomerFields.POSTAL_CODE),
			Object.assign({ defaultValue: '', form: 'static' }, CustomerFields.CITY),
			Object.assign({ defaultValue: '', form: 'static' }, CustomerFields.COUNTRY),
			Object.assign({ defaultValue: '', form: 'input' }, CustomerFields.EMAIL)
		]
		this.FIELDS_FORM3 = [
			Object.assign({ defaultValue: 0 }, CustomerFields.SKILL_ADMINISTRATIVE),
			Object.assign({ defaultValue: 0 }, CustomerFields.SKILL_CHILDHOOD),
			Object.assign({ defaultValue: 0 }, CustomerFields.SKILL_COMPAGNY),
			Object.assign({ defaultValue: 0 }, CustomerFields.SKILL_DOITYOURSELF),
			Object.assign({ defaultValue: 0 }, CustomerFields.SKILL_HOUSEWORK),
			Object.assign({ defaultValue: 0 }, CustomerFields.SKILL_NURSING),
			Object.assign({ defaultValue: 0 }, CustomerFields.SKILL_SHOPPING)
		]
		this.FIELDS = this.FIELDS_FORM0.concat(this.FIELDS_FORM1).concat(this.FIELDS_FORM2).concat(this.FIELDS_FORM3)


		this.sortSkills = this._sortSkills.bind(this)
		this.sortSkillsSecondary = this._sortSkillsSecondary.bind(this)

	}
	register(obj, customerId) {
		super.register(obj)

		this.customerId = customerId
		this.obj.onBack = AppHelper.navigateBack.bind(AppHelper)

		this.declareFunction('onChangeDirty')
		this.declareFunction('onChangeAddress')
		this.declareFunction('onSkillAdd')

		this.declareFunction('onCancel')
		this.declareFunction('onSubmit')
		
		this.obj.state.mode = customerId !== 'new' ? this.MODES.EDIT : this.MODES.CREATE

		let customer = CustomerHelper.getData(this.customerId) || {}
		this.obj.state.customerName = this.customerId !== 'new' ? CustomerUtils.getFullName(customer) : 'Nouvel usager'
		for (let i = 0; i < this.FIELDS.length; i++) {
			let field = this.FIELDS[i]
			let value = customer[field.key]
			this.obj.state[field.key] = value || field.defaultValue
			if (field.defaultValue && this.obj.state[field.key] === field.defaultValue && this.obj.state.mode === this.MODES.CREATE) {
				this.obj.state[field.key + 'Default'] = 'warning'
			}
		}
		this.obj.state.skills = Skills.VALUES.sort(this.sortSkills)
		this.obj.state.showAllSkills = false		
	}


	// Store notifications //
	// --------------------------------------------------------------------------------

	_sortSkills(s1, s2) {
		return this.getState(s2.key) - this.getState(s1.key)
	}
	_sortSkillsSecondary(s1, s2) {
		if (this.getState(s2.key) === 0) {
			return -1
		}
		if (this.getState(s1.key) === 0) {
			return 1
		}
		return this.getState(s2.key) - this.getState(s1.key)
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
		this.setState({ 
			skills: Skills.VALUES.sort(this.sortSkillsSecondary),
			showAllSkills: true 
		})
	}

	onCancel() {
		AppHelper.navigateBack()
	}

	buildCustomer() {
		let customer = (this.getState('mode') === this.MODES.CREATE) ?
			{ serviceId: AuthHelper.getEntityId() } :
			CustomerHelper.getData(this.customerId)
			
		for (let i = 0 ; i < this.FIELDS.length ; i++) {
			let field = this.FIELDS[i]
			if (CustomerFields.get(field.key)) {
				customer[field.key] = this.getState(field.key)
			}
		}
		return customer
	}

	onSubmit() {
		AppHelper.setBusy(true).
		then(function() {
			let customer = this.buildCustomer()
			if (this.getState('mode') === this.MODES.CREATE) {
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
}

let ServiceCustomerEditObj = new ServiceCustomerEditData()
export default ServiceCustomerEditObj