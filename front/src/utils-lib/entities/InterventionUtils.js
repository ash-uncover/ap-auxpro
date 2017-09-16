import { StoreRegistry } from 'ap-flux'
import { Utils, MomentHelper } from 'ap-react-bootstrap'
import moment from 'moment'

import AuxiliaryHelper from 'helpers/AuxiliaryHelper'
import InterventionHelper from 'helpers/InterventionHelper'
import OfferHelper from 'helpers/OfferHelper'

import InterventionStatus from 'utils/constants/InterventionStatus'

import InterventionFields from 'utils/entities/InterventionFields'
import RecurencePeriod from 'utils/constants/RecurencePeriod'

import InterventionType from 'utils-lib/constants/InterventionType'

import DayUtils from 'utils-lib/entities/DayUtils'
import RecurencePeriodUtils from 'utils-lib/entities/RecurencePeriodUtils'

class InterventionUtils {

	static storeInterventionMatch(result, params) {
		let intervention = InterventionHelper.getData(params.id)
		let promises = []
		if (result && result.length) {
			for (let i = 0; i < result.length; i++) {
				if (!AuxiliaryHelper.getData(result[i].auxiliaryId)) {
					promises.push(AuxiliaryHelper.getAuxiliary(result[i].auxiliaryId))
				}
			}
		}
		Promise.all(promises).
		then(function () {
			intervention.match = result
			StoreRegistry.getStore('REST_STORE').notifyPath('intervention')	
		}).
		catch(function (error) {
			console.error('ERROR: failed to store intervention match')
			console.error(error)
		})
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
			if (offer.interventionId === intervention.id && offer.sadStatus !== InterventionStatus.CANCELED.key) {
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

	static checkValidity(intervention) {
		let hasError = false
		let errors = {}
		// Check validator for each field
		for (let i = 0 ; i < InterventionFields.VALUES.length ; i++) {
			let field = InterventionFields.VALUES[i]
			if (field.validator && field.validator.getState(intervention[field.key]) === 'error') {
				errors[field.key] = 'Valeur invalide'
				hasError = true
			}
		}
		if (hasError) {
			return errors
		}
		// Check start date is in the future
		let startDate = MomentHelper.fromLocalDate(intervention.startDate)
		if (moment().startOf('day').isAfter(startDate)) {
			errors.startDate = 'La date de début ne peut être dans le passé'
			hasError = true
		}
		// Check start time is before end time
		if (intervention.startTime[0] > intervention.endTime[0] || (intervention.startTime[0] === intervention.endTime[0] && intervention.startTime[1] >= intervention.endTime[1])) {
			errors.startTime = "L'horaire de fin doit être après l'horaire de début"
			errors.endTime = "L'horaire de fin doit être après l'horaire de début"
			hasError = true
		}
		if (intervention.period !== 'ONE') {
			// Check end date is after start date
			let endDate = MomentHelper.fromLocalDate(intervention.endDate)
			if (startDate.isAfter(endDate)) {
				errors.startDate = 'La date de fin doit être après la date de début'
				errors.endDate = 'La date de fin doit être après la date de début'
				hasError = true
			}
			// Check at least one day is selected
			if (intervention.days.length === 0) {
				errors.days = 'Vous devez sélectionner au moins un jour'
				hasError = true
			}
		}
		if (hasError) {
			return errors
		}
		return null
	}

	static getOffers(intervention) {
		let result = []
		let offers = Utils.map(OfferHelper.getData())
		for (let i = 0; i < offers.length; i++) {
			let offer = offers[i]
			if (offer.interventionId === intervention.id) {
				result.push(offer)
			}
		}
		return result
	}

}
export default InterventionUtils