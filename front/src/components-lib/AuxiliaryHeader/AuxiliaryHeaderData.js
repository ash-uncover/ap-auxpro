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
			this.setState({ 
				avatar: auxiliary.avatar,
				name: auxiliary.civility + ' ' + auxiliary.firstName + ' ' + auxiliary.lastName,
				email: auxiliary.email,
				diploma: auxiliary.diploma,
				address: auxiliary.address + ' ' + auxiliary.postalCode + ' ' + auxiliary.city
			})
			if (!ImageHelper.getData(auxiliary.avatar)) {
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
