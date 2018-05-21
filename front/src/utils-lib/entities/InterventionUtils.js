import { StoreRegistry } from 'ap-flux'
import { Utils, MomentHelper } from 'ap-react-bootstrap'
import moment from 'moment'

import AuxiliaryHelper from 'helpers/AuxiliaryHelper'
import InterventionHelper from 'helpers/InterventionHelper'
import OfferHelper from 'helpers/OfferHelper'

import InterventionStatus from 'utils/constants/InterventionStatus'
import InterventionRecurencePeriod from 'utils/constants/InterventionRecurencePeriod'

import InterventionFields from 'utils/entities/InterventionFields'

import InterventionType from 'utils-lib/constants/InterventionType'

import DayUtils from 'utils-lib/entities/DayUtils'
import InterventionRecurencePeriodUtils from 'utils-lib/entities/InterventionRecurencePeriodUtils'

class InterventionUtils {

    static storeInterventionMatch(result, params) {
        let intervention = InterventionHelper.getData(params.id)
        intervention.match = result
        StoreRegistry.getStore('REST_STORE').notifyPath('intervention/' + params.id)    
    }

    static getFieldName(field) {
        switch (field) {
        case InterventionFields.PERIOD:
        case InterventionFields.PERIOD.key: return 'Périodicité'
        case InterventionFields.AUXILIARY_ID:
        case InterventionFields.AUXILIARY_ID.key: return 'Auxiliaire'
        case InterventionFields.MISSION_TYPE:
        case InterventionFields.MISSION_TYPE.key: return 'Type de prestation'
        case InterventionFields.END_DATE:
        case InterventionFields.END_DATE.key: return 'Fin'
        case InterventionFields.CUSTOMER_ID:
        case InterventionFields.CUSTOMER_ID.key: return 'Usager'
        case InterventionFields.DAYS:
        case InterventionFields.DAYS.key: return 'Jours'
        case InterventionFields.START_TIME:
        case InterventionFields.START_TIME.key: return 'De'
        case InterventionFields.END_TIME:
        case InterventionFields.END_TIME.key: return 'A'
        case InterventionFields.SERVICE_ID:
        case InterventionFields.SERVICE_ID.key: return 'Service'
        case InterventionFields.START_DATE:
        case InterventionFields.START_DATE.key: return 'Début'
        case InterventionFields.SAD_STATUS:
        case InterventionFields.SAD_STATUS.key: return 'Statut'
        case InterventionFields.DIPLOMAS:
        case InterventionFields.DIPLOMAS.key: return 'Diplômes'
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

    static isActive(intervention) {
        if (!intervention.auxiliaryId) {
            return false
        }
        if (intervention.sadStatus === 'CANCELED') {
            return false
        }
        return InterventionUtils.isCurrent(intervention)
    }

    static isCurrent(intervention) {
        let period = InterventionRecurencePeriod.get(intervention.period)
        let startDate = MomentHelper.fromLocalDate(intervention.startDate);
        let currentDate = moment().startOf('day');
        switch (period) {
        case InterventionRecurencePeriod.HOURS:
            if (currentDate.isAfter(startDate)) {
                return false
            }
            break
        case InterventionRecurencePeriod.WEEK1:
        case InterventionRecurencePeriod.WEEK2:
        case InterventionRecurencePeriod.WEEK3:
        case InterventionRecurencePeriod.WEEK4:
            let endDate = MomentHelper.fromLocalDate(intervention.endDate)
            if (currentDate.isAfter(endDate)) {
                return false
            }
            break
        }
        return true
    }

    static getText(intervention) {
        let text = []

        let period = intervention.period
        let startDate = MomentHelper.localDateToHumanDate(intervention.startDate);
        let startTime = MomentHelper.localTimeToHumanTime(intervention.startTime);
        let endTime   = MomentHelper.localTimeToHumanTime(intervention.endTime);
        switch (period) {
            case InterventionRecurencePeriod.HOURS.key:
                text.push('Prestation unique');
                text.push('Le ' + startDate)
                text.push('De ' + startTime + ' à ' + endTime)
                text.push('')
                break;
            case InterventionRecurencePeriod.WEEK1.key:
            case InterventionRecurencePeriod.WEEK2.key:
            case InterventionRecurencePeriod.WEEK3.key:
            case InterventionRecurencePeriod.WEEK4.key:
                let endDate = MomentHelper.localDateToHumanDate(intervention.endDate);
                text.push(InterventionRecurencePeriodUtils.getName(period))
                text.push('Du ' + startDate + ' au ' + endDate)
                text.push('Le ' + DayUtils.getNames(intervention.days))
                text.push('De ' + startTime + ' à ' + endTime)
        }

        return text
    }

    static checkValidity(intervention) {
        let errors = []
        // Check validator for each field
        for (let i = 0 ; i < InterventionFields.VALUES.length ; i++) {
            let field = InterventionFields.VALUES[i]
            if (field.validator && field.validator.getState(intervention[field.key]) === 'error') {
                errors.push({ key: field.key, value: 'Valeur invalide' })
            }
        }
        if (errors.length) {
            return errors
        }
        // Check start date is in the future
        let startDate = MomentHelper.fromLocalDate(intervention.startDate)
        if (moment().startOf('day').isAfter(startDate)) {
            errors.push({ key: 'startDate', value: 'La date de début ne peut être dans le passé' })
        }
        // Check start time is before end time
        if (intervention.startTime[0] > intervention.endTime[0] || (intervention.startTime[0] === intervention.endTime[0] && intervention.startTime[1] >= intervention.endTime[1])) {
            errors.push({ key: 'startDate', value: "L'horaire de fin doit être après l'horaire de début" })
            errors.push({ key: 'endTime', value: "L'horaire de fin doit être après l'horaire de début" })
        }
        if (intervention.period !== InterventionRecurencePeriod.HOURS.key) {
            // Check end date is after start date
            let endDate = MomentHelper.fromLocalDate(intervention.endDate)
            if (startDate.isAfter(endDate)) {
                errors.push({ key: 'startDate', value: 'La date de fin doit être après la date de début' })
                errors.push({ key: 'endTime', value: 'La date de fin doit être après la date de début' })
            }
            // Check at least one day is selected
            if (intervention.days.length === 0) {
                errors.push({ key: 'days', value: 'Vous devez sélectionner au moins un jour' })
            }
        }
        return errors
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
