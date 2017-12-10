import AppHelper from 'helpers/AppHelper'
import IndisponibilityHelper from 'helpers/IndisponibilityHelper'
import { BaseData } from 'ap-react-bootstrap'

class AuxiliaryIndisponibilityData extends BaseData {

	register(obj, indisponibilityId) {
		super.register(obj)

		this.indisponibilityId = indisponibilityId

		this.declareFunction('onCancel')
	}

	unregister() {
	}


	// View callbacks //
	// --------------------------------------------------------------------------------

	onCancel() {
		AppHelper.navigateBack.bind(AppHelper)
	}
}
let AuxiliaryIndisponibilityObj = new AuxiliaryIndisponibilityData()
export default AuxiliaryIndisponibilityObj
