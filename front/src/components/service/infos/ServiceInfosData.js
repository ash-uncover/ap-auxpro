import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import { BaseData } from 'ap-react-bootstrap'

import ServiceHelper from 'helpers/ServiceHelper'

import ServiceFields from 'utils/entities/ServiceFields'

let FIELDS_FORM0 = [
	ServiceFields.AVATAR
]
let FIELDS_FORM1 = [
	ServiceFields.SOCIAL_REASON,
	ServiceFields.FUNCTION,
	ServiceFields.SIRET,
	ServiceFields.PHONE
]
let FIELDS_FORM2 = [
	ServiceFields.ADDRESS,
	ServiceFields.POSTAL_CODE,
	ServiceFields.CITY,
	ServiceFields.COUNTRY
]
let FIELDS_FORM3 = [
]

let FIELDS = FIELDS_FORM0.concat(FIELDS_FORM1).concat(FIELDS_FORM2).concat(FIELDS_FORM3)

class ServiceInfosData extends BaseData {

	register(obj) {
		super.register(obj)
		
		this.obj.onModifySociety = AppHelper.navigate.bind(AppHelper, '/service/infos/edit/society')
		this.obj.onModifyPhoto = AppHelper.navigate.bind(AppHelper, '/service/infos/edit/photo')
		this.obj.onModifyAccount = AppHelper.navigate.bind(AppHelper, '/service/infos/edit/account')

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
			this.obj.state[field.key] = service[field.key]
		}
	}

	// View callbacks //
	// --------------------------------------------------------------------------------

}
var ServiceInfosObj = new ServiceInfosData()
ServiceInfosObj.FIELDS = FIELDS
ServiceInfosObj.FIELDS_FORM1 = FIELDS_FORM1
ServiceInfosObj.FIELDS_FORM2 = FIELDS_FORM2
ServiceInfosObj.FIELDS_FORM3 = FIELDS_FORM3
export default ServiceInfosObj
