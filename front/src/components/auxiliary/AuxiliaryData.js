import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import AuxiliaryHelper from 'helpers/AuxiliaryHelper'
import CustomerHelper from 'helpers/CustomerHelper'
import GeozoneHelper from 'helpers/GeozoneHelper'
import InterventionHelper from 'helpers/InterventionHelper'
import IndisponibilityHelper from 'helpers/IndisponibilityHelper'
import MissionHelper from 'helpers/MissionHelper'
import OfferHelper from 'helpers/OfferHelper'
import ServiceHelper from 'helpers/ServiceHelper'

import { BaseData, ArraySet, Utils } from 'ap-react-bootstrap'

// Header not be displayed for the following path
let PATHS_NO_HEADER = [
	'/auxiliary/tuto',
	'/auxiliary/initial'
]

class AuxiliaryData extends BaseData {

	register(obj) {
		super.register(obj)

		/* TODO > find a way to generate this stuff */
		if (AuthHelper.getType() !== 'auxiliary') {
			AppHelper.navigate('/home')
			return;
		}

		let id = AuthHelper.getEntityId()

		Promise.all([
			AuxiliaryHelper.getAuxiliary(id),
			GeozoneHelper.getAuxiliaryGeozones(id),
			IndisponibilityHelper.getAuxiliaryIndisponibilitys(id),
			InterventionHelper.getAuxiliaryInterventions(id),
			OfferHelper.getAuxiliaryOffers(id),
			MissionHelper.getAuxiliaryMissions(id),
			ServiceHelper.getServices({ profilCompleted: true })
		]).
		then(function () {
			// Load missing interventions
			let interventions = new ArraySet()
			let offers = Utils.map(OfferHelper.getData())
			for (let i = 0; i < offers.length; i++) {
				interventions.add(offers[i].interventionId)
			}
			let promises = []
			interventions = interventions.array
			for (let i = 0; i < interventions.length; i++) {
				promises.push(InterventionHelper.getIntervention(interventions[i]))
			}
			return Promise.all(promises)
		}).
		then(function () {
			// Load customers and services
			let customers = new ArraySet()
			let missions = Utils.map(MissionHelper.getData())
			for (let i = 0; i < missions.length; i++) {
				customers.add(missions[i].customerId)
			}
			let interventions = Utils.map(InterventionHelper.getData())
			for (let i = 0; i < interventions.length; i++) {
				customers.add(interventions[i].customerId)
			}
			let offers = Utils.map(OfferHelper.getData())
			for (let i = 0; i < offers.length; i++) {
				customers.add(offers[i].customerId)
			}
			let promises = []
			customers = customers.array
			for (let i = 0; i < customers.length; i++) {
				promises.push(CustomerHelper.getCustomer(customers[i]))
			}
			return Promise.all(promises)
		}).
		then(function () {
			this.setState({ loaded: true })
			return AppHelper.navigate('/auxiliary/redirect')			
		}.bind(this)).
		catch(function (error) {
			console.error('Error while loading auxiliary')
			console.error(error)
		})

		AppHelper.register('/path', this, this._onAppStorePathUpdate.bind(this));
	}

	unregister() {
		AppHelper.unregister(this)
	}

	_onAppStorePathUpdate() {
		let showHeader = (PATHS_NO_HEADER.indexOf(AppHelper.getData('/path')) === -1)
		if (showHeader !== this.getState('showHeader')) {
			this.setState({ 
				showHeader: showHeader
			})
		}
	}
}
var AuxiliaryObj = new AuxiliaryData()
export default AuxiliaryObj
