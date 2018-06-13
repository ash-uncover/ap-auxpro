import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import AuxiliaryHelper from 'helpers/AuxiliaryHelper'
import CustomerHelper from 'helpers/CustomerHelper'
import InterventionHelper from 'helpers/InterventionHelper'
import MissionHelper from 'helpers/MissionHelper'
import OfferHelper from 'helpers/OfferHelper'
import ServiceHelper from 'helpers/ServiceHelper'
import PromotioncodeHelper from 'helpers/PromotioncodeHelper'

import { BaseData, ArraySet, Utils, MomentHelper } from 'ap-react-bootstrap'
import moment from 'moment'

// Header will not be displayed for the following paths
let PATHS_NO_HEADER = [
	'/service/tuto',
	'/service/initial'
]

class ServiceData extends BaseData {

	register(obj) {
		super.register(obj)

		this.setState({
			showHeader: false,
			loaded:!! ServiceHelper.getData(AuthHelper.getEntityId())
		})
		
		/* TODO > find a way to generate this stuff */
		if (AuthHelper.getType() !== 'service') {
			AppHelper.navigate('/home')
			return;
		}

		
		Promise.all([
			ServiceHelper.getService(AuthHelper.getEntityId()),
			CustomerHelper.getServiceCustomers(AuthHelper.getEntityId()),
			InterventionHelper.getServiceInterventions(AuthHelper.getEntityId()),
			OfferHelper.getServiceOffers(AuthHelper.getEntityId()),
			MissionHelper.getServiceMissions(AuthHelper.getEntityId())
		]).
		then(function () {
			let auxiliaries = new ArraySet()
			let missions = Utils.map(MissionHelper.getData())
			for (let i = 0; i < missions.length; i++) {
				auxiliaries.add(missions[i].auxiliaryId)
			}
			let interventions = Utils.map(InterventionHelper.getData())
			for (let i = 0; i < interventions.length; i++) {
				auxiliaries.add(interventions[i].auxiliaryId)
			}
			let offers = Utils.map(OfferHelper.getData())
			for (let i = 0; i < offers.length; i++) {
				auxiliaries.add(offers[i].auxiliaryId)
			}
			let promises = []
			auxiliaries = auxiliaries.array
			for (let i = 0; i < auxiliaries.length; i++) {
				if (auxiliaries[i]) {
					promises.push(AuxiliaryHelper.getAuxiliary(auxiliaries[i]))
				}
			}
			// Force premium if not
			let service = ServiceHelper.getData(AuthHelper.getEntityId())
			if (!service.accountExpiryDate || MomentHelper.fromLocalDate(service.accountExpiryDate).isBefore(moment())) {
				promises.push(PromotioncodeHelper.postServiceCode({
					id: AuthHelper.getEntityId(),
					name: 'AUXPROS-2018'
				}))
			}
			return Promise.all(promises)
		}).
		then(function () {
			this.setState({ loaded: true })
			return AppHelper.navigate('/service/redirect')			
		}.bind(this)).
		catch(function (error) {
			console.error('Error while loading service')
			console.error(error)
		})

        this._onAppStorePathUpdate = this._onAppStorePathUpdate.bind(this)
		AppHelper.register('/path', this._onAppStorePathUpdate)
	}

	unregister() {
		AppHelper.unregister('/path', this._onAppStorePathUpdate)
	}

	_onAppStorePathUpdate() {
		let showHeader = (PATHS_NO_HEADER.indexOf(AppHelper.getData('/path')) === -1)
		if (showHeader !== this.getState('showHeader')) {
			this.setState({ 
				showHeader: showHeader
			})
		}
	}

	_onLoad() {
		let service = ServiceHelper.getData(AuthHelper.getEntityId())
		if (service.isTutoSkipped) {
			AppHelper.navigate('/service/home')
		} else {
			AppHelper.navigate('/service/tuto')
		}
		this.setState({ loaded: true })
	}
}
var ServiceObj = new ServiceData()
export default ServiceObj
