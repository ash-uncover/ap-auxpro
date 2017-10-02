import OfferStatusAux from 'utils/constants/OfferStatusAux'

class OfferStatusAuxUtils {

	static getName(func) {
		switch (func) {
			case OfferStatusAux.PENDING.key: return 'Offre en attente'
			case OfferStatusAux.ACCEPTED.key: return 'Offre acceptée'
			case OfferStatusAux.DECLINED.key: return 'Offre déclinée'
		}
		return ''
	}

	static getNamePlural(func) {
		switch (func) {
			case OfferStatusAux.PENDING.key: return 'En attente'
			case OfferStatusAux.ACCEPTED.key: return 'Acceptées'
			case OfferStatusAux.DECLINED.key: return 'Déclinées'
		}
		return ''
	}

}
export default OfferStatusAuxUtils 