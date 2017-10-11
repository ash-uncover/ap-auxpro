import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import ServiceHelper from 'helpers/ServiceHelper'
import { BaseData } from 'ap-react-bootstrap'

class ServiceRedirectData extends BaseData {

	register(obj) {
		super.register(obj)

		let service = ServiceHelper.getData(AuthHelper.getEntityId())
		if (!service.isTutoSkipped) {
			AppHelper.navigate('/service/tuto')
		} else if (!service.profilCompleted) {
			AppHelper.navigate('/service/initial')
		} else {
			AppHelper.navigate('/service/home')
		}
	}

}
let ServiceRedirectObj = new ServiceRedirectData()
export default ServiceRedirectObj
