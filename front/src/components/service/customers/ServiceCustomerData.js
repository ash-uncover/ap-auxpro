import AppHelper from 'helpers/AppHelper'
import I18NHelper from 'helpers/I18NHelper'
import CustomerHelper from 'helpers/CustomerHelper'

import { BaseData, Formatters, Nationality, MomentHelper } from 'ap-react-bootstrap'

import CustomerFields from 'utils/entities/CustomerFields'

import AuxiliarySkillsUtils from 'utils-lib/entities/AuxiliarySkillsUtils'
import CustomerUtils from 'utils-lib/entities/CustomerUtils'
import NationalityUtils from 'utils-lib/geo/NationalityUtils'

class ServiceCustomerData extends BaseData {

  constructor() {
    super(arguments)

    this.FIELDS_FORM1 = [
      CustomerFields.CIVILITY,
      CustomerFields.LAST_NAME,
      CustomerFields.FIRST_NAME,
      Object.assign({ formatter: (value) => I18NHelper.get(value.toUpperCase()) }, CustomerFields.CATEGORY),
      Object.assign({ formatter: MomentHelper.localDateToHumanDate }, CustomerFields.BIRTH_DATE),
      Object.assign({ formatter: NationalityUtils.getNationalityFem }, CustomerFields.NATIONALITY),
      Object.assign({ formatter: Formatters.Phone.getFormattedValue }, CustomerFields.PHONE)
    ]

    this.FIELDS_FORM2 = [
      CustomerFields.ADDRESS,
      CustomerFields.POSTAL_CODE,
      CustomerFields.CITY,
      CustomerFields.COUNTRY,
      CustomerFields.EMAIL
    ]

    this.FIELDS_FORM3 = [
      Object.assign(
        {
          defaultValue: 0,
          name: 'SKILL_CHILDREN_CARE',
          hidden: this.checkSkillHidden.bind(this, CustomerFields.SKILL_CHILDREN_CARE)
        },
        CustomerFields.SKILL_CHILDREN_CARE
      ),
      Object.assign(
        {
          defaultValue: 0,
          name: 'SKILL_CHILDREN_SCHOOL',
          hidden: this.checkSkillHidden.bind(this, CustomerFields.SKILL_CHILDREN_SCHOOL) },
        CustomerFields.SKILL_CHILDREN_SCHOOL
      ),
      Object.assign(
        {
          defaultValue: 0,
          name: 'SKILL_CHILDREN_GAME',
          hidden: this.checkSkillHidden.bind(this, CustomerFields.SKILL_CHILDREN_GAME) },
        CustomerFields.SKILL_CHILDREN_GAME
      ),
      Object.assign(
        {
          defaultValue: 0,
          name: 'SKILL_CHILDREN_KEEP',
          hidden: this.checkSkillHidden.bind(this, CustomerFields.SKILL_CHILDREN_KEEP)
        },
        CustomerFields.SKILL_CHILDREN_KEEP
      ),
      Object.assign(
        {
          defaultValue: 0,
          name: 'SKILL_OLD_CARE',
          hidden: this.checkSkillHidden.bind(this, CustomerFields.SKILL_OLD_CARE)
        },
        CustomerFields.SKILL_OLD_CARE
      ),
      Object.assign(
        {
          defaultValue: 0,
          name: 'SKILL_FOOD',
          hidden: this.checkSkillHidden.bind(this, CustomerFields.SKILL_FOOD)
        },
        CustomerFields.SKILL_FOOD
      ),
      Object.assign(
        {
          defaultValue: 0,
          name: 'SKILL_TRANSPORT',
          hidden: this.checkSkillHidden.bind(this, CustomerFields.SKILL_TRANSPORT)
        },
        CustomerFields.SKILL_TRANSPORT
      ),
      Object.assign(
        {
          defaultValue: 0,
          name: 'SKILL_ILLNESS',
          hidden: this.checkSkillHidden.bind(this, CustomerFields.SKILL_ILLNESS)
        },
        CustomerFields.SKILL_ILLNESS
      ),
      Object.assign(
        {
          defaultValue: 0,
          name: 'SKILL_NURSING',
          hidden: this.checkSkillHidden.bind(this, CustomerFields.SKILL_NURSING)
        },
        CustomerFields.SKILL_NURSING
      ),
      Object.assign(
        {
          defaultValue: 0,
          name: 'SKILL_CLOTHES',
          hidden: this.checkSkillHidden.bind(this, CustomerFields.SKILL_CLOTHES)
        },
        CustomerFields.SKILL_CLOTHES
      ),
      Object.assign(
        {
          defaultValue: 0,
          name: 'SKILL_HOUSE',
          hidden: this.checkSkillHidden.bind(this, CustomerFields.SKILL_HOUSE)
        },
        CustomerFields.SKILL_HOUSE
      ),
      Object.assign(
        {
          defaultValue: 0,
          name: 'SKILL_COMPANY',
          hidden: this.checkSkillHidden.bind(this, CustomerFields.SKILL_COMPANY)
        },
        CustomerFields.SKILL_COMPANY
      ),
      Object.assign(
        {
          defaultValue: 0,
          name: 'SKILL_PET',
          hidden: this.checkSkillHidden.bind(this, CustomerFields.SKILL_PET)
        },
        CustomerFields.SKILL_PET
      ),
      Object.assign(
        {
          defaultValue: 0,
          name: 'SKILL_HANDICAP',
          hidden: this.checkSkillHidden.bind(this, CustomerFields.SKILL_HANDICAP)
        },
        CustomerFields.SKILL_HANDICAP
      ),
      Object.assign(
        {
          defaultValue: 0,
          name: 'SKILL_BEAUTY',
          hidden: this.checkSkillHidden.bind(this, CustomerFields.SKILL_BEAUTY)
        },
        CustomerFields.SKILL_BEAUTY
      )
    ]

    this.FIELDS = this.FIELDS_FORM1.concat(this.FIELDS_FORM2).concat(this.FIELDS_FORM3)
  }

  register(obj, customerId) {
    super.register(obj)

    this.customerId = customerId

    this.obj.onBack = AppHelper.navigateBack.bind(AppHelper)
    
    this._onCustomerUpdate()
  }

  unregister() {
  }

  checkSkillHidden(skill) {
    return AuxiliarySkillsUtils.getCategorySkills(this.getState('category')).indexOf(skill.key) === -1
  }


  // Store notifications //
  // --------------------------------------------------------------------------------

  onCustomerUpdate() {
    this._onCustomerUpdate()
    this.setState({})
  }

  _onCustomerUpdate() {
    const customer = CustomerHelper.getData(this.customerId) || {}
    this.obj.state.fullName = CustomerUtils.getFullName(customer)
    this.FIELDS.forEach((field) => {
      this.obj.state[field.key] = customer[field.key]
    })
  }

}

const ServiceCustomerObj = new ServiceCustomerData()
export default ServiceCustomerObj
