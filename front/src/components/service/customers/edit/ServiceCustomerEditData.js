import { MomentHelper, BaseData, Nationality } from 'ap-react-bootstrap'
import { STATES } from 'ap-validators'
import moment from 'moment'
// helpers
import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import I18NHelper from 'helpers/I18NHelper'
import CustomerHelper from 'helpers/CustomerHelper'
import ErrorHelper from 'helpers/ErrorHelper'
// utils
import PeopleCategory from 'utils/constants/PeopleCategory'
import Skills from 'utils/constants/Skills'
import CustomerFields from 'utils/entities/CustomerFields'
// utils-lib
import AuxiliarySkillsUtils from 'utils-lib/entities/AuxiliarySkillsUtils'
import CustomerUtils from 'utils-lib/entities/CustomerUtils'
import NationalityUtils from 'utils-lib/geo/NationalityUtils'
import SkillUtils from 'utils-lib/entities/SkillUtils'

class ServiceCustomerEditData extends BaseData {

  constructor() {
  super(...arguments)

  this.checkField = this._checkField.bind(this)
  this.handleGetCustomerError = this.handleGetCustomerError.bind(this)
  this.handlePostCustomerError = this.handlePostCustomerError.bind(this)
  this.handlePutCustomerError = this.handlePutCustomerError.bind(this)
  this.handleDeleteCustomerError = this.handleDeleteCustomerError.bind(this)

  this.MODES = {
    CREATE: 'CREATE',
    EDIT: 'EDIT'
  }
  
  const { LATTITUDE, LONGITUDE } = CustomerFields

  const CIVILITY = Object.assign(
    { defaultValue: 'Mme', form: 'select', name: CustomerUtils.getFieldName(CustomerFields.CIVILITY) }, 
    CustomerFields.CIVILITY
  )
  const LAST_NAME = Object.assign(
    { defaultValue: '', form: 'input', name: CustomerUtils.getFieldName(CustomerFields.LAST_NAME) }, 
    CustomerFields.LAST_NAME
  )
  const FIRST_NAME = Object.assign(
    { defaultValue: '', form: 'input', name: CustomerUtils.getFieldName(CustomerFields.FIRST_NAME) }, 
    CustomerFields.FIRST_NAME
  )
  const CATEGORY = Object.assign(
    { defaultValue: 'old_people', form: 'select', name: CustomerUtils.getFieldName(CustomerFields.CATEGORY) }, 
    CustomerFields.CATEGORY
  )
  const BIRTH_DATE = Object.assign(
    { defaultValue: [1950,1,1], form: 'date', name: CustomerUtils.getFieldName(CustomerFields.BIRTH_DATE) }, 
    CustomerFields.BIRTH_DATE
  )
  const NATIONALITY = Object.assign(
    { defaultValue: 'FR', form: 'select', name: CustomerUtils.getFieldName(CustomerFields.NATIONALITY) }, 
    CustomerFields.NATIONALITY,
    { values: NationalityUtils.getNationalities() }
  )
  const PHONE = Object.assign(
    { defaultValue: '', form: 'input', name: CustomerUtils.getFieldName(CustomerFields.PHONE) }, 
    CustomerFields.PHONE
  )
  const ADDRESS = Object.assign(
    { defaultValue: '', form: 'static', name: CustomerUtils.getFieldName(CustomerFields.ADDRESS) }, 
    CustomerFields.ADDRESS
  )
  const POSTAL_CODE = Object.assign(
    { defaultValue: '', form: 'static', name: CustomerUtils.getFieldName(CustomerFields.POSTAL_CODE) }, 
    CustomerFields.POSTAL_CODE
  )
  const CITY = Object.assign(
    { defaultValue: '', form: 'static', name: CustomerUtils.getFieldName(CustomerFields.CITY) }, 
    CustomerFields.CITY
  )
  const COUNTRY = Object.assign(
    { defaultValue: '', form: 'static', name: CustomerUtils.getFieldName(CustomerFields.COUNTRY) }, 
    CustomerFields.COUNTRY
  )
  const ADDRESS_SEARCH = { form: 'address', key: 'addressSearch', name: 'Adresse' }
  const EMAIL =  Object.assign(
    { defaultValue: '', form: 'input', name: CustomerUtils.getFieldName(CustomerFields.EMAIL) }, 
    CustomerFields.EMAIL
  )
  const SKILL_CHILDREN_CARE = Object.assign(
    {
      defaultValue: 0,
      name: 'SKILL_CHILDREN_CARE',
      hidden: this.checkSkillHidden.bind(this, CustomerFields.SKILL_CHILDREN_CARE)
    },
    CustomerFields.SKILL_CHILDREN_CARE
  )
  const SKILL_CHILDREN_SCHOOL = Object.assign(
    {
      defaultValue: 0,
      name: 'SKILL_CHILDREN_SCHOOL',
      hidden: this.checkSkillHidden.bind(this, CustomerFields.SKILL_CHILDREN_SCHOOL)
    },
    CustomerFields.SKILL_CHILDREN_SCHOOL
  )
  const SKILL_CHILDREN_GAME = Object.assign(
    {
      defaultValue: 0,
      name: 'SKILL_CHILDREN_GAME',
      hidden: this.checkSkillHidden.bind(this, CustomerFields.SKILL_CHILDREN_GAME)
    },
    CustomerFields.SKILL_CHILDREN_GAME
  )
  const SKILL_CHILDREN_KEEP = Object.assign(
    {
      defaultValue: 0,
      name: 'SKILL_CHILDREN_KEEP',
      hidden: this.checkSkillHidden.bind(this, CustomerFields.SKILL_CHILDREN_KEEP)
    },
    CustomerFields.SKILL_CHILDREN_KEEP
  )
  const SKILL_OLD_CARE = Object.assign(
    {
      defaultValue: 0,
      name: 'SKILL_OLD_CARE',
      hidden: this.checkSkillHidden.bind(this, CustomerFields.SKILL_OLD_CARE)
    },
    CustomerFields.SKILL_OLD_CARE
  )
  const SKILL_FOOD = Object.assign(
    {
      defaultValue: 0,
      name: 'SKILL_FOOD',
      hidden: this.checkSkillHidden.bind(this, CustomerFields.SKILL_FOOD)
    },
    CustomerFields.SKILL_FOOD
  )
  const SKILL_TRANSPORT = Object.assign(
    {
      defaultValue: 0,
      name: 'SKILL_TRANSPORT',
      hidden: this.checkSkillHidden.bind(this, CustomerFields.SKILL_TRANSPORT)
    },
    CustomerFields.SKILL_TRANSPORT
  )
  const SKILL_ILLNESS = Object.assign(
    {
      defaultValue: 0,
      name: 'SKILL_ILLNESS',
      hidden: this.checkSkillHidden.bind(this, CustomerFields.SKILL_ILLNESS)
    },
    CustomerFields.SKILL_ILLNESS
  )
  const SKILL_NURSING = Object.assign(
    {
      defaultValue: 0,
      name: 'SKILL_NURSING',
      hidden: this.checkSkillHidden.bind(this, CustomerFields.SKILL_NURSING)
    },
    CustomerFields.SKILL_NURSING
  )
  const SKILL_CLOTHES = Object.assign(
    {
      defaultValue: 0,
      name: 'SKILL_CLOTHES',
      hidden: this.checkSkillHidden.bind(this, CustomerFields.SKILL_CLOTHES)
    },
    CustomerFields.SKILL_CLOTHES
  )
  const SKILL_HOUSE = Object.assign(
    {
      defaultValue: 0,
      name: 'SKILL_HOUSE',
      hidden: this.checkSkillHidden.bind(this, CustomerFields.SKILL_HOUSE)
    },
    CustomerFields.SKILL_HOUSE
  )
  const SKILL_COMPANY = Object.assign(
    {
      defaultValue: 0,
      name: 'SKILL_COMPANY',
      hidden: this.checkSkillHidden.bind(this, CustomerFields.SKILL_COMPANY)
    },
    CustomerFields.SKILL_COMPANY
  )
  const SKILL_PET = Object.assign(
    {
      defaultValue: 0,
      name: 'SKILL_PET',
      hidden: this.checkSkillHidden.bind(this, CustomerFields.SKILL_PET)
    },
    CustomerFields.SKILL_PET
  )
  const SKILL_HANDICAP = Object.assign(
    {
      defaultValue: 0,
      name: 'SKILL_HANDICAP',
      hidden: this.checkSkillHidden.bind(this, CustomerFields.SKILL_HANDICAP)
    },
    CustomerFields.SKILL_HANDICAP
  )
  const SKILL_BEAUTY = Object.assign(
    {
      defaultValue: 0,
      name: 'SKILL_BEAUTY',
      hidden: this.checkSkillHidden.bind(this, CustomerFields.SKILL_BEAUTY)
    },
    CustomerFields.SKILL_BEAUTY
  )
  const SKILLS_CHECKER = { 
    key: 'skillsChecker', 
    validator: { VALIDATOR: { check: this.checkSkillsChecker.bind(this) } }
  }
  
  this.FIELDS = {
    LATTITUDE,
    LONGITUDE,
    CIVILITY,
    LAST_NAME,
    FIRST_NAME,
    CATEGORY,
    BIRTH_DATE,
    NATIONALITY,
    PHONE,
    ADDRESS,
    POSTAL_CODE,
    CITY,
    COUNTRY,
    ADDRESS_SEARCH,
    EMAIL,
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
    SKILL_BEAUTY,
    SKILLS_CHECKER
  }
  this.FIELDS_FORM1 = {
    CIVILITY,
    LAST_NAME,
    FIRST_NAME,
    CATEGORY,
    BIRTH_DATE,
    NATIONALITY,
    PHONE
  }
  this.FIELDS_FORM2 = {
    ADDRESS_SEARCH,
    ADDRESS,
    POSTAL_CODE,
    CITY,
    COUNTRY,
    EMAIL
  }
  this.FIELDS_FORM_SKILLS = {  
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

  register(obj, customerId) {
    super.register(obj)

    this.customerId = customerId

    this.declareFunction('onSkillAdd')
    this.declareFunction('onCancel')
    this.declareFunction('onSubmit')
    
    this.obj.state.mode = customerId !== 'new' ? this.MODES.EDIT : this.MODES.CREATE
    
    this.loadCustomer(CustomerHelper.getData(this.customerId) || {})
    this.checkCustomer()


    ErrorHelper.register('GET_CUSTOMER', this.handleGetCustomerError)
    ErrorHelper.register('POST_CUSTOMER', this.handlePostCustomerError)
    ErrorHelper.register('PUT_CUSTOMER', this.handlePutCustomerError)
    ErrorHelper.register('DELETE_CUSTOMER', this.handleDeleteCustomerError)
  }

  unregister() {
    ErrorHelper.unregister('GET_CUSTOMER', this.handleGetCustomerError)
    ErrorHelper.unregister('POST_CUSTOMER', this.handlePostCustomerError)
    ErrorHelper.unregister('PUT_CUSTOMER', this.handlePutCustomerError)
    ErrorHelper.unregister('DELETE_CUSTOMER', this.handleDeleteCustomerError)
  }


  // Store notifications //
  // --------------------------------------------------------------------------------

  handleGetCustomerError() {
    let errorData = ErrorHelper.getData('GET_CUSTOMER')
    if (errorData) {
      this.setState({
      errorShow: true,
      errorMsg: [ "Une erreur est survenue pendant la récupération des informations de l'usager" ]
      })
    }
  }
  handlePutCustomerError() {
    let errorData = ErrorHelper.getData('PUT_CUSTOMER')
    if (errorData) {
      this.setState({
      errorShow: true,
      errorMsg: [ "Une erreur est survenue pendant la mise à jour des informations de l'usager" ]
      })
    }
  }
  handlePostCustomerError() {
    let errorData = ErrorHelper.getData('POST_CUSTOMER')
    if (errorData) {
      this.setState({
      errorShow: true,
      errorMsg: [ "Une erreur est survenue pendant la création de l'usager" ]
      })
    }
  }
  handleDeleteCustomerError() {
    let errorData = ErrorHelper.getData('DELETE_CUSTOMER')
    if (errorData) {
      this.setState({
      errorShow: true,
      errorMsg: [ "Une erreur est survenue pendant la suppression de l'usager" ]
      })
    }
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
        case this.FIELDS.PHONE:
          if (state.message === field.validator.ERRORS.MAX_LENGTH_EXCEEDED) {
            return
          }
          break
      }

      this.obj.state.dirty = true
      this.obj.state[field.key] = newValue

      // Check data consistency
      this.checkCustomer()
      // Update component
      this.forceUpdate()

    } else {
      console.error('Unknown field: ' + id)
    }
  }
  
  onSkillAdd() {
    this.setState({ showAddSkill: false })
  }

  onCancel() {
    AppHelper.navigateBack()
  }

  onSubmit() {
    AppHelper.setBusy(true).
    then(function() {
      let customer = this.buildCustomer()
      if (this.getState('mode') === this.MODES.CREATE) {
        return CustomerHelper.postCustomer(customer)
      } else {
        return CustomerHelper.putCustomer(customer)
      }
    }.bind(this)).
    then(function () {
      return CustomerHelper.getServiceCustomers(AuthHelper.getEntityId())
    }).
    then(function () {
      AppHelper.navigateBack()
      setTimeout(AppHelper.setBusy, 200)
    }).
    catch(function (error) {
      setTimeout(AppHelper.setBusy, 200)
      console.error('Customer submit error')
      console.error(error)
    })
  }


  // Internal methods //
  // --------------------------------------------------------------------------------

  checkSkillHidden(skill) {
    return AuxiliarySkillsUtils.getCategorySkills(this.getState('category')).indexOf(skill.key) === -1
  }

  buildCustomer() {
  let customer = (this.getState('mode') === this.MODES.CREATE) ?
    { serviceId: AuthHelper.getEntityId() } :
    CustomerHelper.getData(this.customerId)
    
  for (let f in this.FIELDS) {
    let field = this.FIELDS[f]
    if (CustomerFields.get(field.key)) {
    customer[field.key] = this.getState(field.key)
    }
  }
  return customer
  }

  loadCustomer(customer) {
  this.obj.state.customerName = this.customerId !== 'new' ? CustomerUtils.getFullName(customer) : 'Nouvel usager'
  Object.keys(this.FIELDS).map(id => {
    const field = this.FIELDS[id]
    const value = customer[field.key]
    this.obj.state[field.key] = value || field.defaultValue
  })
  if (this.getState('mode') === this.MODES.CREATE) {
    this.obj.state.showAddSkill = false
  } else {
    this.obj.state.showAddSkill = Object.keys(this.FIELDS_FORM_SKILLS).reduce((value, id) => {
    const field = this.FIELDS[id]
    return !this.getState(field.key) || value
    }, false)
  }
  }

  checkCustomer() {
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
    const messageId = `CUSTOMER_FIELD_ERROR_${id}_${state.message}`
    const message =  I18NHelper.get(messageId)
    if (message && this.obj.state.warningMsg.indexOf(message) === -1) {
    this.obj.state.warningMsg.push(message)
    this.obj.state.warningShow = true
    }
  }
  }
  checkSkillsChecker() {
  const skillTotal = Object.keys(this.FIELDS_FORM_SKILLS).reduce((total, id) => {
    return total + this.getState(this.FIELDS_FORM_SKILLS[id].key)    
  }, 0)
  if (skillTotal === 0) {
    return { 
    state: STATES.ERROR, 
    message: 'NO_SKILLS_SET' 
    }
  }
  return { state: STATES.SUCCESS }
  }
}

let ServiceCustomerEditObj = new ServiceCustomerEditData()
export default ServiceCustomerEditObj