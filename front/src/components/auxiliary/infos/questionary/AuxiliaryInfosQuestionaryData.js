import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import AuxiliaryHelper from 'helpers/AuxiliaryHelper'
import { BaseData } from 'ap-react-bootstrap'

class AuxiliaryInfosQuestionaryData extends BaseData {

	register(obj) {
		super.register(obj)
		
		this.declareFunction('onCancel')
		
		this.obj.state = {
			skillAnswers: AuxiliaryHelper.getData(AuthHelper.getEntityId()).skillAnswers
		}
	}

	unregister() {
	}


	// View callbacks //
	// --------------------------------------------------------------------------------

	onCancel() {
		AppHelper.navigateBack()
	}
}
let AuxiliaryInfosQuestionaryObj = new AuxiliaryInfosQuestionaryData()
export default AuxiliaryInfosQuestionaryObj
