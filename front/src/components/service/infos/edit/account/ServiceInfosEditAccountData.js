import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import ServiceHelper from 'helpers/ServiceHelper'
import PromotioncodeHelper from 'helpers/PromotioncodeHelper'

import { BaseData, Formatters } from 'ap-react-bootstrap'

class ServiceInfosEditAccountData extends BaseData {

	register(obj) {
		super.register(obj)
		
		this.declareFunction('onCancel')
		this.declareFunction('onSubmit')

		this.declareFunction('isSubmitDisabled')

		this.obj.state = {
			accountType: null,
			accountExpiryDate: null,
			accountCode: '',
			errorMessage: ''
		}

		ServiceHelper.register(AuthHelper.getEntityId(), this, this.onServiceUpdate.bind(this))

		this._onServiceUpdate()
	}

	unregister() {
		ServiceHelper.unregister(this)
	}


	// Store notifications //
	// --------------------------------------------------------------------------------

	onServiceUpdate() {
		this._onServiceUpdate()
		this.forceUpdate()
	}

	_onServiceUpdate() {
		let service = ServiceHelper.getData(AuthHelper.getEntityId()) || {}
		this.obj.state.accountType = service.accountType
		this.obj.state.accountExpiryDate = Formatters.Date.getFormattedValue(service.accountExpiryDate)
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

	onSubmit() {
		AppHelper.setBusy(true).
		then(function () {
			return PromotioncodeHelper.postServiceCode({
				id: AuthHelper.getEntityId(),
				name: this.getState('accountCode')
			})
		}.bind(this)).
		then(function() {
			setTimeout(AppHelper.setBusy, 200)
			this.setState({ 
				errorLastTry: false,
				errorMessage: '',
				accountCode: ''
			})
			return ServiceHelper.getService(AuthHelper.getEntityId())
		}.bind(this)).
		catch(function (error) {
			setTimeout(AppHelper.setBusy, 200)
			console.error('Service account error')
			console.error(error)
			this.setState({
				errorLastTry: true,
				errorJustHappened: true,
				errorMessage: 'Une erreur est survenue' ,
				accountCode: ''
			})
		}.bind(this))
	}


	// Helper methods //
	// --------------------------------------------------------------------------------

	isSubmitDisabled() {
		return !this.getState('accountCode') || this.getState('errorJustHappened')
	}

}
let ServiceInfosEditAccountObj = new ServiceInfosEditAccountData()
export default ServiceInfosEditAccountObj
