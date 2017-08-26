import { Dispatcher, StoreRegistry } from 'ap-flux'
import AuthHelper from 'helpers/AuthHelper'

/* This class was auto-generated by the JavaScriptWriter */
class ServiceHelper {

	register(id, obj, callback) {
		StoreRegistry.register('REST_STORE/service' + (id ? '/' + id : ''), obj, callback);
	}

	unregister(obj) {
		StoreRegistry.unregister('REST_STORE', obj);
	}

	getAuxiliaryServices(auxiliaryId) {
		return Dispatcher.issue('GET_AUXILIARY_SERVICES', {token: AuthHelper.getToken(), auxiliaryId: auxiliaryId});
	}

	getServices() {
		return Dispatcher.issue('GET_SERVICES', {token: AuthHelper.getToken()});
	}

	postService(data) {
		return Dispatcher.issue('POST_SERVICE', {token: AuthHelper.getToken(), data: data});
	}

	getService(id) {
		return Dispatcher.issue('GET_SERVICE', {token: AuthHelper.getToken(), id: id});
	}

	putService(data) {
		return Dispatcher.issue('PUT_SERVICE', {token: AuthHelper.getToken(), id: data.id, data: data});
	}

	deleteService(id) {
		return Dispatcher.issue('DELETE_SERVICE', {token: AuthHelper.getToken(), id: id});
	}

	getData(id) {
		return StoreRegistry.getStore('REST_STORE').getData('/service' + (id ? '/' + id : ''));
	}

}
var ServiceObj = new ServiceHelper()
export default ServiceObj
