import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import OfferHelper from 'helpers/OfferHelper'
import { BaseData, Utils } from 'ap-react-bootstrap'

import OfferStatusSad from 'utils/constants/OfferStatusSad'

class AuxiliaryOffersData extends BaseData {

	register(obj) {
		super.register(obj)

		this.declareFunction('onFilterState')

		this.declareFunction('onOfferView')
		this.declareFunction('onOfferAccept')
		this.declareFunction('onOfferDecline')

		this.declareFunction('onOfferDelete')
		this.declareFunction('onCancelDelete')
		this.declareFunction('onConfirmDelete')
		
		this.obj.state = {
			filterState: null
		}

		this._onOffersUpdate()
	}

	unregister() {
	}


	// Store notification //
	// --------------------------------------------------------------------------------

	_onOffersUpdate() {
		let offers = Utils.reduce(OfferHelper.getData(), function (result, offer) {
			if (!offer.hideToAux) {
				let sadStatus = OfferStatusSad.get(offer.sadStatus)
				result[sadStatus.key] = result[sadStatus.key] || []
				result[sadStatus.key].push(offer)
			}
			return result
			
		}, {})
		this.obj.state.offers = offers
	}


	// View callbacks //
	// --------------------------------------------------------------------------------

	onOfferView(offer) {

	}
	
	onOfferAccept(offer) {
		
	}
	
	onOfferDecline(offer) {

	}

	onOfferDelete(offer) {

	}
	onCancelDelete() {
		
	}
	onConfirmDelete() {
	}

	onFilterState(state) {
		this.setState({ filterState: state })
	}

}
let AuxiliaryOffersObj = new AuxiliaryOffersData()
export default AuxiliaryOffersObj
