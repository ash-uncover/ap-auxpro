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
		case IndisponibilityFields.AUXILIARY_ID:
        case IndisponibilityFields.AUXILIARY_ID.key: return 'Auxiliaire'
		case IndisponibilityFields.PERIOD:
        case IndisponibilityFields.PERIOD.key: return 'Périodicité'
		case IndisponibilityFields.START_DATE:
        case IndisponibilityFields.START_DATE.key: return 'Début'
		case IndisponibilityFields.END_DATE:
        case IndisponibilityFields.END_DATE.key: return 'Fin'
		case IndisponibilityFields.START_TIME:
        case IndisponibilityFields.START_TIME.key: return 'De'
		case IndisponibilityFields.END_TIME:
        case IndisponibilityFields.END_TIME.key: return 'A'
		case IndisponibilityFields.DAYS:
        case IndisponibilityFields.DAYS.key: return 'Jours'
		}
	}

    static checkValidity(indisponibility) {
        let errors = []
        // Check validator for each field
        for (let i = 0 ; i < IndisponibilityFields.VALUES.length ; i++) {
            let field = IndisponibilityFields.VALUES[i]
            if (field.validator && field.validator.getState(indisponibility[field.key]) === 'error') {
                errors.push({ key: field.key, value: 'Valeur invalide' })
            }
        }
        if (errors.length) {
            return errors
        }
        // Check start date is in the future
        let startDate = MomentHelper.fromLocalDate(indisponibility.startDate)
        if (moment().startOf('day').isAfter(startDate)) {
            errors.push({ key: 'startDate', value: 'La date de début ne peut être dans le passé' })
        }
        // Check start time is before end time
        if (indisponibility.startTime[0] > indisponibility.endTime[0] || (indisponibility.startTime[0] === indisponibility.endTime[0] && indisponibility.startTime[1] >= indisponibility.endTime[1])) {
            errors.push({ key: 'startDate', value: "L'horaire de fin doit être après l'horaire de début" })
            errors.push({ key: 'endTime', value: "L'horaire de fin doit être après l'horaire de début" })
        }
        if (indisponibility.period !== IndisponibilityRecurencePeriod.HOURS.key) {
            // Check end date is after start date
            let endDate = MomentHelper.fromLocalDate(indisponibility.endDate)
            if (startDate.isAfter(endDate)) {
                errors.push({ key: 'startDate', value: 'La date de fin doit être après la date de début' })
                errors.push({ key: 'endTime', value: 'La date de fin doit être après la date de début' })
            }
            // Check at least one day is selected
            if (indisponibility.days.length === 0) {
                errors.push({ key: 'days', value: 'Vous devez sélectionner au moins un jour' })
            }
        }
        return errors
    }

}
export default IndisponibilityUtils