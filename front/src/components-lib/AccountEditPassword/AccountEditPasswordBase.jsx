import React from 'react'
import AccountEditPasswordBaseData from './AccountEditPasswordBaseData'
import './AccountEditPassword.scss'

import AccountEditPasswordChange from './AccountEditPasswordChange'
import AccountEditPasswordConfirm from './AccountEditPasswordConfirm'

class AccountEditPasswordBase extends React.Component {

	constructor(props) {
		super(props)
	}

	componentWillMount() {
		AccountEditPasswordBaseData.register(this)
	}

	componentWillUnmount() {
		AccountEditPasswordBaseData.unregister()
	}

	render() {
		switch (this.state.state) {
		case AccountEditPasswordBaseData.STATES.CHANGE: return (
			<AccountEditPasswordChange onNext={this.onNext} />
		)
		case AccountEditPasswordBaseData.STATES.CONFIRM: return (
			<AccountEditPasswordConfirm />
		)
		default: return (<div>Unexpected value</div>)
		}
	}

}
export default AccountEditPasswordBase
