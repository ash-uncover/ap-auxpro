import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import ServiceHelper from 'helpers/ServiceHelper'

import { BaseData } from 'ap-react-bootstrap'

class ServiceTutoData extends BaseData {

	constructor() {
		super(...arguments)
	}

	register(obj) {
		super.register(obj)
		this.declareFunction('onFinishTutorial')
	}

	onFinishTutorial() {
		AppHelper.setBusy(true)
		.then(function () {
			return ServiceHelper.putService({
				id: AuthHelper.getEntityId(),
				isTutoSkipped: true
			})
		})
		.then(function () {
			return ServiceHelper.getService(AuthHelper.getEntityId())
		})
		.then(function () {
			setTimeout(AppHelper.setBusy, 200)
			return AppHelper.navigate('/service/redirect')
		})
		.catch(function (error) {
			setTimeout(AppHelper.setBusy, 200)
			console.error('Tuto complete error')
			console.error(error)
		}) 
	}

}
var ServiceTutoObj = new ServiceTutoData()
export default ServiceTutoObj
