import { Dispatcher, StoreRegistry } from 'ap-flux'
import AuthHelper from 'helpers/AuthHelper'

/* This class was auto-generated by the JavaScriptWriter */
/* DO NOT MODIFY THIS FILE IT WILL BE REGENERATED IN THE FUTURE */
class ServiceHelper {

  register(id, callback) {
    StoreRegistry.register('REST_STORE', 'service' + (id ? '/' + id : ''), callback)
  }

  unregister(id, callback) {
    StoreRegistry.unregister('REST_STORE', 'service' + (id ? '/' + id : ''), callback)
  }

  getAuxiliaryServices(auxiliaryId, query) {
    return Dispatcher.issue('GET_AUXILIARY_SERVICES', {token: AuthHelper.getToken(), auxiliaryId: auxiliaryId, query: query});
  }

  getServices(query) {
    return Dispatcher.issue('GET_SERVICES', {token: AuthHelper.getToken(), query: query});
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

  getData(id) {
    return StoreRegistry.getStore('REST_STORE').getData('/service' + (id ? '/' + id : ''));
  }

}
var ServiceObj = new ServiceHelper()
export default ServiceObj
