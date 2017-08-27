import AppHelper from 'helpers/AppHelper'
import CustomerHelper from 'helpers/CustomerHelper'

import { BaseData } from 'ap-react-bootstrap'

class ServiceCustomerData extends BaseData {

	register(obj, customerId) {
		super.register(obj)

		this.obj.onBack = AppHelper.navigateBack.bind(AppHelper)
		
		let customer = CustomerHelper.getData(customerId)

		this.obj.state = {
			customer: customer,
			civility: customer.civility,
			lastName: customer.lastName,
			firstName: customer.firstName,
			birthDate: customer.birthDate,
			nationality: customer.nationality,
			address: customer.address,
			postalCode: customer.postalCode,
			city: customer.city,
			country: customer.country,
			phone: customer.phone,
			email: customer.email
		}
	}

	unregister() {
	}

}
var ServiceCustomerObj = new ServiceCustomerData()
export default ServiceCustomerObj
