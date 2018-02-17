import { BaseData, Utils } from 'ap-react-bootstrap'
// helpers
import AppHelper from 'helpers/AppHelper'
import AuxiliaryHelper from 'helpers/AuxiliaryHelper'
import InterventionHelper from 'helpers/InterventionHelper'
import ImageHelper from 'helpers/ImageHelper'
// utils
import Skills from 'utils/constants/Skills'
// utils-lib
import AuxiliaryUtils from 'utils-lib/entities/AuxiliaryUtils'
import InterventionUtils from 'utils-lib/entities/InterventionUtils'

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
		let hasIntervention = false
		console.log(InterventionHelper.getData())
		Utils.forEach(InterventionHelper.getData(), function (intervention) {
			if (InterventionUtils.isActive(intervention) && intervention.auxiliaryId === this.auxiliaryId) {
				hasIntervention = true
			}
		}.bind(this))
		let auxiliary = AuxiliaryHelper.getData(this.auxiliaryId)
		if (auxiliary) {
			this.obj.state.avatar = auxiliary.avatar
			this.obj.state.name = AuxiliaryUtils.getFullName(auxiliary)
			this.obj.state.address = (hasIntervention ? auxiliary.address + ' ' : '') + (auxiliary.postalCode + ' ' + auxiliary.city)
			this.obj.state.email = hasIntervention ? auxiliary.email : null
			this.obj.state.phone = hasIntervention ? auxiliary.phone : null
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
