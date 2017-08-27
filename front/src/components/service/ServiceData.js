import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import ServiceHelper from 'helpers/ServiceHelper'

import { BaseData } from 'ap-react-bootstrap'

// Header not be displayed for the following path
let PATHS_NO_HEADER = [
	'/service/tuto',
	'/service/infos/edit/account',
	'/service/infos/edit/society',
	'/service/infos/edit/photo'
]

class ServiceData extends BaseData {

	register(obj) {
		super.register(obj)

		this.obj.state = {
			showHeader: false,
			loaded:!! ServiceHelper.getData(AuthHelper.getEntityId())
		}
		
		/* TODO > find a way to generate this stuff */
		if (AuthHelper.getType() !== 'service') {
			AppHelper.navigate('/home')
			return;
		}

		ServiceHelper.getService(AuthHelper.getEntityId()).then(this._onLoad.bind(this))

		AppHelper.register('/path', this, this._onAppStorePathUpdate.bind(this));
	}

	unregister() {
		AppHelper.unregister(this)
	}

	_onAppStorePathUpdate() {
		let showHeader = (PATHS_NO_HEADER.indexOf(AppHelper.getData('/path')) === -1)
		if (showHeader !== this.getState('showHeader')) {
			this.setState({ 
				showHeader: showHeader
			})
		}
	}

	_onLoad() {
		let service = ServiceHelper.getData(AuthHelper.getEntityId())
		if (service.isTutoSkipped) {
			AppHelper.navigate('/service/home')
		} else {
			AppHelper.navigate('/service/tuto')
		}
		this.setState({ loaded: true })
	}
}
var ServiceObj = new ServiceData()
export default ServiceObj
