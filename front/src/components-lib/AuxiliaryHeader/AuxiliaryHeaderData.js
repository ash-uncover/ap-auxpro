import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import AuxiliaryHelper from 'helpers/AuxiliaryHelper'
import ImageHelper from 'helpers/ImageHelper'

import { BaseData } from 'ap-react-bootstrap'

class AuxiliaryHeaderData extends BaseData {

	register(obj) {
		super.register(obj)

		this.obj.state = {
			avatar: '',
			auxiliary: null
		}

		this._onAuxiliaryUpdate()

		AuxiliaryHelper.register(this, this._onAuxiliaryUpdate.bind(this))
		ImageHelper.register(this, this._onImageUpdate.bind(this))
	}

	unregister() {
	}

	_onAuxiliaryUpdate() {
		let auxiliary = AuxiliaryHelper.getData(AuthHelper.getEntityId())
		this.setState({ auxiliary: auxiliary })
		if (auxiliary) {
			ImageHelper.getImage(auxiliary.avatar)
		}
	}
	_onImageUpdate() {
		let auxiliary = this.getState('auxiliary')
		if (auxiliary && auxiliary.avatar) {
			this.setState({ avatar: ImageHelper.getData(auxiliary.avatar) })
		}
	}
}
var AuxiliaryHeaderObj = new AuxiliaryHeaderData()
export default AuxiliaryHeaderObj
