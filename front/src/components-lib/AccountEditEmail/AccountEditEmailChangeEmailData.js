import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import ErrorHelper from 'helpers/ErrorHelper'
import { BaseData } from 'ap-react-bootstrap'

class AccountEditEmailChangeEmailData extends BaseData {

    constructor() {
        super(...arguments)
        
        this.handleError = this.handleError.bind(this)
    }

    register(obj, token) {
        super.register(obj)

        this.declareFunction('onCancel')
        this.declareFunction('onSubmit')
        this.declareFunction('isSubmitDisabled')

        this.setState({
            email: '',
            token: token
        })
        
		ErrorHelper.register('PUT_AUTH_CHANGEMAIL', this.handleError)
	}

	unregister() {
		ErrorHelper.unregister('PUT_AUTH_CHANGEMAIL', this.handleError)
	}


	// Store notification //
	// --------------------------------------------------------------------------------

	handleError() {
		let errorData = ErrorHelper.getData('PUT_AUTH_CHANGEMAIL')
		let error = !!errorData
		let errorMessage = ''
		if (error) {
			errorMessage = 'Une erreur est survenue'
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
	onChangeMailSent() {
		this.obj.props.onNext && this.obj.props.onNext()
	}
	onSubmit() {
		let data = {
			email: this.getState('email'),
			token: this.getState('token')
		}
		AppHelper.setBusy(true).
		then(function () {
			return AuthHelper.putAuthChangemail(data)
		}).
		then(function () {
			this.onChangeMailSent()
			setTimeout(AppHelper.setBusy, 200)
		}.bind(this)).
		catch(function (error) {
			setTimeout(AppHelper.setBusy, 200)
			console.error('Changemail change email error')
			console.error(error)
		})
	}


	// Helper methods //
	// --------------------------------------------------------------------------------

	isSubmitDisabled() {
		return !this.getState('email') || !this.getState('token')
	}
}

let AccountEditEmailChangeEmailObj = new AccountEditEmailChangeEmailData()
export default AccountEditEmailChangeEmailObj
