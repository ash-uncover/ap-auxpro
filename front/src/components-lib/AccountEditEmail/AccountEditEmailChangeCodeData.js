import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import ErrorHelper from 'helpers/ErrorHelper'
import { BaseData } from 'ap-react-bootstrap'

class AccountEditEmailChangeCodeData extends BaseData {

    constructor() {
        super(...arguments)
        
        this.handleError = this.handleError.bind(this)
    }

    register(obj) {
        super.register(obj)

        this.declareFunction('onCancel')
        this.declareFunction('onSubmit')
        this.declareFunction('isSubmitDisabled')

		ErrorHelper.register('POST_AUTH_CHANGEMAIL_CONFIRM', this.handleError)
	}

	unregister() {
		ErrorHelper.unregister('POST_AUTH_CHANGEMAIL_CONFIRM', this.handleError)
	}


	// Store notification //
	// --------------------------------------------------------------------------------

	handleError() {
		let errorData = ErrorHelper.getData('POST_AUTH_CHANGEMAIL_CONFIRM')
		let error = !!errorData
		let errorMessage = ''
		if (error) {
			errorMessage = 'Impossible de confirmer la nouvelle adresse électronique'
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
			return AuthHelper.postAuthChangemailConfirm(data)
		}).
		then(function () {
			this.onCodeSubmitted()
			setTimeout(AppHelper.setBusy, 200)
		}.bind(this)).
		catch(function (error) {
			setTimeout(AppHelper.setBusy, 200)
			console.error('Changemail change code error')
			console.error(error)
		})
	}


	// Helper methods //
	// --------------------------------------------------------------------------------

	isSubmitDisabled() {
		return !this.getState('token')
	}
}

let AccountEditEmailChangeCodeObj = new AccountEditEmailChangeCodeData()
export default AccountEditEmailChangeCodeObj
