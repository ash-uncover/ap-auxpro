import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import ErrorHelper from 'helpers/ErrorHelper'
import { BaseData } from 'ap-react-bootstrap'

class AccountEditPasswordChangeData extends BaseData {

	register(obj) {
		super.register(obj)
		
		this.declareFunction('onChange')
		this.declareFunction('onCancel')
		this.declareFunction('onSubmit')

		this.declareFunction('isSubmitDisabled')

		ErrorHelper.register('PUT_AUTH_PASSWORD', this, this.handlePutAuthPasswordError.bind(this))
	}

	unregister() {
		ErrorHelper.unregister(this)
	}


	// Store notifications //
	// --------------------------------------------------------------------------------

	handlePutAuthPasswordError() {
		let errorData = ErrorHelper.getData('PUT_AUTH_PASSWORD')
		let error = !!errorData
		let errorMessage = ''
		
		let oldPassword = this.getState('oldPassword')
		let newPassword = this.getState('newPassword')
		let newConfirm = this.getState('newConfirm')
		
		if (error) {
			errorMessage = 'Erreur lors de la modification du mot de passe'
			oldPassword = ''
			newPassword = ''
			newConfirm = ''
			if (errorData.status === 401) {
				errorMessage = 'Mot de passe invalide'
			}
		}

		this.setState({
			errorLastTry: error,
			errorJustHappened: error,
			errorMessage: errorMessage,
			oldPassword: oldPassword,
			newPassword: newPassword,
			newConfirm: newConfirm
		})
	}


	// View callbacks //
	// --------------------------------------------------------------------------------

	onChange(id, event, value) {
		let data = {
			errorJustHappened: false,
			errorMessage: ''
		}
		data[id] = value
		this.setState(data)
	}
	onCancel() {
		AppHelper.navigateBack()
	}
	onComplete() {
		this.obj.props.onNext && this.obj.props.onNext()
	}
	onSubmit() {
		let data = {
			oldPassword: this.getState('oldPassword'),
			password: this.getState('newPassword')
		}

		AppHelper.setBusy(true).
		then(function () {
			return AuthHelper.putAuthPassword(data)
		}).
		then(function () {
			this.onComplete()
		}.bind(this)).
		catch(function (error) {
			console.error('Change password error')
		}).
		then(function () {
			setTimeout(AppHelper.setBusy, 200)
		})
	}


	// View helpers //
	// --------------------------------------------------------------------------------

	isSubmitDisabled() {
		let hasOldPassword = !!this.getState('oldPassword')
		let hasNewPassword = !!this.getState('newPassword')
		let hasNewConfirm = !!this.getState('newConfirm')
		let confirmMatched = this.getState('newConfirm') === this.getState('newPassword')
		let notInError = !this.getState('errorJustHappened')
		return !hasOldPassword || !hasNewConfirm || !hasNewPassword || !confirmMatched || !notInError
	}

}
var AccountEditPasswordChangeObj = new AccountEditPasswordChangeData()
export default AccountEditPasswordChangeObj
