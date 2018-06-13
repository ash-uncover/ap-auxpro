import { Dispatcher, StoreRegistry } from 'ap-flux'
import AuthHelper from 'helpers/AuthHelper'

/* This class was auto-generated by the JavaScriptWriter */
/* DO NOT MODIFY THIS FILE IT WILL BE REGENERATED IN THE FUTURE */
class CustomerHelper {

	register(id, callback) {
		StoreRegistry.register('REST_STORE', 'customer' + (id ? '/' + id : ''), callback)
	}

	unregister(id, callback) {
		StoreRegistry.unregister('REST_STORE', 'customer' + (id ? '/' + id : ''), callback)
	}

	getAuxiliaryCustomers(auxiliaryId, query) {
		return Dispatcher.issue('GET_AUXILIARY_CUSTOMERS', {token: AuthHelper.getToken(), auxiliaryId: auxiliaryId, query: query});
	}

	postCustomer(data) {
		return Dispatcher.issue('POST_CUSTOMER', {token: AuthHelper.getToken(), data: data});
	}

	getCustomer(id) {
		return Dispatcher.issue('GET_CUSTOMER', {token: AuthHelper.getToken(), id: id});
	}

	putCustomer(data) {
		return Dispatcher.issue('PUT_CUSTOMER', {token: AuthHelper.getToken(), id: data.id, data: data});
	}

	deleteCustomer(id) {
		return Dispatcher.issue('DELETE_CUSTOMER', {token: AuthHelper.getToken(), id: id});
	}

	getServiceCustomers(serviceId, query) {
		return Dispatcher.issue('GET_SERVICE_CUSTOMERS', {token: AuthHelper.getToken(), serviceId: serviceId, query: query});
	}

	getData(id) {
		return StoreRegistry.getStore('REST_STORE').getData('/customer' + (id ? '/' + id : ''));
	}

}
var CustomerObj = new CustomerHelper()
export default CustomerObj
