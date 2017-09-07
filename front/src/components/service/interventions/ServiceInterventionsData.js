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

		InterventionHelper.register('', this, this.onInterventionsUpdate.bind(this))
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
		AppHelper.navigate('/service/interventions/new')
	}
	onEditIntervention(interventionId) {
		AppHelper.navigate('/service/interventions/' + interventionId)
	}
	onMatchIntervention(interventionId) {
		console.log('onMatchIntervention')
	}
	onDeleteIntervention(interventionId) {
		console.log('onDeleteIntervention')	
	}
	onFollowMatching(interventionId) {
		console.log('onFollowMatching')
	}
	onCancelMatching(interventionId) {
		console.log('onCancelMatching')
	}
	onCancelIntervention(interventionId) {
		console.log('onCancelIntervention')	
	}
	onViewCustomer(customerId) {
		console.log('onViewCustomer')	
	}
	onViewAuxiliary(auxiliaryId) {
		console.log('onViewAuxiliary')	
	}


	// Internal methods //
	// --------------------------------------------------------------------------------

}
var ServiceInterventionsObj = new ServiceInterventionsData()
export default ServiceInterventionsObj
