import AppHelper from 'helpers/AppHelper'
import ServiceHelper from 'helpers/ServiceHelper'
import ErrorHelper from 'helpers/ErrorHelper'

import { BaseData } from 'ap-react-bootstrap'

class RegisterServiceData extends BaseData {

	register(obj) {
		super.register(obj)

		this.obj.onCancel = AppHelper.navigate.bind(AppHelper, '/home')
		this.obj.onSubmit = this.onSubmit.bind(this)

		this.obj.onChangeNoError = this.onChangeNoError.bind(this)

		ErrorHelper.register('POST_SERVICE', this, this.onRegisterError.bind(this))
	}

	unregister() {
		ErrorHelper.unregister(this)
	}

	onChangeNoError() {
		this.onChange(...arguments)
		this.setState({
			errorJustHappened: false,
			errorMessage: ''
		})
	}

	onSubmit() {
		let email = this.getState('email')
		AppHelper.setBusy(true).
		then(function() {
			return ServiceHelper.postService({
				username: email,
				email: email,
				password: this.getState('password')			
			})
		}.bind(this)).
		then(function () {
			setTimeout(AppHelper.setBusy, 200)

			AppHelper.navigate('/auth/register/confirm/' + encodeURIComponent(email))
		}).
		catch(function (error) {
			setTimeout(AppHelper.setBusy, 200)
			console.error('Register error')
			console.error(error)
		})
	}

	onRegisterError() {
		let errorData = ErrorHelper.getData('POST_SERVICE')
		let error = !!errorData
		let errorMessage = ''
		let password = this.getState('password')
		let confirm = this.getState('confirm')
		if (error) {
			errorMessage = 'Echec de création de compte'
			password = ''
			confirm = ''
		}
		this.setState({
			errorLastTry: error,
			errorJustHappened: error,
			errorMessage: errorMessage,
			password: password,
			confirm: confirm
		})
	}

}
var RegisterServiceObj = new RegisterServiceData()
export default RegisterServiceObj
