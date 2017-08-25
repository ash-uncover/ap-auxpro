import AppHelper from 'helpers/AppHelper'

import { BaseData } from 'ap-react-bootstrap'

class ServiceHeaderData extends BaseData {

	register(obj) {
		super.register(obj)

		this.obj.state = {}
	}

	unregister() {
	}

}
var ServiceHeaderObj = new ServiceHeaderData()
export default ServiceHeaderObj
