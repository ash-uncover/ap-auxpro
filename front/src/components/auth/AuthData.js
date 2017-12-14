import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'

import { BaseData } from 'ap-react-bootstrap'

class AuthData extends BaseData {

	register(obj) {
		super.register(obj)
		
		/* TODO > find a way to generate this stuff */
		if (AuthHelper.getType()) {
			AppHelper.navigate('/home')
			return;
		}
	}

	unregister() {
	}

}
var AuthObj = new AuthData()
export default AuthObj
