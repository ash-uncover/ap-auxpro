import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import ImageHelper from 'helpers/ImageHelper'
import AuxiliaryHelper from 'helpers/AuxiliaryHelper'
import { BaseData, Formatters, Nationality } from 'ap-react-bootstrap'

import AuxiliaryFields from 'utils/entities/AuxiliaryFields'

import BooleanUtils from 'utils-lib/BooleanUtils'
import NationalityUtils from 'utils-lib/geo/NationalityUtils'

let FIELDS_FORM0 = [
	AuxiliaryFields.AVATAR,
	AuxiliaryFields.DIPLOMA_IMAGE,
	AuxiliaryFields.LATTITUDE,
	AuxiliaryFields.LONGITUDE
]
let FIELDS_FORM1 = [
	Object.assign({ defaultValue: 'Mme', form: 'select' }, AuxiliaryFields.CIVILITY),
	Object.assign({ defaultValue: '', form: 'input' }, AuxiliaryFields.FIRST_NAME),
	Object.assign({ defaultValue: '', form: 'input' }, AuxiliaryFields.LAST_NAME),
	Object.assign({ defaultValue: '', form: 'input' }, AuxiliaryFields.PHONE),
	Object.assign({ defaultValue: '', form: 'input' }, AuxiliaryFields.SOCIAL_NUMBER),
	Object.assign({ defaultValue: '', form: 'input' }, AuxiliaryFields.ID_CARD_NUMBER)
]
let FIELDS_FORM2 = [
	{ form: 'address', key: 'addressSearch', name: 'Adresse' },
	Object.assign({ defaultValue: '', form: 'static' }, AuxiliaryFields.ADDRESS),
	Object.assign({ defaultValue: '', form: 'static' }, AuxiliaryFields.POSTAL_CODE),
	Object.assign({ defaultValue: '', form: 'static' }, AuxiliaryFields.CITY),
	Object.assign({ defaultValue: '', form: 'static' }, AuxiliaryFields.COUNTRY),
	Object.assign({ defaultValue: 'FR', form: 'select', values: NationalityUtils.getNationalities() }, AuxiliaryFields.NATIONALITY),
	Object.assign({ defaultValue: '', form: 'input' }, AuxiliaryFields.BIRTH_CITY),
	Object.assign({ defaultValue: '', form: 'input' }, AuxiliaryFields.BIRTH_COUNTRY),
	Object.assign({ defaultValue: [1950,1,1], form: 'date' }, AuxiliaryFields.BIRTH_DATE)	
]
let FIELDS_FORM3 = [
	Object.assign({ defaultValue: '', form: 'textarea' }, AuxiliaryFields.DESCRIPTION),
	Object.assign({ form: 'select', values: BooleanUtils.getBooleans() }, AuxiliaryFields.IS_ENTREPRENEUR),
	Object.assign({ defaultValue: '', form: 'input' }, AuxiliaryFields.DIPLOMA)
]

let FIELDS = FIELDS_FORM0.concat(FIELDS_FORM1).concat(FIELDS_FORM2).concat(FIELDS_FORM3)

class AuxiliaryInfosEditInfosData extends BaseData {

	register(obj) {
		super.register(obj)
		
		this.declareFunction('onChangeDirty')
		this.declareFunction('onChangeAddress')
		this.declareFunction('onChangeAvatar')
		this.declareFunction('onChangeDiploma')

		this.declareFunction('onCancel')
		this.declareFunction('onSubmit')

		this.obj.state = {}

		this._onAuxiliaryUpdate()
	}

	unregister() {
	}


	// Store notifications //
	// --------------------------------------------------------------------------------

	onAuxiliaryUpdate() {
		this._onAuxiliaryUpdate()
		this.setState({})
	}

	_onAuxiliaryUpdate() {
		let auxiliary = AuxiliaryHelper.getData(AuthHelper.getEntityId()) || {}
		for (let i = 0; i < FIELDS.length; i++) {
			let field = FIELDS[i]
			let value = auxiliary[field.key]
			if (field.formatter) {
				this.obj.state[field.key] = field.formatter(auxiliary[field.key])
			} else {
				this.obj.state[field.key] = auxiliary[field.key]
			}
		}
		if (auxiliary.avatar) {
			this.obj.state.avatarSrc = ImageHelper.getData(this.obj.state.avatar)
		}
		if (auxiliary.diplomaImage) {
			this.obj.state.diplomaImageSrc = ImageHelper.getData(this.obj.state.diplomaImage)
		}
	}


	// View callbacks //
	// --------------------------------------------------------------------------------

	onChangeDirty(id, event, value) {
		console.log(id)
		console.log(value)
		let data = {
			dirty: true,
			auxiliaryValid: true
		}
		data[id] = value
		this.setState(data)
	}

	onChangeAddress(address) {
		let data = {
			address: address.address,
			lattitude: address.lattitude,
			longitude: address.longitude,
			postalCode: address.postalCode,
			city: address.city,
			country: address.country,
			dirty: true,
			auxiliaryValid: true
		}
		this.setState(data)
	}

	onChangeAvatar(file) {
		let data = {
			dirty: true,
			avatarFile: file
		}
		this.setState(data)
	}

	onChangeDiploma(file) {
		let data = {
			dirty: true,
			diplomaFile: file
		}
		this.setState(data)
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
					name: 'avatar',
					file: this.getState('avatarFile')
				}))
			}
			if (this.getState('diplomaFile')) {
				promises.push(ImageHelper.postImage({
					name: 'diploma',
					file: this.getState('diplomaFile')
				}))
			}
			return Promise.all(promises)
		}.bind(this)).
		then(function (oResult) {
			let auxiliary = this.buildAuxiliary()
			if (this.getState('avatarFile')) {
				auxiliary.avatar = oResult[0].id
			}
			if (this.getState('diplomaFile')) {
				auxiliary.diplomaImage = (oResult[1] || oResult[0]).id
			}
			return AuxiliaryHelper.putAuxiliary(auxiliary)
		}.bind(this)).
		then(function () {
			return AuxiliaryHelper.getAuxiliary(AuthHelper.getEntityId())
		}).
		then(function () {
			AppHelper.navigateBack()
			setTimeout(AppHelper.setBusy, 200)
		}).
		catch(function (error) {
			setTimeout(AppHelper.setBusy, 200)
			console.error('Auxiliary update error')
			console.error(error)
		})
	}

	buildAuxiliary() {
		let auxiliary = AuxiliaryHelper.getData(AuthHelper.getEntityId())
		for (let i = 0 ; i < FIELDS.length ; i++) {
			let field = FIELDS[i]
			if (AuxiliaryFields.get(field.key)) {
				auxiliary[field.key] = this.getState(field.key)
			}
		}
		return auxiliary
	}

}
let AuxiliaryInfosEditInfosObj = new AuxiliaryInfosEditInfosData()
AuxiliaryInfosEditInfosObj.FIELDS = FIELDS
AuxiliaryInfosEditInfosObj.FIELDS_FORM0 = FIELDS_FORM0
AuxiliaryInfosEditInfosObj.FIELDS_FORM1 = FIELDS_FORM1
AuxiliaryInfosEditInfosObj.FIELDS_FORM2 = FIELDS_FORM2
AuxiliaryInfosEditInfosObj.FIELDS_FORM3 = FIELDS_FORM3
export default AuxiliaryInfosEditInfosObj
