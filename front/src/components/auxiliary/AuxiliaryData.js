import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import AuxiliaryHelper from 'helpers/AuxiliaryHelper'

import { BaseData } from 'ap-react-bootstrap'

class AuxiliaryData extends BaseData {

	register(obj) {
		super.register(obj)

		this.obj.state = {}		

		/* TODO > find a way to generate this stuff */
		if (AuthHelper.getType() !== 'auxiliary') {
			AppHelper.navigate('/home')
			return;
		}

		AuxiliaryHelper.getAuxiliary(AuthHelper.getEntityId()).then(this._onLoad.bind(this))
	}

	unregister() {
	}

	_onLoad() {
	}
}
var AuxiliaryObj = new AuxiliaryData()
export default AuxiliaryObj
