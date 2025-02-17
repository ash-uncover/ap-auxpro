import { Dispatcher, StoreRegistry } from 'ap-flux'
import AuthHelper from 'helpers/AuthHelper'

/* This class was auto-generated by the JavaScriptWriter */
/* DO NOT MODIFY THIS FILE IT WILL BE REGENERATED IN THE FUTURE */
class HelptopicHelper {

  register(id, callback) {
    StoreRegistry.register('REST_STORE', 'helptopic' + (id ? '/' + id : ''), callback)
  }

  unregister(id, callback) {
    StoreRegistry.unregister('REST_STORE', 'helptopic' + (id ? '/' + id : ''), callback)
  }

  getHelpTopics(query) {
    return Dispatcher.issue('GET_HELP_TOPICS', {query: query});
  }

  getData(id) {
    return StoreRegistry.getStore('REST_STORE').getData('/helptopic' + (id ? '/' + id : ''));
  }

}
var HelptopicObj = new HelptopicHelper()
export default HelptopicObj
