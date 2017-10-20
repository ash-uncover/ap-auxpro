import { StoreRegistry } from 'ap-flux'
import { Utils, MomentHelper, Day } from 'ap-react-bootstrap'

import IndisponibilityRecurencePeriod from 'utils/constants/IndisponibilityRecurencePeriod'
import IndisponibilityFields from 'utils/entities/IndisponibilityFields'

import DayUtils from 'utils-lib/entities/DayUtils'
import IndisponibilityRecurencePeriodUtils from 'utils-lib/entities/IndisponibilityRecurencePeriodUtils'

class IndisponibilityUtils {

	static getInitialText(indisponibility) {
		let text = [];
		let period = IndisponibilityRecurencePeriod.getPeriod(indisponibility.period);
		let startDate = MomentHelper.localDateToHumanDate(indisponibility.startDate || [1, 1, 1]);
		let endDate   = MomentHelper.localDateToHumanDate(indisponibility.endDate || [1, 1, 1]);
		let startTime = MomentHelper.localTimeToHumanTime(indisponibility.startTime || [0, 0]);
		let endTime   = MomentHelper.localTimeToHumanTime(indisponibility.endTime || [0, 0]);
		switch (period) {
		case IndisponibilityRecurencePeriod.HOURS:
			text.push('Indisponibilité ponctuelle');
			text.push('Le ' + startDate);
			text.push('De ' + startTime + ' à ' + endTime);
			break;
		case IndisponibilityRecurencePeriod.HOURS:
			text.push('Indisponibilité prolongée');
			text.push('Du ' + startDate);
			text.push('Au ' + endDate);
			break;
		case IndisponibilityRecurencePeriod.WEEK1:
		case IndisponibilityRecurencePeriod.WEEK2:
		case IndisponibilityRecurencePeriod.WEEK3:
		case IndisponibilityRecurencePeriod.WEEK4:			
			let days = Day.daysToHumanFormat(indisponibility.days);
			text.push('Indisponibilité ' + period.value.toLowerCase());
			text.push('Du ' + startDate + ' au ' + endDate);
			text.push('Le ' + days);
			text.push('De ' + startTime + ' à ' + endTime);
			break;
		}
		return text;
	}

	static getFieldName(field) {
		switch (field) {
		case IndisponibilityFields.AUXILIARY_ID.key: return 'Auxiliaire'
		case IndisponibilityFields.PERIOD.key: return 'Périodicité'
		case IndisponibilityFields.START_DATE.key: return 'Début'
		case IndisponibilityFields.END_DATE.key: return 'Fin'
		case IndisponibilityFields.START_TIME.key: return 'De'
		case IndisponibilityFields.END_TIME.key: return 'A'
		case IndisponibilityFields.DAYS.key: return 'Jours'
		}
	}

}
export default IndisponibilityUtils