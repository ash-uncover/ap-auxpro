import AppHelper from 'helpers/AppHelper'

import { BaseData } from 'ap-react-bootstrap'

class AuxiliaryHeaderData extends BaseData {

	register(obj) {
		super.register(obj)

		this.obj.state = {}
	}

	unregister() {
	}

}
var AuxiliaryHeaderObj = new AuxiliaryHeaderData()
export default AuxiliaryHeaderObj
