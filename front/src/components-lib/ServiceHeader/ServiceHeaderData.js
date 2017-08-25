import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import ServiceHelper from 'helpers/ServiceHelper'
import ImageHelper from 'helpers/ImageHelper'

import ServiceUtils from 'utils/entities/ServiceUtils'

import { BaseData } from 'ap-react-bootstrap'

class ServiceHeaderData extends BaseData {

	register(obj) {
		super.register(obj)

		this.obj.state = {
			avatar: '',
			avatarImage: null,
			society: '',
			address: '',
			email: '',
			socialReason: ''
		}

		this._onServiceUpdate()

		ServiceHelper.register(this, this._onServiceUpdate.bind(this))
		ImageHelper.register(this, this._onImageUpdate.bind(this))
	}

	unregister() {
		ServiceHelper.unregister(this)
		ImageHelper.unregister(this)
	}

	_onServiceUpdate() {
		let service = ServiceHelper.getData(AuthHelper.getEntityId())
		if (service) {
			let avatarImage = ImageHelper.getData(service.avatar)
			this.setState({ 
				avatar: service.avatar,
				avatarImage: avatarImage,
				society: service.socialReason,
				address: ServiceUtils.getAddress(service),
				email: service.email,
				socialReason: service.function
			})
			if (!avatarImage) {
				ImageHelper.getImage(service.avatar)
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
var ServiceHeaderObj = new ServiceHeaderData()
export default ServiceHeaderObj
