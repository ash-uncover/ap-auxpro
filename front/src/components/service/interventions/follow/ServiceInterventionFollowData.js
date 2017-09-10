import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import InterventionHelper from 'helpers/InterventionHelper'
import OfferHelper from 'helpers/OfferHelper'

import { BaseData, MomentHelper } from 'ap-react-bootstrap'
import moment from 'moment'

import InterventionType from 'utils-lib/constants/InterventionType'
import InterventionUtils from 'utils-lib/entities/InterventionUtils'

class ServiceInterventionFollowData extends BaseData {

	register(obj, interventionId) {
		super.register(obj)

		this.interventionId = interventionId

		this.declareFunction('onCancel')
		this.declareFunction('onConfirm')

		let intervention = InterventionHelper.getData(interventionId)

		if (InterventionUtils.getType(intervention) !== InterventionType.OFFERED) {
			AppHelper.navigate('/service/interventions/' + interventionId)
			return
		}

		this.obj.state = {
			offers: InterventionUtils.getOffers(intervention)
		}
	}

	unregister() {
	}


	// View callback //
	// --------------------------------------------------------------------------------

	onCancel() {
		AppHelper.navigateBack()
	}
	onConfirm() {
		
	}
}
var ServiceInterventionFollowObj = new ServiceInterventionFollowData()
export default ServiceInterventionFollowObj
