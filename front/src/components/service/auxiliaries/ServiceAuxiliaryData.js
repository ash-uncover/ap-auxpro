import { BaseData, Utils } from 'ap-react-bootstrap'
// helpers
import AppHelper from 'helpers/AppHelper'
import AuxiliaryHelper from 'helpers/AuxiliaryHelper'
import InterventionHelper from 'helpers/InterventionHelper'
import ImageHelper from 'helpers/ImageHelper'
import OfferHelper from 'helpers/OfferHelper'
// utils
import OfferStatusAux from 'utils/constants/OfferStatusAux'
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
        this.onAuxiliaryUpdate = this._onAuxiliaryUpdate.bind(this)
		AuxiliaryHelper.register(auxiliaryId, this.onAuxiliaryUpdate)
	}

	unregister() {
		AuxiliaryHelper.unregister(auxiliaryId, this.onAuxiliaryUpdate)
	}

	onAuxiliaryUpdate() {
		this._onAuxiliaryUpdate()
		this.forceUpdate()
	}

	_onAuxiliaryUpdate() {
		let showDetails = false
		Utils.forEach(InterventionHelper.getData(), function (intervention) {
			if (InterventionUtils.isActive(intervention) && intervention.auxiliaryId === this.auxiliaryId) {
				showDetails = true
			}
		}.bind(this))
		if (!showDetails) {
			Utils.forEach(OfferHelper.getData(), function (offer) {
				let intervention = InterventionHelper.getData(offer.interventionId)
				if (offer.auxiliaryId === this.auxiliaryId && InterventionUtils.isCurrent(intervention) && offer.auxStatus === OfferStatusAux.ACCEPTED.key) {
					showDetails = true
				}
			}.bind(this))
		}
		let auxiliary = AuxiliaryHelper.getData(this.auxiliaryId)
		if (auxiliary) {
			this.obj.state.avatar = auxiliary.avatar
			this.obj.state.name = AuxiliaryUtils.getFullName(auxiliary)
			this.obj.state.address = (showDetails ? auxiliary.address + ' ' : '') + (auxiliary.postalCode + ' ' + auxiliary.city)
			this.obj.state.email = showDetails ? auxiliary.email : null
			this.obj.state.phone = showDetails ? auxiliary.phone : null
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
