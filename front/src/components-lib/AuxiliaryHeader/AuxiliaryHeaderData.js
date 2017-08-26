import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import AuxiliaryHelper from 'helpers/AuxiliaryHelper'
import ImageHelper from 'helpers/ImageHelper'

import AuxiliaryUtils from 'utils/entities/AuxiliaryUtils'

import { BaseData } from 'ap-react-bootstrap'

class AuxiliaryHeaderData extends BaseData {

	register(obj) {
		super.register(obj)

		this.obj.state = {
			avatar: '',
			name: '',
			address: '',
			email: '',
			diploma: ''
		}

		this._onAuxiliaryUpdate()

		AuxiliaryHelper.register(AuthHelper.getEntityId(), this, this._onAuxiliaryUpdate.bind(this))
	}

	unregister() {
		AuxiliaryHelper.unregister(this)
	}

	_onAuxiliaryUpdate() {
		let auxiliary = AuxiliaryHelper.getData(AuthHelper.getEntityId())
		if (auxiliary) {
			this.setState({ 
				avatar: auxiliary.avatar,
				name: AuxiliaryUtils.getFullName(auxiliary),
				address: AuxiliaryUtils.getAddress(auxiliary),
				email: AuthHelper.getEmail(),
				diploma: auxiliary.diploma
			})
		}
	}
}
var AuxiliaryHeaderObj = new AuxiliaryHeaderData()
export default AuxiliaryHeaderObj
