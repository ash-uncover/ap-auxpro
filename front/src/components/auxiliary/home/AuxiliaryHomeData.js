import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import AuxiliaryHelper from 'helpers/AuxiliaryHelper'
import OfferHelper from 'helpers/OfferHelper'
import CustomerHelper from 'helpers/CustomerHelper'
import InterventionHelper from 'helpers/InterventionHelper'
import MissionHelper from 'helpers/MissionHelper'

import { BaseData, Utils, TextUtils } from 'ap-react-bootstrap'

import AccountType from 'utils/constants/AccountType'
import OfferStatusSad from 'utils/constants/OfferStatusSad'
import InterventionUtils from 'utils-lib/entities/InterventionUtils'

class AuxiliaryHomeData extends BaseData {

	register(obj) {
		super.register(obj)

		let auxiliary = AuxiliaryHelper.getData(AuthHelper.getEntityId())

		let offers = Utils.map(OfferHelper.getData())
		let offersPendingCount = Utils.filter(offers, this.filterOffers.bind(this, OfferStatusSad.PENDING)).length
		let offersConfirmedCount = Utils.filter(offers, this.filterOffers.bind(this, OfferStatusSad.CONFIRMED)).length
		let offersRejectedCount = Utils.filter(offers, this.filterOffers.bind(this, OfferStatusSad.REJECTED)).length
		let offersCanceledCount = Utils.filter(offers, this.filterOffers.bind(this, OfferStatusSad.CANCELED)).length

		let customersCount = Utils.map(CustomerHelper.getData()).length

		let interventionsCount = Utils.filter(InterventionHelper.getData(), this.filterInterventions).length

		let missionsCount = Utils.map(MissionHelper.getData()).length

		this.obj.state = {
			premium: (auxiliary.accountType || '') === AccountType.PREMIUM.key,
			profilCompleted: auxiliary.profilCompleted,
			offersPendingCount: offersPendingCount,
			offersConfirmedCount: offersConfirmedCount,
			offersRejectedCount: offersRejectedCount,
			offersCanceledCount: offersCanceledCount,
			customersCount: customersCount,
			interventionsCount: interventionsCount,
			missionsCount: missionsCount
		}
	}

	filterInterventions(intervention) {
		return intervention.auxiliaryId === AuthHelper.getEntityId() && InterventionUtils.isActive(intervention)
	}

	filterOffers(sadStatus, offer) {
		return !offer.hideToAux && OfferStatusSad.get(offer.sadStatus) === sadStatus
	}
}
var AuxiliaryHomeObj = new AuxiliaryHomeData()
export default AuxiliaryHomeObj
