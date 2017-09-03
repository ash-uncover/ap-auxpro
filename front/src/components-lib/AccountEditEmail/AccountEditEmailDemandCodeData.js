import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import ErrorHelper from 'helpers/ErrorHelper'
import { BaseData } from 'ap-react-bootstrap'

class AccountEditEmailDemandCodeData extends BaseData {

	register(obj) {
		super.register(obj)

		this.declareFunction('onCancel')
		this.declareFunction('onSubmit')
		this.declareFunction('isSubmitDisabled')

		this.obj.state = {
			token: '',
			errorMessage: ''
		}

		ErrorHelper.register('POST_AUTH_CHANGEMAIL_CHECK', this, this.handleError.bind(this))
	}

	unregister() {
		ErrorHelper.unregister(this)
	}


	// Store notification //
	// --------------------------------------------------------------------------------

	handleError() {
		let errorData = ErrorHelper.getData('POST_AUTH_CHANGEMAIL_CHECK')
		let error = !!errorData
		let errorMessage = ''
		if (error) {
			errorMessage = 'Impossible de valider le code de confirmation'
			if (errorData.status === 401) {
				errorMessage = 'Utilisateur ou mot de passe invalide'
			}
		}
		this.setState({
			errorMessage: errorMessage
		})
	}


	// View callbacks //
	// --------------------------------------------------------------------------------

	onCancel() {
		AppHelper.navigateBack()
	}
	onCodeSubmitted() {
		this.obj.props.onNext && this.obj.props.onNext({ token: this.getState('token') })
	}
	onSubmit() {
		let data = {
			token: this.getState('token')
		}
		AppHelper.setBusy(true).
		then(function () {
			return AuthHelper.postAuthChangemailCheck(data)
		}).
		then(function () {
			this.onCodeSubmitted()
			setTimeout(AppHelper.setBusy, 200)
		}.bind(this)).
		catch(function (error) {
			setTimeout(AppHelper.setBusy, 200)
			console.error('Changemail demand code error')
			console.error(error)
		})
	}


	// Helper methods //
	// --------------------------------------------------------------------------------

	isSubmitDisabled() {
		return !this.getState('token')
	}
}

let AccountEditEmailDemandCodeObj = new AccountEditEmailDemandCodeData()
export default AccountEditEmailDemandCodeObj
