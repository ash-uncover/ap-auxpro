import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import AuxiliaryHelper from 'helpers/AuxiliaryHelper'
import { BaseData, Formatters, MomentHelper } from 'ap-react-bootstrap'

import AuxiliaryFields from 'utils/entities/AuxiliaryFields'

import AuxiliaryStatusUtils from 'utils-lib/entities/AuxiliaryStatusUtils'
import BooleanUtils from 'utils-lib/BooleanUtils'
import DiplomaUtils from 'utils-lib/entities/DiplomaUtils'
import NationalityUtils from 'utils-lib/geo/NationalityUtils'
import StringUtils from 'utils-lib/StringUtils'

class AuxiliaryInfosData extends BaseData {

	constructor() {
		super(...arguments)

		this.FIELDS_FORM0 = [
			AuxiliaryFields.AVATAR,
			AuxiliaryFields.ARE_SKILL_SET,
			AuxiliaryFields.PROFIL_COMPLETED,
			AuxiliaryFields.PROFIL_PROGRESSION
		]
		this.FIELDS_FORM1 = [
			AuxiliaryFields.CIVILITY,
			AuxiliaryFields.FIRST_NAME,
			AuxiliaryFields.LAST_NAME,
			AuxiliaryFields.PHONE,
			AuxiliaryFields.SOCIAL_NUMBER,
			AuxiliaryFields.ID_CARD_NUMBER
		]
		this.FIELDS_FORM2 = [
			AuxiliaryFields.ADDRESS,
			AuxiliaryFields.POSTAL_CODE,
			AuxiliaryFields.CITY,
			AuxiliaryFields.COUNTRY,
			Object.assign({ formatter: NationalityUtils.getNationalityFem }, AuxiliaryFields.NATIONALITY),
			AuxiliaryFields.BIRTH_CITY,
			AuxiliaryFields.BIRTH_COUNTRY,
			Object.assign({ formatter: MomentHelper.localDateToHumanDate }, AuxiliaryFields.BIRTH_DATE)
		]
		this.FIELDS_FORM3 = [
			AuxiliaryFields.DESCRIPTION,
			Object.assign({ formatter: AuxiliaryStatusUtils.getName }, AuxiliaryFields.IS_ENTREPRENEUR),
			Object.assign({ formatter: DiplomaUtils.getList }, AuxiliaryFields.DIPLOMA)
		]
		this.FIELDS_FORM4 = [
			Object.assign({ defaultValue: 0 }, AuxiliaryFields.SKILL_ADMINISTRATIVE),
			Object.assign({ defaultValue: 0 }, AuxiliaryFields.SKILL_CHILDHOOD),
			Object.assign({ defaultValue: 0 }, AuxiliaryFields.SKILL_COMPAGNY),
			Object.assign({ defaultValue: 0 }, AuxiliaryFields.SKILL_DOITYOURSELF),
			Object.assign({ defaultValue: 0 }, AuxiliaryFields.SKILL_HOUSEWORK),
			Object.assign({ defaultValue: 0 }, AuxiliaryFields.SKILL_NURSING),
			Object.assign({ defaultValue: 0 }, AuxiliaryFields.SKILL_SHOPPING)
		]

		this.FIELDS = this.FIELDS_FORM0.
			concat(this.FIELDS_FORM1).
			concat(this.FIELDS_FORM2).
			concat(this.FIELDS_FORM3).
			concat(this.FIELDS_FORM4)
	}

	register(obj) {
		super.register(obj)
		
		this.declareFunction('onModifyInfos')
		this.declareFunction('onModifyQuestionary')
		this.declareFunction('onViewQuestionary')
		this.declareFunction('onModifyAccount')
		this.declareFunction('onModifyEmail')
		this.declareFunction('onModifyPassword')

		let auxiliary = AuxiliaryHelper.getData(AuthHelper.getEntityId()) || {}
		for (let i = 0; i < this.FIELDS.length; i++) {
			let field = this.FIELDS[i]
			if (field.formatter) {
				this.obj.state[field.key] = field.formatter(auxiliary[field.key])
			} else {
				this.obj.state[field.key] = auxiliary[field.key]
			}
		}
	}

	unregister() {
	}


	// View callbacks //
	// --------------------------------------------------------------------------------

	onModifyInfos() {
		AppHelper.navigate('/auxiliary/infos/edit/infos')
	}
	onModifyQuestionary() {
		AppHelper.navigate('/auxiliary/infos/edit/questionary')
	}
	onViewQuestionary() {
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
export default AuxiliaryInfosObj
