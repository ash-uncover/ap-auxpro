import { MomentHelper, BaseData, Nationality, Validators } from 'ap-react-bootstrap'
import moment from 'moment'
// helpers
import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import CustomerHelper from 'helpers/CustomerHelper'
import ErrorHelper from 'helpers/ErrorHelper'
// utils
import Skills from 'utils/constants/Skills'
import CustomerFields from 'utils/entities/CustomerFields'
// utils-lib
import CustomerUtils from 'utils-lib/entities/CustomerUtils'
import NationalityUtils from 'utils-lib/geo/NationalityUtils'

class ServiceCustomerEditData extends BaseData {

	constructor() {
		super(...arguments)

		this.MODES = {
			CREATE: 'CREATE',
			EDIT: 'EDIT'
		}

		this.FIELDS = {
			LATTITUDE: Object.assign(
				{},
				CustomerFields.LATTITUDE,
				{ validator: this.checkLattitude.bind(this) }
			),
			LONGITUDE: Object.assign(
				{},
				CustomerFields.LONGITUDE,
				{ validator: this.checkLongitude.bind(this) }
			),
			CIVILITY: Object.assign(
				{ defaultValue: 'Mme', form: 'select', name: CustomerUtils.getFieldName(CustomerFields.CIVILITY) }, 
				CustomerFields.CIVILITY,
				{ validator: this.checkCivility.bind(this) }
			),
			LAST_NAME: Object.assign(
				{ defaultValue: '', form: 'input', name: CustomerUtils.getFieldName(CustomerFields.LAST_NAME) }, 
				CustomerFields.LAST_NAME,
				{ validator: this.checkLastName.bind(this) }
			),
			FIRST_NAME: Object.assign(
				{ defaultValue: '', form: 'input', name: CustomerUtils.getFieldName(CustomerFields.FIRST_NAME) }, 
				CustomerFields.FIRST_NAME,
				{ validator: this.checkFirstName.bind(this) }
			),
			BIRTH_DATE: Object.assign(
				{ defaultValue: [1950,1,1], form: 'date', name: CustomerUtils.getFieldName(CustomerFields.BIRTH_DATE) }, 
				CustomerFields.BIRTH_DATE,
				{ validator: this.checkBirthDate.bind(this) }
			),
			NATIONALITY: Object.assign(
				{ defaultValue: 'FR', form: 'select', name: CustomerUtils.getFieldName(CustomerFields.NATIONALITY) }, 
				CustomerFields.NATIONALITY,
				{ validator: this.checkNationality.bind(this), values: NationalityUtils.getNationalities() }
			),
			PHONE: Object.assign(
				{ defaultValue: '', form: 'input', name: CustomerUtils.getFieldName(CustomerFields.PHONE) }, 
				CustomerFields.PHONE,
				{ validator: this.checkPhone.bind(this) }
			),
			ADDRESS: Object.assign(
				{ defaultValue: '', form: 'static', name: CustomerUtils.getFieldName(CustomerFields.ADDRESS) }, 
				CustomerFields.ADDRESS,
				{ validator: this.checkAddress.bind(this) }
			),
			POSTAL_CODE: Object.assign(
				{ defaultValue: '', form: 'static', name: CustomerUtils.getFieldName(CustomerFields.POSTAL_CODE) }, 
				CustomerFields.POSTAL_CODE,
				{ validator: this.checkPostalCode.bind(this) }
			),
			CITY: Object.assign(
				{ defaultValue: '', form: 'static', name: CustomerUtils.getFieldName(CustomerFields.CITY) }, 
				CustomerFields.CITY,
				{ validator: this.checkCity.bind(this) }
			),
			COUNTRY: Object.assign(
				{ defaultValue: '', form: 'static', name: CustomerUtils.getFieldName(CustomerFields.COUNTRY) }, 
				CustomerFields.COUNTRY,
				{ validator: this.checkCountry.bind(this) }
			),
			ADDRESS_SEARCH: Object.assign(
				{ form: 'address', key: 'addressSearch', name: 'Adresse' },
				{ validator: this.checkAddressSearch.bind(this) }
			),
			EMAIL: Object.assign(
				{ defaultValue: '', form: 'input', name: CustomerUtils.getFieldName(CustomerFields.EMAIL) }, 
				CustomerFields.EMAIL,
				{ validator: this.checkEmail.bind(this) }
			),
			SKILL_ADMINISTRATIVE: Object.assign(
				{ defaultValue: 0, name: CustomerUtils.getFieldName(CustomerFields.SKILL_ADMINISTRATIVE) }, 
				CustomerFields.SKILL_ADMINISTRATIVE
			),
			SKILL_CHILDHOOD: Object.assign(
				{ defaultValue: 0, name: CustomerUtils.getFieldName(CustomerFields.SKILL_CHILDHOOD) }, 
				CustomerFields.SKILL_CHILDHOOD
			),
			SKILL_COMPAGNY: Object.assign(
				{ defaultValue: 0, name: CustomerUtils.getFieldName(CustomerFields.SKILL_COMPAGNY) }, 
				CustomerFields.SKILL_COMPAGNY
			),
			SKILL_DOITYOURSELF: Object.assign(
				{ defaultValue: 0, name: CustomerUtils.getFieldName(CustomerFields.SKILL_DOITYOURSELF) }, 
				CustomerFields.SKILL_DOITYOURSELF
			),
			SKILL_HOUSEWORK: Object.assign(
				{ defaultValue: 0, name: CustomerUtils.getFieldName(CustomerFields.SKILL_HOUSEWORK) }, 
				CustomerFields.SKILL_HOUSEWORK
			),
			SKILL_NURSING: Object.assign(
				{ defaultValue: 0, name: CustomerUtils.getFieldName(CustomerFields.SKILL_NURSING) }, 
				CustomerFields.SKILL_NURSING
			),
			SKILL_SHOPPING: Object.assign(
				{ defaultValue: 0, name: CustomerUtils.getFieldName(CustomerFields.SKILL_SHOPPING) }, 
				CustomerFields.SKILL_SHOPPING
			),
			SKILLS_CHECKER: { key: 'skillsChecker', validator: this.checkSkillsChecker.bind(this) }
		}

		this.FIELDS_FORM1 = [
			this.FIELDS.CIVILITY,
			this.FIELDS.LAST_NAME,
			this.FIELDS.FIRST_NAME,
			this.FIELDS.BIRTH_DATE,
			this.FIELDS.NATIONALITY,
			this.FIELDS.PHONE
		]
		this.FIELDS_FORM2 = [
			this.FIELDS.ADDRESS_SEARCH,
			this.FIELDS.ADDRESS,
			this.FIELDS.POSTAL_CODE,
			this.FIELDS.CITY,
			this.FIELDS.COUNTRY,
			this.FIELDS.EMAIL
		]
		this.FIELDS_FORM3 = [
			this.FIELDS.SKILL_ADMINISTRATIVE,
			this.FIELDS.SKILL_CHILDHOOD,
			this.FIELDS.SKILL_COMPAGNY,
			this.FIELDS.SKILL_DOITYOURSELF,
			this.FIELDS.SKILL_HOUSEWORK,
			this.FIELDS.SKILL_NURSING,
			this.FIELDS.SKILL_SHOPPING
		]

		this.sortSkills = this._sortSkills.bind(this)
		this.sortSkillsSecondary = this._sortSkillsSecondary.bind(this)
	}

	register(obj, customerId) {
		super.register(obj)

		this.customerId = customerId

		this.declareFunction('onSkillAdd')
		this.declareFunction('onCancel')
		this.declareFunction('onSubmit')
		
		this.obj.state.mode = customerId !== 'new' ? this.MODES.EDIT : this.MODES.CREATE
		

		let customer = CustomerHelper.getData(this.customerId) || {}
		this.obj.state.customerName = this.customerId !== 'new' ? CustomerUtils.getFullName(customer) : 'Nouvel usager'
		for (let f in this.FIELDS) {
			let field = this.FIELDS[f]
			let value = customer[field.key]
			this.obj.state[field.key] = value || field.defaultValue
			if (field.defaultValue && this.obj.state[field.key] === field.defaultValue && this.obj.state.mode === this.MODES.CREATE) {
				this.obj.state[field.key + 'Default'] = 'warning'
			}
		}
		this.obj.state.skills = Skills.VALUES.sort(this.sortSkills)
		this.obj.state.showAllSkills = false

		this.onCustomerUpdate()

		ErrorHelper.register('GET_CUSTOMER', this, this.handleGetCustomerError.bind(this))
		ErrorHelper.register('POST_CUSTOMER', this, this.handlePostCustomerError.bind(this))
		ErrorHelper.register('PUT_CUSTOMER', this, this.handlePutCustomerError.bind(this))
		ErrorHelper.register('DELETE_CUSTOMER', this, this.handleDeleteCustomerError.bind(this))	
	}

	unregister() {
		ErrorHelper.unregister(this)
	}


	// Store notifications //
	// --------------------------------------------------------------------------------

	onCustomerUpdate() {
		this.checkCustomer(CustomerHelper.getData(this.customerId))
	}

	handleGetCustomerError() {
		let errorData = ErrorHelper.getData('GET_CUSTOMER')
		if (errorData) {
			this.setState({
				errorShow: true,
				errorMsg: [ "Une erreur est survenue pendant la récupération des informations de l'usager" ]
			})
		}
	}
	handlePutCustomerError() {
		let errorData = ErrorHelper.getData('PUT_CUSTOMER')
		if (errorData) {
			this.setState({
				errorShow: true,
				errorMsg: [ "Une erreur est survenue pendant la mise à jour des informations de l'usager" ]
			})
		}
	}
	handlePostCustomerError() {
		let errorData = ErrorHelper.getData('POST_CUSTOMER')
		if (errorData) {
			this.setState({
				errorShow: true,
				errorMsg: [ "Une erreur est survenue pendant la création de l'usager" ]
			})
		}
	}
	handleDeleteCustomerError() {
		let errorData = ErrorHelper.getData('DELETE_CUSTOMER')
		if (errorData) {
			this.setState({
				errorShow: true,
				errorMsg: [ "Une erreur est survenue pendant la suppression de l'usager" ]
			})
		}
	}


	// View callbacks //
	// --------------------------------------------------------------------------------

	onChange(id, event, value) {
		// State global update
		this.obj.state.dirty = true
		// Pre processing on values
		if (id === 'addressSearch') {
			this.obj.state.addressSearch = ''
			this.obj.state.address = event.address
			this.obj.state.lattitude = event.lattitude
			this.obj.state.longitude = event.longitude
			this.obj.state.postalCode = event.postalCode
			this.obj.state.city = event.city
			this.obj.state.country = event.country
		} else if (id === CustomerFields.PHONE.key && Validators.Phone.getBlockedValue(value) !== value) {
			this.forceUpdate()
			return
		} else {
			this.obj.state[id] = value
		}
		// Check data consistency
		this.checkCustomer(this.obj.state)
		// Update component
		this.forceUpdate()
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


	// Internal methods //
	// --------------------------------------------------------------------------------

	checkCustomer(customer) {
		this.obj.state.errorShow = false
		this.obj.state.errorMsg = []
		this.obj.state.warningShow = false
		this.obj.state.warningMsg = []
		// Fields individual status
		for (let f in this.FIELDS) {
			let field = this.FIELDS[f]
			
			let value = (customer && customer[field.key]) || field.defaultValue
			this.obj.state[field.key] = (field.formatter && field.formatter(value)) || value
			
			let isDefault = !!(customer && customer[field.key])
			this.obj.state[field.key + 'Default'] = isDefault

			let state = (field.validator && field.validator(value)) || {}
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
		// Handling skills
		
	}
	checkLattitude() {
	}
	checkLongitude() {
	}
	checkCivility() {
		if (!this.getState('civility')) {
			return { state: 'error', message: 'Vous devez spécifier une civilité' }
		}
		return { state: 'success' }
	}
	checkLastName() {
		if (!this.getState('lastName')) {
			return { state: 'error', message: 'Vous devez spécifier un nom' }
		}
		return { state: 'success' }
	}
	checkFirstName() {
		if (!this.getState('firstName')) {
			return { state: 'error', message: 'Vous devez spécifier un prénom' }
		}
		return { state: 'success' }
	}
	checkBirthDate() {
		let birthMoment = MomentHelper.fromLocalDate(this.getState('birthDate'))
		let currentMoment = moment()
		if (birthMoment.isAfter(currentMoment)) {
			return { state: 'error', message: "La date de naissance n'est pas valide" }
		}
		return { state: 'success' }
	}
	checkNationality() {
		if (!this.getState('nationality')) {
			return { state: 'error', message: 'Vous devez spécifier une nationnalité' }
		}
		return { state: 'success' }
	}
	checkPhone() {
		if (Validators.Phone.getState(this.getState('phone')) !== 'success') {
			return { state: 'error', message: 'Veuilez saisir un numéro de téléphone valide' }
		}
		return { state: 'success' }
	}
	checkAddressSearch() {
		if (this.getState('addressState') === 'error' ||
			this.getState('postalCodeState') === 'error' ||
			this.getState('cityState') === 'error' ||
			this.getState('countryState') === 'error' ||
			this.getState('lattitudeState') === 'error' ||
			this.getState('longitudeState') === 'error') {
			return { state: 'error', message: 'Veuillez saisir une addresse valide' }
		}
		return { state: 'success' }
	}
	checkAddress() {
		return this.getState('address') ? { state: 'success' } : { state: 'error' }
	}
	checkPostalCode() {
		return this.getState('postalCode') ? { state: 'success' } : { state: 'error' }
	}
	checkCity() {
		return this.getState('city') ? { state: 'success' } : { state: 'error' }
	}
	checkCountry() {
		return this.getState('country') ? { state: 'success' } : { state: 'error' }
	}
	checkEmail() {
		if (Validators.Email.getState(this.getState('email')) !== 'success') {
			return { state: 'error', message: 'Veuilez saisir une addresse électronique valide' }
		}
		return { state: 'success' }
	}
	checkSkillsChecker() {
		if ((this.obj.state[CustomerFields.SKILL_ADMINISTRATIVE.key] + 
			this.obj.state[CustomerFields.SKILL_NURSING.key] + 
			this.obj.state[CustomerFields.SKILL_SHOPPING.key] + 
			this.obj.state[CustomerFields.SKILL_HOUSEWORK.key] +
			this.obj.state[CustomerFields.SKILL_DOITYOURSELF.key] +
			this.obj.state[CustomerFields.SKILL_COMPAGNY.key] +
			this.obj.state[CustomerFields.SKILL_CHILDHOOD.key]) === 0) {
			return { state: 'error', message: 'Vous devez ajouter au moins un besoin' }
		}
		return { state: 'success' }
	}

	buildCustomer() {
		let customer = (this.getState('mode') === this.MODES.CREATE) ?
			{ serviceId: AuthHelper.getEntityId() } :
			CustomerHelper.getData(this.customerId)
			
		for (let f in this.FIELDS) {
			let field = this.FIELDS[f]
			if (CustomerFields.get(field.key)) {
				customer[field.key] = this.getState(field.key)
			}
		}
		return customer
	}

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

}

let ServiceCustomerEditObj = new ServiceCustomerEditData()
export default ServiceCustomerEditObj