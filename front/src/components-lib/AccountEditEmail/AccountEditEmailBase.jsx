import React from 'react'
import AccountEditEmailBaseData from './AccountEditEmailBaseData'
import './AccountEditEmail.scss'

import AccountEditEmailChangeCode from './AccountEditEmailChangeCode'
import AccountEditEmailChangeConfirm from './AccountEditEmailChangeConfirm'
import AccountEditEmailChangeEmail from './AccountEditEmailChangeEmail'
import AccountEditEmailDemandCode from './AccountEditEmailDemandCode'
import AccountEditEmailDemandInitial from './AccountEditEmailDemandInitial'

class AccountEditEmailBase extends React.Component {

	constructor(props) {
		super(props)
		this.state = {}
	}

	componentWillMount() {
		AccountEditEmailBaseData.register(this)
	}

	componentWillUnmount() {
		AccountEditEmailBaseData.unregister()
	}

	render() {
		switch (this.state.state) {
		case AccountEditEmailBaseData.STATES.DEMAND_INITIAL: return (
			<AccountEditEmailDemandInitial onNext={this.onNext} />
		)
		case AccountEditEmailBaseData.STATES.DEMAND_CODE: return (
			<AccountEditEmailDemandCode onNext={this.onNext} />
		)
		case AccountEditEmailBaseData.STATES.CHANGE_EMAIL: return (
			<AccountEditEmailChangeEmail onNext={this.onNext} {...this.state.data} />
		)
		case AccountEditEmailBaseData.STATES.CHANGE_CODE: return (
			<AccountEditEmailChangeCode onNext={this.onNext} />
		)
		case AccountEditEmailBaseData.STATES.CHANGE_CONFIRM: return (
			<AccountEditEmailChangeConfirm onNext={this.onNext} />
		)
		default: return (<div>Unexpected value</div>)
		}
	}

}
export default AccountEditEmailBase
