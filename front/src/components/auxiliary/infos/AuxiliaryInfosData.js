import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import AuxiliaryHelper from 'helpers/AuxiliaryHelper'
import I18NHelper from 'helpers/I18NHelper'
import { BaseData, Formatters, MomentHelper } from 'ap-react-bootstrap'

import AuxiliaryFields from 'utils/entities/AuxiliaryFields'

import AuxiliaryStatusUtils from 'utils-lib/entities/AuxiliaryStatusUtils'
import AuxiliarySkillsUtils from 'utils-lib/entities/AuxiliarySkillsUtils'
import BooleanUtils from 'utils-lib/BooleanUtils'
import DiplomaUtils from 'utils-lib/entities/DiplomaUtils'
import NationalityUtils from 'utils-lib/geo/NationalityUtils'
import StringUtils from 'utils-lib/StringUtils'

class AuxiliaryInfosData extends BaseData {

	constructor() {
		super(...arguments)

		this.FIELDS_FORM0 = [
			AuxiliaryFields.AVATAR,
			AuxiliaryFields.PROFIL_COMPLETED,
			AuxiliaryFields.PROFIL_PROGRESSION
		]
		this.FIELDS_FORM1 = [
			AuxiliaryFields.CIVILITY,
			AuxiliaryFields.FIRST_NAME,
			AuxiliaryFields.LAST_NAME,
			AuxiliaryFields.PHONE,
			AuxiliaryFields.SOCIAL_NUMBER
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
			Object.assign(AuxiliaryFields.DIPLOMA)
		]
		this.FIELDS_FORM4 = [
			Object.assign(
				{
					defaultValue: 0,
					name: 'SKILL_CHILDREN_CARE',
					hidden: this.checkSkillHidden.bind(this, AuxiliaryFields.SKILL_CHILDREN_CARE)
				},
				AuxiliaryFields.SKILL_CHILDREN_CARE
			),
			Object.assign(
				{
          defaultValue: 0,
          name: 'SKILL_CHILDREN_SCHOOL',
          hidden: this.checkSkillHidden.bind(this, AuxiliaryFields.SKILL_CHILDREN_SCHOOL) },
				AuxiliaryFields.SKILL_CHILDREN_SCHOOL
			),
			Object.assign(
				{
          defaultValue: 0,
          name: 'SKILL_CHILDREN_GAME',
          hidden: this.checkSkillHidden.bind(this, AuxiliaryFields.SKILL_CHILDREN_GAME) },
				AuxiliaryFields.SKILL_CHILDREN_GAME
			),
			Object.assign(
				{
          defaultValue: 0,
          name: 'SKILL_CHILDREN_KEEP',
          hidden: this.checkSkillHidden.bind(this, AuxiliaryFields.SKILL_CHILDREN_KEEP)
        },
				AuxiliaryFields.SKILL_CHILDREN_KEEP
			),
			Object.assign(
        {
          defaultValue: 0,
          name: 'SKILL_OLD_CARE',
          hidden: this.checkSkillHidden.bind(this, AuxiliaryFields.SKILL_OLD_CARE)
        },
				AuxiliaryFields.SKILL_OLD_CARE
			),
			Object.assign(
				{
          defaultValue: 0,
          name: 'SKILL_FOOD',
          hidden: this.checkSkillHidden.bind(this, AuxiliaryFields.SKILL_FOOD)
        },
				AuxiliaryFields.SKILL_FOOD
			),
			Object.assign(
        {
          defaultValue: 0,
          name: 'SKILL_TRANSPORT',
          hidden: this.checkSkillHidden.bind(this, AuxiliaryFields.SKILL_TRANSPORT)
        },
				AuxiliaryFields.SKILL_TRANSPORT
			),
			Object.assign(
        {
          defaultValue: 0,
          name: 'SKILL_ILLNESS',
          hidden: this.checkSkillHidden.bind(this, AuxiliaryFields.SKILL_ILLNESS)
        },
				AuxiliaryFields.SKILL_ILLNESS
			),
			Object.assign(
        {
          defaultValue: 0,
          name: 'SKILL_NURSING',
          hidden: this.checkSkillHidden.bind(this, AuxiliaryFields.SKILL_NURSING)
        },
				AuxiliaryFields.SKILL_NURSING
			),
			Object.assign(
        {
          defaultValue: 0,
          name: 'SKILL_CLOTHES',
          hidden: this.checkSkillHidden.bind(this, AuxiliaryFields.SKILL_CLOTHES)
        },
				AuxiliaryFields.SKILL_CLOTHES
			),
			Object.assign(
        {
          defaultValue: 0,
          name: 'SKILL_HOUSE',
          hidden: this.checkSkillHidden.bind(this, AuxiliaryFields.SKILL_HOUSE)
        },
				AuxiliaryFields.SKILL_HOUSE
			),
			Object.assign(
        {
          defaultValue: 0,
          name: 'SKILL_COMPANY',
          hidden: this.checkSkillHidden.bind(this, AuxiliaryFields.SKILL_COMPANY)
        },
				AuxiliaryFields.SKILL_COMPANY
			),
			Object.assign(
        {
          defaultValue: 0,
          name: 'SKILL_PET',
          hidden: this.checkSkillHidden.bind(this, AuxiliaryFields.SKILL_PET)
        },
				AuxiliaryFields.SKILL_PET
			),
			Object.assign(
        {
          defaultValue: 0,
          name: 'SKILL_HANDICAP',
          hidden: this.checkSkillHidden.bind(this, AuxiliaryFields.SKILL_HANDICAP)
        },
				AuxiliaryFields.SKILL_HANDICAP
			),
			Object.assign(
        {
          defaultValue: 0,
          name: 'SKILL_BEAUTY',
          hidden: this.checkSkillHidden.bind(this, AuxiliaryFields.SKILL_BEAUTY)
        },
				AuxiliaryFields.SKILL_BEAUTY
			)
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

	checkSkillHidden(skill) {
		console.log(this.getState('diploma'))
    console.log(skill.key)
    console.log(AuxiliarySkillsUtils.getDiplomasSkills(this.getState('diploma')).indexOf(skill.key) === -1)
		//console.log(AuxiliarySkillsUtils.getDiplomasSkills(this.getState('diploma')))
    return AuxiliarySkillsUtils.getDiplomasSkills(this.getState('diploma')).indexOf(skill.key) === -1
	}
	// View callbacks //
	// --------------------------------------------------------------------------------

	onModifyInfos() {
		AppHelper.navigate('/auxiliary/infos/edit/infos')
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

const AuxiliaryInfosObj = new AuxiliaryInfosData()
export default AuxiliaryInfosObj
