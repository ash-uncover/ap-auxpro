import moment from 'moment'
import { BaseData, Nationality, Validators, MomentHelper } from 'ap-react-bootstrap'
// helpers
import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import AuxiliaryHelper from 'helpers/AuxiliaryHelper'
import ErrorHelper from 'helpers/ErrorHelper'
import GeozoneHelper from 'helpers/GeozoneHelper'
// utils
import Civility from 'utils/constants/Civility'
import AuxiliaryFields from 'utils/entities/AuxiliaryFields'
// utils-lib
import AuxiliaryUtils from 'utils-lib/entities/AuxiliaryUtils'
import AuxiliaryStatusUtils from 'utils-lib/entities/AuxiliaryStatusUtils'
import NationalityUtils from 'utils-lib/geo/NationalityUtils'
import DiplomaUtils from 'utils-lib/entities/DiplomaUtils'

class AuxiliaryInitialData extends BaseData {

	constructor() {
		super(...arguments)

		this.FIELDS = {
			LATTITUDE: Object.assign(
				{},
				AuxiliaryFields.LATTITUDE,
				{ validator: this.checkLattitude.bind(this) }
			),
			LONGITUDE: Object.assign(
				{},
				AuxiliaryFields.LONGITUDE,
				{ validator: this.checkLongitude.bind(this) }
			),
			CIVILITY: Object.assign(
				{ defaultValue: Civility.MME.key, form: 'select', name: AuxiliaryUtils.getFieldName(AuxiliaryFields.CIVILITY) }, 
				AuxiliaryFields.CIVILITY,
				{ validator: this.checkCivility.bind(this) }
			),
			FIRST_NAME: Object.assign(
				{ defaultValue: '', form: 'input', name: AuxiliaryUtils.getFieldName(AuxiliaryFields.FIRST_NAME) }, 
				AuxiliaryFields.FIRST_NAME,
				{ validator: this.checkFirstName.bind(this) }
			),
			LAST_NAME: Object.assign(
				{ defaultValue: '', form: 'input', name: AuxiliaryUtils.getFieldName(AuxiliaryFields.LAST_NAME) }, 
				AuxiliaryFields.LAST_NAME,
				{ validator: this.checkLastName.bind(this) }
			),
			PHONE: Object.assign(
				{ defaultValue: '', form: 'input', name: AuxiliaryUtils.getFieldName(AuxiliaryFields.PHONE) }, 
				AuxiliaryFields.PHONE,
				{ validator: this.checkPhone.bind(this) }
			),
			NATIONALITY: Object.assign(
				{ defaultValue: Nationality.FR.key, form: 'select', name: AuxiliaryUtils.getFieldName(AuxiliaryFields.NATIONALITY) }, 
				AuxiliaryFields.NATIONALITY,
				{ validator: this.checkNationality.bind(this), values: NationalityUtils.getNationalities() }
			),
			BIRTH_DATE: Object.assign(
				{ defaultValue: [1980,1,1], form: 'date', name: AuxiliaryUtils.getFieldName(AuxiliaryFields.BIRTH_DATE) }, 
				AuxiliaryFields.BIRTH_DATE,
				{ validator: this.checkBirthDate.bind(this) }
			),
			BIRTH_CITY: Object.assign(
				{ defaultValue: '', form: 'input', name: AuxiliaryUtils.getFieldName(AuxiliaryFields.BIRTH_CITY) }, 
				AuxiliaryFields.BIRTH_CITY,
				{ validator: this.checkBirthCity.bind(this) }
			),
			BIRTH_COUNTRY: Object.assign(
				{ defaultValue: '', form: 'input', name: AuxiliaryUtils.getFieldName(AuxiliaryFields.BIRTH_COUNTRY) }, 
				AuxiliaryFields.BIRTH_COUNTRY,
				{ validator: this.checkBirthCountry.bind(this) }
			),
			ADDRESS: Object.assign(
				{ defaultValue: '', form: 'static', name: AuxiliaryUtils.getFieldName(AuxiliaryFields.ADDRESS) }, 
				AuxiliaryFields.ADDRESS,
				{ validator: this.checkAddress.bind(this) }
			),
			POSTAL_CODE: Object.assign(
				{ defaultValue: '', form: 'static', name: AuxiliaryUtils.getFieldName(AuxiliaryFields.POSTAL_CODE) }, 
				AuxiliaryFields.POSTAL_CODE,
				{ validator: this.checkPostalCode.bind(this) }
			),
			CITY: Object.assign(
				{ defaultValue: '', form: 'static', name: AuxiliaryUtils.getFieldName(AuxiliaryFields.CITY) }, 
				AuxiliaryFields.CITY,
				{ validator: this.checkCity.bind(this) }
			),
			COUNTRY: Object.assign(
				{ defaultValue: '', form: 'static', name: AuxiliaryUtils.getFieldName(AuxiliaryFields.COUNTRY) }, 
				AuxiliaryFields.COUNTRY,
				{ validator: this.checkCountry.bind(this) }
			),
			ADDRESS_SEARCH: Object.assign(
				{ form: 'address', key: 'addressSearch', name: 'Adresse' },
				{ validator: this.checkAddressSearch.bind(this) }
			),
			SOCIAL_NUMBER: Object.assign(
				{ defaultValue: '', form: 'input', name: AuxiliaryUtils.getFieldName(AuxiliaryFields.SOCIAL_NUMBER) }, 
				AuxiliaryFields.SOCIAL_NUMBER,
				{ validator: this.checkSocialNumber.bind(this) }
			),
			IS_ENTREPRENEUR: Object.assign(
				{ defaultValue: 'true', form: 'select', name: AuxiliaryUtils.getFieldName(AuxiliaryFields.IS_ENTREPRENEUR) }, 
				AuxiliaryFields.IS_ENTREPRENEUR,
				{ validator: this.checkIsEntrepreneur.bind(this), values: AuxiliaryStatusUtils.getValues() }
			),
			DIPLOMA: Object.assign(
				{ defaultValue: [], form: 'selectmulti', name: AuxiliaryUtils.getFieldName(AuxiliaryFields.DIPLOMA) }, 
				AuxiliaryFields.DIPLOMA,
				{ validator: this.checkDiploma.bind(this), values: DiplomaUtils.getDiplomas() }
			)
		}

		this.FIELDS_FORM1 = [
			this.FIELDS.CIVILITY,
			this.FIELDS.FIRST_NAME,
			this.FIELDS.LAST_NAME,
			this.FIELDS.PHONE,
			this.FIELDS.NATIONALITY,
			this.FIELDS.BIRTH_DATE,
			this.FIELDS.BIRTH_CITY,
			this.FIELDS.BIRTH_COUNTRY
		]

		this.FIELDS_FORM2 = [
			this.FIELDS.ADDRESS_SEARCH,
			this.FIELDS.ADDRESS,
			this.FIELDS.POSTAL_CODE,
			this.FIELDS.CITY,
			this.FIELDS.COUNTRY,
			this.FIELDS.SOCIAL_NUMBER,
			this.FIELDS.IS_ENTREPRENEUR			
		]
		this.FIELDS_FORM3 = [
			this.FIELDS.DIPLOMA
		]
	}

	register(obj) {
		super.register(obj)
		
		this.declareFunction('onSubmit')

		this.obj.state.errorShow = false
		this.obj.state.errorMsg = []
		this.obj.state.warningShow = false
		this.obj.state.warningMsg = []

		this.loadAuxiliary(AuxiliaryHelper.getData(AuthHelper.getEntityId()))
		this.checkAuxiliary()

		if (!this.getState('warningShow')) {
			this.obj.state.isAccountUpdate = true
		}	
		
		ErrorHelper.register('PUT_AUXILIARY', this, this.handlePutAuxiliaryError.bind(this))
		ErrorHelper.register('GET_AUXILIARY', this, this.handleGetAuxiliaryError.bind(this))
		ErrorHelper.register('GET_AUXILIARY_GEOZONES', this, this.handleGetAuxiliaryGeozonesError.bind(this))
	}

	unregister() {
		ErrorHelper.unregister(this)
	}


	// Store notifications //
	// --------------------------------------------------------------------------------

	handlePutAuxiliaryError() {
		console.log(ErrorHelper.getData('PUT_AUXILIARY'))
	}

	handleGetAuxiliaryError() {
		console.log(ErrorHelper.getData('GET_AUXILIARY'))
	}
	
	handleGetAuxiliaryGeozonesError() {
		console.log(ErrorHelper.getData('GET_AUXILIARY_GEOZONES'))
	}


	// View callbacks //
	// --------------------------------------------------------------------------------

	onChange(id, event, value) {
		// State global update
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
		} else if (id === AuxiliaryFields.DIPLOMA.key) {
			this.obj.state[id] = DiplomaUtils.resolveDiplomas(this.getState(AuxiliaryFields.DIPLOMA.key), value)
		} else if (id === AuxiliaryFields.AVATAR.key) {
			this.obj.state.avatarFile = event
		} else if (id === AuxiliaryFields.PHONE.key && Validators.Phone.getBlockedValue(value) !== value) {
			this.forceUpdate()
			return
		} else if (id === AuxiliaryFields.SOCIAL_NUMBER.key && Validators.SocialNumberShort.getBlockedValue(value) !== value) {
			this.forceUpdate()
			return
		} else {
			this.obj.state[id] = value
		}
		// Check data consistency
		this.checkAuxiliary()
		// Update component
		this.forceUpdate()
	}

	onSubmit() {
		AppHelper.setBusy(true).
		then(function (oResult) {
			return AuxiliaryHelper.putAuxiliary(this.buildAuxiliary())
		}.bind(this)).
		then(function () {
			return AuxiliaryHelper.getAuxiliary(AuthHelper.getEntityId())
		}).
		then(function () {
			return GeozoneHelper.getAuxiliaryGeozones(AuthHelper.getEntityId())
		}).
		then(function () {
			setTimeout(AppHelper.setBusy, 200)
			return AppHelper.navigate('/auxiliary/redirect')
		}).
		catch(function (error) {
			setTimeout(AppHelper.setBusy, 200)
			console.error('Auxiliary initial error')
			console.error(error)
		})
	}


	// Internal methods //
	// --------------------------------------------------------------------------------

	buildAuxiliary() {
		let auxiliary = AuxiliaryHelper.getData(AuthHelper.getEntityId())
		for (let f in this.FIELDS) {
			let field = this.FIELDS[f]
			if (AuxiliaryFields.get(field.key)) {
				auxiliary[field.key] = this.getState(field.key)
			}
		}
		return auxiliary
	}

	loadAuxiliary(auxiliary) {
		for (let f in this.FIELDS) {
			let field = this.FIELDS[f]
			let value = auxiliary[field.key] || field.defaultValue
			this.obj.state[field.key] = field.formatter ? field.formatter(value) : value
		}
		if (auxiliary.avatar) {
			this.obj.state.avatarSrc = ImageHelper.getData(this.obj.state.avatar)
		}
		if (auxiliary.diplomaImage) {
			this.obj.state.diplomaImageSrc = ImageHelper.getData(this.obj.state.diplomaImage)
		}
	}

	checkAuxiliary() {
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
	checkCivility() {
		return this.getState(this.FIELDS.CIVILITY.key) ? 
			{ state: 'success' } : 
			{ state: 'error', message: 'Veuillez renseigner votre civilité' }
	}
	checkFirstName() {
		return this.getState(this.FIELDS.FIRST_NAME.key) ? 
			{ state: 'success' } : 
			{ state: 'error', message: 'Veuillez saisir votre prénom' }
	}
	checkLastName() {
		return this.getState(this.FIELDS.LAST_NAME.key) ? 
			{ state: 'success' } : 
			{ state: 'error', message: 'Veuillez saisir votre nom' }
	}
	checkPhone() {
		return Validators.Phone.getState(this.getState(this.FIELDS.PHONE.key)) === 'success' ?
			{ state: 'success' } :
			{ state: 'error', message: 'Veuilez saisir un numéro de téléphone valide' }
	}
	checkNationality() {
		return this.getState(this.FIELDS.NATIONALITY.key) ? 
			{ state: 'success' } : 
			{ state: 'error', message: 'Veuillez sélectionner votre nationnalité' }
	}
	checkBirthCity() {
		return this.getState(this.FIELDS.BIRTH_CITY.key) ? 
			{ state: 'success' } : 
			{ state: 'error', message: 'Veuillez saisir votr eville de naissance' }
	}
	checkBirthCountry() {
		return this.getState(this.FIELDS.BIRTH_COUNTRY.key) ? 
			{ state: 'success' } : 
			{ state: 'error', message: 'Veuillez saisir votre pays de naissance' }
	}
	checkBirthDate() {
		let birthMoment = MomentHelper.fromLocalDate(this.getState('birthDate'))
		let currentMoment = moment()
		return birthMoment.isBefore(currentMoment) ?
			{ state: 'success' } :
			{ state: 'error', message: "La date de naissance n'est pas valide" }
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
	checkSocialNumber() {
		return Validators.SocialNumberShort.getState(this.getState(this.FIELDS.SOCIAL_NUMBER.key)) === 'success' ? 
			{ state: 'success' } : 
			{ state: 'error', message: 'Veuillez saisir les 7 premiers chiffres de votre numéro de sécurité sociale' }
	}
	checkIsEntrepreneur() {
		return this.getState(this.FIELDS.IS_ENTREPRENEUR.key) ? 
			{ state: 'success' } : 
			{ state: 'error', message: 'Veuillez saisir un type de mission' }
	}
	checkDiploma() {
		return this.getState(this.FIELDS.DIPLOMA.key) && this.getState(this.FIELDS.DIPLOMA.key).length ? 
			{ state: 'success' } : 
			{ state: 'error', message: 'Veuillez préciser vos diplômes' }
	}
}
let AuxiliaryInitialObj = new AuxiliaryInitialData()
export default AuxiliaryInitialObj
