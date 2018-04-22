import React from 'react'
import PropTypes from 'prop-types'
import AccountRegister from './AccountRegister'

import AppHelper from 'helpers/AppHelper'
import ServiceHelper from 'helpers/ServiceHelper'
import ErrorHelper from 'helpers/ErrorHelper'

class AccountRegisterData extends React.Component {

	constructor(props) {
		super(props)

		this.state = {}

		this.onSubmit = this._onSubmit.bind(this)
	}

	/* Component lifecycle */

	componentWillMount() {
		ErrorHelper.register(this.props.action, this, this.forceUpdate.bind(this))
	}

	componentWillUnmount() {
		ErrorHelper.unregister(this)
	}

	/* View callbacks */

	_onSubmit(data) {
		console.log('----------------')
		console.log(data)
		AppHelper.setBusy(true)
		.then(() => this.props.helper({
			username: data.email,
			email: data.email,
			password: data.password
		}))
		.then(() => {
			setTimeout(AppHelper.setBusy, 200)
			let dataString = JSON.stringify({ email: data.email })
			let dataBase64 = btoa(dataString)
			let dataUrl = encodeURIComponent(dataBase64)
			AppHelper.navigate('/auth/register/confirm/' + dataUrl)
		})
		.catch((error) => {
			setTimeout(AppHelper.setBusy, 200)
			console.error('Register error')
			console.error(error)
		})
	}

	/* Rendering functions */

	mapStateToProps() {
		const error = ErrorHelper.getData(this.props.action)
		return {
			title: this.props.title,
			error: error ? 'Echec de création de compte' : null
		}
	}

	mapDispatchToProps() {
		return {
			onSubmit: this.onSubmit,
			onCancel: AppHelper.navigate.bind(AppHelper, '/home')
		}	
	}

	render() {
		const props = Object.assign(this.mapStateToProps(), this.mapDispatchToProps())
		return (
			<AccountRegister {...props} />
		)
	}
}

AccountRegisterData.propTypes = {
	title: PropTypes.string.isRequired,
	action: PropTypes.string.isRequired,
	helper: PropTypes.func.isRequired
}

AccountRegisterData.defaultProps = {
}

export default AccountRegisterData
