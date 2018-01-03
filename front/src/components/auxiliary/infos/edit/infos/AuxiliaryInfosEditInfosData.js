import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import ImageHelper from 'helpers/ImageHelper'
import AuxiliaryHelper from 'helpers/AuxiliaryHelper'
import ErrorHelper from 'helpers/ErrorHelper'
import { BaseData, Nationality } from 'ap-react-bootstrap'

import AuxiliaryFields from 'utils/entities/AuxiliaryFields'
import Diploma from 'utils/constants/Diploma'

import AuxiliaryStatusUtils from 'utils-lib/entities/AuxiliaryStatusUtils'
import BooleanUtils from 'utils-lib/BooleanUtils'
import DiplomaUtils from 'utils-lib/entities/DiplomaUtils'
import NationalityUtils from 'utils-lib/geo/NationalityUtils'

class AuxiliaryInfosEditInfosData extends BaseData {

	constructor() {
		super(...arguments)

		this.FIELDS_FORM0 = [
			AuxiliaryFields.AVATAR,
			AuxiliaryFields.PROFIL_COMPLETED,
			AuxiliaryFields.LATTITUDE,
			AuxiliaryFields.LONGITUDE
		]
		this.FIELDS_FORM1 = [
			Object.assign({ defaultValue: 'Mme', form: 'select' }, AuxiliaryFields.CIVILITY),
			Object.assign({ defaultValue: '', form: 'input' }, AuxiliaryFields.FIRST_NAME),
			Object.assign({ defaultValue: '', form: 'input' }, AuxiliaryFields.LAST_NAME),
			Object.assign({ defaultValue: '', form: 'input' }, AuxiliaryFields.PHONE),
			Object.assign({ defaultValue: 'FR', form: 'select', values: NationalityUtils.getNationalities() }, AuxiliaryFields.NATIONALITY),
			Object.assign({ defaultValue: '', form: 'input' }, AuxiliaryFields.BIRTH_CITY),
			Object.assign({ defaultValue: '', form: 'input' }, AuxiliaryFields.BIRTH_COUNTRY),
			Object.assign({ defaultValue: [1980,1,1], form: 'date' }, AuxiliaryFields.BIRTH_DATE)
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
		this.FIELDS_FORM3 = [
			Object.assign({ defaultValue: '', form: 'textarea' }, AuxiliaryFields.DESCRIPTION),
			Object.assign({ defaultValue: 'true', form: 'select' }, AuxiliaryFields.IS_ENTREPRENEUR, { values: AuxiliaryStatusUtils.getValues() }),
			Object.assign({ defaultValue: [], form: 'selectmulti' }, AuxiliaryFields.DIPLOMA, { values: DiplomaUtils.getDiplomas() })
		]

		this.FIELDS = this.FIELDS_FORM0.concat(this.FIELDS_FORM1).concat(this.FIELDS_FORM2).concat(this.FIELDS_FORM3)
	}

	register(obj) {
		super.register(obj)
		
		this.declareFunction('onCancel')

		this.declareFunction('onChangeAvatar')
		this.declareFunction('onChangeDiploma')

		this.declareFunction('onSubmit')

		let auxiliary = AuxiliaryHelper.getData(AuthHelper.getEntityId()) || {}

		for (let i = 0; i < this.FIELDS.length; i++) {
			let field = this.FIELDS[i]
			let value = auxiliary[field.key] || field.defaultValue
			this.obj.state[field.key] = field.formatter ? field.formatter(value) : value
		}
		if (auxiliary.avatar) {
			this.obj.state.avatarSrc = ImageHelper.getData(this.obj.state.avatar)
		}
		if (auxiliary.diplomaImage) {
			this.obj.state.diplomaImageSrc = ImageHelper.getData(this.obj.state.diplomaImage)
		}

		ErrorHelper.register('PUT_AUXILIARY', this, this.handlePutAuxiliaryError.bind(this))
	}

	unregister() {
		ErrorHelper.unregister(this)
	}

	// Store notification //
	// --------------------------------------------------------------------------------

	handlePutAuxiliaryError() {
		console.log(ErrorHelper.getData('PUT_AUXILIARY'))
	}


	// View callbacks //
	// --------------------------------------------------------------------------------

	onChange(id) {
		this.obj.state.dirty = true
		this.obj.state.errorJustHappened = false
		if (id === 'addressSearch') {
			this.onChangeAddress(...arguments)
		} else if (id === 'diploma') {
			let isCurrentNone = this.obj.state.diploma.length === 1 && this.obj.state.diploma.indexOf(Diploma.DIPLOMA_NONE.key) !== -1
			let isCurrentStudy = this.obj.state.diploma.length === 1 && this.obj.state.diploma.indexOf(Diploma.DIPLOMA_STUDY.key) !== -1
			let isNewNone = arguments.length > 2 && arguments[2].indexOf(Diploma.DIPLOMA_NONE.key) !== -1
			let isNewStudy = arguments.length > 2 && arguments[2].indexOf(Diploma.DIPLOMA_STUDY.key) !== -1
			let args = [].concat(arguments[2])

			if (isCurrentNone && arguments[2].length > 1) {
				args.splice(args.indexOf(Diploma.DIPLOMA_NONE.key), 1)
			} else if (!isCurrentNone && isNewNone) {
				args = [Diploma.DIPLOMA_NONE.key]
			} else if (isCurrentStudy && arguments[2].length > 1) {
				args.splice(args.indexOf(Diploma.DIPLOMA_STUDY.key), 1)
			} else if (!isCurrentStudy && isNewStudy) {
				args = [Diploma.DIPLOMA_STUDY.key]
			}
			this.onChangeDirty(id, arguments[1], args)
		} else {
			this.onChangeDirty(...arguments)
		}
	}

	onChangeDirty(id, event, value) {
		this.obj.state[id] = value
		this.forceUpdate()
	}

	onChangeAddress(id, address) {
		this.obj.state.address = address.address
		this.obj.state.lattitude = address.lattitude
		this.obj.state.longitude = address.longitude
		this.obj.state.postalCode = address.postalCode
		this.obj.state.city = address.city
		this.obj.state.country = address.country
		this.forceUpdate()
	}

	onChangeAvatar(file) {
		this.obj.state.avatarFile = file
		this.obj.state.dirty = true
		this.forceUpdate()
	}

	onChangeDiploma(file) {
		this.obj.state.diplomaFile = file
		this.obj.state.dirty = true
		this.forceUpdate()
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
			setTimeout(AppHelper.setBusy, 200)
			return AppHelper.navigateBack()
		}).
		catch(function (error) {
			this.setState({
				errorJustHappened: true
			})
			setTimeout(AppHelper.setBusy, 200)
			console.error('Auxiliary update error')
			console.error(error)
		}.bind(this))
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
}
let AuxiliaryInfosEditInfosObj = new AuxiliaryInfosEditInfosData()
export default AuxiliaryInfosEditInfosObj
