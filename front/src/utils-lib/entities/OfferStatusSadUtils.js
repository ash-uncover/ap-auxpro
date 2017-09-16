import OfferStatusSad from 'utils/constants/OfferStatusSad'

class OfferStatusSadUtils {

	static getName(func) {
		switch (func) {
			case OfferStatusSad.PENDING.key: return 'En attente'
			case OfferStatusSad.CANCELED.key: return 'Annulée'
			case OfferStatusSad.CONFIRMED.key: return 'Confirmée'
			case OfferStatusSad.REJECTED.key: return 'Rejectée'
		}
		return ''
	}

}
export default OfferStatusSadUtils 