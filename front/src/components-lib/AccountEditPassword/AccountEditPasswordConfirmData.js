import AppHelper from 'helpers/AppHelper'
import { BaseData } from 'ap-react-bootstrap'

class AccountEditPasswordConfirmData extends BaseData {

	register(obj) {
		super.register(obj)
		this.declareFunction('onComplete')
	}

	// View callbacks //
	// --------------------------------------------------------------------------------

	onComplete() {
		AppHelper.navigateBack()
	}
}
let AccountEditPasswordConfirmObj = new AccountEditPasswordConfirmData()
export default AccountEditPasswordConfirmObj
