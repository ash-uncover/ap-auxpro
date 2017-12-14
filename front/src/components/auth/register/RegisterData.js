import AppHelper from 'helpers/AppHelper'
import { BaseData } from 'ap-react-bootstrap'

class RegisterData extends BaseData {

	register(obj) {
		super.register(obj)

		// Callbacks
		this.obj.onRegisterAux = AppHelper.navigate.bind(AppHelper, '/auth/register/auxiliary')
		this.obj.onRegisterSad = AppHelper.navigate.bind(AppHelper, '/auth/register/service')
	}

	unregister() {
	}

}
var RegisterObj = new RegisterData()
export default RegisterObj
