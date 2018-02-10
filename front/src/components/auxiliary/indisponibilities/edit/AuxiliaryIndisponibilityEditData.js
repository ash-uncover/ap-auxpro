import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import ErrorHelper from 'helpers/ErrorHelper'
import IndisponibilityHelper from 'helpers/IndisponibilityHelper'
import { BaseData, Day, MomentHelper } from 'ap-react-bootstrap'

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

        this.MODES = {
            CREATE: 'CREATE',
            EDIT: 'EDIT'
        }

        let defaultDate = MomentHelper.toLocalDate(moment())

        this.FIELDS_FORM1 = [
            Object.assign(
                { defaultValue: IndisponibilityRecurencePeriod.HOURS.key, form: 'select', name: IndisponibilityUtils.getFieldName(IndisponibilityFields.PERIOD) }, 
                IndisponibilityFields.PERIOD, 
                { values: IndisponibilityRecurencePeriod.VALUES.map(this.getRecurence) }
            ),
            Object.assign(
                { defaultValue: defaultDate, form: 'date', name: IndisponibilityUtils.getFieldName(IndisponibilityFields.START_DATE) },
                IndisponibilityFields.START_DATE,
                { validator: this.getStartDateValidator() }
            ),
            Object.assign(
                { defaultValue: defaultDate, form: 'date', hidden: function() {
                    return this.getState(IndisponibilityFields.PERIOD.key) === IndisponibilityRecurencePeriod.HOURS.key
                }.bind(this), name: IndisponibilityUtils.getFieldName(IndisponibilityFields.END_DATE) },
                IndisponibilityFields.END_DATE,
                { validator: this.getEndDateValidator() }
            ),
            Object.assign(
                { defaultValue: [0, 0], form: 'time', name: IndisponibilityUtils.getFieldName(IndisponibilityFields.START_TIME) }, 
                IndisponibilityFields.START_TIME,
                { validator: this.getStartTimeValidator() }
            ),
            Object.assign(
                { defaultValue: [0, 0], form: 'time', name: IndisponibilityUtils.getFieldName(IndisponibilityFields.END_TIME) }, 
                IndisponibilityFields.END_TIME,
                { validator: this.getEndTimeValidator() }
            )
        ]

        this.FIELDS_FORM2 = [
            Object.assign(
                { defaultValue: [], values: Day.VALUES, name: IndisponibilityUtils.getFieldName(IndisponibilityFields.DAYS) }, 
                IndisponibilityFields.DAYS,
                { validator: this.getDaysValidator() }
            )
        ]

        this.FIELDS = [].concat(this.FIELDS_FORM1).concat(this.FIELDS_FORM2)
    }

    register(obj, indisponibilityId) {
        super.register(obj)

        this.indisponibilityId = indisponibilityId

        this.declareFunction('onCancel')
        this.declareFunction('onDelete')
        this.declareFunction('onCancelDelete')
        this.declareFunction('onConfirmDelete')
        this.declareFunction('onSubmit')
        
        this.setState({
            showError: false,
            errorMsg: [],
            showWarning: false,
            warningMsg: [],
            indisponibilityNightly: false,
            mode: indisponibilityId !== 'new' ? this.MODES.EDIT : this.MODES.CREATE
        })

        let indisponibility = IndisponibilityHelper.getData(this.indisponibilityId) || {}
        for (let i = 0; i < this.FIELDS.length; i++) {
            let field = this.FIELDS[i]
            let value = indisponibility && indisponibility[field.key]
            if (field.formatter) {
                this.obj.state[field.key] = field.formatter(indisponibility[field.key])
            } else {
                this.obj.state[field.key] = value || field.defaultValue
            }
        }

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
    }
    handlePutIndisponibilityError() {
        let errorData = ErrorHelper.getData('PUT_INDISPONIBILITY')
    }
    handlePostIndisponibilityError() {
        let errorData = ErrorHelper.getData('POST_INDISPONIBILITY')
    }
    handleDeleteIndisponibilityError() {
        let errorData = ErrorHelper.getData('DELETE_INDISPONIBILITY')
    }


    // View callbacks //
    // --------------------------------------------------------------------------------

    onCancel() {
        AppHelper.navigateBack()
    }

    onChange(id, event, value) {
        this.obj.state.dirty = true
        this.obj.state.showWarning = false
        this.obj.state.warningMsg = []
        this.obj.state[id] = value
        this.obj.state[id + 'Default'] = null
        this.obj.state.indisponibilityValid = true
        for (let i = 0 ; i < this.FIELDS.length ; i++) {
            let field = this.FIELDS[i]
            if (field.validator && field.validator.getState(this.getState(field.key)) === 'error') {
                this.obj.state.indisponibilityValid = false
                this.obj.state.showWarning = true
                this.obj.state.warningMsg.push("Valeur invalide pour le champ : '" + IndisponibilityUtils.getFieldName(field.key) + "'")
            }
        }
        this.obj.state.indisponibilityNightly = false
        let startTime = MomentHelper.fromLocalTime(this.getState('startTime'))
        let endTime = MomentHelper.fromLocalTime(this.getState('endTime'))
        if (endTime.isSameOrBefore(startTime)) {
            this.obj.state.indisponibilityNightly = true
        }

        this.forceUpdate()
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

    getRecurence(value) {
        return {
            key: value.key,
            value: IndisponibilityRecurencePeriodUtils.getShortName(value.key)
        }
    }

    buildIndisponibility() {
        let indiponibility = (this.getState('mode') === this.MODES.CREATE) ?
            { auxiliaryId: AuthHelper.getEntityId() } :
            Object.assign({}, IndisponibilityHelper.getData(this.indisponibilityId))
            
        for (let i = 0 ; i < this.FIELDS.length ; i++) {
            let field = this.FIELDS[i]
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

    getStartDateValidator() {
        return {
            getState: function (value) {
                let currentDate = moment().startOf('day')
                let startDate = MomentHelper.fromLocalDate(value)
                if (currentDate.isAfter(startDate)) {
                    return 'error'
                }
                if (this.getState('period') !== IndisponibilityRecurencePeriod.HOURS.key) {
                    let endDate = MomentHelper.fromLocalDate(this.getState('endDate'))
                    if (startDate.isAfter(endDate)) {
                        return 'error'
                    }
                }
                return 'success'
            }.bind(this)
        }
    }
    getEndDateValidator() {
        return {
            getState: function (value) {
                if (this.getState('period') !== IndisponibilityRecurencePeriod.HOURS.key) {
                    let currentDate = moment().startOf('day')
                    let endDate = MomentHelper.fromLocalDate(value)
                    if (currentDate.isAfter(endDate)) {
                        return 'error'
                    }
                    let startDate = MomentHelper.fromLocalDate(this.getState('startDate'))
                    if (startDate.isAfter(endDate)) {
                        return 'error'
                    }
                }
                return 'success'
            }.bind(this)
        }
    }
    getStartTimeValidator() {
        return {
            getState: function (value) {
                if (this.getState('period') !== IndisponibilityRecurencePeriod.DAYS.key) {
                    let startTime = MomentHelper.fromLocalTime(value)
                    let endTime = MomentHelper.fromLocalTime(this.getState('endTime'))
                    if (endTime.isSame(startTime)) {
                        return 'error'
                    }
                }
                return 'success'
            }.bind(this)
        }   
    }
    getEndTimeValidator() {
        return {
            getState: function (value) {
                if (this.getState('period') !== IndisponibilityRecurencePeriod.DAYS.key) {
                    let startTime = MomentHelper.fromLocalTime(this.getState('startTime'))
                    let endTime = MomentHelper.fromLocalTime(value)
                    if (endTime.isSame(startTime)) {
                        return 'error'
                    }
                }
                return 'success'
            }.bind(this)
        }
    }
    getDaysValidator() {
        return {
            getState: function (value) {
                if (this.getState('period') !== IndisponibilityRecurencePeriod.HOURS.key &&
                    this.getState('period') !== IndisponibilityRecurencePeriod.DAYS.key &&
                    !value.length) {
                    return 'error'
                }
                return 'success'
            }.bind(this)
        }
    }
}
let AuxiliaryIndisponibilityObj = new AuxiliaryIndisponibilityEditData()
export default AuxiliaryIndisponibilityObj