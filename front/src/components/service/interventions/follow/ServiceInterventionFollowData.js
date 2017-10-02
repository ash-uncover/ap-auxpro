import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import InterventionHelper from 'helpers/InterventionHelper'
import MissionHelper from 'helpers/MissionHelper'
import OfferHelper from 'helpers/OfferHelper'

import { BaseData, MomentHelper } from 'ap-react-bootstrap'

import moment from 'moment'

import InterventionStatus from 'utils/constants/InterventionStatus'
import OfferStatusSad from 'utils/constants/OfferStatusSad'

import InterventionType from 'utils-lib/constants/InterventionType'
import InterventionUtils from 'utils-lib/entities/InterventionUtils'

class ServiceInterventionFollowData extends BaseData {

	register(obj, interventionId) {
		super.register(obj)

		this.interventionId = interventionId

		this.declareFunction('onCancel')
		this.declareFunction('onConfirm')

		let intervention = InterventionHelper.getData(interventionId)

		if (InterventionUtils.getType(intervention) !== InterventionType.OFFERED) {
			AppHelper.navigate('/service/interventions/' + interventionId)
			return
		}

		this.obj.state = {
			offers: InterventionUtils.getOffers(intervention)
		}
	}

	unregister() {
	}


	// View callback //
	// --------------------------------------------------------------------------------

	onCancel() {
		AppHelper.navigateBack()
	}
	onConfirm(offer) {
		let intervention = InterventionHelper.getData(this.interventionId)
		
		intervention.auxiliaryId = offer.auxiliaryId
		intervention.sadStatus = InterventionStatus.ONGOING.key
		intervention.sadStatusChanged = MomentHelper.toLocalDate(moment())

		offer.sadStatus = OfferStatusSad.CONFIRMED.key
		offer.sadStatusChanged = MomentHelper.toLocalDate(moment())

		AppHelper.setBusy(true).
		then(function () {
			return Promise.all([
				InterventionHelper.putIntervention(intervention),
				OfferHelper.putOffer(offer)
			])
		}).
		then(function () {
			return Promise.all([
				InterventionHelper.getServiceInterventions(AuthHelper.getEntityId()),
				OfferHelper.getServiceOffers(AuthHelper.getEntityId()),
				MissionHelper.getServiceMissions(AuthHelper.getEntityId())
			])
		}.bind(this)).
		then(function () {
			setTimeout(function () { AppHelper.setBusy() }, 200)
			AppHelper.navigateBack()
		}).
		catch(function (error) {
			setTimeout(function () { AppHelper.setBusy() }, 200)
			console.error('Error while confirming offer')
			console.error(error)
		})
	}
}
var ServiceInterventionFollowObj = new ServiceInterventionFollowData()
export default ServiceInterventionFollowObj
