import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import AuxiliaryHelper from 'helpers/AuxiliaryHelper'
import { BaseData } from 'ap-react-bootstrap'

let DEFAULT_ANSWERS = [
	null, null, null, null, null, null, null, null, null, null, 
	null, null, null, null, null, null, null, null, null, null, 
	null, null, null, null, null, null, null, null, null, null, 
	null, null, null, null, null, null, null, null
]

class AuxiliaryInfosEditQuestionaryData extends BaseData {

	register(obj) {
		super.register(obj)

		this.declareFunction('onChange')
		this.declareFunction('onCancel')
		this.declareFunction('onSubmit')
		
		this.obj.state.dirty = false
		this.obj.state.skillAnswers = AuxiliaryHelper.getData(AuthHelper.getEntityId()).skillAnswers || DEFAULT_ANSWERS
	}

	unregister() {
	}


	// View callbacks //
	// --------------------------------------------------------------------------------

	onChange(qIndex, index) {
		let skillAnswers = this.getState('skillAnswers')
		skillAnswers[qIndex] = index
		this.setState({
			dirty: true,
			skillAnswers: skillAnswers
		})
	}

	onCancel() {
		AppHelper.navigateBack()
	}

	onSubmit() {
		if (!this.getState('dirty')) {
			return
		}
		AppHelper.setBusy(true).
		then(function() {
			return AuxiliaryHelper.postAuxiliaryQuestionary({
				id: AuthHelper.getEntityId(), 
				skillAnswers: this.getState('skillAnswers')
			})
		}.bind(this)).
		then(function() {
			return AuxiliaryHelper.getAuxiliary(AuthHelper.getEntityId())
		}).
		then(function() {
			AppHelper.setBusy()
			AppHelper.navigateBack()
		}.bind(this)).
		catch(function (error) {
			AppHelper.setBusy()
			console.error('Error while saving questionary')
			console.error(error)
		});
	}

}
let AuxiliaryInfosEditQuestionaryObj = new AuxiliaryInfosEditQuestionaryData()
export default AuxiliaryInfosEditQuestionaryObj
