import OfferStatusSad from 'utils/constants/OfferStatusSad'

import { TextUtils } from 'ap-react-bootstrap'

class OfferStatusSadUtils {

	static getName(status) {
		switch (status) {
			case OfferStatusSad.PENDING.key: return 'En attente'
			case OfferStatusSad.CANCELED.key: return 'Annulée'
			case OfferStatusSad.CONFIRMED.key: return 'Confirmée'
			case OfferStatusSad.REJECTED.key: return 'Rejectée'
		}
		return ''
	}

	static getNamePlural(status) {
		switch (status) {
			case OfferStatusSad.PENDING.key: return 'En attente'
			case OfferStatusSad.CANCELED.key: return 'Annulées'
			case OfferStatusSad.CONFIRMED.key: return 'Confirmées'
			case OfferStatusSad.REJECTED.key: return 'Rejectées'
		}
		return ''
	}

	static getNameOfferPlural(status, nb) {
		switch (status) {
			case OfferStatusSad.PENDING.key: 
				return TextUtils.pluralize('nouvelle', nb) + ' ' + TextUtils.pluralize('offre', nb)
			case OfferStatusSad.CANCELED.key: 
				return TextUtils.pluralize('offre', nb) + ' ' + TextUtils.pluralize('annulée', nb)
			case OfferStatusSad.CONFIRMED.key: 
				return TextUtils.pluralize('offre', nb) + ' ' + TextUtils.pluralize('confirmée', nb)
			case OfferStatusSad.REJECTED.key: 
				return TextUtils.pluralize('offre', nb) + ' ' + TextUtils.pluralize('rejetée', nb)
		}
		return ''
	}
}
export default OfferStatusSadUtils 