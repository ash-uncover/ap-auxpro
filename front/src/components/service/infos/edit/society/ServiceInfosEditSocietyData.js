import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import ImageHelper from 'helpers/ImageHelper'
import { BaseData, Formatters } from 'ap-react-bootstrap'

import ServiceHelper from 'helpers/ServiceHelper'

import ServiceFields from 'utils/entities/ServiceFields'

import SocFunctionUtils from 'utils-lib/entities/SocFunctionUtils'

let FIELDS_FORM0 = [
	ServiceFields.AVATAR
]
let FIELDS_FORM1 = [
	Object.assign({ defaultValue: '', form: 'input' }, ServiceFields.SOCIAL_REASON),
	Object.assign({ defaultValue: 'MAND', form: 'select' }, ServiceFields.FUNCTION, { values: SocFunctionUtils.getValues() }),
	Object.assign({ defaultValue: '', form: 'input' }, ServiceFields.SIRET),
	Object.assign({ defaultValue: '', form: 'input' }, ServiceFields.PHONE)
	
]
let FIELDS_FORM2 = [
	{ form: 'address', key: 'addressSearch', name: 'Adresse' },
	Object.assign({ defaultValue: '', form: 'static' }, ServiceFields.ADDRESS),
	Object.assign({ defaultValue: '', form: 'static' }, ServiceFields.POSTAL_CODE),
	Object.assign({ defaultValue: '', form: 'static' }, ServiceFields.CITY),
	Object.assign({ defaultValue: '', form: 'static' }, ServiceFields.COUNTRY)
]
let FIELDS = FIELDS_FORM0.concat(FIELDS_FORM1).concat(FIELDS_FORM2)

class ServiceInfosEditSocietyData extends BaseData {

	register(obj) {
		super.register(obj)
		
		this.declareFunction('onCancel')
		this.declareFunction('onSubmit')
		this.declareFunction('onChangeDirty')
		this.declareFunction('onChangeAddress')
		this.declareFunction('onChangeImage')

		this.obj.state = {}

		this._onServiceUpdate()
	}

	unregister() {
	}


	// Store notifications //
	// --------------------------------------------------------------------------------

	onServiceUpdate() {
		this._onServiceUpdate()
		this.setState({})
	}

	_onServiceUpdate() {
		let service = ServiceHelper.getData(AuthHelper.getEntityId()) || {}
		for (let i = 0; i < FIELDS.length; i++) {
			let field = FIELDS[i]
			let value = service[field.key]
			this.obj.state[field.key] = value || field.defaultValue
		}
		if (service.avatar) {
			this.obj.state.avatarSrc = ImageHelper.getData(this.obj.state.avatar)
		}
	}


	// View callbacks //
	// --------------------------------------------------------------------------------

	onChangeDirty(id, event, value) {
		let data = {
			dirty: true,
			serviceValid: true
		}
		data[id] = value
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
			serviceValid: true
		}
		this.setState(data)
	}

	onChangeImage(file) {
		console.log(file)
		let data = {
			dirty: true,
			avatarFile: file
		}
		this.setState(data)
	}

	onCancel() {
		AppHelper.navigateBack()
	}

	buildService() {
		let service = ServiceHelper.getData(AuthHelper.getEntityId())
		for (let i = 0 ; i < FIELDS.length ; i++) {
			let field = FIELDS[i]
			if (ServiceFields.get(field.key)) {
				service[field.key] = this.getState(field.key)
			}
		}
		return service
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
			AppHelper.navigateBack()
			setTimeout(AppHelper.setBusy, 200)
		}).
		catch(function (error) {
			setTimeout(AppHelper.setBusy, 200)
			console.error('Service update error')
			console.error(error)
		})
	}

}

let ServiceInfosEditSocietyObj = new ServiceInfosEditSocietyData()
ServiceInfosEditSocietyObj.FIELDS = FIELDS
ServiceInfosEditSocietyObj.FIELDS_FORM1 = FIELDS_FORM1
ServiceInfosEditSocietyObj.FIELDS_FORM2 = FIELDS_FORM2
export default ServiceInfosEditSocietyObj
