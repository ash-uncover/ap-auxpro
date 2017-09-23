import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import AuxiliaryHelper from 'helpers/AuxiliaryHelper'
import { BaseData, Formatters } from 'ap-react-bootstrap'

import AuxiliaryFields from 'utils/entities/AuxiliaryFields'

let FIELDS_FORM0 = [
	AuxiliaryFields.AVATAR
]
let FIELDS_FORM1 = [
	AuxiliaryFields.FIRST_NAME,
	AuxiliaryFields.LAST_NAME
]
let FIELDS_FORM2 = [
	AuxiliaryFields.ADDRESS,
	AuxiliaryFields.POSTAL_CODE,
	AuxiliaryFields.CITY,
	AuxiliaryFields.COUNTRY
]
let FIELDS_FORM3 = [
	AuxiliaryFields.EMAIL,
	AuxiliaryFields.ACCOUNT_TYPE,
	Object.assign({ formatter: Formatters.Date.getFormattedValue }, AuxiliaryFields.ACCOUNT_EXPIRY_DATE)
]

let FIELDS = FIELDS_FORM0.concat(FIELDS_FORM1).concat(FIELDS_FORM2).concat(FIELDS_FORM3)

class AuxiliaryInfosData extends BaseData {

	register(obj) {
		super.register(obj)
		
		this.declareFunction('onModifyPerso')
		this.declareFunction('onModifyPro')
		this.declareFunction('onModifyAccount')
		this.declareFunction('onModifyEmail')
		this.declareFunction('onModifyPassword')

		this.obj.state = {}

		this._onAuxiliaryUpdate()
	}

	unregister() {
	}


	// Store notifications //
	// --------------------------------------------------------------------------------

	onAuxiliaryUpdate() {
		this._onAuxiliaryUpdate()
		this.setState({})
	}

	_onAuxiliaryUpdate() {
		let service = AuxiliaryHelper.getData(AuthHelper.getEntityId()) || {}
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

	onModifyPerso() {
		AppHelper.navigate('/service/infos/edit/perso')
	}
	onModifyPro() {
		AppHelper.navigate('/service/infos/edit/pro')
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
var AuxiliaryInfosObj = new AuxiliaryInfosData()
AuxiliaryInfosObj.FIELDS = FIELDS
AuxiliaryInfosObj.FIELDS_FORM1 = FIELDS_FORM1
AuxiliaryInfosObj.FIELDS_FORM2 = FIELDS_FORM2
AuxiliaryInfosObj.FIELDS_FORM3 = FIELDS_FORM3
export default AuxiliaryInfosObj
