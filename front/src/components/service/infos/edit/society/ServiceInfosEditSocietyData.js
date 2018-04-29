import { BaseData } from 'ap-react-bootstrap'
import validators from 'utils/validators'
import { STATES } from 'ap-validators'
// helpers
import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import ErrorHelper from 'helpers/ErrorHelper'
import I18NHelper from 'helpers/I18NHelper'
import ImageHelper from 'helpers/ImageHelper'
import ServiceHelper from 'helpers/ServiceHelper'
// utils
import ServiceFields from 'utils/entities/ServiceFields'
// utils-lib
import ServiceUtils from 'utils-lib/entities/ServiceUtils'
import SocFunctionUtils from 'utils-lib/entities/SocFunctionUtils'
import SocFunction from 'utils/constants/SocFunction'

class ServiceInfosEditSocietyData extends BaseData {

    constructor() {
        super(...arguments)

        this.checkField = this._checkField.bind(this)
        
        const { AVATAR, PROFIL_COMPLETED, LATTITUDE, LONGITUDE } = ServiceFields
        const SOCIAL_REASON = Object.assign(
            { defaultValue: '', form: 'input', name: ServiceUtils.getFieldName(ServiceFields.SOCIAL_REASON) }, 
            ServiceFields.SOCIAL_REASON
        )
        const FUNCTION = Object.assign(
            { defaultValue: SocFunction.MAND.key, form: 'select', name: ServiceUtils.getFieldName(ServiceFields.FUNCTION) }, 
            ServiceFields.FUNCTION,
            { values: SocFunctionUtils.getValues() }
        )
        const SIRET = Object.assign(
            { defaultValue: '', form: 'input', name: ServiceUtils.getFieldName(ServiceFields.SIRET) }, 
            ServiceFields.SIRET
        )
        const PHONE = Object.assign(
            { defaultValue: '', form: 'input', name: ServiceUtils.getFieldName(ServiceFields.PHONE) }, 
            ServiceFields.PHONE
        )
        const ADDRESS = Object.assign(
            { defaultValue: '', form: 'static', name: ServiceUtils.getFieldName(ServiceFields.ADDRESS) }, 
            ServiceFields.ADDRESS
        )
        const POSTAL_CODE = Object.assign(
            { defaultValue: '', form: 'static', name: ServiceUtils.getFieldName(ServiceFields.POSTAL_CODE) }, 
            ServiceFields.POSTAL_CODE
        )
        const CITY = Object.assign(
            { defaultValue: '', form: 'static', name: ServiceUtils.getFieldName(ServiceFields.CITY) }, 
            ServiceFields.CITY
        )
        const COUNTRY = Object.assign(
            { defaultValue: '', form: 'static', name: ServiceUtils.getFieldName(ServiceFields.COUNTRY) }, 
            ServiceFields.COUNTRY
        )
        const ADDRESS_SEARCH = Object.assign(
            { form: 'address', key: 'addressSearch', name: 'Adresse' }
        )

        this.FIELDS = {
            AVATAR, 
            PROFIL_COMPLETED, 
            LATTITUDE,
            LONGITUDE,
            SOCIAL_REASON,
            FUNCTION,
            SIRET,
            PHONE,
            ADDRESS,
            POSTAL_CODE,
            CITY,
            COUNTRY,
            ADDRESS_SEARCH
        }

        this.FIELDS_FORM0 = {
            AVATAR,
            PROFIL_COMPLETED,
            LATTITUDE,
            LONGITUDE
        }
        this.FIELDS_FORM1 = {
            SOCIAL_REASON,
            FUNCTION,
            SIRET,
            PHONE
        }
        this.FIELDS_FORM2 = {
            ADDRESS_SEARCH,
            ADDRESS,
            POSTAL_CODE,
            CITY,
            COUNTRY
        }
    }

    register(obj) {
        super.register(obj)
        
        this.declareFunction('onCancel')
        this.declareFunction('onSubmit')

        this.loadService(ServiceHelper.getData(AuthHelper.getEntityId()) || {})
        this.checkService()
        
        ErrorHelper.register('POST_IMAGE', this, this.handlePostImageError.bind(this))
        ErrorHelper.register('PUT_SERVICE', this, this.handlePutServiceError.bind(this))
        ErrorHelper.register('GET_SERVICE', this, this.handleGetServiceError.bind(this))
    }

    unregister() {
        ErrorHelper.unregister(this)
    }


    // Store notification //
    // --------------------------------------------------------------------------------

    handlePostImageError() {
        let errorData = ErrorHelper.getData('POST_IMAGE')
        if (errorData) {
            this.setState({
                errorShow: true,
                errorMsg: [ 'Une erreur est survenue pendant la mise à jour de votre photo' ]
            })
        }
    }

    handleGetServiceError() {
        let errorData = ErrorHelper.getData('GET_SERVICE')
        if (errorData) {
            this.setState({
                errorShow: true,
                errorMsg: [ 'Une erreur est survenue pendant la récupération de vos informations' ]
            })
        }
    }

    handlePutServiceError() {
        let errorData = ErrorHelper.getData('PUT_SERVICE')
        if (errorData) {
            this.setState({
                errorShow: true,
                errorMsg: [ 'Une erreur est survenue pendant la mise à jour de vos informations' ]
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
            case this.FIELDS.AVATAR:
                this.obj.state.avatarFile = value
                break
            case this.FIELDS.PHONE:
            case this.FIELDS.SIRET:
                if (state.message === field.validator.ERRORS.MAX_LENGTH_EXCEEDED) {
                    return
                }
                break
            }

            this.obj.state.dirty = true
            this.obj.state[field.key] = newValue

            // Check data consistency
            this.checkService()
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
            let promises = []
            if (this.getState('avatarFile')) {
                promises.push(ImageHelper.postImage({
                    name: 'img',
                    file: this.getState('avatarFile')
                }))
            }
            return Promise.all(promises)
        }.bind(this)).
        then(function (oResult) {
            let service = this.buildService()
            if (this.getState('avatarFile')) {
                service.avatar = oResult[0].id
            }
            return ServiceHelper.putService(service)
        }.bind(this)).
        then(function () {
            return ServiceHelper.getService(AuthHelper.getEntityId())
        }).
        then(function () {
            setTimeout(AppHelper.setBusy, 200)
            return AppHelper.navigateBack()
        }).
        catch(function (error) {
            setTimeout(AppHelper.setBusy, 200)
            console.error('Service update error')
            console.error(error)
        })
    }

    // Internal methods //
    // --------------------------------------------------------------------------------

    buildService() {
        let service = ServiceHelper.getData(AuthHelper.getEntityId())
        for (let f in this.FIELDS) {
            let field = this.FIELDS[f]
            if (ServiceFields.get(field.key)) {
                service[field.key] = this.getState(field.key)
            }
        }
        return service
    }

    loadService(service) {
        for (let f in this.FIELDS) {
            let field = this.FIELDS[f]
            let value = service[field.key] || field.defaultValue
            this.obj.state[field.key] = field.formatter ? field.formatter(value) : value
        }
        if (service.avatar) {
            this.obj.state.avatarSrc = ImageHelper.getData(this.obj.state.avatar)
        }
    }

    checkService() {
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
            const messageId = `SERVICE_FIELD_ERROR_${id}_${state.message}`
            const message =  I18NHelper.get(messageId)
            if (message && this.obj.state.warningMsg.indexOf(message) === -1) {
                this.obj.state.warningMsg.push(message)
                this.obj.state.warningShow = true
            }
        }
    }
}

let ServiceInfosEditSocietyObj = new ServiceInfosEditSocietyData()
export default ServiceInfosEditSocietyObj
