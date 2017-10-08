import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import AuxiliaryHelper from 'helpers/AuxiliaryHelper'
import OfferHelper from 'helpers/OfferHelper'
import CustomerHelper from 'helpers/CustomerHelper'
import InterventionHelper from 'helpers/InterventionHelper'
import MissionHelper from 'helpers/MissionHelper'

import AccountType from 'utils/constants/AccountType'
import OfferStatusSad from 'utils/constants/OfferStatusSad'
import AuxiliaryUtils from 'utils-lib/entities/AuxiliaryUtils'
import InterventionUtils from 'utils-lib/entities/InterventionUtils'

import { BaseData, Utils, TextUtils } from 'ap-react-bootstrap'

class AuxiliaryHomeData extends BaseData {

	register(obj) {
		super.register(obj)

		this.obj.state = {}

		let auxiliary = AuxiliaryHelper.getData(AuthHelper.getEntityId())
		
		this.premium = (auxiliary.accountType || '') === AccountType.PREMIUM.key
		this.complete = AuxiliaryUtils.checkProfileCompleted(auxiliary)

		let offers = Utils.map(OfferHelper.getData())
		this.offersPendingCount = Utils.filter(offers, this.filterOffers.bind(this, OfferStatusSad.PENDING)).length
		this.offersConfirmedCount = Utils.filter(offers, this.filterOffers.bind(this, OfferStatusSad.CONFIRMED)).length
		this.offersRejectedCount = Utils.filter(offers, this.filterOffers.bind(this, OfferStatusSad.REJECTED)).length
		this.offersCanceledCount = Utils.filter(offers, this.filterOffers.bind(this, OfferStatusSad.CANCELED)).length

		this.textPending = ' ' + TextUtils.pluralize('nouvelle', this.offersPendingCount) + ' ' + TextUtils.pluralize('offre', this.offersPendingCount) + '.'
		this.textConfirmed = ' ' + TextUtils.pluralize('offre', this.offersConfirmedCount) + ' ' + TextUtils.pluralize('confirmée', this.offersConfirmedCount) + '.'
		this.textRejected = ' ' + TextUtils.pluralize('offre', this.offersRejectedCount) + ' ' + TextUtils.pluralize('rejetée', this.offersRejectedCount) + '.'
		this.textCanceled = ' ' + TextUtils.pluralize('offre', this.offersCanceledCount) + ' ' + TextUtils.pluralize('annulée', this.offersCanceledCount) + '.'

		this.customersCount = Utils.map(CustomerHelper.getData()).length
		this.textCustomer = ' ' + TextUtils.pluralize('usager', this.customersCount ) + '.'

		this.interventionsCount = Utils.filter(InterventionHelper.getData(), this.filterInterventions).length
		this.textIntervention = ' ' + TextUtils.pluralize('intervention', this.interventionsCount) + ' en cours.'
		
		this.missionsCount = Utils.map(MissionHelper.getData()).length
	}

	unregister() {
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
