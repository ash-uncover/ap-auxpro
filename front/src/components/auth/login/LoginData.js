import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import ErrorHelper from 'helpers/ErrorHelper'

import { BaseData } from 'ap-react-bootstrap'

class LoginData extends BaseData {

	register(obj) {
		super.register(obj)

		AuthHelper.register('', this, this.onLogon.bind(this))
		ErrorHelper.register('GET_AUTH', this, this.onLogonError.bind(this))

		this.obj.onCancel = this.onCancel.bind(this)
		this.obj.onSubmit = this.onSubmit.bind(this)

		this.obj.onChangeNoError = this.onChangeNoError.bind(this)

		this.obj.state = {
			username: '',
			password: '',
			errorLastTry: false,
			errorJustHappened: false,
			errorMessage: ''
		}
	}

	unregister() {
		AuthHelper.unregister(this)
		ErrorHelper.unregister(this)
	}

	onChangeNoError() {
		this.onChange(...arguments)
		this.setState({
			errorJustHappened: false,
			errorMessage: ''
		})
	}

	onCancel() {
		AppHelper.navigate('/home')
	}

	onSubmit() {
		AppHelper.setBusy(true).
		then(function() {
			return AuthHelper.getAuth({
				username: this.getState('username'), 
				password: this.getState('password')
			})
		}.bind(this)).
		then(function () {
			setTimeout(AppHelper.setBusy, 200)
		}).
		catch(function () {
			setTimeout(AppHelper.setBusy, 200)
			console.error('Logon error')
		})
	}

	onLogon() {
		if (AuthHelper.getToken()) {
			switch (AuthHelper.getType()) {
			case 'auxiliary':
			case 'service':
				AppHelper.navigate('/' + AuthHelper.getType() + '/home')
				break
			default:
				AppHelper.navigate('/')
				console.log("type d'utilisateur non supporté")
				break
			}	
		} else {
			console.log('Utilisateur non connecté')
			AppHelper.navigate('/')
		}
	}

	onLogonError() {
		let errorData = ErrorHelper.getData('GET_AUTH')
		let error = !!errorData
		let errorMessage = ''
		let password = this.getState('password')
		if (error) {
			errorMessage = 'Echec de connexion'
			password = ''
			if (errorData.status === 401) {
				errorMessage = 'Utilisateur ou mot de passe invalide'
			}
		}
		this.setState({
			errorLastTry: error,
			errorJustHappened: error,
			errorMessage: errorMessage,
			password: password
		})
	}

}
var LoginObj = new LoginData()
export default LoginObj
