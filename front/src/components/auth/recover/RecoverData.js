import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'

import { BaseData } from 'ap-react-bootstrap'

class RecoverData extends BaseData {

	register(obj) {
		super.register(obj)

		this.obj.onCancel = AppHelper.navigate.bind(AppHelper, '/home')
		this.obj.onSubmit = this.onSubmit.bind(this)
	}

	unregister() {
	}

	onSubmit() {
		AppHelper.setBusy(true).
		then(function() {
			return AuthHelper.postAuthRecover({
				username: this.getState('email')
			})
		}.bind(this)).
		then(function() {
			setTimeout(AppHelper.setBusy, 200)
			let email = this.getState('email')

			let data = { email: email }
			let dataString = JSON.stringify({ email: email })
			let dataBase64 = btoa(dataString)
			let dataUrl = encodeURIComponent(dataBase64)

			AppHelper.navigate('/auth/recover/confirm/' + dataUrl)
		}.bind(this)).
		catch(function (error) {
			setTimeout(AppHelper.setBusy, 200)
			console.error('Recover error')
			console.error(error)
		})
		
	}

}
var RecoverObj = new RecoverData()
export default RecoverObj
