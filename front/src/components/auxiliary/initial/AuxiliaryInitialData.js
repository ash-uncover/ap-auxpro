import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import AuxiliaryHelper from 'helpers/AuxiliaryHelper'
import GeozoneHelper from 'helpers/GeozoneHelper'
import { BaseData, Nationality } from 'ap-react-bootstrap'

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

		this.FIELDS_FORM0 = [
			AuxiliaryFields.LATTITUDE,
			AuxiliaryFields.LONGITUDE
		]
		this.FIELDS_FORM1 = [
			Object.assign({ defaultValue: Civility.MME.key, form: 'select', name: AuxiliaryUtils.getFieldName(AuxiliaryFields.CIVILITY) }, AuxiliaryFields.CIVILITY),
			Object.assign({ defaultValue: '', form: 'input', name: AuxiliaryUtils.getFieldName(AuxiliaryFields.FIRST_NAME) }, AuxiliaryFields.FIRST_NAME),
			Object.assign({ defaultValue: '', form: 'input', name: AuxiliaryUtils.getFieldName(AuxiliaryFields.LAST_NAME) }, AuxiliaryFields.LAST_NAME),
			Object.assign({ defaultValue: '', form: 'input', name: AuxiliaryUtils.getFieldName(AuxiliaryFields.PHONE) }, AuxiliaryFields.PHONE),
			Object.assign({ defaultValue: Nationality.FR.key, form: 'select', values: NationalityUtils.getNationalities(), name: AuxiliaryUtils.getFieldName(AuxiliaryFields.NATIONALITY) }, AuxiliaryFields.NATIONALITY),
			Object.assign({ defaultValue: [1980,1,1], form: 'date', name: AuxiliaryUtils.getFieldName(AuxiliaryFields.BIRTH_DATE) }, AuxiliaryFields.BIRTH_DATE),
			Object.assign({ defaultValue: '', form: 'input', name: AuxiliaryUtils.getFieldName(AuxiliaryFields.BIRTH_CITY) }, AuxiliaryFields.BIRTH_CITY),
			Object.assign({ defaultValue: '', form: 'input', name: AuxiliaryUtils.getFieldName(AuxiliaryFields.BIRTH_COUNTRY) }, AuxiliaryFields.BIRTH_COUNTRY)
		]

		this.FIELDS_FORM2 = [
			{ form: 'address', key: 'addressSearch', name: 'Adresse' },
			Object.assign({ defaultValue: '', form: 'static', name: AuxiliaryUtils.getFieldName(AuxiliaryFields.ADDRESS) }, AuxiliaryFields.ADDRESS),
			Object.assign({ defaultValue: '', form: 'static', name: AuxiliaryUtils.getFieldName(AuxiliaryFields.POSTAL_CODE) }, AuxiliaryFields.POSTAL_CODE),
			Object.assign({ defaultValue: '', form: 'static', name: AuxiliaryUtils.getFieldName(AuxiliaryFields.CITY) }, AuxiliaryFields.CITY),
			Object.assign({ defaultValue: '', form: 'static', name: AuxiliaryUtils.getFieldName(AuxiliaryFields.COUNTRY) }, AuxiliaryFields.COUNTRY),
			Object.assign({ defaultValue: '', form: 'input', name: AuxiliaryUtils.getFieldName(AuxiliaryFields.SOCIAL_NUMBER) }, AuxiliaryFields.SOCIAL_NUMBER),
			Object.assign({ defaultValue: 'true', form: 'select', name: AuxiliaryUtils.getFieldName(AuxiliaryFields.IS_ENTREPRENEUR) }, AuxiliaryFields.IS_ENTREPRENEUR, { values: AuxiliaryStatusUtils.getValues() })
			
		]
		this.FIELDS_FORM3 = [
			Object.assign({ defaultValue: [], form: 'selectmulti', name: AuxiliaryUtils.getFieldName(AuxiliaryFields.DIPLOMA) }, AuxiliaryFields.DIPLOMA, { values: DiplomaUtils.getDiplomas() })
		]

		this.FIELDS = this.FIELDS_FORM0.concat(this.FIELDS_FORM1).concat(this.FIELDS_FORM2).concat(this.FIELDS_FORM3)
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
