import AppHelper from 'helpers/AppHelper'
import { BaseData } from 'ap-react-bootstrap'

let STATES = {
	CHANGE: { onNext: 'CONFIRM' },
	CONFIRM: {}
}

class AccountEditPasswordBaseData extends BaseData {

	register(obj) {
		super.register(obj)
		
		this.declareFunction('onNext')

		this.obj.state = {
			state: STATES.CHANGE
		}
	}

	
	// View callbacks //
	// --------------------------------------------------------------------------------

	onNext(data) {
		let state = this.getState('state')
		if (state.onNext) {
			this.setState({ 
				state: STATES[state.onNext]
			})
		}
	}
}

let AccountEditPasswordBaseObj = new AccountEditPasswordBaseData()
AccountEditPasswordBaseObj.STATES = STATES
export default AccountEditPasswordBaseObj
