import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import AuxiliaryHelper from 'helpers/AuxiliaryHelper'

import { BaseData } from 'ap-react-bootstrap'

class AuxiliaryHomeData extends BaseData {

	register(obj) {
		super.register(obj)

		this.obj.state = {}

		AuxiliaryHelper.register(AuthHelper.getEntityId(), this, this._onAuxiliaryUpdate.bind(this))
	}

	unregister() {
	}



	_onAuxiliaryUpdate() {
		let auxiliary = AuxiliaryHelper.getData(AuthHelper.getEntityId())
		this.setState({
		})
	}

}
var AuxiliaryHomeObj = new AuxiliaryHomeData()
export default AuxiliaryHomeObj
