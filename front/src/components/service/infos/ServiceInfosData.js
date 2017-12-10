import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import ServiceHelper from 'helpers/ServiceHelper'
import { BaseData, Formatters } from 'ap-react-bootstrap'

import ServiceFields from 'utils/entities/ServiceFields'

import SocFunctionUtils from 'utils-lib/entities/SocFunctionUtils'

class ServiceInfosData extends BaseData {

	constructor() {
		super(...arguments)
				
		this.FIELDS_FORM0 = [
			ServiceFields.AVATAR
		]
		this.FIELDS_FORM1 = [
			ServiceFields.SOCIAL_REASON,
			Object.assign({ formatter: SocFunctionUtils.getName }, ServiceFields.FUNCTION),
			ServiceFields.SIRET,
			Object.assign({ formatter: Formatters.Phone.getFormattedValue }, ServiceFields.PHONE)
		]
		this.FIELDS_FORM2 = [
			ServiceFields.ADDRESS,
			ServiceFields.POSTAL_CODE,
			ServiceFields.CITY,
			ServiceFields.COUNTRY
		]

		this.FIELDS = this.FIELDS_FORM0.concat(this.FIELDS_FORM1).concat(this.FIELDS_FORM2)
	}

	register(obj) {
		super.register(obj)

		this.declareFunction('onModifySociety')
		this.declareFunction('onModifyAccount')
		this.declareFunction('onModifyEmail')
		this.declareFunction('onModifyPassword')

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
		for (let i = 0; i < this.FIELDS.length; i++) {
			let field = this.FIELDS[i]
			if (field.formatter) {
				this.obj.state[field.key] = field.formatter(service[field.key])
			} else {
				this.obj.state[field.key] = service[field.key]
			}
		}
	}


	// View callbacks //
	// --------------------------------------------------------------------------------

	onModifySociety() {
		AppHelper.navigate('/service/infos/edit/society')
	}
	onModifyAccount() {
		AppHelper.navigate('/service/infos/edit/account')
	}
	onModifyEmail() {
		AppHelper.navigate('/service/infos/edit/email')
	}
	onModifyPassword() {
		AppHelper.navigate('/service/infos/edit/password')
	}
}
let ServiceInfosObj = new ServiceInfosData()
export default ServiceInfosObj
