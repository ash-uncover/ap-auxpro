import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'

import { BaseData } from 'ap-react-bootstrap'
import { StoreRegistry } from 'ap-flux'
import { browserHistory } from 'react-router'

class AppData extends BaseData {

	register(obj) {
		super.register(obj)
		
		this.obj.onNavigateFacebook = this.onNavigateExternal.bind(this, 'https://www.facebook.com/Auxpros')
		this.obj.onNavigateYoutube = this.onNavigateExternal.bind(this, 'https://www.youtube.com/watch?v=c3G8MM8muk8')
		this.obj.onNavigateTwitter = this.onNavigateExternal.bind(this, 'https://twitter.com/AuXpros')

		this.obj.onNavigatePresentation = AppHelper.navigate.bind(AppHelper, '/infos/presentation')
		this.obj.onNavigateServices = AppHelper.navigate.bind(AppHelper, '/infos/services')
		this.obj.onNavigateCGU = AppHelper.navigate.bind(AppHelper, '/infos/cgu')
		this.obj.onNavigateCGV = AppHelper.navigate.bind(AppHelper, '/infos/cgv')
		this.obj.onNavigateConfidential = AppHelper.navigate.bind(AppHelper, '/infos/confidential')
		this.obj.onNavigateFAQ = AppHelper.navigate.bind(AppHelper, '/infos/faq')
		this.obj.onNavigateHelp = AppHelper.navigate.bind(AppHelper, '/infos/help')
		this.obj.onNavigateContact = AppHelper.navigate.bind(AppHelper, '/infos/contact')

		this.obj.state = {
			preload: ap.preload,
			busy: !!AppHelper.getData('/app/busy'),
			authType: null
		}

		AppHelper.register('/path', this, this._onAppStorePathUpdate.bind(this));
		AppHelper.register('/app/busy', this, this._onAppBusyUpdate.bind(this));
		AuthHelper.register(this, this._onAuthChanged.bind(this))
	}

	unregister() {
		AppHelper.unregister(this);
		AuthHelper.unregister(this);
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
				//$('.collapse').collapse('hide')
				this.obj.context.router.push(path)
			}
		}
	}

	_onAppBusyUpdate() {
		this.setState({ busy: !!AppHelper.getData('/app/busy') });
	}

	_onAuthChanged() {
		if (AuthHelper.getToken()) {
			switch (AuthHelper.getType()) {
			case 'auxiliary':
			case 'service':
				this.setState({ authType: AuthHelper.getType() })
				break
			default:
				this.setState({ authType: null })
				break
			}	
		} else {
			this.setState({ authType: null })
		}
	}

	onNavigateExternal(url) {
		window.open(url, '_blank').focus()
	}
	
}
var AppObj = new AppData()
export default AppObj
