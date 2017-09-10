import AppHelper from 'helpers/AppHelper'
import InterventionHelper from 'helpers/InterventionHelper'
import { BaseData } from 'ap-react-bootstrap'

class ServiceInterventionMatchData extends BaseData {

	register(obj, interventionId) {
		super.register(obj)

		this.interventionId = interventionId

		let intervention = InterventionHelper.getData(interventionId)

		this.obj.state = {
			matches: intervention.match
		}
	}

	unregister() {
	}

}
var ServiceInterventionMatchObj = new ServiceInterventionMatchData()
export default ServiceInterventionMatchObj
