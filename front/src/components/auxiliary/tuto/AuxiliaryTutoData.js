import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import AuxiliaryHelper from 'helpers/AuxiliaryHelper'

import { BaseData } from 'ap-react-bootstrap'

class AuxiliaryTutoData extends BaseData {

	constructor() {
		super(...arguments)
	}

	register(obj) {
		super.register(obj)
		
		this.declareFunction('onFinishTutorial')
	}


	// View callbacks //
	// --------------------------------------------------------------------------------

	onFinishTutorial() {
		AppHelper.setBusy(true).
		then(function () {
			let auxiliary = AuxiliaryHelper.getData(AuthHelper.getEntityId())
			auxiliary.isTutoSkipped = true
			return AuxiliaryHelper.putAuxiliary(auxiliary)
		}).
		then(function () {
			return AuxiliaryHelper.getAuxiliary(AuthHelper.getEntityId())
		}).
		then(function () {
			return AppHelper.navigate('/auxiliary/redirect')
		}).
		then(function () {
			setTimeout(AppHelper.setBusy, 200)
		}).
		catch(function (error) {
			setTimeout(AppHelper.setBusy, 200)
			console.error('Tuto complete error')
			console.error(error)
		}) 
	}

}
var AuxiliaryTutoObj = new AuxiliaryTutoData()
export default AuxiliaryTutoObj
