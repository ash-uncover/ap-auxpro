import AppHelper from 'helpers/AppHelper'
import CustomerHelper from 'helpers/CustomerHelper'
import OfferHelper from 'helpers/OfferHelper'
import ServiceHelper from 'helpers/ServiceHelper'

import { BaseData } from 'ap-react-bootstrap'

import OfferStatusAux from 'utils/constants/OfferStatusAux'
import OfferStatusSad from 'utils/constants/OfferStatusSad'

import CustomerUtils from 'utils-lib/entities/CustomerUtils'

let ACTIONS = {
	onView: { key: 'search', tooltip: 'Voir', callback: 'onView', style: 'primary' },
	onAccept: { key: 'ok', tooltip: 'Accepter', callback: 'onAccept', style: 'success' },
	onDecline: { key: 'remove', tooltip: 'Décliner', callback: 'onDecline', style: 'danger' },
	onHide: { key: 'remove', tooltip: 'Supprimer', callback: 'onHide', style: 'danger' }
}

class AuxiliaryOfferTileData extends BaseData {

	register(obj, offerId) {
		super.register(obj)

		this.declareFunction('onViewCustomer')
		this.declareFunction('onViewService')

		this.offerId = offerId

		let offer = OfferHelper.getData(offerId)
		let customer = CustomerHelper.getData(offer.customerId)
		let service = ServiceHelper.getData(offer.serviceId)

		let offerData = {}
		let sadStatus = OfferStatusSad.get(offer.sadStatus)
		switch(sadStatus) {
		case OfferStatusSad.PENDING:
			let auxStatus = OfferStatusAux.get(offer.auxStatus)
			if (auxStatus === OfferStatusAux.ACCEPTED) {
				offerData.title = 'Mission acceptée'
				offerData.actions =  [ ACTIONS.onView ]
			} else {
				offerData.title = 'Mission en attente'
				offerData.actions =  [ ACTIONS.onView, ACTIONS.onAccept, ACTIONS.onDecline ]
			}
			break
		case OfferStatusSad.CONFIRMED:
			offerData.title = 'Mission confirmée'
			offerData.actions =  [ ACTIONS.onHide ]
			break
		case OfferStatusSad.REJECTED:
			offerData.title = 'Mission rejetée'
			offerData.actions =  [ ACTIONS.onHide ]
			break
		case OfferStatusSad.CANCELED:
			offerData.title = 'Mission annulée'
			offerData.actions =  [ ACTIONS.onHide ]
			break
		}

		this.setState({
			customerName: CustomerUtils.getShortName(customer),
			customerAddress: CustomerUtils.getShortAddress(customer),
			customerId: customer.id,
			serviceName: service.socialReason,
			serviceId: service.id,
			title: offerData.title,
			actions: offerData.actions
		})
	}

	buildOfferData() {
		
	}


	// View callbacks //
	// --------------------------------------------------------------------------------

	onViewCustomer() {

	}

	onViewService() {
		
	}
}
let AuxiliaryOfferTileDataObj = new AuxiliaryOfferTileData()
AuxiliaryOfferTileDataObj.ACTIONS = ACTIONS
export default AuxiliaryOfferTileDataObj
