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
			avatarImage: null,
			name: '',
			address: '',
			email: '',
			diploma: ''
		}

		this._onAuxiliaryUpdate()

		AuxiliaryHelper.register(this, this._onAuxiliaryUpdate.bind(this))
		ImageHelper.register(this, this._onImageUpdate.bind(this))
	}

	unregister() {
	}

	_onAuxiliaryUpdate() {
		let auxiliary = AuxiliaryHelper.getData(AuthHelper.getEntityId())
		if (auxiliary) {
			let avatarImage = ImageHelper.getData(auxiliary.avatar)
			this.setState({ 
				avatar: auxiliary.avatar,
				avatarImage: avatarImage,
				name: AuxiliaryUtils.getFullName(auxiliary),
				email: auxiliary.email,
				diploma: auxiliary.diploma,
				address: AuxiliaryUtils.getAddress(auxiliary)
			})
			if (!avatarImage) {
				ImageHelper.getImage(auxiliary.avatar)
			}
		}
	}
	_onImageUpdate() {
		let avatar = this.getState('avatar')
		if (avatar) {
			this.setState({ avatarImage: ImageHelper.getData(avatar) })
		}
	}
}
var AuxiliaryHeaderObj = new AuxiliaryHeaderData()
export default AuxiliaryHeaderObj
