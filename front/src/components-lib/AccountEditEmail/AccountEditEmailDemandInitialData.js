import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import ErrorHelper from 'helpers/ErrorHelper'
import { BaseData } from 'ap-react-bootstrap'

class AccountEditEmailDemandInitialData extends BaseData {

	register(obj) {
		super.register(obj)

		this.declareFunction('onCancel')
		this.declareFunction('onHasCode')
		this.declareFunction('onSubmit')

		ErrorHelper.register('POST_AUTH_CHANGEMAIL', this, this.handleError.bind(this))
	}


	// Store notification //
	// --------------------------------------------------------------------------------

	unregister() {
		ErrorHelper.unregister(this)
	}

	handleError() {
		let errorData = ErrorHelper.getData('POST_AUTH_CHANGEMAIL')
		let error = !!errorData
		let errorMessage = ''
		if (error) {
			errorMessage = "Echec d'envoi du mail de confirmation"
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
	onHasCode() {
		this.obj.props.onNext && this.obj.props.onNext()
	}
	onSubmit() {
		AppHelper.setBusy(true).
		then(function () {
			return AuthHelper.postAuthChangemail()
		}).
		then(function () {
			this.onHasCode()
			setTimeout(AppHelper.setBusy, 200)
		}.bind(this)).
		catch(function (error) {
			setTimeout(AppHelper.setBusy, 200)
			console.error('Changemail demand initial error')
			console.error(error)
		})
	}
}

let AccountEditEmailDemandInitialObj = new AccountEditEmailDemandInitialData()
export default AccountEditEmailDemandInitialObj
