import { StoreRegistry } from 'ap-flux'

/* This class was auto-generated by the JavaScriptWriter */
/* DO NOT MODIFY THIS FILE IT WILL BE REGENERATED IN THE FUTURE */
class ErrorHelper {

	register(action, obj, callback) {
		StoreRegistry.register('ERROR_STORE' + (action ? '/' + action : '') , obj, callback);
	}

	unregister(obj) {
		StoreRegistry.unregister('ERROR_STORE', obj);
	}

	getData(path) {
		return StoreRegistry.getStore('ERROR_STORE').getData(path);
	}

}
var ErrorHelperObj = new ErrorHelper()
export default ErrorHelperObj
