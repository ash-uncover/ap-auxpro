import AppHelper from 'helpers/AppHelper'
import AuxiliaryHelper from 'helpers/AuxiliaryHelper'
import { BaseData } from 'ap-react-bootstrap'

import AuxiliaryUtils from 'utils-lib/entities/AuxiliaryUtils'

class AuxiliaryMatchListItemData extends BaseData {

	register(obj, auxiliaryId) {
		super.register(obj)

		this.declareFunction('onShowAuxliaryDetails')

		this.auxiliaryId = auxiliaryId

		let auxiliary = AuxiliaryHelper.getData(auxiliaryId)

		this.obj.state = {
			avatar: auxiliary.avatar,
			name: AuxiliaryUtils.getFullName(auxiliary),
			address: AuxiliaryUtils.getAddress(auxiliary)
		}
	}

	unregister() {
	}

	onShowAuxliaryDetails() {
		AppHelper.navigate('/service/auxiliaries/' + this.auxiliaryId)
	}

}
var AuxiliaryMatchListItemObj = new AuxiliaryMatchListItemData()
export default AuxiliaryMatchListItemObj
