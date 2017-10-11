import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import AuxiliaryHelper from 'helpers/AuxiliaryHelper'
import CustomerHelper from 'helpers/CustomerHelper'
import InterventionHelper from 'helpers/InterventionHelper'
import OfferHelper from 'helpers/OfferHelper'

import { BaseData, Utils, MomentHelper } from 'ap-react-bootstrap'
import moment from 'moment'

import OfferStatusSad from 'utils/constants/OfferStatusSad'

import InterventionType from 'utils-lib/constants/InterventionType'
import InterventionUtils from 'utils-lib/entities/InterventionUtils'

class ServiceInterventionsData extends BaseData {

	register(obj) {
		super.register(obj)
		
		this.declareFunction('onCreateIntervention')
		this.declareFunction('onEditIntervention')		
		this.declareFunction('onMatchIntervention')
		
		this.declareFunction('onDeleteIntervention')
		this.declareFunction('onCancelDeleteIntervention')
		this.declareFunction('onConfirmDeleteIntervention')

		this.declareFunction('onFollowMatching')

		this.declareFunction('onCancelMatching')
		this.declareFunction('onCancelCancelMatching')
		this.declareFunction('onConfirmCancelMatching')

		this.declareFunction('onCancelIntervention')
		this.declareFunction('onCancelCancelIntervention')
		this.declareFunction('onConfirmCancelIntervention')

		this.declareFunction('onViewCustomer')
		this.declareFunction('onViewAuxiliary')


		this.obj.state = {
			pending: [],
			offered: [],
			planned: []
		}

		InterventionHelper.register('', this, this.onInterventionsUpdate.bind(this))
		OfferHelper.register('', this, this.onInterventionsUpdate.bind(this))

		this._onInterventionsUpdate()
	}

	unregister() {
		InterventionHelper.unregister(this)
	}


	// Store notification //
	// --------------------------------------------------------------------------------

	onInterventionsUpdate() {
		this._onInterventionsUpdate()
		this.forceUpdate()
	}
	_onInterventionsUpdate() {
		this.obj.state = {
			pending: [],
			offered: [],
			planned: []
		}
		let interventions = Utils.map(InterventionHelper.getData('')).filter(this._filterInterventions)
		for (let i = 0 ; i < interventions.length ; i++) {
			let intervention = interventions[i]
			let type = InterventionUtils.getType(interventions[i])
			switch (type) {
			case InterventionType.PENDING: 
				this.obj.state.pending.push(intervention)
				break
			case InterventionType.OFFERED: 
				this.obj.state.offered.push(intervention)
				break
			case InterventionType.PLANNED: 
				this.obj.state.planned.push(intervention)
				break
			}
		}
	}
	_filterInterventions(intervention, index) {
		let customer = CustomerHelper.getData(intervention.customerId)
		return customer && !intervention.hideToSad
	}

	// View callbacks //
	// --------------------------------------------------------------------------------

	onCreateIntervention() {
		AppHelper.navigate('/service/interventions/new/edit')
	}
	onEditIntervention(interventionId) {
		AppHelper.navigate('/service/interventions/' + interventionId + '/edit')
	}
	onMatchIntervention(interventionId) {
		InterventionUtils.storeInterventionMatch(null, { id: interventionId })
		AppHelper.setBusy(true).
		then(function () {
			return InterventionHelper.getInterventionMatch(interventionId)	
		}).
		then(function () {
			let intervention = InterventionHelper.getData(interventionId)
			console.log('HEREEEEEEEE')
			console.log(intervention)
			let promises = []
			for (let i = 0; i < intervention.match.length; i++) {
				if (!AuxiliaryHelper.getData(intervention.match[i].auxiliaryId)) {
					promises.push(AuxiliaryHelper.getAuxiliary(intervention.match[i].auxiliaryId))
				}
			}
			return Promise.all(promises)
		}). 
		then(function() {
			setTimeout(function () { AppHelper.setBusy() }, 200)
			return AppHelper.navigate('/service/interventions/' + interventionId + '/match')
		}).
		catch(function (error) {
			setTimeout(function () { AppHelper.setBusy() }, 200)
			console.error('Unable to load matches:')
			console.error(error)
		})
	}

	onDeleteIntervention(interventionId) {
		this.intervention = InterventionHelper.getData(interventionId)
		this.setState({ showDeleteIntervention: true })
	}
	onCancelDeleteIntervention() {
		this.intervention = null
		this.setState({ showDeleteIntervention: false })
	}
	onConfirmDeleteIntervention() {
		this.setState({ showDeleteIntervention: false })
		this.intervention.hideToSad = true
		InterventionHelper.putIntervention(this.intervention).
		then(function () {
			InterventionHelper.getIntervention(this.intervention.id)
			this.intervention = null
		}.bind(this)).
		catch(function (error) {
			console.error('Error while deleting intervention')
			console.error(error)
		})		
	}

	onFollowMatching(interventionId) {
		AppHelper.navigate('/service/interventions/' + interventionId + '/follow')
	}

	onCancelMatching(interventionId) {
		this.intervention = InterventionHelper.getData(interventionId)
		this.setState({ showCancelMatching: true })
	}
	onCancelCancelMatching(interventionId) {
		this.intervention = null
		this.setState({ showCancelMatching: false })
	}
	onConfirmCancelMatching() {
		this.setState({ showCancelMatching: false })

		let offers = Utils.filter(OfferHelper.getData(), function (offer) {
			return this.intervention.id === offer.interventionId
		}.bind(this))
		Promise.all(offers.map(function (offer) {
			offer.sadStatus = OfferStatusSad.CANCELED.key,
			offer.sadStatusChanged = MomentHelper.toLocalDate(moment())
			return OfferHelper.putOffer(offer)
		})).
		then(function () {
			OfferHelper.getServiceOffers(AuthHelper.getEntityId())
			this.intervention = null		
		}.bind(this)).
		catch(function (error) {
			console.error('Error while canceling matching')
			console.error(error);
		})
	}

	onCancelIntervention(interventionId) {
		this.intervention = InterventionHelper.getData(interventionId)
		this.setState({ showCancelIntervention: true })
	}
	onCancelCancelIntervention(interventionId) {
		this.intervention = null
		this.setState({ showCancelIntervention: false })
	}
	onConfirmCancelIntervention() {
		this.intervention.sadStatus = 'CANCELED'
		this.intervention.sadStatusChanged = MomentHelper.toLocalDate(moment()),
		this.intervention.hideToSad = true
		InterventionHelper.putIntervention(this.intervention).
		then(function () {
			InterventionHelper.getIntervention(this.intervention.id)
			this.intervention = null
			this.setState({ showCancelIntervention: false })
		}.bind(this)).
		catch(function (error) {
			console.error('Error while stopping intervention')
			console.error(error)
		})	
	}

	onViewCustomer(customerId) {
		AppHelper.navigate('/service/customers/' + customerId)
	}

	onViewAuxiliary(auxiliaryId) {
		AppHelper.navigate('/service/auxiliaries/' + auxiliaryId)
	}


	// Internal methods //
	// --------------------------------------------------------------------------------

}
var ServiceInterventionsObj = new ServiceInterventionsData()
export default ServiceInterventionsObj
