import { StoreRegistry } from 'ap-flux'
import { Utils, MomentHelper, Day } from 'ap-react-bootstrap'

import RecurencePeriod from 'utils/constants/RecurencePeriod'
import IndisponibilityFields from 'utils/entities/IndisponibilityFields'

import DayUtils from 'utils-lib/entities/DayUtils'
import RecurencePeriodUtils from 'utils-lib/entities/RecurencePeriodUtils'

class IndisponibilityUtils {

	static getInitialText(indisponibility) {
		let text = [];
		let period = RecurencePeriod.getPeriod(indisponibility.period);
		let startDate = MomentHelper.localDateToHumanDate(indisponibility.startDate);
		let startTime = MomentHelper.localTimeToHumanTime(indisponibility.startTime);
		let endTime   = MomentHelper.localTimeToHumanTime(indisponibility.endTime);
		switch (period) {
		case RecurencePeriod.ONE:
			text.push('Indisponibilité ponctuelle');
			text.push('Le ' + startDate);
			text.push('De ' + startTime + ' à ' + endTime);
			break;
		case RecurencePeriod.P1W:
		case RecurencePeriod.P2W:
		case RecurencePeriod.P3W:
		case RecurencePeriod.P4W:
			let endDate    = MomentHelper.localDateToHumanDate(indisponibility.endDate);
			let days = Day.daysToHumanFormat(indisponibility.days);
			text.push('Indisponibilité ' + period.value.toLowerCase());
			text.push('Du ' + startDate + ' au ' + endDate);
			text.push('Le ' + days);
			text.push('De ' + startTime + ' à ' + endTime);
			break;
		}
		return text;
	}	

}
export default IndisponibilityUtils