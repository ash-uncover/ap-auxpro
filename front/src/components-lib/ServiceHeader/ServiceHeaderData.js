import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import ServiceHelper from 'helpers/ServiceHelper'
import ImageHelper from 'helpers/ImageHelper'

import ServiceUtils from 'utils-lib/entities/ServiceUtils'
import SocFunctionUtils from 'utils-lib/entities/SocFunctionUtils'
import StringUtils from 'utils-lib/StringUtils'

import { BaseData } from 'ap-react-bootstrap'

class ServiceHeaderData extends BaseData {

	register(obj) {
		super.register(obj)

		this.obj.state = {
			avatar: '',
			society: '',
			address: '',
			email: '',
			socialReason: ''
		}

		this._onServiceUpdate()

		ServiceHelper.register(AuthHelper.getEntityId(), this, this._onServiceUpdate.bind(this))
	}

	unregister() {
		ServiceHelper.unregister(this)
	}

	_onServiceUpdate() {
		let service = ServiceHelper.getData(AuthHelper.getEntityId())
		if (service) {
			this.setState({ 
				avatar: service.avatar,
				society: StringUtils.valueOrMissing(service.socialReason),
				address: StringUtils.valueOrMissing(ServiceUtils.getAddress(service)),
				email: AuthHelper.getEmail(),
				socialReason: StringUtils.valueOrMissing(SocFunctionUtils.getName(service.function))
			})
		}
	}
}
var ServiceHeaderObj = new ServiceHeaderData()
export default ServiceHeaderObj
