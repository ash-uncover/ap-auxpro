import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import AuxiliaryHelper from 'helpers/AuxiliaryHelper'
import { BaseData, Formatters } from 'ap-react-bootstrap'

class AuxiliaryInfosEditAccountData extends BaseData {

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

		AuxiliaryHelper.register(AuthHelper.getEntityId(), this, this.onAuxiliaryUpdate.bind(this))

		this._onAuxiliaryUpdate()
	}

	unregister() {
		AuxiliaryHelper.unregister(this)
	}


	// Store notifications //
	// --------------------------------------------------------------------------------

	onAuxiliaryUpdate() {
		this._onAuxiliaryUpdate()
		this.forceUpdate()
	}

	_onAuxiliaryUpdate() {
		let Auxiliary = AuxiliaryHelper.getData(AuthHelper.getEntityId()) || {}
		this.obj.state.accountType = Auxiliary.accountType
		this.obj.state.accountExpiryDate = Formatters.Date.getFormattedValue(Auxiliary.accountExpiryDate)
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
		if (this.getState('accountCode') === 'AUXPROS-2017') {
			if (this.getState('accountType') === 'Premium') {
				this.setState({ 
					errorLastTry: true,
					errorJustHappened: true,
					errorMessage: 'Ce code a déjà été saisie sur votre compte',
					accountCode: ''
				})
			} else {
				let Auxiliary = AuxiliaryHelper.getData(AuthHelper.getEntityId())
				Auxiliary.accountType = 'Premium'
				Auxiliary.accountExpiryDate = [2017, 12, 31]

				AppHelper.setBusy(true).
				then(function () {
					return AuxiliaryHelper.putAuxiliary(Auxiliary)
				}).
				then(function() {
					setTimeout(AppHelper.setBusy, 200)
					this.setState({ 
						errorLastTry: false,
						errorMessage: '',
						accountCode: ''
					})
					return AuxiliaryHelper.getAuxiliary(AuthHelper.getEntityId())
				}.bind(this)).
				catch(function (error) {
					setTimeout(AppHelper.setBusy, 200)
					console.error('Auxiliary account error')
					console.error(error)
					this.setState({
						errorLastTry: true,
						errorJustHappened: true,
						errorMessage: 'Une erreur est survenue' ,
						accountCode: ''
					})
				}.bind(this))
			}
		} else {
			this.setState({
				errorLastTry: true,
				errorJustHappened: true,
				errorMessage: 'Le code saisi est invalide',
				accountCode: ''
			})
		}
	}

	// Helper methods //
	// --------------------------------------------------------------------------------

	isSubmitDisabled() {
		return !this.getState('accountCode') || this.getState('errorJustHappened')
	}

}
var AuxiliaryInfosEditAccountObj = new AuxiliaryInfosEditAccountData()
export default AuxiliaryInfosEditAccountObj
