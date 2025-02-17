import { Dispatcher, StoreRegistry } from 'ap-flux'
import AuthHelper from 'helpers/AuthHelper'

/* This class was auto-generated by the JavaScriptWriter */
/* DO NOT MODIFY THIS FILE IT WILL BE REGENERATED IN THE FUTURE */
class AuxiliaryHelper {

  register(id, callback) {
    StoreRegistry.register('REST_STORE', 'auxiliary' + (id ? '/' + id : ''), callback)
  }

  unregister(id, callback) {
    StoreRegistry.unregister('REST_STORE', 'auxiliary' + (id ? '/' + id : ''), callback)
  }

  getAuxiliarys(query) {
    return Dispatcher.issue('GET_AUXILIARYS', {token: AuthHelper.getToken(), query: query});
  }

  postAuxiliary(data) {
    return Dispatcher.issue('POST_AUXILIARY', {token: AuthHelper.getToken(), data: data});
  }

  getAuxiliary(id) {
    return Dispatcher.issue('GET_AUXILIARY', {token: AuthHelper.getToken(), id: id});
  }

  putAuxiliary(data) {
    return Dispatcher.issue('PUT_AUXILIARY', {token: AuthHelper.getToken(), id: data.id, data: data});
  }

  getServiceAuxiliarys(serviceId, query) {
    return Dispatcher.issue('GET_SERVICE_AUXILIARYS', {token: AuthHelper.getToken(), serviceId: serviceId, query: query});
  }

  getData(id) {
    return StoreRegistry.getStore('REST_STORE').getData('/auxiliary' + (id ? '/' + id : ''));
  }

}
var AuxiliaryObj = new AuxiliaryHelper()
export default AuxiliaryObj
