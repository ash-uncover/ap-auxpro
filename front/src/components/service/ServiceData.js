import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import ServiceHelper from 'helpers/ServiceHelper'

import { BaseData } from 'ap-react-bootstrap'

class ServiceData extends BaseData {

	register(obj) {
		super.register(obj)
		
		/* TODO > find a way to generate this stuff */
		if (AuthHelper.getType() !== 'service') {
			AppHelper.navigate('/home')
			return;
		}

		this.obj.state = {}

		ServiceHelper.getService(AuthHelper.getEntityId()).then(this._onLoad.bind(this))
	}

	unregister() {
	}

	_onLoad() {
	}
}
var ServiceObj = new ServiceData()
export default ServiceObj
