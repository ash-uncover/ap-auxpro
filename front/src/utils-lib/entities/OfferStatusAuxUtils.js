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

}
export default OfferStatusAuxUtils 