import React from 'react'
import RecoverConfirmEmailData from './RecoverConfirmEmailData'
import './RecoverConfirmEmail.scss'

import RecoverConfirm from 'components/auth/recover/confirm/RecoverConfirm'

class RecoverConfirmEmail extends React.Component {

	constructor(props) {
		super(props)
	}

	componentWillMount() {
		RecoverConfirmEmailData.register(this, this.props.params.email)
	}

	componentWillUnmount() {
		RecoverConfirmEmailData.unregister()
	}

	render() {
		return (
			<RecoverConfirm email={this.props.params.email} />
		)
	}

}
export default RecoverConfirmEmail
