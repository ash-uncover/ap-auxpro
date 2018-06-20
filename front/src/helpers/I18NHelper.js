import { Dispatcher, StoreRegistry } from 'ap-flux'
import AuthHelper from 'helpers/AuthHelper'

class I18NHelper {

    register(path, callback) {
        StoreRegistry.register('I18N_STORE', (path ? path : ''), callback)
    }

    unregister(path, callback) {
        StoreRegistry.unregister('I18N_STORE', (path ? path : ''), callback)
    }

    getData(id) {
        return StoreRegistry.getStore('I18N_STORE').getData((id ? '/' + id : ''))
    }

    get(id) {
        return this.getData(`translations/${id}`) || id
    }

    isLoaded() {
        return !!this.getData('loaded')
    }

}
var I18NHelperObj = new I18NHelper()
export default I18NHelperObj
