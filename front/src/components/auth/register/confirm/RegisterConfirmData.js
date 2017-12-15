import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import ErrorHelper from 'helpers/ErrorHelper'

import { BaseData } from 'ap-react-bootstrap'

class RegisterConfirmData extends BaseData {

	register(obj) {
		super.register(obj)
		
		this.obj.onCancel = AppHelper.navigate.bind(AppHelper, '/home')
		this.declareFunction('onSubmit')
		this.declareFunction('onChangeNoError')

		if (this.obj.props.email) {
			this.obj.state.email = this.obj.props.email
			this.obj.state.emailSet = true
		}
		if (this.obj.props.token) {
			this.obj.state.token = this.obj.props.token
			this.obj.state.tokenSet = true
		}

		if (this.obj.props.email && this.obj.props.token) {
			this.onSubmit()
		}

		ErrorHelper.register('POST_AUTH_REGISTER', this, this.onRegisterError.bind(this))
	}

	unregister() {
	}

	onChangeNoError() {
		this.onChange(...arguments)
		this.setState({
			errorJustHappened: false,
			errorMessage: ''
		})
	}

	onSubmit() {
		AppHelper.setBusy(true).
		then(function() {
			return AuthHelper.postAuthRegister({
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
			console.error('Register confirm error')
			console.error(error)
		})
	}

	onRegisterError() {
		let errorData = ErrorHelper.getData('POST_AUTH_REGISTER')
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
var RegisterConfirmObj = new RegisterConfirmData()
export default RegisterConfirmObj
