import OfferStatusAux from 'utils/constants/OfferStatusAux'
import OfferStatusSad from 'utils/constants/OfferStatusSad'
import OfferStatus from 'utils-lib/constants/OfferStatus'

class OfferUtils {

	static getStatus(offer) {
		let sadStatus = OfferStatusSad.get(offer.sadStatus)
		let auxStatus = OfferStatusAux.get(offer.auxStatus)
		if (sadStatus === OfferStatusSad.PENDING && auxStatus === OfferStatusAux.PENDING) {
			return OfferStatus.RECEIVED
		} else if (sadStatus === OfferStatusSad.PENDING && auxStatus === OfferStatusAux.ACCEPTED) {
			return OfferStatus.WAITING
		} else if (sadStatus === OfferStatusSad.REJECTED && auxStatus === OfferStatusAux.ACCEPTED) {
			return OfferStatus.WAITING
		} else if (sadStatus === OfferStatusSad.CANCELED && auxStatus === OfferStatusAux.ACCEPTED) {
			return OfferStatus.WAITING
		} else if (sadStatus === OfferStatusSad.CONFIRMED && auxStatus === OfferStatusAux.ACCEPTED) {
			return OfferStatus.PLANNED
		} else {
			console.error('inconsistency in mission status: aux(' + offer.auxStatus + ') sad(' + offer.sadStatus + ')')
			return null
		}
	}
}
export default OfferUtils