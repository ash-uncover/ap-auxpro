import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import I18NHelper from 'helpers/I18NHelper'

import { BaseData } from 'ap-react-bootstrap'
import { StoreRegistry, Dispatcher } from 'ap-flux'
import { browserHistory } from 'react-router'

class AppData extends BaseData {

    constructor() {
        super(...arguments)
        
        this.onAppStorePathUpdate = this._onAppStorePathUpdate.bind(this)
        this.onAppBusyUpdate = this._onAppBusyUpdate.bind(this)
        this.onI18NLoad = this._onI18NLoad.bind(this)
    }

    register(obj) {
        super.register(obj)

        AppHelper.register('/path', this.onAppStorePathUpdate)
        AppHelper.register('/app/busy', this.onAppBusyUpdate)
        I18NHelper.register('/loaded', this.onI18NLoad)

        Dispatcher.issue('LOAD_I18N')

        if (AuthHelper.getToken()) {
            AuthHelper.getAuth()
        }
    }

    unregister() {
        AppHelper.unregister('/path', this.onAppStorePathUpdate)
        AppHelper.unregister('/app/busy', this.onAppBusyUpdate)
        I18NHelper.unregister('/loaded', this.onI18NLoad)
    }

    _onAppStorePathUpdate() {
        let path = AppHelper.getData('/path')
        if (path && browserHistory.getCurrentLocation().pathname !== path) {
            if (path === '___BACK___') {
                browserHistory.goBack()
                setTimeout(function () {
                    AppHelper.navigate(browserHistory.getCurrentLocation().pathname)
                }, 0)
            } else {
                $('.collapse').collapse('hide')
                this.obj.context.router.push(path)
            }
        }
    }

    _onAppBusyUpdate() {
        this.setState({ busy: !!AppHelper.getData('/app/busy') })
    }

    _onI18NLoad() {
        this.setState({ loaded: I18NHelper.isLoaded() })
    }

}
var AppObj = new AppData()
export default AppObj
