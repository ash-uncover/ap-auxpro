import AppHelper from 'helpers/AppHelper'

import { BaseData } from 'ap-react-bootstrap'
import { StoreRegistry } from 'ap-flux'
import { browserHistory } from 'react-router'

class AppData extends BaseData {

	register(obj) {
		super.register(obj)

		this.obj.state = {
			preload: ap.preload,
			busy: !!AppHelper.getData('/app/busy'),
			authType: null
		}

		AppHelper.register('/path', this, this._onAppStorePathUpdate.bind(this));
		AppHelper.register('/app/busy', this, this._onAppBusyUpdate.bind(this));
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
		this.setState({ busy: !!AppHelper.getData('/app/busy') });
	}

}
var AppObj = new AppData()
export default AppObj
