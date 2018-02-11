import { BaseData, Validators } from 'ap-react-bootstrap'
// helpers
import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import ErrorHelper from 'helpers/ErrorHelper'
import ImageHelper from 'helpers/ImageHelper'
import ServiceHelper from 'helpers/ServiceHelper'
// utils
import ServiceFields from 'utils/entities/ServiceFields'
// utils-lib
import ServiceUtils from 'utils-lib/entities/ServiceUtils'
import SocFunctionUtils from 'utils-lib/entities/SocFunctionUtils'
import SocFunction from 'utils/constants/SocFunction'

class ServiceInfosEditSocietyData extends BaseData {

	constructor() {
		super(...arguments)

		this.FIELDS = {
			AVATAR: Object.assign(
				{},
				ServiceFields.AVATAR
			),
			PROFIL_COMPLETED: Object.assign(
				{},
				ServiceFields.PROFIL_COMPLETED
			),
			LATTITUDE: Object.assign(
				{},
				ServiceFields.LATTITUDE,
				{ validator: this.checkLattitude.bind(this) }
			),
			LONGITUDE: Object.assign(
				{},
				ServiceFields.LONGITUDE,
				{ validator: this.checkLongitude.bind(this) }
			),
			SOCIAL_REASON: Object.assign(
				{ defaultValue: '', form: 'input', name: ServiceUtils.getFieldName(ServiceFields.SOCIAL_REASON) }, 
				ServiceFields.SOCIAL_REASON,
				{ validator: this.checkSocialReason.bind(this) }
			),
			FUNCTION: Object.assign(
				{ defaultValue: SocFunction.MAND.key, form: 'select', name: ServiceUtils.getFieldName(ServiceFields.FUNCTION) }, 
				ServiceFields.FUNCTION,
				{ validator: this.checkFunction.bind(this), values: SocFunctionUtils.getValues() }
			),
			SIRET: Object.assign(
				{ defaultValue: '', form: 'input', name: ServiceUtils.getFieldName(ServiceFields.SIRET) }, 
				ServiceFields.SIRET,
				{ validator: this.checkSiret.bind(this) }
			),
			PHONE: Object.assign(
				{ defaultValue: '', form: 'input', name: ServiceUtils.getFieldName(ServiceFields.PHONE) }, 
				ServiceFields.PHONE,
				{ validator: this.checkPhone.bind(this) }
			),
			ADDRESS: Object.assign(
				{ defaultValue: '', form: 'static', name: ServiceUtils.getFieldName(ServiceFields.ADDRESS) }, 
				ServiceFields.ADDRESS,
				{ validator: this.checkAddress.bind(this) }
			),
			POSTAL_CODE: Object.assign(
				{ defaultValue: '', form: 'static', name: ServiceUtils.getFieldName(ServiceFields.POSTAL_CODE) }, 
				ServiceFields.POSTAL_CODE,
				{ validator: this.checkPostalCode.bind(this) }
			),
			CITY: Object.assign(
				{ defaultValue: '', form: 'static', name: ServiceUtils.getFieldName(ServiceFields.CITY) }, 
				ServiceFields.CITY,
				{validator: this.checkCity.bind(this) }
			),
			COUNTRY: Object.assign(
				{ defaultValue: '', form: 'static', name: ServiceUtils.getFieldName(ServiceFields.COUNTRY) }, 
				ServiceFields.COUNTRY,
				{ validator: this.checkCountry.bind(this) }
			),
			ADDRESS_SEARCH: Object.assign(
				{ form: 'address', key: 'addressSearch', name: 'Adresse' },
				{ validator: this.checkAddressSearch.bind(this) }
			),
		}

		this.FIELDS_FORM0 = [
			this.FIELDS.AVATAR,
			this.FIELDS.PROFIL_COMPLETED,
			this.FIELDS.LATTITUDE,
			this.FIELDS.LONGITUDE
		]
		this.FIELDS_FORM1 = [
			this.FIELDS.SOCIAL_REASON,
			this.FIELDS.FUNCTION,
			this.FIELDS.SIRET,
			this.FIELDS.PHONE
			
		]
		this.FIELDS_FORM2 = [
			this.FIELDS.ADDRESS_SEARCH,
			this.FIELDS.ADDRESS,
			this.FIELDS.POSTAL_CODE,
			this.FIELDS.CITY,
			this.FIELDS.COUNTRY
		]
	}

	register(obj) {
		super.register(obj)
		
		this.declareFunction('onCancel')
		this.declareFunction('onSubmit')

		this.loadService(ServiceHelper.getData(AuthHelper.getEntityId()) || {})
		this.checkService()
		
		ErrorHelper.register('POST_IMAGE', this, this.handlePostImageError.bind(this))
		ErrorHelper.register('PUT_SERVICE', this, this.handlePutServiceError.bind(this))
		ErrorHelper.register('GET_SERVICE', this, this.handleGetServiceError.bind(this))
	}

	unregister() {
		ErrorHelper.unregister(this)
	}


	// Store notification //
	// --------------------------------------------------------------------------------

	handlePostImageError() {
		let errorData = ErrorHelper.getData('POST_IMAGE')
		if (errorData) {
			this.setState({
				errorShow: true,
				errorMsg: [ 'Une erreur est survenue pendant la mise à jour de votre photo' ]
			})
		}
	}

	handleGetServiceError() {
		let errorData = ErrorHelper.getData('GET_SERVICE')
		if (errorData) {
			this.setState({
				errorShow: true,
				errorMsg: [ 'Une erreur est survenue pendant la récupération de vos informations' ]
			})
		}
	}

	handlePutServiceError() {
		let errorData = ErrorHelper.getData('PUT_SERVICE')
		if (errorData) {
			this.setState({
				errorShow: true,
				errorMsg: [ 'Une erreur est survenue pendant la mise à jour de vos informations' ]
			})
		}
	}


	// View callbacks //
	// --------------------------------------------------------------------------------

	onChange(id, event, value) {
		this.obj.state.dirty = true
		// Value update
		if (id === this.FIELDS.ADDRESS_SEARCH.key) {
			this.obj.state.addressSearch = ''
			this.obj.state.address = event.address
			this.obj.state.lattitude = event.lattitude
			this.obj.state.longitude = event.longitude
			this.obj.state.postalCode = event.postalCode
			this.obj.state.city = event.city
			this.obj.state.country = event.country
		} else if (id === ServiceFields.AVATAR.key) {
			this.obj.state.avatarFile = event
        } else if (id === ServiceFields.PHONE.key && Validators.Phone.getBlockedValue(value) !== value) {
            this.forceUpdate()
            return
        } else if (id === ServiceFields.SIRET.key && Validators.SiretNumber.getBlockedValue(value) !== value) {
            this.forceUpdate()
            return
		} else {
			this.obj.state[id] = value
		}
		// Check data consistency
		this.checkService()
		// Update component
		this.forceUpdate()
	}

	onCancel() {
		AppHelper.navigateBack()
	}

	onSubmit() {
		AppHelper.setBusy(true).
		then(function() {
			let promises = []
			if (this.getState('avatarFile')) {
				promises.push(ImageHelper.postImage({
					name: 'img',
					file: this.getState('avatarFile')
				}))
			}
			return Promise.all(promises)
		}.bind(this)).
		then(function (oResult) {
			let service = this.buildService()
			if (this.getState('avatarFile')) {
				service.avatar = oResult[0].id
			}
			return ServiceHelper.putService(service)
		}.bind(this)).
		then(function () {
			return ServiceHelper.getService(AuthHelper.getEntityId())
		}).
		then(function () {
			setTimeout(AppHelper.setBusy, 200)
			return AppHelper.navigateBack()
		}).
		catch(function (error) {
			setTimeout(AppHelper.setBusy, 200)
			console.error('Service update error')
			console.error(error)
		})
	}

	// Internal methods //
	// --------------------------------------------------------------------------------

	buildService() {
		let service = ServiceHelper.getData(AuthHelper.getEntityId())
		for (let f in this.FIELDS) {
			let field = this.FIELDS[f]
			if (ServiceFields.get(field.key)) {
				service[field.key] = this.getState(field.key)
			}
		}
		return service
	}

	loadService(service) {
		for (let f in this.FIELDS) {
			let field = this.FIELDS[f]
			let value = service[field.key] || field.defaultValue
			this.obj.state[field.key] = field.formatter ? field.formatter(value) : value
		}
		if (service.avatar) {
			this.obj.state.avatarSrc = ImageHelper.getData(this.obj.state.avatar)
		}
	}

	checkService() {
		// State global update
		this.obj.state.errorShow = false
		this.obj.state.errorMsg = []
		this.obj.state.warningShow = false
		this.obj.state.warningMsg = []
		// Fields individual status
		for (let f in this.FIELDS) {
			let field = this.FIELDS[f]
			let value = this.getState(field.key)
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
	}
	checkLattitude() {
		return this.getState(this.FIELDS.LATTITUDE.key) ? 
			{ state: 'success' } : 
			{ state: 'error' }
	}
	checkLongitude() {
		return this.getState(this.FIELDS.LONGITUDE.key) ? 
			{ state: 'success' } : 
			{ state: 'error' }
	}
	checkSocialReason() {
		return this.getState(this.FIELDS.SOCIAL_REASON.key) ? 
			{ state: 'success' } : 
			{ state: 'error', message: 'Veuillez renseigner le nom de vote société' }
	}
	checkFunction() {
		return this.getState(this.FIELDS.FUNCTION.key) ? 
			{ state: 'success' } : 
			{ state: 'error', message: 'Veuillez renseigner votre numéro mode de fonctionnement' }
	}
	checkSiret() {
		return Validators.SiretNumber.getState(this.getState(this.FIELDS.SIRET.key)) === 'success' ? 
			{ state: 'success' } : 
			{ state: 'error', message: 'Veuillez renseigner votre numéro de siret' }
	}
	checkPhone() {
		return Validators.Phone.getState(this.getState(this.FIELDS.PHONE.key)) === 'success' ?
			{ state: 'success' } :
			{ state: 'error', message: 'Veuilez saisir un numéro de téléphone valide' }
	}
	checkAddressSearch() {
		if (this.getState('addressState') === 'error' ||
			this.getState('postalCodeState') === 'error' ||
			this.getState('cityState') === 'error' ||
			this.getState('countryState') === 'error' ||
			this.getState('lattitudeState') === 'error' ||
			this.getState('longitudeState') === 'error') {
			console.log('error')
			return { state: 'error', message: 'Veuillez saisir une addresse valide' }
		}
		return { state: 'success' }
	}
	checkAddress() {
		return this.getState(this.FIELDS.ADDRESS.key) ? 
			{ state: 'success' } : 
			{ state: 'error' }
	}
	checkPostalCode() {
		return this.getState(this.FIELDS.POSTAL_CODE.key) ? 
			{ state: 'success' } : 
			{ state: 'error' }
	}
	checkCity() {
		return this.getState(this.FIELDS.CITY.key) ? 
			{ state: 'success' } : 
			{ state: 'error' }
	}
	checkCountry() {
		return this.getState(this.FIELDS.COUNTRY.key) ? 
			{ state: 'success' } : 
			{ state: 'error' }
	}
}

let ServiceInfosEditSocietyObj = new ServiceInfosEditSocietyData()
export default ServiceInfosEditSocietyObj
