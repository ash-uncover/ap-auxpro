import moment from 'moment'
import { BaseData, Nationality, MomentHelper } from 'ap-react-bootstrap'
import { STATES } from 'ap-validators'

// helpers
import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import I18NHelper from 'helpers/I18NHelper'
import AuxiliaryHelper from 'helpers/AuxiliaryHelper'
import ErrorHelper from 'helpers/ErrorHelper'
import GeozoneHelper from 'helpers/GeozoneHelper'
// utils
import Civility from 'utils/constants/Civility'
import AuxiliaryFields from 'utils/entities/AuxiliaryFields'
// utils-lib
import AuxiliaryUtils from 'utils-lib/entities/AuxiliaryUtils'
import AuxiliaryStatusUtils from 'utils-lib/entities/AuxiliaryStatusUtils'
import NationalityUtils from 'utils-lib/geo/NationalityUtils'
import DiplomaUtils from 'utils-lib/entities/DiplomaUtils'

class AuxiliaryInitialData extends BaseData {

    constructor() {
        super(...arguments)

        this.checkField = this._checkField.bind(this)

        const { LATTITUDE, LONGITUDE } = AuxiliaryFields
        const CIVILITY = Object.assign(
            { defaultValue: Civility.MME.key, form: 'select', name: AuxiliaryUtils.getFieldName(AuxiliaryFields.CIVILITY) }, 
            AuxiliaryFields.CIVILITY
        )
        const FIRST_NAME = Object.assign(
            { defaultValue: '', form: 'input', name: AuxiliaryUtils.getFieldName(AuxiliaryFields.FIRST_NAME) }, 
            AuxiliaryFields.FIRST_NAME
        )
        const LAST_NAME =  Object.assign(
            { defaultValue: '', form: 'input', name: AuxiliaryUtils.getFieldName(AuxiliaryFields.LAST_NAME) }, 
            AuxiliaryFields.LAST_NAME
        )
        const PHONE = Object.assign(
            { defaultValue: '', form: 'input', name: AuxiliaryUtils.getFieldName(AuxiliaryFields.PHONE) }, 
            AuxiliaryFields.PHONE
        )
        const NATIONALITY = Object.assign(
            { defaultValue: Nationality.FR.key, form: 'select', name: AuxiliaryUtils.getFieldName(AuxiliaryFields.NATIONALITY) }, 
            AuxiliaryFields.NATIONALITY,
            { values: NationalityUtils.getNationalities() }
        )
        const BIRTH_DATE = Object.assign(
            { defaultValue: [1980,1,1], form: 'date', name: AuxiliaryUtils.getFieldName(AuxiliaryFields.BIRTH_DATE) }, 
            AuxiliaryFields.BIRTH_DATE
        )
        const BIRTH_CITY = Object.assign(
            { defaultValue: '', form: 'input', name: AuxiliaryUtils.getFieldName(AuxiliaryFields.BIRTH_CITY) }, 
            AuxiliaryFields.BIRTH_CITY
        )
        const BIRTH_COUNTRY = Object.assign(
            { defaultValue: '', form: 'input', name: AuxiliaryUtils.getFieldName(AuxiliaryFields.BIRTH_COUNTRY) }, 
            AuxiliaryFields.BIRTH_COUNTRY
        )
        const ADDRESS = Object.assign(
            { defaultValue: '', form: 'static', name: AuxiliaryUtils.getFieldName(AuxiliaryFields.ADDRESS) }, 
            AuxiliaryFields.ADDRESS
        )
        const POSTAL_CODE = Object.assign(
            { defaultValue: '', form: 'static', name: AuxiliaryUtils.getFieldName(AuxiliaryFields.POSTAL_CODE) }, 
            AuxiliaryFields.POSTAL_CODE
        )
        const CITY = Object.assign(
            { defaultValue: '', form: 'static', name: AuxiliaryUtils.getFieldName(AuxiliaryFields.CITY) }, 
            AuxiliaryFields.CITY
        )
        const COUNTRY = Object.assign(
            { defaultValue: '', form: 'static', name: AuxiliaryUtils.getFieldName(AuxiliaryFields.COUNTRY) }, 
            AuxiliaryFields.COUNTRY
        )
        const ADDRESS_SEARCH = { form: 'address', key: 'addressSearch', name: 'Adresse' }
        const SOCIAL_NUMBER = Object.assign(
            { defaultValue: '', form: 'input', name: AuxiliaryUtils.getFieldName(AuxiliaryFields.SOCIAL_NUMBER) }, 
            AuxiliaryFields.SOCIAL_NUMBER
        )
        const IS_ENTREPRENEUR = Object.assign(
            { defaultValue: 'true', form: 'select', name: AuxiliaryUtils.getFieldName(AuxiliaryFields.IS_ENTREPRENEUR) }, 
            AuxiliaryFields.IS_ENTREPRENEUR,
            { values: AuxiliaryStatusUtils.getValues() }
        )
        const DIPLOMA = Object.assign(
            { defaultValue: [], form: 'selectmulti', name: AuxiliaryUtils.getFieldName(AuxiliaryFields.DIPLOMA) }, 
            AuxiliaryFields.DIPLOMA,
            { values: DiplomaUtils.getDiplomas() }
        )

        this.FIELDS = {
             LATTITUDE,
             LONGITUDE,
             CIVILITY,
             FIRST_NAME,
             LAST_NAME,
             PHONE,
             NATIONALITY,
             BIRTH_DATE,
             BIRTH_CITY,
             BIRTH_COUNTRY,
             ADDRESS,
             POSTAL_CODE,
             CITY,
             COUNTRY,
             ADDRESS_SEARCH,
             SOCIAL_NUMBER,
             IS_ENTREPRENEUR,
             DIPLOMA
        }
        this.FIELDS_FORM1 = {
            CIVILITY,
            FIRST_NAME,
            LAST_NAME,
            PHONE,
            NATIONALITY,
            BIRTH_DATE,
            BIRTH_CITY,
            BIRTH_COUNTRY
        }
        this.FIELDS_FORM2 = {
            ADDRESS_SEARCH,
            ADDRESS,
            POSTAL_CODE,
            CITY,
            COUNTRY,
            SOCIAL_NUMBER,
            IS_ENTREPRENEUR         
        }
        this.FIELDS_FORM3 = {
            DIPLOMA
        }
    }

    register(obj) {
        super.register(obj)
        
        this.declareFunction('onSubmit')

        this.obj.state.errorShow = false
        this.obj.state.errorMsg = []
        this.obj.state.warningShow = false
        this.obj.state.warningMsg = []

        this.loadAuxiliary(AuxiliaryHelper.getData(AuthHelper.getEntityId()))
        this.checkAuxiliary()

        if (!this.getState('warningShow')) {
            this.obj.state.isAccountUpdate = true
        }   
        
        ErrorHelper.register('PUT_AUXILIARY', this, this.handlePutAuxiliaryError.bind(this))
        ErrorHelper.register('GET_AUXILIARY', this, this.handleGetAuxiliaryError.bind(this))
        ErrorHelper.register('GET_AUXILIARY_GEOZONES', this, this.handleGetAuxiliaryGeozonesError.bind(this))
    }

    unregister() {
        ErrorHelper.unregister(this)
    }


    // Store notifications //
    // --------------------------------------------------------------------------------

    handlePutAuxiliaryError() {
        let errorData = ErrorHelper.getData('PUT_AUXILIARY')
        if (errorData) {
            this.setState({
                errorShow: true,
                errorMsg: [ 'Une erreur est survenue pendant la mise à jour de vos informations' ]
            })
        }
    }

    handleGetAuxiliaryError() {
        let errorData = ErrorHelper.getData('GET_AUXILIARY')
        if (errorData) {
            this.setState({
                errorShow: true,
                errorMsg: [ 'Une erreur est survenue pendant la récupération de vos informations' ]
            })
        }
    }
    
    handleGetAuxiliaryGeozonesError() {
        let errorData = ErrorHelper.getData('GET_AUXILIARY_GEOZONES')
        if (errorData) {
            this.setState({
                errorShow: true,
                errorMsg: [ 'Une erreur est survenue pendant la récupération de vos informations' ]
            })
        }
    }


    // View callbacks //
    // --------------------------------------------------------------------------------

    onChange(id, value) {
        const field = this.FIELDS[id]
        
        if (field) {
            const state = field.validator && field.validator.VALIDATOR.check(value) || {}
            let newValue = value
            switch (field) {
            case this.FIELDS.ADDRESS_SEARCH:
                newValue = ''
                this.obj.state.address = value.address || ''
                this.obj.state.city = value.city || ''
                this.obj.state.postalCode = value.postalCode || ''
                this.obj.state.country = value.country || ''
                this.obj.state.lattitude = value.lattitude
                this.obj.state.longitude = value.longitude
                break
            case this.FIELDS.DIPLOMA:
                newValue = DiplomaUtils.resolveDiplomas(this.getState(AuxiliaryFields.DIPLOMA.key), value)
                break
            case this.FIELDS.PHONE:
            case this.FIELDS.SOCIAL_NUMBER:
                if (state.message === field.validator.ERRORS.MAX_LENGTH_EXCEEDED) {
                    return
                }
                break
            }

            this.obj.state.dirty = true
            this.obj.state[field.key] = newValue

            // Check data consistency
            this.checkAuxiliary()
            // Update component
            this.forceUpdate()

        } else {
            console.error('Unknown field: ' + id)
        }   
    }

    onSubmit() {
        AppHelper.setBusy(true).
        then(function (oResult) {
            return AuxiliaryHelper.putAuxiliary(this.buildAuxiliary())
        }.bind(this)).
        then(function () {
            return AuxiliaryHelper.getAuxiliary(AuthHelper.getEntityId())
        }).
        then(function () {
            return GeozoneHelper.getAuxiliaryGeozones(AuthHelper.getEntityId())
        }).
        then(function () {
            setTimeout(AppHelper.setBusy, 200)
            return AppHelper.navigate('/auxiliary/redirect')
        }).
        catch(function (error) {
            setTimeout(AppHelper.setBusy, 200)
            console.error('Auxiliary initial error')
            console.error(error)
        })
    }


    // Internal methods //
    // --------------------------------------------------------------------------------

    buildAuxiliary() {
        let auxiliary = AuxiliaryHelper.getData(AuthHelper.getEntityId())
        for (let f in this.FIELDS) {
            let field = this.FIELDS[f]
            if (AuxiliaryFields.get(field.key)) {
                auxiliary[field.key] = this.getState(field.key)
            }
        }
        return auxiliary
    }

    loadAuxiliary(auxiliary) {
        for (let f in this.FIELDS) {
            let field = this.FIELDS[f]
            let value = auxiliary[field.key] || field.defaultValue
            this.obj.state[field.key] = field.formatter ? field.formatter(value) : value
        }
    }

    checkAuxiliary() {
        this.obj.state.errorShow = false
        this.obj.state.errorMsg = []
        this.obj.state.warningShow = false
        this.obj.state.warningMsg = []
        // Fields individual status
        Object.keys(this.FIELDS).forEach(this.checkField)
    }
    _checkField(id) {
        const field = this.FIELDS[id]
        const value = this.getState(field.key)
        const state = (field.validator && field.validator.VALIDATOR.check(value)) || {}
        this.obj.state[field.key + 'State'] = state.state
        this.obj.state[field.key + 'Message'] = state.message
        
        if (state.state === STATES.ERROR) {
            const messageId = `AUXILIARY_FIELD_ERROR_${id}_${state.message}`
            const message =  I18NHelper.get(messageId)
            if (message && this.obj.state.warningMsg.indexOf(message) === -1) {
                this.obj.state.warningMsg.push(message)
                this.obj.state.warningShow = true
            }
        }
    }
}
let AuxiliaryInitialObj = new AuxiliaryInitialData()
export default AuxiliaryInitialObj
