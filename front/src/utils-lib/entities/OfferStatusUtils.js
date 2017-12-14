import OfferStatus from 'utils-lib/constants/OfferStatus'

class OfferStatusUtils {

	static getName(status) {
		switch (status) {
			case OfferStatus.RECEIVED:
			case OfferStatus.RECEIVED.key: return 'Reçue'
			case OfferStatus.WAITING:
			case OfferStatus.WAITING.key: return 'En attente'
			case OfferStatus.PLANNED:
			case OfferStatus.PLANNED.key: return 'Planifiée'
		}
		return ''
	}

	static getNamePlural(status) {
		switch (status) {
			case OfferStatus.RECEIVED:
			case OfferStatus.RECEIVED.key: return 'Reçues'
			case OfferStatus.WAITING:
			case OfferStatus.WAITING.key: return 'En attente'
			case OfferStatus.PLANNED:
			case OfferStatus.PLANNED.key: return 'Planifiées'
		}
		return ''
	}
}
export default OfferStatusUtils