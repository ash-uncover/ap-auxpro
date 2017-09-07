import { Utils, MomentHelper } from 'ap-react-bootstrap'

import OfferHelper from 'helpers/OfferHelper'

import OfferStatus from 'utils/constants/OfferStatus'

import InterventionFields from 'utils/entities/InterventionFields'
import RecurencePeriod from 'utils/constants/RecurencePeriod'

import InterventionType from 'utils-lib/constants/InterventionType'

import DayUtils from 'utils-lib/entities/DayUtils'
import RecurencePeriodUtils from 'utils-lib/entities/RecurencePeriodUtils'

class InterventionUtils {

	static storeInterventionMatch(result, params) {
		
	}

	static getFieldName(field) {
		switch (field) {
		case InterventionFields.PERIOD.key: return 'Périodicité'
		case InterventionFields.AUXILIARY_ID.key: return 'Auxiliaire'
		case InterventionFields.END_DATE.key: return 'Fin'
		case InterventionFields.CUSTOMER_ID.key: return 'Usager'
		case InterventionFields.DAYS.key: return 'Jours'
		case InterventionFields.START_TIME.key: return 'De'
		case InterventionFields.END_TIME.key: return 'A'
		case InterventionFields.SERVICE_ID.key: return 'Service'
		case InterventionFields.START_DATE.key: return 'Début'
		case InterventionFields.SAD_STATUS.key: return 'Statut'
		}
	}

	static getType(intervention) {
		if (intervention.auxiliaryId) {
			return InterventionType.PLANNED
		}
		let offers = Utils.map(OfferHelper.getData())
 		for (let i = 0 ; i < offers.length ; i++) {
			let offer = offers[i]
			if (offer.interventionId === intervention.id && offer.sadStatus !== OfferStatus.CANCELED.key) {
				return InterventionType.OFFERED
			}
		}
		return InterventionType.PENDING;
	}

	static getText(intervention) {
		let text = []

		let period = intervention.period
		let startDate = MomentHelper.localDateToHumanDate(intervention.startDate);
		let startTime = MomentHelper.localTimeToHumanTime(intervention.startTime);
		let endTime   = MomentHelper.localTimeToHumanTime(intervention.endTime);
		switch (period) {
			case RecurencePeriod.ONE.key:
				text.push('Prestation unique');
				text.push('Le ' + startDate)
				text.push('De ' + startTime + ' à ' + endTime)
				text.push('')
				break;
			case RecurencePeriod.P1W.key:
			case RecurencePeriod.P2W.key:
			case RecurencePeriod.P3W.key:
			case RecurencePeriod.P4W.key:
				let endDate = MomentHelper.localDateToHumanDate(intervention.endDate);
				text.push(RecurencePeriodUtils.getName(period))
				text.push('Du ' + startDate + ' au ' + endDate)
				text.push('Le ' + DayUtils.getNames(intervention.days))
				text.push('De ' + startTime + ' à ' + endTime)
		}

		return text
	}
}
export default InterventionUtils