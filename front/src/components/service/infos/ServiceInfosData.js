import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import { BaseData, Formatters } from 'ap-react-bootstrap'

import ServiceHelper from 'helpers/ServiceHelper'

import ServiceFields from 'utils/entities/ServiceFields'

import SocFunctionUtils from 'utils-lib/entities/SocFunctionUtils'

let FIELDS_FORM0 = [
	ServiceFields.AVATAR
]
let FIELDS_FORM1 = [
	ServiceFields.SOCIAL_REASON,
	Object.assign({ formatter: SocFunctionUtils.getName }, ServiceFields.FUNCTION),
	ServiceFields.SIRET,
	Object.assign({ formatter: Formatters.Phone.getFormattedValue }, ServiceFields.PHONE)
	
]
let FIELDS_FORM2 = [
	ServiceFields.ADDRESS,
	ServiceFields.POSTAL_CODE,
	ServiceFields.CITY,
	ServiceFields.COUNTRY
]
let FIELDS_FORM3 = [
	ServiceFields.EMAIL,
	ServiceFields.ACCOUNT_TYPE,
	Object.assign({ formatter: Formatters.Date.getFormattedValue }, ServiceFields.ACCOUNT_EXPIRY_DATE)
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
			if (field.formatter) {
				this.obj.state[field.key] = field.formatter(service[field.key])
			} else {
				this.obj.state[field.key] = service[field.key]
			}
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
