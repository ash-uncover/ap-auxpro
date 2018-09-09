import { Dispatcher, StoreRegistry } from 'ap-flux'
import AuthHelper from 'helpers/AuthHelper'

/* This class was auto-generated by the JavaScriptWriter */
/* DO NOT MODIFY THIS FILE IT WILL BE REGENERATED IN THE FUTURE */
class HelpfaqHelper {

	register(id, callback) {
		StoreRegistry.register('REST_STORE', 'helpfaq' + (id ? '/' + id : ''), callback)
	}

	unregister(id, callback) {
		StoreRegistry.unregister('REST_STORE', 'helpfaq' + (id ? '/' + id : ''), callback)
	}

	getHelpFaqs(query) {
		return Dispatcher.issue('GET_HELP_FAQS', {query: query});
	}

	getData(id) {
		return StoreRegistry.getStore('REST_STORE').getData('/helpfaq' + (id ? '/' + id : ''));
	}

}
var HelpfaqObj = new HelpfaqHelper()
export default HelpfaqObj
