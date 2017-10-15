import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import ErrorHelper from 'helpers/ErrorHelper'
import ServiceHelper from 'helpers/ServiceHelper'
import { BaseData } from 'ap-react-bootstrap'

import ServiceFields from 'utils/entities/ServiceFields'

import SocFunctionUtils from 'utils-lib/entities/SocFunctionUtils'
import SocFunction from 'utils/constants/SocFunction'

class ServiceInitialData extends BaseData {

	constructor() {
		super(...arguments)

		this.FIELDS_FORM0 = [
			ServiceFields.PROFIL_COMPLETED,
			ServiceFields.LATTITUDE,
			ServiceFields.LONGITUDE
		]
		this.FIELDS_FORM1 = [
			Object.assign({ defaultValue: '', form: 'input' }, ServiceFields.SOCIAL_REASON),
			Object.assign({ defaultValue: SocFunction.MAND.key, form: 'select' }, ServiceFields.FUNCTION, { values: SocFunctionUtils.getValues() }),
			Object.assign({ defaultValue: '', form: 'input' }, ServiceFields.SIRET),
			Object.assign({ defaultValue: '', form: 'input' }, ServiceFields.PHONE)
			
		]
		this.FIELDS_FORM2 = [
			{ form: 'address', key: 'addressSearch', name: 'Adresse' },
			Object.assign({ defaultValue: '', form: 'static' }, ServiceFields.ADDRESS),
			Object.assign({ defaultValue: '', form: 'static' }, ServiceFields.POSTAL_CODE),
			Object.assign({ defaultValue: '', form: 'static' }, ServiceFields.CITY),
			Object.assign({ defaultValue: '', form: 'static' }, ServiceFields.COUNTRY)
		]
		this.FIELDS = this.FIELDS_FORM0.concat(this.FIELDS_FORM1).concat(this.FIELDS_FORM2)

	}

	register(obj) {
		super.register(obj)
		
		this.declareFunction('isSubmitEnabled')
		this.declareFunction('onSubmit')

		let service = ServiceHelper.getData(AuthHelper.getEntityId()) || {}
		
		this.obj.state = {}

		for (let i = 0; i < this.FIELDS.length; i++) {
			let field = this.FIELDS[i]
			let value = service[field.key]
			this.obj.state[field.key] = value || field.defaultValue
		}

		ErrorHelper.register('PUT_SERVICE', this, this.handlePutServiceError.bind(this))
	}

	unregister() {
		ErrorHelper.unregister(this)
	}


	handlePutServiceError() {
		console.error(ErrorHelper.getData('PUT_SERVICE'))
	}


	// View callbacks //
	// --------------------------------------------------------------------------------

	onChange(id) {
		this.obj.state.dirty = true
		this.obj.state.errorJustHappened = false
		if (id === 'addressSearch') {
			this.onChangeAddress(...arguments)
		} else {
			this.onChangeDirty(...arguments)
		}
	}

	onChangeDirty(id, event, value) {
		this.obj.state[id] = value
		this.obj.state.valid = this.checkServiceValid()
		this.forceUpdate()
	}

	onChangeAddress(id, address) {
		this.obj.state.address = address.address
		this.obj.state.lattitude = address.lattitude
		this.obj.state.longitude = address.longitude
		this.obj.state.postalCode = address.postalCode
		this.obj.state.city = address.city
		this.obj.state.country = address.country
		this.obj.state.valid = this.checkServiceValid()
		this.forceUpdate()
	}

	onSubmit() {
		AppHelper.setBusy(true).
		then(function (oResult) {
			return ServiceHelper.putService(this.buildService())
		}.bind(this)).
		then(function () {
			return ServiceHelper.getService(AuthHelper.getEntityId())
		}).
		then(function () {
			setTimeout(AppHelper.setBusy, 200)
			return AppHelper.navigate('/service/redirect')
		}).
		catch(function (error) {
			this.setState({
				errorJustHappened: true
			})
			setTimeout(AppHelper.setBusy, 200)
			console.error('Service update error')
			console.error(error)
		})
	}

	// Internal methods //
	// --------------------------------------------------------------------------------

	isSubmitEnabled() {
		return this.getState('dirty') && this.getState('valid')
	}

	buildService() {
		let service = ServiceHelper.getData(AuthHelper.getEntityId())
		for (let i = 0 ; i < this.FIELDS.length ; i++) {
			let field = this.FIELDS[i]
			if (ServiceFields.get(field.key)) {
				service[field.key] = this.getState(field.key)
			}
		}
		return service
	}

	checkServiceValid() {
		for (let i = 0 ; i < this.FIELDS.length ; i++) {
			let field = this.FIELDS[i]
			if (field.validator && field.validator.getState(this.getState(field.key)) === 'error') {
				return false
			}
		}
		return true
	}
}

let ServiceInitialObj = new ServiceInitialData()
export default ServiceInitialObj
