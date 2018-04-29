import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import I18NHelper from 'helpers/I18NHelper'
import ErrorHelper from 'helpers/ErrorHelper'
import IndisponibilityHelper from 'helpers/IndisponibilityHelper'
import { BaseData, Day, MomentHelper } from 'ap-react-bootstrap'
import { STATES } from 'ap-validators'
// utils
import IndisponibilityRecurencePeriod from 'utils/constants/IndisponibilityRecurencePeriod'
import IndisponibilityFields from 'utils/entities/IndisponibilityFields'
// utils-lib
import IndisponibilityUtils from 'utils-lib/entities/IndisponibilityUtils'
import IndisponibilityRecurencePeriodUtils from 'utils-lib/entities/IndisponibilityRecurencePeriodUtils'

import moment from 'moment'

class AuxiliaryIndisponibilityEditData extends BaseData {

    constructor() {
        super(...arguments)

        this.checkField = this._checkField.bind(this)

        this.MODES = {
            CREATE: 'CREATE',
            EDIT: 'EDIT'
        }

        let defaultDate = MomentHelper.toLocalDate(moment())
        
        const PERIOD = Object.assign(
            { defaultValue: IndisponibilityRecurencePeriod.HOURS.key, form: 'select', name: IndisponibilityUtils.getFieldName(IndisponibilityFields.PERIOD) }, 
            IndisponibilityFields.PERIOD, 
            { values: IndisponibilityRecurencePeriod.VALUES.map(this.getRecurence) }
        )
        const START_DATE = Object.assign(
            { defaultValue: defaultDate, form: 'date', name: IndisponibilityUtils.getFieldName(IndisponibilityFields.START_DATE) },
            IndisponibilityFields.START_DATE,
            { validator: { VALIDATOR : { check: this.checkStartDate.bind(this) } } }
        )
        const END_DATE = Object.assign(
            { defaultValue: defaultDate, form: 'date', hidden: function() {
                return this.getState(IndisponibilityFields.PERIOD.key) === IndisponibilityRecurencePeriod.HOURS.key
            }.bind(this), name: IndisponibilityUtils.getFieldName(IndisponibilityFields.END_DATE) },
            IndisponibilityFields.END_DATE,
            { validator: { VALIDATOR: { check: this.checkEndDate.bind(this) } } }
        )
        const START_TIME = Object.assign(
            { defaultValue: [0, 0], form: 'time', name: IndisponibilityUtils.getFieldName(IndisponibilityFields.START_TIME) }, 
            IndisponibilityFields.START_TIME
        )
        const END_TIME = Object.assign(
            { defaultValue: [12, 0], form: 'time', name: IndisponibilityUtils.getFieldName(IndisponibilityFields.END_TIME) }, 
            IndisponibilityFields.END_TIME
        )
        const DAYS = Object.assign(
            { defaultValue: [], form: 'days', values: Day.VALUES, name: IndisponibilityUtils.getFieldName(IndisponibilityFields.DAYS) }, 
            IndisponibilityFields.DAYS,
            { validator: { VALIDATOR: { check: this.checkDays.bind(this) } } }
        )

        this.FIELDS = {
            PERIOD,
            START_DATE,
            END_DATE,
            START_TIME,
            END_TIME,
            DAYS
        }
        this.FIELDS_FORM1 = {
            PERIOD,
            START_DATE,
            END_DATE,
            START_TIME,
            END_TIME
        }
        this.FIELDS_FORM2 = {
            DAYS
        }
    }

    register(obj, indisponibilityId) {
        super.register(obj)

        this.indisponibilityId = indisponibilityId

        this.declareFunction('onCancel')
        this.declareFunction('onDelete')
        this.declareFunction('onCancelDelete')
        this.declareFunction('onConfirmDelete')
        this.declareFunction('onSubmit')
        
        this.obj.state.mode = indisponibilityId !== 'new' ? this.MODES.EDIT : this.MODES.CREATE

        this.loadIndisponibility(IndisponibilityHelper.getData(this.indisponibilityId) || {})
        this.checkIndisponibility()

        ErrorHelper.register('GET_INDISPONIBILITY', this, this.handleGetIndisponibilityError.bind(this))
        ErrorHelper.register('POST_INDISPONIBILITY', this, this.handlePostIndisponibilityError.bind(this))
        ErrorHelper.register('PUT_INDISPONIBILITY', this, this.handlePutIndisponibilityError.bind(this))
        ErrorHelper.register('DELETE_INDISPONIBILITY', this, this.handleDeleteIndisponibilityError.bind(this))
    }

    unregister() {
        ErrorHelper.unregister(this)
    }


    // Store notification //
    // --------------------------------------------------------------------------------

    handleGetIndisponibilityError() {
        let errorData = ErrorHelper.getData('GET_INDISPONIBILITY')
        if (errorData) {
            this.setState({
                errorShow: true,
                errorMsg: [ "Une erreur est survenue pendant la récupération de l'indisponibilité" ]
            })
        }
    }
    handlePutIndisponibilityError() {
        let errorData = ErrorHelper.getData('PUT_INDISPONIBILITY')
        if (errorData) {
            this.setState({
                errorShow: true,
                errorMsg: [ "Une erreur est survenue pendant la mise à jour de l'indisponibilité" ]
            })
        }
    }
    handlePostIndisponibilityError() {
        let errorData = ErrorHelper.getData('POST_INDISPONIBILITY')
        if (errorData) {
            this.setState({
                errorShow: true,
                errorMsg: [ "Une erreur est survenue pendant la création de l'indisponibilité" ]
            })
        }
    }
    handleDeleteIndisponibilityError() {
        let errorData = ErrorHelper.getData('DELETE_INDISPONIBILITY')
        if (errorData) {
            this.setState({
                errorShow: true,
                errorMsg: [ "Une erreur est survenue pendant la suppression de l'indisponibilité" ]
            })
        }
    }


    // View callbacks //
    // --------------------------------------------------------------------------------

    onCancel() {
        AppHelper.navigateBack()
    }

    onChange(id, value) {
        const field = this.FIELDS[id]
        let newValue = value
        if (field) {
            const field = this.FIELDS[id]
            // State global update
            this.obj.state.dirty = true
            this.obj.state[field.key] = newValue
            // Check data consistency
            this.checkIndisponibility()
            // Update component
            this.forceUpdate()
        } else {
            console.error('Unknown field: ' + id)
        }
    }

    onDelete() {
        this.setState({ showDelete: true })
    }
    onCancelDelete() {
        this.setState({ showDelete: false })
    }
    onConfirmDelete() {
        AppHelper.setBusy(true).
        then(function() {
            return IndisponibilityHelper.deleteIndisponibility(this.indisponibilityId)
        }.bind(this)).
        then(function (result) {
            return IndisponibilityHelper.getAuxiliaryIndisponibilitys(AuthHelper.getEntityId())
        }.bind(this)).
        then(function () {
            AppHelper.navigateBack()
            setTimeout(AppHelper.setBusy, 200)
        }).
        catch(function (error) {
            setTimeout(AppHelper.setBusy, 200)
            console.error('Indisponibility submit error')
            console.error(error)
        })

        this.setState({ showDelete: false })
    }

    onSubmit() {
        let indisponibility = this.buildIndisponibility()
        AppHelper.setBusy(true).
        then(function() {
            if (this.getState('mode') === this.MODES.CREATE) {
                return IndisponibilityHelper.postIndisponibility(indisponibility)
            } else {
                return IndisponibilityHelper.putIndisponibility(indisponibility)
            }
        }.bind(this)).
        then(function (result) {
            if (this.getState('mode') === this.MODES.CREATE) {
                return IndisponibilityHelper.getIndisponibility(result.id)
            } else {
                return IndisponibilityHelper.getIndisponibility(indisponibility.id)
            }
        }.bind(this)).
        then(function () {
            AppHelper.navigateBack()
            setTimeout(AppHelper.setBusy, 200)
        }).
        catch(function (error) {
            this.setState({
                showWarning: true
            })
            setTimeout(AppHelper.setBusy, 200)
            console.error('Indisponibility submit error')
            console.error(error)
        }.bind(this))
    }


    // Internal methods //
    // --------------------------------------------------------------------------------

    buildIndisponibility() {
        let indiponibility = (this.getState('mode') === this.MODES.CREATE) ?
            { auxiliaryId: AuthHelper.getEntityId() } :
            Object.assign({}, IndisponibilityHelper.getData(this.indisponibilityId))
            
        for (let f in this.FIELDS) {
            let field = this.FIELDS[f]
            if (IndisponibilityFields.get(field.key)) {
                indiponibility[field.key] = this.getState(field.key)
            }
        }
        if (indiponibility.period === IndisponibilityRecurencePeriod.HOURS.key) {
            delete indiponibility.days
            delete indiponibility.endDate
        }
        if (indiponibility.period === IndisponibilityRecurencePeriod.DAYS.key) {
            delete indiponibility.days
            delete indiponibility.startTime
            delete indiponibility.endTime
        }
        return indiponibility
    }

    loadIndisponibility(indisponibility) {
        for (let f in this.FIELDS) {
            let field = this.FIELDS[f]
            let value = indisponibility[field.key] || field.defaultValue
            this.obj.state[field.key] = field.formatter ? field.formatter(value) : value
        }
    }

    checkIndisponibility(indisponibility) {
        this.obj.state.errorShow = false
        this.obj.state.errorMsg = []
        this.obj.state.warningShow = false
        this.obj.state.warningMsg = []
        // Fields individual status
        Object.keys(this.FIELDS).forEach(this.checkField)
        //
        this.obj.state.indisponibilityNightly = false
        let startTime = MomentHelper.fromLocalTime(this.getState('startTime'))
        let endTime = MomentHelper.fromLocalTime(this.getState('endTime'))
        if (endTime.isSameOrBefore(startTime)) {
            this.obj.state.indisponibilityNightly = true
        }
    }
    _checkField(id) {
        const field = this.FIELDS[id]
        const value = this.getState(field.key)
        const state = (field.validator && field.validator.VALIDATOR.check(value)) || {}
        this.obj.state[field.key + 'State'] = state.state
        this.obj.state[field.key + 'Message'] = state.message
        
        if (state.state === STATES.ERROR) {
            const messageId = `INDISPONIBILITY_FIELD_ERROR_${id}_${state.message}`
            const message =  I18NHelper.get(messageId)
            if (message && this.obj.state.warningMsg.indexOf(message) === -1) {
                this.obj.state.warningMsg.push(message)
                this.obj.state.warningShow = true
            }
        }
    }
    checkStartDate() {
        const startDate = this.getState('startDate')
        const state = IndisponibilityFields.START_DATE.validator.VALIDATOR.check(startDate)
        if (state.message) {
            return state
        }
        const period = this.getState('period')
        if (period === IndisponibilityRecurencePeriod.HOURS.key) {
            return { state: STATES.SUCCESS }
        }
        const endDate = this.getState('endDate')
        const startMoment = MomentHelper.fromLocalDate(startDate)
        const endMoment = endDate ? MomentHelper.fromLocalDate(endDate) : null
        if (endMoment && endMoment.isBefore(startMoment)) {
            return { 
                state: STATES.ERROR, 
                message: 'START_MUST_BE_BEFORE_END'
            }
        }
        return { state: STATES.SUCCESS }
    }
    checkEndDate() {
        if (this.getState('period') === IndisponibilityRecurencePeriod.HOURS.key) {
            return { state: STATES.SUCCESS }
        }
        if (!this.getState('endDate')) {
            return { 
                state: STATES.ERROR,
                message: 'CANNOT_BE_NULL' 
            }
        }
        const startMoment = MomentHelper.fromLocalDate(this.getState('startDate'))
        const endMoment = MomentHelper.fromLocalDate(this.getState('endDate'))
        if (endMoment.isBefore(startMoment)) {
            return {
                state: STATES.ERROR, 
                message: 'START_MUST_BE_BEFORE_END'
            }
        }
        const currentMoment = moment().startOf('day')
        if (currentMoment.isAfter(endMoment)) {
            return { 
                state: STATES.ERROR, 
                message: 'MAX_DATE_EXCEEDED'
            }
        }
        return { state: STATES.SUCCESS }
    }
    checkDays() {
        if (this.getState('period') === IndisponibilityRecurencePeriod.HOURS.key || 
            this.getState('period') === IndisponibilityRecurencePeriod.DAYS.key) {
            return { state: STATES.SUCCESS }
        }
        if (!this.getState('days') || !this.getState('days').length) {
            return { 
                state: STATES.ERROR, 
                message: 'MIN_LENGTH_EXCEEDED' 
            }
        }
        return { state: STATES.SUCCESS }
    }

    getRecurence(value) {
        return {
            key: value.key,
            value: IndisponibilityRecurencePeriodUtils.getShortName(value.key)
        }
    }
}
let AuxiliaryIndisponibilityObj = new AuxiliaryIndisponibilityEditData()
export default AuxiliaryIndisponibilityObj