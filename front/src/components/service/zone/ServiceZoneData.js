import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import AuxiliaryHelper from 'helpers/AuxiliaryHelper'
import CustomerHelper from 'helpers/CustomerHelper'
import InterventionHelper from 'helpers/InterventionHelper'
import ServiceHelper from 'helpers/ServiceHelper'
import { BaseData, Utils } from 'ap-react-bootstrap'

import AuxiliaryUtils from 'utils-lib/entities/AuxiliaryUtils'
import InterventionUtils from 'utils-lib/entities/InterventionUtils'
import CustomerUtils from 'utils-lib/entities/CustomerUtils'

let ICONS = {
	HOME: '/assets/images/markers/gmap-marker-home.png',
	AUXILIARY: '/assets/images/markers/gmap-marker-aux-green.png',
	CUSTOMER: '/assets/images/markers/gmap-marker-customer-teal.png',
	INTERVENTION: '/assets/images/markers/gmap-marker-customer-blue.png'
}

let INFO_TYPE = {
	HOME: 'H',
	AUXILIARY: 'A',
	CUSTOMER: 'C',
	INTERVENTION: 'I'
}

class ServiceZoneData extends BaseData {

	register(obj) {
		super.register(obj)

		this.declareFunction('onChangeFilter')

		this.onMarkerClicked = this._onMarkerClicked.bind(this)

		this.service = ServiceHelper.getData(AuthHelper.getEntityId())
		
		this.setState({
			service: this.service,
			showInterventions: true,
			showCustomers: true,
			showAuxiliaries: true,
			centerLattitude: Number(this.service.lattitude),
			centerLongitude: Number(this.service.longitude),
			infoType: '',
			customer: null,
			auxiliary: null,
			interventions: []
		})

		this.homeMarkers = [ this.buildHomeMarker() ]
		this.auxiliaryMarkers = this.resolveAuxiliaries().map(this.buildAuxiliaryMarker.bind(this))
		this.interventionMarkers = this.resolveInterventions().map(this.buildInterventionMarker.bind(this))
		this.customerMarkers = this.resolveCustomers().map(this.buildCustomerMarker.bind(this))

		this.obj.state.markers = this.homeMarkers.concat(this.auxiliaryMarkers).concat(this.interventionMarkers).concat(this.customerMarkers)		
	}

	unregister() {
	}

	// Data Update //
	// --------------------------------------------------------------------------------



	// View callbacks //
	// --------------------------------------------------------------------------------

	onChangeFilter(id, event, value) {
		let data = {
			markers: [ this.buildHomeMarker() ],
			showInterventions: this.getState('showInterventions'),
			showCustomers: this.getState('showCustomers'),
			showAuxiliaries: this.getState('showAuxiliaries')
		}
		data[id] = value
		if (data.showInterventions) {
			data.markers.push(...this.interventionMarkers)
		}
		if (data.showCustomers) {
			data.markers.push(...this.customerMarkers)
		}
		if (data.showAuxiliaries) {
			data.markers.push(...this.auxiliaryMarkers)
		}
		this.setState(data)
	}

	_onMarkerClicked(marker) {
		let auxiliary = null
		let customer = null
		let interventions = []
		switch(marker.type) {
		case INFO_TYPE.HOME:
			break
		case INFO_TYPE.AUXILIARY:
			auxiliary = AuxiliaryHelper.getData(marker.id)
			break
		case INFO_TYPE.CUSTOMER:
		case INFO_TYPE.INTERVENTION:
			customer = CustomerHelper.getData(marker.id)
			interventions = Utils.filter(InterventionHelper.getData(), function (intervention) {
				return intervention.customerId === marker.id && intervention.auxiliaryId
			}).
			reduce(function (auxiliaries, intervention) {
				if (auxiliaries.indexOf(intervention.auxiliaryId) === -1) {
					auxiliaries.push(intervention.auxiliaryId)	
				}
				return auxiliaries
			}, []).
			map(function (auxiliaryId) {
				return AuxiliaryHelper.getData(auxiliaryId)
			})
			break
		}
		this.setState({ 
			infoType: marker.type,
			auxiliary: auxiliary,
			customer: customer,
			interventions: interventions
		})
	}



	// Internal Methods //
	// --------------------------------------------------------------------------------

	buildHomeMarker() { 
		return {
			lattitude: Number(this.service.lattitude),
			longitude: Number(this.service.longitude),
			title: 'Ma société',
			type: INFO_TYPE.HOME,
			icon: ICONS.HOME,
			onClick: this.onMarkerClicked.bind(this)
		}
	}
	buildAuxiliaryMarker(auxiliary) {
		return {
			id: auxiliary.id,
			type: INFO_TYPE.AUXILIARY,
			lattitude: auxiliary.lattitude,
			longitude: auxiliary.longitude,
			title: AuxiliaryUtils.getFullName(auxiliary),
			icon: ICONS.AUXILIARY,
			onClick: this.onMarkerClicked.bind(this)
		}
	}
	buildCustomerMarker(customer) { 
		return {
			id: customer.id,
			type: INFO_TYPE.CUSTOMER,
			lattitude: customer.lattitude,
			longitude: customer.longitude,
			title: CustomerUtils.getFullName(customer),
			onClick: this.onMarkerClicked.bind(this),
			icon: ICONS.CUSTOMER
		}
	}
	buildInterventionMarker(customer) { 
		return {
			id: customer.id,
			type: INFO_TYPE.INTERVENTION,
			lattitude: customer.lattitude,
			longitude: customer.longitude,
			title: CustomerUtils.getFullName(customer),
			onClick: this.onMarkerClicked.bind(this),
			icon: ICONS.INTERVENTION
		}
	}

	resolveInterventions() {
		return this._resolveCustomerWithIntervention().map(CustomerHelper.getData)
	}

	resolveCustomers() {
		let exclude = this._resolveCustomerWithIntervention()
		return Utils.reduce(CustomerHelper.getData(), function (customers, customer) {
			if (exclude.indexOf(customer.id) === -1) {
				customers.push(customer)
			}
			return customers
		}, [])
	}

	resolveAuxiliaries() {
		return Utils.reduce(InterventionHelper.getData(), function (auxiliaries, intervention) {
			if (intervention.auxiliaryId && auxiliaries.indexOf(intervention.auxiliaryId) === -1) {
				auxiliaries.push(intervention.auxiliaryId)
			}
			return auxiliaries
		}, []).map(AuxiliaryHelper.getData)
	}

	_resolveCustomerWithIntervention() {
		return Utils.reduce(InterventionHelper.getData(), function (customers, intervention) {
			if (InterventionUtils.isActive(intervention) && customers.indexOf(intervention.customerId) === -1) {
				customers.push(intervention.customerId)
			}
			return customers
		}, [])
	}

}
let ServiceZoneObj = new ServiceZoneData()
ServiceZoneObj.ICONS = ICONS
ServiceZoneObj.INFO_TYPE = INFO_TYPE
export default ServiceZoneObj
