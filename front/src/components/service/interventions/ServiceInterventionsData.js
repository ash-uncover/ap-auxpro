import AppHelper from 'helpers/AppHelper'
import InterventionHelper from 'helpers/InterventionHelper'
import { BaseData, Utils } from 'ap-react-bootstrap'

import InterventionType from 'utils-lib/constants/InterventionType'
import InterventionUtils from 'utils-lib/entities/InterventionUtils'

class ServiceInterventionsData extends BaseData {

	register(obj) {
		super.register(obj)
		
		this.declareFunction('onCreateIntervention')
		this.declareFunction('onEditIntervention')		
		this.declareFunction('onMatchIntervention')
		this.declareFunction('onDeleteIntervention')

		this.declareFunction('onFollowMatching')
		this.declareFunction('onCancelMatching')

		this.declareFunction('onCancelIntervention')

		this.declareFunction('onViewCustomer')
		this.declareFunction('onViewAuxiliary')


		this.obj.state = {
			pending: [],
			offered: [],
			planned: []
		}

		InterventionHelper.register('/', this, this.onInterventionsUpdate.bind(this))
		this._onInterventionsUpdate()
	}

	unregister() {
		InterventionHelper.unregister(this)
	}


	// Store notification //
	// --------------------------------------------------------------------------------

	onInterventionsUpdate() {
		this._onInterventionsUpdate()
		this.forceUpdate()
	}
	_onInterventionsUpdate() {
		this.obj.state = {
			pending: [],
			offered: [],
			planned: []
		}
		let interventions = Utils.map(InterventionHelper.getData('')).filter(this._filterInterventions)
		for (let i = 0 ; i < interventions.length ; i++) {
			let intervention = interventions[i]
			let type = InterventionUtils.getType(interventions[i])
			switch (type) {
			case InterventionType.PENDING: 
				this.obj.state.pending.push(intervention)
				break
			case InterventionType.OFFERED: 
				this.obj.state.offered.push(intervention)
				break
			case InterventionType.PLANNED: 
				this.obj.state.planned.push(intervention)
				break
			}
		}
	}
	_filterInterventions(intervention, index) {
		return !intervention.hideToSad
	}

	// View callbacks //
	// --------------------------------------------------------------------------------

	onCreateIntervention() {
		AppHelper.navigate('/service/interventions/new/edit')
	}
	onEditIntervention(interventionId) {
		AppHelper.navigate('/service/interventions/' + interventionId + '/edit')
	}
	onMatchIntervention(interventionId) {
		InterventionUtils.storeInterventionMatch(null, { id: interventionId })
		AppHelper.setBusy(true).
		then(function () {
			return InterventionHelper.getInterventionMatch(interventionId)	
		}).
		then(function() {
			setTimeout(function () { AppHelper.setBusy() }, 200)
			AppHelper.navigate('/service/interventions/' + interventionId + '/match')
		}).
		catch(function (error) {
			setTimeout(function () { AppHelper.setBusy() }, 200)
			console.error('Unable to load matches:')
			console.error(error)
		})
	}
	onDeleteIntervention(interventionId) {
		console.log('onDeleteIntervention')	
	}
	onConfirmDeleteIntervention(interventionId) {
		console.log('onConfirmDeleteIntervention')	
	}
	onFollowMatching(interventionId) {
		AppHelper.navigate('/service/interventions/' + interventionId + '/follow')
	}
	onCancelMatching(interventionId) {
		console.log('onCancelMatching')
	}
	onConfirmCancelMatching(interventionId) {
		console.log('onConfirmCancelMatching')
	}
	onCancelIntervention(interventionId) {
		console.log('onCancelIntervention')	
	}
	onConfirmCancelIntervention(interventionId) {
		console.log('onConfirmCancelIntervention')	
	}
	onViewCustomer(customerId) {
		AppHelper.navigate('/service/customers/' + customerId)
	}
	onViewAuxiliary(auxiliaryId) {
		AppHelper.navigate('/service/auxiliaries/' + auxiliaryId)
	}


	// Internal methods //
	// --------------------------------------------------------------------------------

}
var ServiceInterventionsObj = new ServiceInterventionsData()
export default ServiceInterventionsObj
