import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'

import { BaseData } from 'ap-react-bootstrap'

class LogoutData extends BaseData {

	register(obj) {
		super.register(obj)

		AuthHelper.logout().then(function() {
			AppHelper.navigate('/home')
		})
	}

	unregister() {
	}

}
var LogoutObj = new LogoutData()
export default LogoutObj
