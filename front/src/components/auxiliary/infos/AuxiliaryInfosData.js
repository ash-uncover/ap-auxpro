import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import AuxiliaryHelper from 'helpers/AuxiliaryHelper'
import I18NHelper from 'helpers/I18NHelper'
import { BaseData, Formatters, MomentHelper } from 'ap-react-bootstrap'

import AuxiliaryFields from 'utils/entities/AuxiliaryFields'

import AuxiliarySkills from 'utils/constants/AuxiliarySkills'

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
      AuxiliaryFields.DIPLOMA
    ]
    this.FIELDS_FORM4 = AuxiliarySkills.VALUES.map((skill) => Object.assign(
        { defaultValue: 0, hidden: this.checkSkillHidden.bind(this, skill) },
        skill
    ))

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

    const auxiliary = AuxiliaryHelper.getData(AuthHelper.getEntityId()) || {}

    this.FIELDS.forEach((field) => {
      if (field.formatter) {
        this.obj.state[field.key] = field.formatter(auxiliary[field.key])
      } else {
        this.obj.state[field.key] = auxiliary[field.key]
      }
    })
  }

  unregister() {
  }

  checkSkillHidden(skill) {
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
