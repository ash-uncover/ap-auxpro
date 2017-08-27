import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import ErrorHelper from 'helpers/ErrorHelper'

import { BaseData } from 'ap-react-bootstrap'

class RecoverConfirmData extends BaseData {

	register(obj, email) {
		super.register(obj)
		
		this.obj.onCancel = AppHelper.navigate.bind(AppHelper, '/home')
		this.obj.onSubmitCode = this.onSubmitCode.bind(this)
		this.obj.onSubmitPassword = this.onSubmitPassword.bind(this)

		this.obj.onChangeNoError = this.onChangeNoError.bind(this)

		this.obj.state = {
			email: !!email ? decodeURIComponent(email) : '',
			emailSet: !!email,
			token: '',
			password: '',
			confirm: ''
		}

		ErrorHelper.register('POST_AUTH_RECOVER_CHECK', this, this.onRecoverCodeError.bind(this))
		ErrorHelper.register('PUT_AUTH_RECOVER', this, this.onRecoverPasswordError.bind(this))
	}

	unregister() {
		ErrorHelper.unregister()
	}

	onChangeNoError() {
		this.onChange(...arguments)
		this.setState({
			errorJustHappened: false,
			errorMessage: ''
		})
	}

	onSubmitCode() {
		AppHelper.setBusy(true).
		then(function() {
			return AuthHelper.postAuthRecoverCheck({
				username: this.getState('email'),
				token: this.getState('token')
			})
		}.bind(this)).
		then(function () {
			setTimeout(AppHelper.setBusy, 200)
			this.setState({ confirmed: true })

		}.bind(this)).
		catch(function (error) {
			setTimeout(AppHelper.setBusy, 200)
			console.error('Recover code confirm error')
			console.error(error)
		})
	}

	onSubmitPassword() {
		AppHelper.setBusy(true).
		then(function() {
			return AuthHelper.putAuthRecover({
				username: this.getState('email'),
				token: this.getState('token'),
				password: this.getState('password')
			})
		}.bind(this)).
		then(function () {
			setTimeout(AppHelper.setBusy, 200)
			this.setState({ completed: true })

		}.bind(this)).
		catch(function (error) {
			setTimeout(AppHelper.setBusy, 200)
			console.error('Recover passsword confirm error')
			console.error(error)
		})
	}

	onRecoverCodeError() {
		this._onError(ErrorHelper.getData('POST_AUTH_RECOVER_CHECK'))
	}

	onRecoverPasswordError() {
		this._onError(ErrorHelper.getData('PUT_AUTH_RECOVER'))
	}

	_onError(errorData) {
		let error = !!errorData
		let errorMessage = ''
		let token = this.getState('token')
		if (error) {
			errorMessage = 'Echec de confirmation du compte'
			token = ''
		}
		this.setState({
			errorLastTry: error,
			errorJustHappened: error,
			errorMessage: errorMessage,
			token: token
		})
	}
}
var RecoverConfirmObj = new RecoverConfirmData()
export default RecoverConfirmObj
