import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'

import { BaseData } from 'ap-react-bootstrap'

class AuxiliaryData extends BaseData {

	register(obj) {
		super.register(obj)
		
		/* TODO > find a way to generate this stuff */
		if (AuthHelper.getType() !== 'auxiliary') {
			AppHelper.navigate('/home')
			return;
		}

		this.obj.state = {}
	}

	unregister() {
	}

}
var AuxiliaryObj = new AuxiliaryData()
export default AuxiliaryObj
