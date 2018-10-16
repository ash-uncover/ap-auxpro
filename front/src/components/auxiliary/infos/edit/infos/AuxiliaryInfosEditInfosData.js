import moment from 'moment'
import validators from 'utils/validators'
import { STATES } from 'ap-validators'
import { BaseData, Nationality, MomentHelper } from 'ap-react-bootstrap'
// helpers
import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import I18NHelper from 'helpers/I18NHelper'
import ImageHelper from 'helpers/ImageHelper'
import AuxiliaryHelper from 'helpers/AuxiliaryHelper'
import ErrorHelper from 'helpers/ErrorHelper'
// utils
import AuxiliaryFields from 'utils/entities/AuxiliaryFields'
import AuxiliaryDiploma from 'utils/constants/AuxiliaryDiploma'
// utils-lib
import AuxiliaryUtils from 'utils-lib/entities/AuxiliaryUtils'
import AuxiliaryStatusUtils from 'utils-lib/entities/AuxiliaryStatusUtils'
import AuxiliarySkillsUtils from 'utils-lib/entities/AuxiliarySkillsUtils'
import BooleanUtils from 'utils-lib/BooleanUtils'
import DiplomaUtils from 'utils-lib/entities/DiplomaUtils'
import NationalityUtils from 'utils-lib/geo/NationalityUtils'

class AuxiliaryInfosEditInfosData extends BaseData {

  constructor() {
    super(...arguments)

    this.checkField = this._checkField.bind(this)
    this.handlePutAuxiliaryError = this.handlePutAuxiliaryError.bind(this)

    const AVATAR = AuxiliaryFields.AVATAR
    const PROFIL_COMPLETED = AuxiliaryFields.PROFIL_COMPLETED
    const LATTITUDE = AuxiliaryFields.LATTITUDE
    const LONGITUDE = AuxiliaryFields.LONGITUDE
    const CIVILITY = Object.assign(
      { defaultValue: 'Mme', form: 'select', name: AuxiliaryUtils.getFieldName(AuxiliaryFields.CIVILITY) }, 
      AuxiliaryFields.CIVILITY
    )
    const FIRST_NAME = Object.assign(
      { defaultValue: '', form: 'input', name: AuxiliaryUtils.getFieldName(AuxiliaryFields.FIRST_NAME) }, 
      AuxiliaryFields.FIRST_NAME
    )
    const LAST_NAME = Object.assign(
      { defaultValue: '', form: 'input', name: AuxiliaryUtils.getFieldName(AuxiliaryFields.LAST_NAME) }, 
      AuxiliaryFields.LAST_NAME
    )
    const PHONE = Object.assign(
      { defaultValue: '', form: 'input', name: AuxiliaryUtils.getFieldName(AuxiliaryFields.PHONE) }, 
      AuxiliaryFields.PHONE
    )
    const NATIONALITY = Object.assign(
      { defaultValue: 'FR', form: 'select', name: AuxiliaryUtils.getFieldName(AuxiliaryFields.NATIONALITY) }, 
      AuxiliaryFields.NATIONALITY,
      { values: NationalityUtils.getNationalities() }
    )
    const BIRTH_CITY = Object.assign(
      { defaultValue: '', form: 'input', name: AuxiliaryUtils.getFieldName(AuxiliaryFields.BIRTH_CITY) }, 
      AuxiliaryFields.BIRTH_CITY
    )
    const BIRTH_COUNTRY = Object.assign(
      { defaultValue: '', form: 'input', name: AuxiliaryUtils.getFieldName(AuxiliaryFields.BIRTH_COUNTRY) }, 
      AuxiliaryFields.BIRTH_COUNTRY
    )
    const BIRTH_DATE = Object.assign(
      { defaultValue: [1980,1,1], form: 'date', name: AuxiliaryUtils.getFieldName(AuxiliaryFields.BIRTH_DATE) }, 
      AuxiliaryFields.BIRTH_DATE
    )
    const ADDRESS = Object.assign(
      { defaultValue: '', form: 'static', name: AuxiliaryUtils.getFieldName(AuxiliaryFields.ADDRESS) }, 
      AuxiliaryFields.ADDRESS
    )
    const POSTAL_CODE = Object.assign(
      { defaultValue: '', form: 'static', name: AuxiliaryUtils.getFieldName(AuxiliaryFields.POSTAL_CODE) }, 
      AuxiliaryFields.POSTAL_CODE
    )
    const CITY = Object.assign(
      { defaultValue: '', form: 'static', name: AuxiliaryUtils.getFieldName(AuxiliaryFields.CITY) }, 
      AuxiliaryFields.CITY
    )
    const COUNTRY = Object.assign(
      { defaultValue: '', form: 'static', name: AuxiliaryUtils.getFieldName(AuxiliaryFields.COUNTRY) }, 
      AuxiliaryFields.COUNTRY
    )
    const ADDRESS_SEARCH = Object.assign(
      { form: 'address', key: 'addressSearch', name: 'Adresse' }
    )
    const SOCIAL_NUMBER = Object.assign(
      { defaultValue: '', form: 'input', name: AuxiliaryUtils.getFieldName(AuxiliaryFields.SOCIAL_NUMBER) }, 
      AuxiliaryFields.SOCIAL_NUMBER
    )
    const DESCRIPTION = Object.assign(
      { defaultValue: '', form: 'textarea', name: AuxiliaryUtils.getFieldName(AuxiliaryFields.DESCRIPTION) }, 
      AuxiliaryFields.DESCRIPTION
    )
    const IS_ENTREPRENEUR = Object.assign(
      { defaultValue: 'true', form: 'select', name: AuxiliaryUtils.getFieldName(AuxiliaryFields.IS_ENTREPRENEUR) }, 
      AuxiliaryFields.IS_ENTREPRENEUR, 
      { values: AuxiliaryStatusUtils.getValues() }
    )
    const DIPLOMA = Object.assign(
      { defaultValue: [], form: 'selectmulti', name: AuxiliaryUtils.getFieldName(AuxiliaryFields.DIPLOMA) }, 
      AuxiliaryFields.DIPLOMA, 
      { values: AuxiliaryDiploma.VALUES.map((value) => ({ key: value.key })) }
    )

    const SKILL_CHILDREN_CARE = Object.assign(
      {
        defaultValue: 0,
        name: 'SKILL_CHILDREN_CARE',
        hidden: this.checkSkillHidden.bind(this, AuxiliaryFields.SKILL_CHILDREN_CARE)
      },
      AuxiliaryFields.SKILL_CHILDREN_CARE
    )
    const SKILL_CHILDREN_SCHOOL = Object.assign(
      {
        defaultValue: 0,
        name: 'SKILL_CHILDREN_SCHOOL',
        hidden: this.checkSkillHidden.bind(this, AuxiliaryFields.SKILL_CHILDREN_SCHOOL)
      },
      AuxiliaryFields.SKILL_CHILDREN_SCHOOL
    )
    const SKILL_CHILDREN_GAME = Object.assign(
      {
        defaultValue: 0,
        name: 'SKILL_CHILDREN_GAME',
        hidden: this.checkSkillHidden.bind(this, AuxiliaryFields.SKILL_CHILDREN_GAME)
      },
      AuxiliaryFields.SKILL_CHILDREN_GAME
    )
    const SKILL_CHILDREN_KEEP = Object.assign(
      {
        defaultValue: 0,
        name: 'SKILL_CHILDREN_KEEP',
        hidden: this.checkSkillHidden.bind(this, AuxiliaryFields.SKILL_CHILDREN_KEEP)
      },
      AuxiliaryFields.SKILL_CHILDREN_KEEP
    )
    const SKILL_OLD_CARE = Object.assign(
      {
        defaultValue: 0,
        name: 'SKILL_OLD_CARE',
        hidden: this.checkSkillHidden.bind(this, AuxiliaryFields.SKILL_OLD_CARE)
      },
      AuxiliaryFields.SKILL_OLD_CARE
    )
    const SKILL_FOOD = Object.assign(
      {
        defaultValue: 0,
        name: 'SKILL_FOOD',
        hidden: this.checkSkillHidden.bind(this, AuxiliaryFields.SKILL_FOOD)
      },
      AuxiliaryFields.SKILL_FOOD
    )
    const SKILL_TRANSPORT = Object.assign(
      {
        defaultValue: 0,
        name: 'SKILL_TRANSPORT',
        hidden: this.checkSkillHidden.bind(this, AuxiliaryFields.SKILL_TRANSPORT)
      },
      AuxiliaryFields.SKILL_TRANSPORT
    )
    const SKILL_ILLNESS = Object.assign(
      {
        defaultValue: 0,
        name: 'SKILL_ILLNESS',
        hidden: this.checkSkillHidden.bind(this, AuxiliaryFields.SKILL_ILLNESS)
      },
      AuxiliaryFields.SKILL_ILLNESS
    )
    const SKILL_NURSING = Object.assign(
      {
        defaultValue: 0,
        name: 'SKILL_NURSING',
        hidden: this.checkSkillHidden.bind(this, AuxiliaryFields.SKILL_NURSING)
      },
      AuxiliaryFields.SKILL_NURSING
    )
    const SKILL_CLOTHES = Object.assign(
      {
        defaultValue: 0,
        name: 'SKILL_CLOTHES',
        hidden: this.checkSkillHidden.bind(this, AuxiliaryFields.SKILL_CLOTHES)
      },
      AuxiliaryFields.SKILL_CLOTHES
    )
    const SKILL_HOUSE = Object.assign(
      {
        defaultValue: 0,
        name: 'SKILL_HOUSE',
        hidden: this.checkSkillHidden.bind(this, AuxiliaryFields.SKILL_HOUSE)
      },
      AuxiliaryFields.SKILL_HOUSE
    )
    const SKILL_COMPANY = Object.assign(
      {
        defaultValue: 0,
        name: 'SKILL_COMPANY',
        hidden: this.checkSkillHidden.bind(this, AuxiliaryFields.SKILL_COMPANY)
      },
      AuxiliaryFields.SKILL_COMPANY
    )
    const SKILL_PET = Object.assign(
      {
        defaultValue: 0,
        name: 'SKILL_PET',
        hidden: this.checkSkillHidden.bind(this, AuxiliaryFields.SKILL_PET)
      },
      AuxiliaryFields.SKILL_PET
    )
    const SKILL_HANDICAP = Object.assign(
      {
        defaultValue: 0,
        name: 'SKILL_HANDICAP',
        hidden: this.checkSkillHidden.bind(this, AuxiliaryFields.SKILL_HANDICAP)
      },
      AuxiliaryFields.SKILL_HANDICAP
    )
    const SKILL_BEAUTY = Object.assign(
      {
        defaultValue: 0,
        name: 'SKILL_BEAUTY',
        hidden: this.checkSkillHidden.bind(this, AuxiliaryFields.SKILL_BEAUTY)
      },
      AuxiliaryFields.SKILL_BEAUTY
    )

    this.FIELDS = { 
      AVATAR,
      PROFIL_COMPLETED,
      LATTITUDE,
      LONGITUDE,
      CIVILITY,
      FIRST_NAME,
      LAST_NAME,
      PHONE,
      NATIONALITY,
      BIRTH_CITY,
      BIRTH_COUNTRY,
      BIRTH_DATE,
      ADDRESS,
      POSTAL_CODE,
      CITY,
      COUNTRY,
      ADDRESS_SEARCH,
      SOCIAL_NUMBER,
      DESCRIPTION,
      IS_ENTREPRENEUR,
      DIPLOMA,
      SKILL_CHILDREN_CARE,
      SKILL_CHILDREN_SCHOOL,
      SKILL_CHILDREN_GAME,
      SKILL_CHILDREN_KEEP,
      SKILL_OLD_CARE,
      SKILL_FOOD,
      SKILL_TRANSPORT,
      SKILL_ILLNESS,
      SKILL_NURSING,
      SKILL_CLOTHES,
      SKILL_HOUSE,
      SKILL_COMPANY,
      SKILL_PET,
      SKILL_HANDICAP,
      SKILL_BEAUTY
    }

    this.FIELDS_FORM1 = {
      CIVILITY,
      FIRST_NAME,
      LAST_NAME,
      PHONE,
      NATIONALITY,
      BIRTH_CITY,
      BIRTH_COUNTRY,
      BIRTH_DATE
    }
    this.FIELDS_FORM2 = {
      ADDRESS_SEARCH,
      ADDRESS,
      POSTAL_CODE,
      CITY,
      COUNTRY,
      SOCIAL_NUMBER
    }
    this.FIELDS_FORM3 = {
      DESCRIPTION,
      IS_ENTREPRENEUR
    }
    this.FIELDS_FORM4 = {
      DIPLOMA
    }
    this.FIELDS_FORM5 = {
      SKILL_CHILDREN_CARE,
      SKILL_CHILDREN_SCHOOL,
      SKILL_CHILDREN_GAME,
      SKILL_CHILDREN_KEEP,
      SKILL_OLD_CARE,
      SKILL_FOOD,
      SKILL_TRANSPORT,
      SKILL_ILLNESS,
      SKILL_NURSING,
      SKILL_CLOTHES,
      SKILL_HOUSE,
      SKILL_COMPANY,
      SKILL_PET,
      SKILL_HANDICAP,
      SKILL_BEAUTY
    }
  }

  register(obj) {
    super.register(obj)
    
    this.declareFunction('onCancel')
    this.declareFunction('onSubmit')

    this.obj.state.errorShow = false
    this.obj.state.errorMsg = []
    this.obj.state.warningShow = false
    this.obj.state.warningMsg = []

    this.loadAuxiliary(AuxiliaryHelper.getData(AuthHelper.getEntityId()) || {})
    this.checkAuxiliary()

    ErrorHelper.register('PUT_AUXILIARY', this.handlePutAuxiliaryError)
  }

  unregister() {
    ErrorHelper.unregister('PUT_AUXILIARY', this.handlePutAuxiliaryError)
  }

  // Store notification //
  // --------------------------------------------------------------------------------

  handlePutAuxiliaryError() {
    console.log(ErrorHelper.getData('PUT_AUXILIARY'))
  }


  // View callbacks //
  // --------------------------------------------------------------------------------

  onChange(id, value) {
    const field = this.FIELDS[id]

    if (field) {
      const state = field.validator && field.validator.VALIDATOR.check(value) || {}
      let newValue = value
      switch (field) {
      case this.FIELDS.ADDRESS_SEARCH:
        newValue = ''
        this.obj.state.address = value.address || ''
        this.obj.state.city = value.city || ''
        this.obj.state.postalCode = value.postalCode || ''
        this.obj.state.country = value.country || ''
        this.obj.state.lattitude = value.lattitude
        this.obj.state.longitude = value.longitude
        break
      case this.FIELDS.DIPLOMA:
        newValue = DiplomaUtils.resolveDiplomas(this.getState(AuxiliaryFields.DIPLOMA.key), value)
        break
      case this.FIELDS.AVATAR:
        this.obj.state.avatarFile = value
        break
      case this.FIELDS.PHONE:
      case this.FIELDS.SOCIAL_NUMBER:
        if (state.message === field.validator.ERRORS.MAX_LENGTH_EXCEEDED) {
          return
        }
        break
      }

      this.obj.state.dirty = true
      this.obj.state[field.key] = newValue

      // Check data consistency
      this.checkAuxiliary()
      // Update component
      this.forceUpdate()

    } else {
      console.error('Unknown field: ' + id)
    }   
  }

  onCancel() {
    AppHelper.navigateBack()
  }

  onSubmit() {
    AppHelper.setBusy(true).
    then(function() {
      let promises = []
      if (this.getState('avatarFile')) {
        promises.push(ImageHelper.postImage({
          name: 'avatar',
          file: this.getState('avatarFile')
        }))
      }
      if (this.getState('diplomaFile')) {
        promises.push(ImageHelper.postImage({
          name: 'diploma',
          file: this.getState('diplomaFile')
        }))
      }
      return Promise.all(promises)
    }.bind(this)).
    then(function (oResult) {
      let auxiliary = this.buildAuxiliary()
      if (this.getState('avatarFile')) {
        auxiliary.avatar = oResult[0].id
      }
      if (this.getState('diplomaFile')) {
        auxiliary.diplomaImage = (oResult[1] || oResult[0]).id
      }
      return AuxiliaryHelper.putAuxiliary(auxiliary)
    }.bind(this)).
    then(function () {
      return AuxiliaryHelper.getAuxiliary(AuthHelper.getEntityId())
    }).
    then(function () {
      setTimeout(AppHelper.setBusy, 200)
      return AppHelper.navigateBack()
    }).
    catch(function (error) {
      this.setState({
        errorJustHappened: true
      })
      setTimeout(AppHelper.setBusy, 200)
      console.error('Auxiliary update error')
      console.error(error)
    }.bind(this))
  }


  // Internal methods //
  // --------------------------------------------------------------------------------

  loadAuxiliary(auxiliary) {
    for (let f in this.FIELDS) {
      let field = this.FIELDS[f]
      let value = auxiliary[field.key] || field.defaultValue
      this.obj.state[field.key] = field.formatter ? field.formatter(value) : value
    }
    if (auxiliary.avatar) {
      this.obj.state.avatarSrc = ImageHelper.getData(this.obj.state.avatar)
    }
    if (auxiliary.diplomaImage) {
      this.obj.state.diplomaImageSrc = ImageHelper.getData(this.obj.state.diplomaImage)
    }
  }

  checkSkillHidden(skill) {
    return AuxiliarySkillsUtils.getDiplomasSkills(this.getState('diploma')).indexOf(skill.key) === -1
  }

  checkAuxiliary() {
    this.obj.state.errorShow = false
    this.obj.state.errorMsg = []
    this.obj.state.warningShow = false
    this.obj.state.warningMsg = []
    // Fields individual status
    Object.keys(this.FIELDS).forEach(this.checkField)
  }
  _checkField(id) {
    const field = this.FIELDS[id]
    const value = this.getState(field.key)
    const state = (field.validator && field.validator.VALIDATOR.check(value)) || {}
    this.obj.state[field.key + 'State'] = state.state
    this.obj.state[field.key + 'Message'] = state.message
    
    if (state.state === STATES.ERROR) {
      const messageId = `AUXILIARY_FIELD_ERROR_${id}_${state.message}`
      const message =  I18NHelper.get(messageId)
      if (message && this.obj.state.warningMsg.indexOf(message) === -1) {
        this.obj.state.warningMsg.push(message)
        this.obj.state.warningShow = true
      }
    }
  }

  buildAuxiliary() {
    let auxiliary = AuxiliaryHelper.getData(AuthHelper.getEntityId())
    for (let f in this.FIELDS) {
      let field = this.FIELDS[f]
      if (AuxiliaryFields.get(field.key)) {
        auxiliary[field.key] = this.getState(field.key)
      }
    }
    return auxiliary
  }
}
let AuxiliaryInfosEditInfosObj = new AuxiliaryInfosEditInfosData()
export default AuxiliaryInfosEditInfosObj
