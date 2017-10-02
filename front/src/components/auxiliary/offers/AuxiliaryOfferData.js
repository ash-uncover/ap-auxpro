import AppHelper from 'helpers/AppHelper'
import CustomerHelper from 'helpers/CustomerHelper'
import InterventionHelper from 'helpers/InterventionHelper'
import OfferHelper from 'helpers/OfferHelper'
import ServiceHelper from 'helpers/ServiceHelper'
import { BaseData } from 'ap-react-bootstrap'

import CustomerUtils from 'utils-lib/entities/CustomerUtils'
import InterventionUtils from 'utils-lib/entities/InterventionUtils'

class AuxiliaryOfferData extends BaseData {

	register(obj, offerId) {
		super.register(obj)

		this.declareFunction('onCancel')

		this.offerId = offerId

		let offer = OfferHelper.getData(offerId)
		let service = ServiceHelper.getData(offer.serviceId)
		let customer = CustomerHelper.getData(offer.customerId)
		let intervention = InterventionHelper.getData(offer.interventionId)
		
		this.obj.state = {
			serviceName: service.socialReason,
			serviceAddress1: service.address,
			serviceAddress2: service.postalCode + ' ' + service.city,
			serviceEmail: service.email,
			servicePhone: service.phone,
			customerName: CustomerUtils.getShortName(customer),
			customerAddress: CustomerUtils.getShortAddress(customer),
			interventionText: InterventionUtils.getText(intervention)
		}
	}

	unregister() {
	}

	onCancel() {
		AppHelper.navigateBack()
	}

}
let AuxiliaryOfferObj = new AuxiliaryOfferData()
export default AuxiliaryOfferObj