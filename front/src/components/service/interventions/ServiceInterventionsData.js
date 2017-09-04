import AppHelper from 'helpers/AppHelper'
import InterventionHelper from 'helpers/InterventionHelper'
import { BaseData, Utils } from 'ap-react-bootstrap'

import InterventionType from 'utils-lib/constants/InterventionType'
import InterventionUtils from 'utils-lib/entities/InterventionUtils'

class ServiceInterventionsData extends BaseData {

	register(obj) {
		super.register(obj)
		
		this.declareFunction('onCreate')
		this.declareFunction('onView')
		this.declareFunction('onEdit')
		this.declareFunction('onMatch')
		this.declareFunction('onDelete')

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

	onCreate() {
		
	}
	onView(interventionId) {
		
	}
	onEdit(interventionId) {
		
	}
	onMatch(interventionId) {
		
	}
	onFollow(interventionId) {
		
	}
	onCancel(interventionId) {
		
	}
	onDelete(interventionId) {
		
	}


	// Internal methods //
	// --------------------------------------------------------------------------------

}
var ServiceInterventionsObj = new ServiceInterventionsData()
export default ServiceInterventionsObj
