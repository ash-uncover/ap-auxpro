import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import AuxiliaryHelper from 'helpers/AuxiliaryHelper'
import { BaseData, Formatters } from 'ap-react-bootstrap'

import AuxiliaryFields from 'utils/entities/AuxiliaryFields'
import BooleanUtils from 'utils-lib/BooleanUtils'

let FIELDS_FORM0 = [
	AuxiliaryFields.AVATAR
]
let FIELDS_FORM1 = [
	AuxiliaryFields.CIVILITY,
	AuxiliaryFields.FIRST_NAME,
	AuxiliaryFields.LAST_NAME,
	AuxiliaryFields.EMAIL,
	AuxiliaryFields.PHONE,
	AuxiliaryFields.SOCIAL_NUMBER,
	AuxiliaryFields.ID_CARD_NUMBER
]
let FIELDS_FORM2 = [
	AuxiliaryFields.ADDRESS,
	AuxiliaryFields.POSTAL_CODE,
	AuxiliaryFields.CITY,
	AuxiliaryFields.COUNTRY,
	AuxiliaryFields.NATIONALITY,
	AuxiliaryFields.BIRTH_CITY,
	AuxiliaryFields.BIRTH_COUNTRY,
	AuxiliaryFields.BIRTH_DATE
]
let FIELDS_FORM3 = [
	AuxiliaryFields.DIPLOMA_IMAGE
]
let FIELDS_FORM4 = [
	AuxiliaryFields.DIPLOMA,
	AuxiliaryFields.DESCRIPTION,
	Object.assign({ formatter: BooleanUtils.formatBoolean }, AuxiliaryFields.IS_ENTREPRENEUR)
]
let FIELDS_FORM5 = [
	Object.assign({ defaultValue: 0 }, AuxiliaryFields.SKILL_ADMINISTRATIVE),
	Object.assign({ defaultValue: 0 }, AuxiliaryFields.SKILL_CHILDHOOD),
	Object.assign({ defaultValue: 0 }, AuxiliaryFields.SKILL_COMPAGNY),
	Object.assign({ defaultValue: 0 }, AuxiliaryFields.SKILL_DOITYOURSELF),
	Object.assign({ defaultValue: 0 }, AuxiliaryFields.SKILL_HOUSEWORK),
	Object.assign({ defaultValue: 0 }, AuxiliaryFields.SKILL_NURSING),
	Object.assign({ defaultValue: 0 }, AuxiliaryFields.SKILL_SHOPPING)
]

let FIELDS = FIELDS_FORM0.concat(FIELDS_FORM1).concat(FIELDS_FORM2).concat(FIELDS_FORM3).concat(FIELDS_FORM4).concat(FIELDS_FORM5)

class AuxiliaryInfosData extends BaseData {

	register(obj) {
		super.register(obj)
		
		this.declareFunction('onModifyInfos')
		this.declareFunction('onModifyQuestionary')
		this.declareFunction('onShowQuestionary')
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
		this.obj.state.areSkillSet = service.areSkillSet
	}


	// View callbacks //
	// --------------------------------------------------------------------------------

	onModifyInfos() {
		AppHelper.navigate('/auxiliary/infos/edit/infos')
	}
	onModifyQuestionary() {
		AppHelper.navigate('/auxiliary/infos/edit/questionary')
	}
	onShowQuestionary() {
		AppHelper.navigate('/auxiliary/infos/questionary')
	}
	onModifyAccount() {
		AppHelper.navigate('/auxiliary/infos/edit/account')
	}
	onModifyEmail() {
		AppHelper.navigate('/auxiliary/infos/edit/email')
	}
	onModifyPassword() {
		AppHelper.navigate('/auxiliary/infos/edit/password')
	}
}

let AuxiliaryInfosObj = new AuxiliaryInfosData()
AuxiliaryInfosObj.FIELDS = FIELDS
AuxiliaryInfosObj.FIELDS_FORM1 = FIELDS_FORM1
AuxiliaryInfosObj.FIELDS_FORM2 = FIELDS_FORM2
AuxiliaryInfosObj.FIELDS_FORM3 = FIELDS_FORM3
AuxiliaryInfosObj.FIELDS_FORM4 = FIELDS_FORM4
export default AuxiliaryInfosObj
