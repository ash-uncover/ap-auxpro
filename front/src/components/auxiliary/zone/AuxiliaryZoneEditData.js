import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import GeozoneHelper from 'helpers/GeozoneHelper'

import { BaseData } from 'ap-react-bootstrap'
import { Dispatcher } from 'ap-flux'

import GeozoneType from 'utils/constants/GeozoneType'
import GeozoneFields from 'utils/entities/GeozoneFields'

import GeozoneUtils from 'utils-lib/entities/GeozoneUtils'
import GeozoneTypeUtils from 'utils-lib/entities/GeozoneTypeUtils'

class AuxiliaryZoneEditData extends BaseData {

	constructor() {
		super(...arguments)

		this.MODES = {
			EDIT: 'EDIT',
			CREATE: 'CREATE'
		}

		this.FIELDS_FORM0 = [
			GeozoneFields.LATTITUDE,
			GeozoneFields.LONGITUDE
		]

		this.FIELDS_FORM1 = [
			Object.assign(
				{ defaultValue: GeozoneType.CITY.key, form: 'select' }, 
				GeozoneFields.TYPE,
				{ values: GeozoneType.VALUES.map(this.getGeozoneType) }
			),
			{ form: 'address', key: 'addressSearch', name: 'Adresse' },
			Object.assign(
				{ defaultValue: '', form: 'static' }, 
				GeozoneFields.ADDRESS
			),
			Object.assign(
				{ defaultValue: '', form: 'static' }, 
				GeozoneFields.POSTAL_CODE
			),
			Object.assign(
				{ defaultValue: '', form: 'static' }, 
				GeozoneFields.CITY
			),
			Object.assign(
				{ defaultValue: '', form: 'input' }, 
				GeozoneFields.RADIUS
			)
		]

		this.FIELDS_FORM2 = [
			Object.assign(
				{ defaultValue: GeozoneType.CITY.key, form: 'select' }, 
				GeozoneFields.TYPE,
				{ values: GeozoneType.VALUES.map(this.getGeozoneType) }
			),
			{ form: 'address', key: 'addressSearch', name: 'Adresse' },
			Object.assign(
				{ defaultValue: '', form: 'static' }, 
				GeozoneFields.POSTAL_CODE
			),
			Object.assign(
				{ defaultValue: '', form: 'static' }, 
				GeozoneFields.CITY
			)
		]

		this.FIELDS = this.FIELDS_FORM0.concat(this.FIELDS_FORM1)
	}

	register(obj, geozoneId) {
		super.register(obj)

		this.geozoneId = geozoneId

		this.declareFunction('onChangeDirty')
		this.declareFunction('onChangeAddress')

		this.declareFunction('onCancel')
		this.declareFunction('onSubmit')

		this.obj.state = {
			mode: geozoneId !== 'new' ? this.MODES.EDIT : this.MODES.CREATE
		}

		// Initial data
		let geozone = GeozoneHelper.getData(this.geozoneId) || {}
		for (let i = 0; i < this.FIELDS.length; i++) {
			let field = this.FIELDS[i]
			let value = geozone && geozone[field.key]
			this.obj.state[field.key] = value || field.defaultValue
			if (field.defaultValue && this.obj.state[field.key] === field.defaultValue && this.obj.state.mode === this.MODES.CREATE) {
				this.obj.state[field.key + 'Default'] = 'warning'
			}
		}
	}

	// Data building //
	// --------------------------------------------------------------------------------



	// View Callbacks //
	// --------------------------------------------------------------------------------

	onChangeDirty(id, event, value) {
		this.obj.state.dirty = true
		this.obj.state[id] = value
		this.obj.state[id + 'Default'] = null
		let geozone = this.buildGeozone()
		this.obj.state.geozoneValid = GeozoneUtils.isValid(geozone)
		if (this.obj.props.onGeozoneUpdate) {
			this.obj.props.onGeozoneUpdate(geozone)
		}
		this.forceUpdate()
	}

	onChangeAddress(address) {
		this.obj.state.address = address.address
		this.obj.state.lattitude = address.lattitude
		this.obj.state.longitude = address.longitude
		this.obj.state.postalCode = address.postalCode
		this.obj.state.city = address.city
		this.obj.state.dirty = true
		let geozone = this.buildGeozone()
		this.obj.state.geozoneValid = GeozoneUtils.isValid(geozone)
		if (this.obj.props.onGeozoneUpdate) {
			this.obj.props.onGeozoneUpdate(geozone)
		}
		this.forceUpdate()
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
		this.obj.state.lattitude = param.lattitude
		this.obj.state.longitude = param.longitude
		if (result[0].address_components.length === 7) {
			this.obj.state.address = result[0].address_components[0].short_name + ' ' + result[0].address_components[1].short_name
			this.obj.state.city = result[0].address_components[2].short_name
			this.obj.state.postalCode = result[0].address_components[6].short_name
		} else {
			this.obj.state.address = result[0].address_components[0].short_name
			this.obj.state.city = result[0].address_components[2].short_name
			this.obj.state.postalCode = result[0].address_components[5].short_name
		}
		let geozone = this.buildGeozone()
		this.obj.state.geozoneValid = GeozoneUtils.isValid(geozone)
		if (this.obj.props.onGeozoneUpdate) {
			this.obj.props.onGeozoneUpdate(geozone)
		}
		this.forceUpdate()
	}

	// Internal methods //
	// --------------------------------------------------------------------------------

	getGeozoneType(value) {
		return {
			key: value.key,
			value: GeozoneTypeUtils.getName(value.key)
		}
	}

	buildGeozone() {
		let geozone = (this.getState('mode') === this.MODES.CREATE) ?
			{ auxiliaryId: AuthHelper.getEntityId() } :
			Object.assign({}, GeozoneHelper.getData(this.geozoneId))
			
		for (let i = 0 ; i < this.FIELDS.length ; i++) {
			let field = this.FIELDS[i]
			if (GeozoneFields.get(field.key)) {
				geozone[field.key] = this.getState(field.key)
			}
		}

		if (geozone.type === GeozoneType.CITY.key) {
			delete geozone.radius
		}

		return geozone
	}
}
let AuxiliaryZoneEditObj = new AuxiliaryZoneEditData()
Dispatcher.register('GET_REVERSE_GEOCODE', AuxiliaryZoneEditObj.handleGetReversegeozone.bind(AuxiliaryZoneEditObj));
export default AuxiliaryZoneEditObj

