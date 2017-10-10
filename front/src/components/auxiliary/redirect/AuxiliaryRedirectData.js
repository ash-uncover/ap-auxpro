import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import AuxiliaryHelper from 'helpers/AuxiliaryHelper'
import { BaseData } from 'ap-react-bootstrap'

class AuxiliaryRedirectData extends BaseData {

	register(obj) {
		super.register(obj)

		let auxiliary = AuxiliaryHelper.getData(AuthHelper.getEntityId())
		if (!auxiliary.isTutoSkipped) {
			AppHelper.navigate('/auxiliary/tuto')
		} else if (!auxiliary.profilCompleted) {
			AppHelper.navigate('/auxiliary/initial')
		} else {
			AppHelper.navigate('/auxiliary/home')
		}
	}

}
let AuxiliaryRedirectObj = new AuxiliaryRedirectData()
export default AuxiliaryRedirectObj
