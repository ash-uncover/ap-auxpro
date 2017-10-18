import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import InterventionHelper from 'helpers/InterventionHelper'
import OfferHelper from 'helpers/OfferHelper'

import { BaseData, MomentHelper } from 'ap-react-bootstrap'
import moment from 'moment'

import InterventionType from 'utils-lib/constants/InterventionType'
import InterventionUtils from 'utils-lib/entities/InterventionUtils'

class ServiceInterventionMatchData extends BaseData {

	register(obj, interventionId) {
		super.register(obj)

		this.interventionId = interventionId

		this.declareFunction('onCancel')
		this.declareFunction('onSubmit')

		this.declareFunction('onClick')

		let intervention = InterventionHelper.getData(interventionId)
		if (InterventionUtils.getType(intervention) !== InterventionType.PENDING) {
			AppHelper.navigate('/service/interventions/' + interventionId)
			return
		}

		this.obj.state = {
			matches: intervention.match,
			selected: []
		}
	}

	unregister() {
	}


	// View callback //
	// --------------------------------------------------------------------------------

	onCancel() {
		AppHelper.navigateBack()
	}
	onSubmit() {
		let intervention = InterventionHelper.getData(this.interventionId)
		delete intervention.match
		let selected = this.getState('selected')
		
		AppHelper.setBusy(true).
		then(function () {
			let promises = []
			let m = moment()
			for (let i = 0; i < selected.length; i++) {
				let date = MomentHelper.toLocalDate(m)
				let offer = {
					serviceId: intervention.serviceId,
					customerId: intervention.customerId,
					interventionId: intervention.id,
					auxiliaryId: selected[i],
					creationDate: date,
					sadStatusChanged: date
				}
				promises.push(OfferHelper.postOffer(offer))
			}
			return Promise.all(promises)
		}).
		then(function () {
			return OfferHelper.getServiceOffers(AuthHelper.getEntityId())
		}.bind(this)).
		then(function () {
			setTimeout(function () { AppHelper.setBusy() }, 200)
			AppHelper.navigateBack()
		}).
		catch(function (error) {
			setTimeout(function () { AppHelper.setBusy() }, 200)
			console.error('Error while creating offers')
			console.error(error)
		})
		
	}
	onClick(auxiliaryId, event) {
		event.preventDefault()		
		let selected = this.getState('selected')
		let index = selected.indexOf(auxiliaryId)
		if (index === -1) {
			selected.push(auxiliaryId)
		} else {
			selected.splice(index, 1)
		}
		this.setState({ selected : selected })
	}
}
var ServiceInterventionMatchObj = new ServiceInterventionMatchData()
export default ServiceInterventionMatchObj
