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
      Object.assign({ formatter: NationalityUtils.getNationalityFem }, CustomerFields.NATIONALITY)
    ]

    this.FIELDS_FORM2 = [
      CustomerFields.ADDRESS,
      CustomerFields.POSTAL_CODE,
      CustomerFields.CITY,
      CustomerFields.COUNTRY,
      CustomerFields.EMAIL,
      Object.assign({ formatter: Formatters.Phone.getFormattedValue }, CustomerFields.PHONE)
    ]

    this.FIELDS = this.FIELDS_FORM1.concat(this.FIELDS_FORM2)
  }

  register(obj, customerId) {
    super.register(obj)

    this.customerId = customerId
    this.obj.onBack = AppHelper.navigateBack.bind(AppHelper)    
    
    this._onCustomerUpdate()
  }

  unregister() {
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
