import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import GeozoneHelper from 'helpers/GeozoneHelper'

import { BaseData } from 'ap-react-bootstrap'

import GeozoneType from 'utils/constants/GeozoneType'
import GeozoneFields from 'utils/entities/GeozoneFields'

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
			mode: geozoneId === 'new' ? this.MODES.EDIT : this.MODES.CREATE
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
		this.obj.state.geozoneValid = this.isGeozoneValid()
		this.forceUpdate()
	}

	onChangeAddress(address) {
		this.obj.state.address = address.address
		this.obj.state.lattitude = address.lattitude
		this.obj.state.longitude = address.longitude
		this.obj.state.postalCode = address.postalCode
		this.obj.state.city = address.city
		this.obj.state.dirty = true
		this.obj.state.geozoneValid = this.isGeozoneValid()
		this.forceUpdate()
	}

	onCancel() {
		if (this.obj.props.onCancel) {
			this.obj.props.onCancel()
		}
	}

	onSubmit() {
		this.onCancel()	
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

	isGeozoneValid() {
		let geozone = this.buildGeozone()
		console.log(geozone)
		return true
	}
}
let AuxiliaryZoneEditObj = new AuxiliaryZoneEditData()
export default AuxiliaryZoneEditObj

