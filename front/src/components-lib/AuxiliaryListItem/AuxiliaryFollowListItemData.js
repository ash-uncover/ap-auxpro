import AppHelper from 'helpers/AppHelper'
import AuxiliaryHelper from 'helpers/AuxiliaryHelper'
import OfferHelper from 'helpers/OfferHelper'
import { BaseData } from 'ap-react-bootstrap'

import OfferStatusAux from 'utils/constants/OfferStatusAux'

import AuxiliaryUtils from 'utils-lib/entities/AuxiliaryUtils'

class AuxiliaryMatchListItemData extends BaseData {

	register(obj, offerId) {
		super.register(obj)

		this.declareFunction('onShowAuxliaryDetails')

		this.offerId = offerId

		let offer = OfferHelper.getData(offerId)
		let auxiliary = AuxiliaryHelper.getData(offer.auxiliaryId)

		this.obj.state = {
			avatar: auxiliary.avatar,
			name: AuxiliaryUtils.getFullName(auxiliary),
			address: AuxiliaryUtils.getAddress(auxiliary),
			status: OfferStatusAux.get(offer.auxStatus)
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
