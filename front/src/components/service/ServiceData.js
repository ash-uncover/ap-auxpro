import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'

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
	}

	unregister() {
	}

}
var ServiceObj = new ServiceData()
export default ServiceObj
