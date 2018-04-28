import AppHelper from 'helpers/AppHelper'
import I18NHelper from 'helpers/I18NHelper'

import { BaseData } from 'ap-react-bootstrap'
import { StoreRegistry, Dispatcher } from 'ap-flux'
import { browserHistory } from 'react-router'

class AppData extends BaseData {

    register(obj) {
        super.register(obj)

        AppHelper.register('/path', this, this._onAppStorePathUpdate.bind(this))
        AppHelper.register('/app/busy', this, this._onAppBusyUpdate.bind(this))
        I18NHelper.register('/loaded', this, this._onI18NLoad.bind(this))

        Dispatcher.issue('LOAD_I18N')
    }

    unregister() {
        AppHelper.unregister(this);
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
