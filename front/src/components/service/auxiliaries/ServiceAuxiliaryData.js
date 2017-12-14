import AppHelper from 'helpers/AppHelper'
import AuxiliaryHelper from 'helpers/AuxiliaryHelper'
import ImageHelper from 'helpers/ImageHelper'
import { BaseData } from 'ap-react-bootstrap'

import AuxiliaryUtils from 'utils-lib/entities/AuxiliaryUtils'

import Skills from 'utils/constants/Skills'

class ServiceAuxiliaryData extends BaseData {

	register(obj, auxiliaryId) {
		super.register(obj)

		this.declareFunction('onCancel')

		this.auxiliaryId = auxiliaryId

		this._onAuxiliaryUpdate()
		AuxiliaryHelper.register(auxiliaryId, this, this._onAuxiliaryUpdate.bind(this))
	}

	unregister() {
		AuxiliaryHelper.unregister(this)
	}

	onAuxiliaryUpdate() {
		this._onAuxiliaryUpdate()
		this.forceUpdate()
	}

	_onAuxiliaryUpdate() {
		let auxiliary = AuxiliaryHelper.getData(this.auxiliaryId)
		if (auxiliary) {
			this.obj.state.avatar = auxiliary.avatar
			this.obj.state.name = AuxiliaryUtils.getFullName(auxiliary)
			this.obj.state.address = auxiliary.postalCode + ' ' + auxiliary.city
			this.obj.state.email = auxiliary.email,
			this.obj.state.description = auxiliary.description
			this.obj.state.diploma = auxiliary.diploma || []
			for (let i = 0; i < Skills.VALUES.length; i++) {
				let skill = Skills.VALUES[i]
				this.obj.state[skill.key] = auxiliary[skill.key]
			}
		}
	}

	onCancel() {
		AppHelper.navigateBack()
	}

}
var ServiceAuxiliaryObj = new ServiceAuxiliaryData()
export default ServiceAuxiliaryObj
