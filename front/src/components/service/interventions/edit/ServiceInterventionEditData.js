import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import ErrorHelper from 'helpers/ErrorHelper'
import I18NHelper from 'helpers/I18NHelper'
import CustomerHelper from 'helpers/CustomerHelper'
import InterventionHelper from 'helpers/InterventionHelper'
import moment from 'moment'
import { BaseData, Day, Utils, MomentHelper } from 'ap-react-bootstrap'
import { STATES } from 'ap-validators'

// utils
import AuxiliaryStatus from 'utils/constants/AuxiliaryStatus'
import Diploma from 'utils/constants/Diploma'
import InterventionRecurencePeriod from 'utils/constants/InterventionRecurencePeriod'
// utils-lib
import InterventionType from 'utils-lib/constants/InterventionType'
import AuxiliaryStatusUtils from 'utils-lib/entities/AuxiliaryStatusUtils'
import CustomerUtils from 'utils-lib/entities/CustomerUtils'
import DiplomaUtils from 'utils-lib/entities/DiplomaUtils'
import InterventionFields from 'utils/entities/InterventionFields'
import InterventionRecurencePeriodUtils from 'utils-lib/entities/InterventionRecurencePeriodUtils'
import InterventionUtils from 'utils-lib/entities/InterventionUtils'

class ServiceInterventionEditData extends BaseData {

    constructor() {
        super()

        this.checkField = this._checkField.bind(this)

        this.MODES = {
            CREATE: 'CREATE',
            EDIT: 'EDIT'
        }

        let defaultDate = MomentHelper.toLocalDate(moment())
        
        
        const CUSTOMER_ID = Object.assign(
            { form: 'select', name: InterventionUtils.getFieldName(InterventionFields.CUSTOMER_ID) }, 
            InterventionFields.CUSTOMER_ID
        )
        const MISSION_TYPE = Object.assign(
            { form: 'select', defaultValue: AuxiliaryStatus.AUTO.key, name: InterventionUtils.getFieldName(InterventionFields.MISSION_TYPE) }, 
            InterventionFields.MISSION_TYPE,
            { values: AuxiliaryStatusUtils.getValuesIntervention() }
        )
        const PERIOD = Object.assign(
            { form: 'select', defaultValue: InterventionRecurencePeriod.HOURS.key, name: InterventionUtils.getFieldName(InterventionFields.PERIOD) },
            InterventionFields.PERIOD, 
            { values: InterventionRecurencePeriod.VALUES.map(this.getRecurence) }
        )
        const START_DATE = Object.assign(
            { form: 'date', defaultValue: defaultDate, name: InterventionUtils.getFieldName(InterventionFields.START_DATE) }, 
            InterventionFields.START_DATE,
            { validator: { VALIDATOR : { check: this.checkStartDate.bind(this) } } }
        )
        const END_DATE = Object.assign(
            { form: 'date', defaultValue: defaultDate, name: InterventionUtils.getFieldName(InterventionFields.END_DATE) }, 
            InterventionFields.END_DATE,
            { validator: { VALIDATOR : { check: this.checkEndDate.bind(this) } }, hidden: this.hideEndDate.bind(this) }
        )
        const START_TIME = Object.assign(
            { form: 'time', defaultValue: [0, 0], name: InterventionUtils.getFieldName(InterventionFields.START_TIME) }, 
            InterventionFields.START_TIME
        )
        const END_TIME = Object.assign(
            { form: 'time', defaultValue: [0, 0], name: InterventionUtils.getFieldName(InterventionFields.END_TIME) }, 
            InterventionFields.END_TIME
        )
        const DAYS = Object.assign(
            { form: 'days', defaultValue: [], name: InterventionUtils.getFieldName(InterventionFields.DAYS) }, 
            InterventionFields.DAYS,
            { validator: { VALIDATOR : { check: this.checkDays.bind(this) } }, values: Day.VALUES }
        )
        const DIPLOMAS = Object.assign(
            { form: 'selectmulti', defaultValue: [], name: InterventionUtils.getFieldName(InterventionFields.DIPLOMAS) }, 
            InterventionFields.DIPLOMAS,
            { values: DiplomaUtils.getDiplomas() }
        )

        this.FIELDS = {
            CUSTOMER_ID,
            MISSION_TYPE,
            PERIOD,
            START_DATE,
            END_DATE,
            START_TIME,
            END_TIME,
            DAYS,
            DIPLOMAS
        }
        this.FIELDS_FORM0 = {
            CUSTOMER_ID
        }
        this.FIELDS_FORM1 = {
            MISSION_TYPE
        }
        this.FIELDS_FORM2 = {
            PERIOD,
            START_DATE,
            END_DATE,
            START_TIME,
            END_TIME
        }
        this.FIELDS_FORM3 = {
            DAYS
        }
        this.FIELDS_FORM4 = {
            DIPLOMAS
        }
    }

    register(obj, interventionId) {
        super.register(obj)

        this.interventionId = interventionId

        this.declareFunction('onCancel')
        this.declareFunction('onSubmit')

        this.obj.state.mode = interventionId !== 'new' ? this.MODES.EDIT : this.MODES.CREATE
        
        if (this.getState('mode') === this.MODES.EDIT) {
            let type = InterventionUtils.getType(InterventionHelper.getData(interventionId))
            if (type === InterventionType.OFFERED || type === InterventionType.PLANNED) {
                AppHelper.navigate('/service/interventions/' + interventionId)
                return
            }
        }
        
        let customers = this.getCustomers()

        this.FIELDS.CUSTOMER_ID.values = customers
        this.FIELDS.CUSTOMER_ID.defaultValue = customers && customers.length && customers[0].key

        this.loadIntervention(InterventionHelper.getData(interventionId) || {})
        this.checkIntervention()

        ErrorHelper.register('GET_INTERVENTION', this, this.handleGetInterventionError.bind(this))
        ErrorHelper.register('POST_INTERVENTION', this, this.handlePostInterventionError.bind(this))
        ErrorHelper.register('PUT_INTERVENTION', this, this.handlePutInterventionError.bind(this))
        ErrorHelper.register('DELETE_INTERVENTION', this, this.handleDeleteInterventionError.bind(this))
    }

    unregister() {
        ErrorHelper.unregister(this)
    }


    // Store notifications //
    // --------------------------------------------------------------------------------

    handleGetInterventionError() {
        let errorData = ErrorHelper.getData('GET_INTERVENTION')
        if (errorData) {
            this.setState({
                errorShow: true,
                errorMsg: [ "Une erreur est survenue pendant la récupération de l'intervention" ]
            })
        }
    }
    handlePutInterventionError() {
        let errorData = ErrorHelper.getData('PUT_INTERVENTION')
        if (errorData) {
            this.setState({
                errorShow: true,
                errorMsg: [ "Une erreur est survenue pendant la mise à jour de l'intervention" ]
            })
        }
    }
    handlePostInterventionError() {
        let errorData = ErrorHelper.getData('POST_INTERVENTION')
        if (errorData) {
            this.setState({
                errorShow: true,
                errorMsg: [ "Une erreur est survenue pendant la création de l'intervention" ]
            })
        }
    }
    handleDeleteInterventionError() {
        let errorData = ErrorHelper.getData('DELETE_INTERVENTION')
        if (errorData) {
            this.setState({
                errorShow: true,
                errorMsg: [ "Une erreur est survenue pendant la supression de l'intervention" ]
            })
        }
    }


    // View callbacks //
    // --------------------------------------------------------------------------------

    onChange(id, value) {
        const field = this.FIELDS[id]
        let newValue = value
        if (field) {
            const field = this.FIELDS[id]

            if (field === InterventionFields.DIPLOMAS) {
                let current = this.getState(InterventionFields.DIPLOMAS.key)
                if (value.indexOf(Diploma.DIPLOMA_NONE.key) !== -1) {
                    if (current.indexOf(Diploma.DIPLOMA_NONE.key) === -1) {
                        newValue = [Diploma.DIPLOMA_NONE.key]
                    } else {
                        newValue.splice(value.indexOf(Diploma.DIPLOMA_NONE.key), 1)
                    }
                } else if (value.indexOf(Diploma.DIPLOMA_STUDY.key) !== -1) {
                    if (current.indexOf(Diploma.DIPLOMA_STUDY.key) === -1) {
                        newValue = [Diploma.DIPLOMA_STUDY.key]
                    } else {
                        newValue.splice(value.indexOf(Diploma.DIPLOMA_STUDY.key), 1)
                    }
                }
            }

            // State global update
            this.obj.state.dirty = true
            this.obj.state[field.key] = newValue
            // Check data consistency
            this.checkIntervention()
            // Update component
            this.forceUpdate()
        } else {
            console.error('Unknown field: ' + id)
        }
    }

    onCancel() {
        AppHelper.navigateBack()
    }

    onSubmit() {
        AppHelper.setBusy(true).
        then(function() {
            let intervention = this.buildIntervention()
            if (this.getState('mode') === this.MODES.CREATE) {
                return InterventionHelper.postIntervention(intervention)
            } else {
                return InterventionHelper.putIntervention(intervention)
            }
        }.bind(this)).
        then(function () {
            return InterventionHelper.getServiceInterventions(AuthHelper.getEntityId())
        }).
        then(function () {
            AppHelper.navigateBack()
            setTimeout(AppHelper.setBusy, 200)
        }).
        catch(function (error) {
            setTimeout(AppHelper.setBusy, 200)
            console.error('Intervention submit error')
            console.error(error)
        })
    }


    // Internal methods //
    // --------------------------------------------------------------------------------

    buildIntervention() {
        let intervention = (this.getState('mode') === this.MODES.CREATE) ?
            { serviceId: AuthHelper.getEntityId() } :
            Object.assign({}, InterventionHelper.getData(this.interventionId))
            
        for (let f in this.FIELDS) {
            let field = this.FIELDS[f]
            if (InterventionFields.get(field.key)) {
                intervention[field.key] = this.getState(field.key)
            }
        }
        if (intervention.period === InterventionRecurencePeriod.HOURS.key) {
            delete intervention.days
            delete intervention.endDate
        }
        return intervention
    }

    loadIntervention(intervention) {
        for (let f in this.FIELDS) {
            let field = this.FIELDS[f]
            let value = intervention[field.key] || field.defaultValue
            this.obj.state[field.key] = field.formatter ? field.formatter(value) : value
        }
    }

    checkIntervention(intervention) {
        this.obj.state.errorShow = false
        this.obj.state.errorMsg = []
        this.obj.state.warningShow = false
        this.obj.state.warningMsg = []
        // Fields individual status
        Object.keys(this.FIELDS).forEach(this.checkField)
        //
        this.obj.state.interventionNightly = false
        let startTime = MomentHelper.fromLocalTime(this.getState('startTime'))
        let endTime = MomentHelper.fromLocalTime(this.getState('endTime'))
        if (endTime.isSameOrBefore(startTime)) {
            this.obj.state.interventionNightly = true
        }
    }
    _checkField(id) {
        const field = this.FIELDS[id]
        const value = this.getState(field.key)
        const state = (field.validator && field.validator.VALIDATOR.check(value)) || {}
        this.obj.state[`${field.key}State`] = state.state
        this.obj.state[`${field.key}Message`] = state.message
        
        if (state.state === STATES.ERROR) {
            const messageId = `INTERVENTION_FIELD_ERROR_${id}_${state.message}`
            const message =  I18NHelper.get(messageId)
            if (message && this.obj.state.warningMsg.indexOf(message) === -1) {
                this.obj.state.warningMsg.push(message)
                this.obj.state.warningShow = true
            }
        }
    }
    checkStartDate() {
        const startDate = this.getState('startDate')
        const state = InterventionFields.START_DATE.validator.VALIDATOR.check(startDate)
        if (state.message) {
            return state
        }
        const period = this.getState('period')
        if (period === InterventionRecurencePeriod.HOURS.key) {
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
        const period = this.getState('period')
        const endDate = this.getState('endDate')
        const startDate = this.getState('startDate')
        const state = InterventionFields.END_DATE.validator.VALIDATOR.check(endDate)
        if (period === InterventionRecurencePeriod.HOURS.key) {
            return { state: STATES.SUCCESS }
        }
        if (state.message) {
            return state
        }
        const startMoment = MomentHelper.fromLocalDate(startDate)
        const endMoment = MomentHelper.fromLocalDate(endDate)
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
        if (this.getState('period') === InterventionRecurencePeriod.HOURS.key) {
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

    hideEndDate() {
        return this.getState(InterventionFields.PERIOD.key) === InterventionRecurencePeriod.HOURS.key
    }

    getRecurence(value) {
        return {
            key: value.key,
            value: InterventionRecurencePeriodUtils.getShortName(value.key)
        }
    }
    getCustomer(customer) {
        return {
            key: customer.id,
            value: CustomerUtils.getFullName(customer)
        }
    }
    getCustomers() {
        return Utils.map(CustomerHelper.getData(), this.getCustomer)
    }
}

let ServiceInterventionEditObj = new ServiceInterventionEditData()
export default ServiceInterventionEditObj
