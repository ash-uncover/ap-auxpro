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
import PromotioncodeHelper from 'helpers/PromotioncodeHelper'

import { BaseData, ArraySet, Utils, MomentHelper } from 'ap-react-bootstrap'
import moment from 'moment'

import { Dispatcher, ActionRegistry, StoreRegistry } from 'ap-flux'

// Header not be displayed for the following path
let PATHS_NO_HEADER = [
	'/auxiliary/tuto',
    '/auxiliary/initial'
]

class AuxiliaryData extends BaseData {

    constructor() {
        super(...arguments)
        
        this.onAppStorePathUpdate = this._onAppStorePathUpdate.bind(this)
    }

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
            // Force premium if not
            let auxiliary = AuxiliaryHelper.getData(id)
            if (!auxiliary.accountExpiryDate || MomentHelper.fromLocalDate(auxiliary.accountExpiryDate).isBefore(moment())) {
                promises.push(PromotioncodeHelper.postAuxiliaryCode({
                    id: id,
                    name: 'AUXPROS-2018'
                }))
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
            console.error(Dispatcher)
            console.error(ActionRegistry)
            console.error(StoreRegistry)
        })

		AppHelper.register('/path', this.onAppStorePathUpdate)
	}

	unregister() {
		AppHelper.unregister('/path', this.onAppStorePathUpdate)
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
