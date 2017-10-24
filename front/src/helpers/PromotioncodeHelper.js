import { Dispatcher, StoreRegistry } from 'ap-flux'
import AuthHelper from 'helpers/AuthHelper'

/* This class was auto-generated by the JavaScriptWriter */
/* DO NOT MODIFY THIS FILE IT WILL BE REGENERATED IN THE FUTURE */
class PromotioncodeHelper {

	register(id, obj, callback) {
		StoreRegistry.register('REST_STORE/promotioncode' + (id ? '/' + id : ''), obj, callback);
	}

	unregister(obj) {
		StoreRegistry.unregister('REST_STORE', obj);
	}

	postAuxiliaryCode(data) {
		return Dispatcher.issue('POST_AUXILIARY_CODE', {token: AuthHelper.getToken(), id: data.id, data: data});
	}

	postServiceCode(data) {
		return Dispatcher.issue('POST_SERVICE_CODE', {token: AuthHelper.getToken(), id: data.id, data: data});
	}

	getData(id) {
		return StoreRegistry.getStore('REST_STORE').getData('/promotioncode' + (id ? '/' + id : ''));
	}

}
var PromotioncodeObj = new PromotioncodeHelper()
export default PromotioncodeObj
