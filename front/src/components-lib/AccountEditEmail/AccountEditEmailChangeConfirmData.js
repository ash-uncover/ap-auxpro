import AppHelper from 'helpers/AppHelper'
import { BaseData } from 'ap-react-bootstrap'

class AccountEditEmailChangeConfirmData extends BaseData {

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
var AccountEditEmailChangeConfirmObj = new AccountEditEmailChangeConfirmData()
export default AccountEditEmailChangeConfirmObj
