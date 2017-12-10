import AppHelper from 'helpers/AppHelper'
import { BaseData } from 'ap-react-bootstrap'

let STATES = {
	DEMAND_INITIAL: { onNext: 'DEMAND_CODE' },
	DEMAND_CODE: { onNext: 'CHANGE_EMAIL' },
	CHANGE_EMAIL: { onNext: 'CHANGE_CODE' },
	CHANGE_CODE: { onNext: 'CHANGE_CONFIRM' },
	CHANGE_CONFIRM: {}
}

class AccountEditEmailBaseData extends BaseData {

	register(obj) {
		super.register(obj)
		
		this.declareFunction('onNext')

		this.setState({
			state: STATES.DEMAND_INITIAL,
			data: {}
		})
	}

	unregister() {
	}


	// View callbacks //
	// --------------------------------------------------------------------------------

	onNext(data) {
		let state = this.getState('state')
		if (state.onNext) {
			this.setState({ 
				state: STATES[state.onNext],
				data: data
			})
		}
	}
}

let AccountEditEmailBaseObj = new AccountEditEmailBaseData()
AccountEditEmailBaseObj.STATES = STATES
export default AccountEditEmailBaseObj
