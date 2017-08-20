import { Dispatcher, StoreRegistry } from 'ap-flux'
import AuthHelper from 'helpers/AuthHelper'

/* This class was auto-generated by the JavaScriptWriter */
class CustomerHelper {

	register(obj, callback) {
		StoreRegistry.register('REST_STORE/customer', obj, callback);
	}

	unregister(obj) {
		StoreRegistry.unregister('REST_STORE', obj);
	}

	getAuxiliaryCustomers(auxiliaryId) {
		return Dispatcher.issue('GET_AUXILIARY_CUSTOMERS', {token: AuthHelper.getToken(), auxiliaryId: auxiliaryId});
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

	getServiceCustomers(serviceId) {
		return Dispatcher.issue('GET_SERVICE_CUSTOMERS', {token: AuthHelper.getToken(), serviceId: serviceId});
	}

	getData(id) {
		return StoreRegistry.getStore('REST_STORE').getData('/customer' + (id ? '/' + id : ''));
	}

}
var CustomerObj = new CustomerHelper()
export default CustomerObj
