import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import I18NHelper from 'helpers/I18NHelper'
import GeozoneHelper from 'helpers/GeozoneHelper'

import { STATES } from 'ap-validators'
import { BaseData } from 'ap-react-bootstrap'
import { Dispatcher } from 'ap-flux'

import GeozoneType from 'utils/constants/GeozoneType'
import GeozoneFields from 'utils/entities/GeozoneFields'

import GeozoneUtils from 'utils-lib/entities/GeozoneUtils'
import GeozoneTypeUtils from 'utils-lib/entities/GeozoneTypeUtils'

class AuxiliaryZoneEditData extends BaseData {

    constructor() {
        super(...arguments)

        this.checkField = this._checkField.bind(this)
        this.buildGeozoneField = this._buildGeozoneField.bind(this)

        this.MODES = {
            EDIT: 'EDIT',
            CREATE: 'CREATE'
        }

        const { LATTITUDE, LONGITUDE } = GeozoneFields

        const TYPE = Object.assign(
            { defaultValue: GeozoneType.CITY.key, form: 'select', name: GeozoneUtils.getFieldName(GeozoneFields.TYPE) }, 
            GeozoneFields.TYPE,
            { values: GeozoneType.VALUES.map(this.getGeozoneType) }
        )
        const ADDRESS_SEARCH = { form: 'address', key: 'addressSearch', name: 'Adresse' }
        const ADDRESS = Object.assign(
            { defaultValue: '', form: 'static', name: GeozoneUtils.getFieldName(GeozoneFields.ADDRESS) }, 
            GeozoneFields.ADDRESS
        )
        const CITY = Object.assign(
            { defaultValue: '', form: 'static', name: GeozoneUtils.getFieldName(GeozoneFields.CITY) }, 
            GeozoneFields.CITY
        )
        const POSTAL_CODE = Object.assign(
            { defaultValue: '', form: 'static', name: GeozoneUtils.getFieldName(GeozoneFields.POSTAL_CODE) }, 
            GeozoneFields.POSTAL_CODE
        )
        const RADIUS = Object.assign(
            { defaultValue: '', form: 'input', name: GeozoneUtils.getFieldName(GeozoneFields.RADIUS) }, 
            GeozoneFields.RADIUS
        )

        this.FIELDS = {
            LATTITUDE,
            LONGITUDE,
            TYPE,
            ADDRESS_SEARCH,
            ADDRESS,
            CITY,
            POSTAL_CODE,
            RADIUS
        }
        this.FIELDS_PROXY = {
            LATTITUDE,
            LONGITUDE,
            TYPE,
            ADDRESS,
            CITY,
            POSTAL_CODE,
            RADIUS
        }
        this.FIELDS_CITY = {
            LATTITUDE,
            LONGITUDE,
            TYPE,
            CITY,
            POSTAL_CODE
        }
        this.FIELDS_FORM1 = {
            TYPE,
            ADDRESS_SEARCH,
            ADDRESS,
            CITY,
            POSTAL_CODE,
            RADIUS
        }
        this.FIELDS_FORM2 = {
            TYPE,
            ADDRESS_SEARCH,
            POSTAL_CODE,
            CITY
        }
    }

    register(obj, geozoneId) {
        super.register(obj)

        this.geozoneId = geozoneId

        this.declareFunction('onCancel')
        this.declareFunction('onSubmit')

        this.setState({
            mode: geozoneId !== 'new' ? this.MODES.EDIT : this.MODES.CREATE
        })

        // Initial data
        this.loadGeozone(GeozoneHelper.getData(this.geozoneId))
        
    }

    // Data building //
    // --------------------------------------------------------------------------------



    // View Callbacks //
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
            }

            this.obj.state.dirty = true
            this.obj.state[field.key] = newValue

            // Check data consistency
            this.checkGeozone()
            const geozone = this.buildGeozone()
            if (this.obj.props.onGeozoneUpdate && !this.getState('warningShow')) {
                this.obj.props.onGeozoneUpdate(geozone)
            }
            // Update component
            this.forceUpdate()

        } else {
            console.error('Unknown field: ' + id)
        }   
    }

    onCancel() {
        if (this.obj.props.onCancel) {
            this.obj.props.onCancel()
        }
    }

    onSubmit() {
        let geozone = this.buildGeozone()
        AppHelper.setBusy(true).
        then(function() {
            if (this.getState('mode') === this.MODES.CREATE) {
                return GeozoneHelper.postGeozone(geozone)
            } else {
                return GeozoneHelper.putGeozone(geozone)
            }
        }.bind(this)).
        then(function (result) {
            if (this.getState('mode') === this.MODES.CREATE) {
                return GeozoneHelper.getGeozone(result.id)
            } else {
                return GeozoneHelper.getGeozone(geozone.id)
            }
        }.bind(this)).
        then(function () {
            this.onCancel()
            setTimeout(AppHelper.setBusy, 200)
        }.bind(this)).
        catch(function (error) {
            setTimeout(AppHelper.setBusy, 200)
            console.error('Geozone submit error')
            console.error(error)
        })
    }

    handleGetReversegeozone(result, param) {
        let address = {
            lattitude: param.lattitude,
            longitude: param.longitude
        }
        if (result[0].address_components.length === 7) {
            address.address = result[0].address_components[0].short_name + ' ' + result[0].address_components[1].short_name
            address.city = result[0].address_components[2].short_name
            address.postalCode = result[0].address_components[6].short_name
        } else {
            address.address = result[0].address_components[0].short_name
            address.city = result[0].address_components[2].short_name
            address.postalCode = result[0].address_components[5].short_name
        }
        this.onChangeAddress(address)
    }

    // Internal methods //
    // --------------------------------------------------------------------------------

    getGeozoneType(value) {
        return {
            key: value.key,
            value: GeozoneTypeUtils.getName(value.key)
        }
    }

    loadGeozone(geozone) {
        Object.keys(this.FIELDS).map(key => {
            const field = this.FIELDS[key]
            const value = geozone && geozone[field.key]
            this.obj.state[field.key] = value || field.defaultValue
            if (field.defaultValue && this.obj.state[field.key] === field.defaultValue && this.obj.state.mode === this.MODES.CREATE) {
                this.obj.state[field.key + 'Default'] = 'warning'
            }
        })
    }

    buildGeozone() {
        let geozone = (this.getState('mode') === this.MODES.CREATE) ?
            { auxiliaryId: AuthHelper.getEntityId() } :
            Object.assign({}, GeozoneHelper.getData(this.geozoneId))
        
        const type = this.getState('type')
        if (type === GeozoneType.CITY.key) {
            Object.keys(this.FIELDS_CITY).reduce(this.buildGeozoneField, geozone)
        } else {
            Object.keys(this.FIELDS_PROXY).reduce(this.buildGeozoneField, geozone)
        }

        console.log("here'")
        console.log(geozone)

        return geozone
    }
    _buildGeozoneField(geozone, id) {
        console.log(id)
        let field = this.FIELDS[id]
        if (GeozoneFields.get(field.key)) {
            geozone[field.key] = this.getState(field.key)
        }
        return geozone
    }

    checkGeozone() {
        this.obj.state.errorShow = false
        this.obj.state.errorMsg = []
        this.obj.state.warningShow = false
        this.obj.state.warningMsg = []
        // Fields individual status
        const type = this.getState('type')
        if (type === GeozoneType.CITY.key) {
            Object.keys(this.FIELDS_CITY).forEach(this.checkField)
        } else {
            Object.keys(this.FIELDS_PROXY).forEach(this.checkField) 
        }
    }
    _checkField(id) {
        const field = this.FIELDS[id]
        const value = this.getState(field.key)
        const state = (field.validator && field.validator.VALIDATOR.check(value)) || {}
        this.obj.state[field.key + 'State'] = state.state
        this.obj.state[field.key + 'Message'] = state.message
        
        if (state.state === STATES.ERROR) {
            const messageId = `GEOZONE_FIELD_ERROR_${id}_${state.message}`
            const message =  I18NHelper.get(messageId)
            if (message && this.obj.state.warningMsg.indexOf(message) === -1) {
                this.obj.state.warningMsg.push(message)
                this.obj.state.warningShow = true
            }
        }
    }
}
let AuxiliaryZoneEditObj = new AuxiliaryZoneEditData()
Dispatcher.register('GET_REVERSE_GEOCODE', AuxiliaryZoneEditObj.handleGetReversegeozone.bind(AuxiliaryZoneEditObj));
export default AuxiliaryZoneEditObj

