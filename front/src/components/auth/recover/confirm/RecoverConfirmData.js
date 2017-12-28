import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import ErrorHelper from 'helpers/ErrorHelper'

import { BaseData } from 'ap-react-bootstrap'

class RecoverConfirmData extends BaseData {

	constructor() {
		super(...arguments)

		this.STATES = {
			ASK_ALL: 'ASK_ALL',
			ASK_CODE: 'ASK_CODE',
			ASK_NONE: 'ASK_NONE'
		}
	}

	register(obj, propsData) {
		super.register(obj)
		
		this.obj.onCancel = AppHelper.navigate.bind(AppHelper, '/home')
		
		this.declareFunction('onSubmitCode')
		this.declareFunction('onSubmitPassword')
		this.declareFunction('onChangeNoError')

		let data = {}
		try {
			data = JSON.parse(atob(propsData))
		} catch (error) {
			console.error('failed to decode data')
		}

		if (data && data.email && data.token) {
			this.obj.state.email = data.email
			this.obj.state.emailSet = true
			this.obj.state.state = this.STATES.ASK_NONE
			this.obj.state.token = data.token
			this.obj.state.tokenSet = true
			this.onSubmitCode()

		} else if (data && data.email) {
			this.obj.state.email = data.email
			this.obj.state.emailSet = true
			this.obj.state.state = this.STATES.ASK_CODE

		} else {
			this.obj.state.state = this.STATES.ASK_ALL
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
