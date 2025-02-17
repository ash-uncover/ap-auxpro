import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import AuxiliaryHelper from 'helpers/AuxiliaryHelper'
import PromotioncodeHelper from 'helpers/PromotioncodeHelper'

import { BaseData, Formatters } from 'ap-react-bootstrap'

class AuxiliaryInfosEditAccountData extends BaseData {

    constructor() {
        super(...arguments)
        
        this.onAuxiliaryUpdate = this.onAuxiliaryUpdate.bind(this)
    }

    register(obj) {
        super.register(obj)
        
        this.declareFunction('onCancel')
        this.declareFunction('onSubmit')

        this.declareFunction('isSubmitDisabled')

		AuxiliaryHelper.register(AuthHelper.getEntityId(), this.onAuxiliaryUpdate)

		this.onAuxiliaryUpdate()
	}

	unregister() {
		AuxiliaryHelper.unregister(AuthHelper.getEntityId(), this.onAuxiliaryUpdate)
	}


	// Store notifications //
	// --------------------------------------------------------------------------------

	onAuxiliaryUpdate() {
		let Auxiliary = AuxiliaryHelper.getData(AuthHelper.getEntityId()) || {}
		this.setState({
			accountType: Auxiliary.accountType,
			accountExpiryDate: Formatters.Date.getFormattedValue(Auxiliary.accountExpiryDate)
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

	onSubmit() {
		AppHelper.setBusy(true).
		then(function () {
			return PromotioncodeHelper.postAuxiliaryCode({
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
	

	// Helper methods //
	// --------------------------------------------------------------------------------

	isSubmitDisabled() {
		return !this.getState('accountCode') || this.getState('errorJustHappened')
	}

}
var AuxiliaryInfosEditAccountObj = new AuxiliaryInfosEditAccountData()
export default AuxiliaryInfosEditAccountObj
