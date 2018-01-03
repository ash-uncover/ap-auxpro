import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import AuxiliaryHelper from 'helpers/AuxiliaryHelper'
import GeozoneHelper from 'helpers/GeozoneHelper'
import { BaseData, Nationality } from 'ap-react-bootstrap'

import Civility from 'utils/constants/Civility'

import AuxiliaryFields from 'utils/entities/AuxiliaryFields'

import NationalityUtils from 'utils-lib/geo/NationalityUtils'

class AuxiliaryInitialData extends BaseData {

	constructor() {
		super(...arguments)

		this.FIELDS_FORM0 = [
			AuxiliaryFields.LATTITUDE,
			AuxiliaryFields.LONGITUDE
		]
		this.FIELDS_FORM1 = [
			Object.assign({ defaultValue: Civility.MME.key, form: 'select' }, AuxiliaryFields.CIVILITY),
			Object.assign({ defaultValue: '', form: 'input' }, AuxiliaryFields.FIRST_NAME),
			Object.assign({ defaultValue: '', form: 'input' }, AuxiliaryFields.LAST_NAME),
			Object.assign({ defaultValue: '', form: 'input' }, AuxiliaryFields.PHONE),
			Object.assign({ defaultValue: Nationality.FR.key, form: 'select', values: NationalityUtils.getNationalities() }, AuxiliaryFields.NATIONALITY),
			Object.assign({ defaultValue: [1980,1,1], form: 'date' }, AuxiliaryFields.BIRTH_DATE),
			Object.assign({ defaultValue: '', form: 'input' }, AuxiliaryFields.BIRTH_CITY),
			Object.assign({ defaultValue: '', form: 'input' }, AuxiliaryFields.BIRTH_COUNTRY)
		]

		this.FIELDS_FORM2 = [
			{ form: 'address', key: 'addressSearch', name: 'Adresse' },
			Object.assign({ defaultValue: '', form: 'static' }, AuxiliaryFields.ADDRESS),
			Object.assign({ defaultValue: '', form: 'static' }, AuxiliaryFields.POSTAL_CODE),
			Object.assign({ defaultValue: '', form: 'static' }, AuxiliaryFields.CITY),
			Object.assign({ defaultValue: '', form: 'static' }, AuxiliaryFields.COUNTRY),
			Object.assign({ defaultValue: '', form: 'input' }, AuxiliaryFields.SOCIAL_NUMBER),
			Object.assign({ defaultValue: '', form: 'input' }, AuxiliaryFields.ID_CARD_NUMBER)
		]

		this.FIELDS = this.FIELDS_FORM0.concat(this.FIELDS_FORM1).concat(this.FIELDS_FORM2)
	}

	register(obj) {
		super.register(obj)
		
		this.declareFunction('onSubmit')

		let auxiliary = AuxiliaryHelper.getData(AuthHelper.getEntityId())
		
		for (let i = 0; i < this.FIELDS.length; i++) {
			let field = this.FIELDS[i]
			let value = auxiliary[field.key] || field.defaultValue
			this.obj.state[field.key] = field.formatter ? field.formatter(value) : value
		}
		this.obj.state.dirty = true
		this.obj.state.auxiliaryValid = this.checkValid()
	}



	// View callbacks //
	// --------------------------------------------------------------------------------

	onChange(id) {
		if (id === 'addressSearch') {
			this.onChangeAddress(...arguments)
		} else {
			this.onChangeDirty(...arguments)
		}
	}

	onChangeDirty(id, event, value) {
		this.obj.state[id] = value
		this.obj.state.dirty = true
		this.obj.state.auxiliaryValid = this.checkValid()
		this.forceUpdate()
	}

	onChangeAddress(id, address) {
		this.obj.state.address = address.address
		this.obj.state.lattitude = address.lattitude
		this.obj.state.longitude = address.longitude
		this.obj.state.postalCode = address.postalCode
		this.obj.state.city = address.city
		this.obj.state.country = address.country
		this.obj.state.dirty = true
		this.obj.state.auxiliaryValid = this.checkValid()
		this.forceUpdate()
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
		for (let i = 0 ; i < this.FIELDS.length ; i++) {
			let field = this.FIELDS[i]
			if (AuxiliaryFields.get(field.key)) {
				auxiliary[field.key] = this.getState(field.key)
			}
		}
		return auxiliary
	}

	checkValid() {
		for (let i = 0 ; i < this.FIELDS.length ; i++) {
			let field = this.FIELDS[i]
			if (field.validator && field.validator.getState(this.getState(field.key)) === 'error') {
				return false
			}
		}
		return true
	}

}
let AuxiliaryInitialObj = new AuxiliaryInitialData()
export default AuxiliaryInitialObj
