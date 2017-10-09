import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import AuxiliaryHelper from 'helpers/AuxiliaryHelper'
import CustomerHelper from 'helpers/CustomerHelper'
import GeozoneHelper from 'helpers/GeozoneHelper'
import InterventionHelper from 'helpers/InterventionHelper'
import OfferHelper from 'helpers/OfferHelper'
import ServiceHelper from 'helpers/ServiceHelper'

import { BaseData, Utils } from 'ap-react-bootstrap'

import GeozoneType from 'utils/constants/GeozoneType'
import GeozoneFields from 'utils/entities/GeozoneFields'

import InterventionUtils from 'utils-lib/entities/InterventionUtils'
import CustomerUtils from 'utils-lib/entities/CustomerUtils'

import { Dispatcher } from 'ap-flux'

let ICONS = {
	HOME: '/assets/images/markers/gmap-marker-home.png',
	GEOZONE: '/assets/images/markers/gmap-marker-geozone.png',
	OFFER: '/assets/images/markers/gmap-marker-customer-pink.png',
	INTERVENTION: '/assets/images/markers/gmap-marker-customer-blue.png',
	SERVICE: '/assets/images/markers/gmap-marker-service-green.png',
	SERVICE_ANY: '/assets/images/markers/gmap-marker-service-red.png'
}

let INFO_TYPE = {
	HOME: 'H',
	GEOZONE: 'G',
	CUSTOMER: 'C',
	OFFER: 'O',
	SERVICE: 'S'
}

class AuxiliaryZoneData extends BaseData {

	constructor() {
		super(...arguments)

		this.MODE = {
			INFO: 'INFO',
			EDIT: 'EDIT',
			DELETE: 'DELETE'
		}
	}

	register(obj) {
		super.register(obj)

		this.declareFunction('onChangeFilter')

		this.declareFunction('onCancelEditGeozone')

		this.declareFunction('onAddGeozone')
		this.declareFunction('onEditGeozone')
		this.declareFunction('onDeleteGeozone')

		this.buildGeozoneMarker = this._buildGeozoneMarker.bind(this)
		this.buildOfferMarker = this._buildOfferMarker.bind(this)
		this.buildInterventionMarker = this._buildInterventionMarker.bind(this)
		this.buildServiceMarker = this._buildServiceMarker.bind(this)
		this.buildAllServiceMarker = this._buildAllServiceMarker.bind(this)

		this.onMarkerClicked = this._onMarkerClicked.bind(this)

		this.obj.state = {
			mode: this.MODE.INFO,
			showOffers: true,
			showInterventions: true,
			showServices: true,
			showAllServices: true,
			auxiliaryId: null,
			customerId: null,
			geozoneId: null,
			serviceId: null
		}

		this.buildAuxiliaryData()
		this.buildGeozoneData()
		this.buildCustomerData()
		this.buildServiceData()

		this.updateMarkers()
		this.updateCircles()

		GeozoneHelper.unregister('', this, this.onGeozonesUpdate)
	}

	unregister() {
		GeozoneHelper.unregister(this)
	}


	// Store notification //
	// --------------------------------------------------------------------------------

	onGeozonesUpdate() {

	}

	updateMarkers() {
		let result = []
		result = result.concat(this.auxiliaryMarkers)
		result = result.concat(this.geozoneMarkers)
		if (this.getState('showOffers')) {
			result = result.concat(this.offerMarkers)
		}
		if (this.getState('showInterventions')) {
			result = result.concat(this.interventionMarkers)
		}
		if (this.getState('showServices')) {
			result = result.concat(this.serviceMarkers)
		}
		if (this.getState('showAllServices')) {
			result = result.concat(this.allServiceMarkers)
		}
		this.obj.state.markers = result
	}

	updateCircles() {
		this.obj.state.circles = []
	}


	// Data building //
	// --------------------------------------------------------------------------------

	buildAuxiliaryData() {
		let auxiliary = AuxiliaryHelper.getData(AuthHelper.getEntityId())

		this.obj.state.centerLattitude = Number(auxiliary.lattitude)
		this.obj.state.centerLongitude = Number(auxiliary.longitude)

		this.auxiliaryMarkers = [{
			lattitude: Number(auxiliary.lattitude),
			longitude: Number(auxiliary.longitude),
			title: 'Mon domicile',
			icon: ICONS.HOME,
			auxiliaryId: auxiliary.id,
			customerId: null,
			geozoneId: null,
			serviceId: null,
			onClick: this.onMarkerClicked
		}]
	}

	buildGeozoneData() {
		this.geozoneMarkers = Utils.map(GeozoneHelper.getData(), this.buildGeozoneMarker)

		this.obj.state.geozonesCount = this.geozoneMarkers.length
	}
	_buildGeozoneMarker(geozone) {
		return {
			lattitude: Number(geozone.lattitude),
			longitude: Number(geozone.longitude),
			title: "Zone d'intervention",
			icon: ICONS.GEOZONE,
			auxiliaryId: null,
			customerId: null,
			geozoneId: geozone.id,
			serviceId: null,
			onClick: this.onMarkerClicked
		}
	}

	buildCustomerData() {
		let interventionCustomers = Utils.reduce(InterventionHelper.getData(), function (customers, intervention) {
			if (customers.indexOf(intervention.customerId) === -1) {
				customers.push(intervention.customerId)
			}
			return customers
		}, [])
		this.interventionMarkers = interventionCustomers.map(this.buildInterventionMarker)

		let offerCustomers = Utils.reduce(OfferHelper.getData(), function (customers, offer) {
			if (interventionCustomers.indexOf(offer.customerId) === -1 && customers.indexOf(offer.customerId) === -1) {
				customers.push(offer.customerId)
			}
			return customers
		}, [])
		this.offerMarkers = offerCustomers.map(this.buildOfferMarker)
	}
	_buildInterventionMarker(customerId) {
		let customer = CustomerHelper.getData(customerId)
		return {
			lattitude: Number(customer.lattitude),
			longitude: Number(customer.longitude),
			title: 'Intervention',
			icon: ICONS.INTERVENTION,
			auxiliaryId: null,
			customerId: customerId,
			geozoneId: null,
			serviceId: null,
			onClick: this.onMarkerClicked
		}
	}
	_buildOfferMarker(customerId) {
		let customer = CustomerHelper.getData(customerId)
		return {
			lattitude: Number(customer.lattitude),
			longitude: Number(customer.longitude),
			title: 'Offre',
			icon: ICONS.OFFER,
			auxiliaryId: null,
			customerId: customerId,
			geozoneId: null,
			serviceId: null,
			onClick: this.onMarkerClicked
		}
	}

	buildServiceData() {
		let selfServices = Utils.reduce(InterventionHelper.getData(), function (services, intervention) {
			if (services.indexOf(intervention.serviceId) === -1) {
				services.push(intervention.serviceId)
			}
			return services
		}, [])
		this.serviceMarkers = selfServices.map(this.buildServiceMarker)

		let allServices = Utils.reduce(ServiceHelper.getData(), function (services, service) {
			if (selfServices.indexOf(service.id) === -1 && services.indexOf(service.id) === -1) {
				services.push(offer.serviceId)
			}
			return services
		}, [])
		this.allServiceMarkers = allServices.map(this.buildAllServiceMarker)	
	}
	_buildServiceMarker(serviceId) {
		let service = ServiceHelper.getData(serviceId)
		return {
			lattitude: Number(service.lattitude),
			longitude: Number(service.longitude),
			title: 'Service',
			icon: ICONS.SERVICE,
			auxiliaryId: null,
			customerId: null,
			geozoneId: null,
			serviceId: serviceId,
			onClick: this.onMarkerClicked
		}
	}
	_buildAllServiceMarker(serviceId) {
		let service = ServiceHelper.getData(serviceId)
		return {
			lattitude: Number(service.lattitude),
			longitude: Number(service.longitude),
			title: 'Service',
			icon: ICONS.SERVICE_ANY,
			auxiliaryId: null,
			customerId: null,
			geozoneId: null,
			serviceId: serviceId,
			onClick: this.onMarkerClicked
		}
	}


	// View Callbacks //
	// --------------------------------------------------------------------------------

	onChangeFilter(id, event, value) {
		this.obj.state[id] = value
		this.updateMarkers()
		this.forceUpdate()
	}

	_onMarkerClicked(marker) {
		this.setState({
			auxiliaryId: marker.auxiliaryId,
			customerId: marker.customerId,
			geozoneId: marker.geozoneId,
			serviceId: marker.serviceId
		})
	}

	onCancelEditGeozone() {
		this.setState({
			mode: this.MODE.INFO,
			geozoneId: null
		})
	}

	onAddGeozone() {
		this.setState({
			mode: this.MODE.EDIT,
			geozoneId: 'new'
		})
	}

	onEditGeozone() {
		this.setState({
			mode: this.MODE.EDIT
		})
	}

	onDeleteGeozone() {
		this.setState({
			mode: this.MODE.DELETE
		})	
	}


/*
		this.homeMarkers = [ this.buildHomeMarker() ]
		this.serviceMarkers = this.resolveServices().map(this.buildServiceMarker.bind(this))
		this.serviceWithInter = this.resolveServiceWithIntervention().map(this.buildServiceWithInterventionMarker.bind(this))

		this.customersState = this.__buildCustomersState()
		this.interventionCustomers = this.resolveInterventions().map(this.buildInterventionCustomers.bind(this))
		this.offerCustomers = this.resolveOffers().map(this.buildOfferCustomers.bind(this))
		this.geozoneCircles = this.resolvegeozoneCircles().map(this.buildGeozoneCircle.bind(this))

		this.panelgeozoneData = this.buildPanelgeozoneData()
		this.buttonAddData = this.buildButtonAddData()
		this.buttonCancelData = this.buildButtonCancelData()

		this.obj.state.markers = this.homeMarkers.concat(this.serviceMarkers).concat(this.serviceWithInter)
		.concat(this.interventionCustomers).concat(this.offerCustomers).concat(this.geozones)

		this.obj.state.circles = this.geozoneCircles

		this.obj.state.panelgeozoneData = this.panelgeozoneData
		this.obj.state.buttonAddData = this.buttonAddData
		this.obj.state.buttonCancelData = this.buttonCancelData

		this.obj.state.showOffers = true
		this.obj.state.showInterventions = true
		this.obj.state.showServices = true
		this.obj.state.showAllServices = true
		GeozoneHelper.register('', this, this.onUpdategeozones.bind(this))
*/

/*

	onUpdategeozones() {
		this.geozones = Utils.map(GeozoneHelper.getData(), this.buildGeozones.bind(this))
		this.geozoneCircles = this.resolvegeozoneCircles().map(this.buildGeozoneCircle.bind(this))
		this.buttonAddData = this.buildButtonAddData()

		let markers = this.homeMarkers.concat(this.serviceMarkers).concat(this.serviceWithInter)
		.concat(this.interventionCustomers).concat(this.offerCustomers).concat(this.geozones)

		this.setState({
			markers: markers,
			circles: this.geozoneCircles,
			buttonAddData: this.buttonAddData,
			infoType: null,
			geozone: null
		})
	}

	

	onChangeFilter(value) {
		let test = this.obj.state
		let newState = {}
		newState.showOffers = this.obj.state.showOffers
		newState.showInterventions = this.obj.state.showInterventions
		newState.showServices = this.obj.state.showServices
		newState.showAllServices = this.obj.state.showAllServices
		newState[value] = !newState[value]

		let markers = this.homeMarkers.concat(this.geozones)

		if (newState.showOffers)
			markers = markers.concat(this.offerCustomers)
		if (newState.showInterventions)
			markers = markers.concat(this.interventionCustomers)
		if (newState.showServices)
			markers = markers.concat(this.serviceWithInter)
		if (newState.showAllServices)
			markers = markers.concat(this.serviceMarkers)

		newState.markers = markers;

		this.setState(newState)
	}

	onAddressChange(address) {
		Dispatcher.issue('GET_REVERSE_GEOCODE', address)
	}

	buildPanelgeozoneData() {
		switch (this.mode) {
		case MODE.EDIT:
			return {
				header: "Modifier une zone d'intervention",
				footer: ' '
			}
		case MODE.CREATE:
			return {
				header: "Saisir une zone d'intervention",
				footer: ' '
			}
		}
	}

	buildButtonAddData() {
		switch (this.mode) {
		case MODE.VIEW:
			let geozones = GeozoneHelper.getData()
			let disabled = Utils.map(geozones).length > 2
			let text = disabled ? 'Maximum 3 zones' : 'Ajouter une zone'
			return {
				block: true,
				bsStyle: disabled ? 'warning' : 'primary',
				disabled: disabled,
				children: (<strong>{text}</strong>),
				onClick: this.onAddgeozone.bind(this)
			}
		case MODE.EDIT:
			return {
				block: true,
				bsStyle: this.isFormCompleted ? 'success' : 'default',
				disabled: !this.isFormCompleted,
				children: (<strong>Enregistrer modifications</strong>),
				onClick: this.onUpdategeozone.bind(this)
			}
		case MODE.CREATE:
			return {
				block: true,
				bsStyle: this.isFormCompleted ? 'success' : 'default',
				disabled: !this.isFormCompleted,
				children: (<strong>Créer nouvelle zone</strong>),
				onClick: this.onCreategeozone.bind(this)
			}
		}
	}

	buildButtonCancelData() {
		if (this.mode !== MODE.VIEW) {
			return {
				block: true,
				bsStyle: 'primary',
				children: (<strong>Annuler</strong>),
				onClick: this.onCancel.bind(this)
			}
		}
	}

	onAddgeozone() {
		this.mode = MODE.CREATE
		this.geozone = { 
			id: null,
			auxiliaryId: AuthHelper.getEntityId(),
			lattitude: null,
			longitude: null,
			type: GeozoneType.AREA.key,
			address: '',
			city: '',
			postalCode: '',
			radius: 2000
		}
	}

	onEditgeozone(id) {
		this.mode = MODE.EDIT
		this.geozone = Object.assign({}, GeozoneHelper.getData(id))
		this.panelgeozoneData = this.buildPanelgeozoneData()
		this.buttonAddData = this.buildButtonAddData()

		this.setState({
			panelgeozoneData: this.panelgeozoneData,
			buttonAddData: this.buttonAddData
		})

	}

	onCreategeozone() {
		GeozoneHelper.postgeozone(this.geozone).
		then(function() {
			this.mode = MODE.VIEW
			GeozoneHelper.getAuxiliarygeozones(AuthHelper.getEntityId())
			delete this.geozone
		}.bind(this)).
		catch(function (error) {
			console.error('ERROR WHILE CREATING geozone')
			console.error(error)
		})		
	}

	onUpdategeozone() {
		GeozoneHelper.putgeozone(this.geozone).
		then(function() {
			this.mode = MODE.VIEW
			GeozoneHelper.getAuxiliarygeozones(AuthHelper.getEntityId())
			delete this.geozone
		}.bind(this)).
		catch(function (error) {
			console.error('ERROR WHILE UPDATING geozone')
			console.error(error)
		})
		
	}

	onDeletegeozone(id) {
		GeozoneHelper.deletegeozone(id).
		then(function () {
			GeozoneHelper.getAuxiliarygeozones(AuthHelper.getEntityId())
		}.bind(this)).
		catch(function (error) {
			console.error('ERROR WHILE DELETING geozone')
			console.error(error)
		})
	}

	buildHomeMarker() { 
		return {
			lattitude: Number(this.auxiliary.lattitude),
			longitude: Number(this.auxiliary.longitude),
			title: 'Mon domicile',
			type: INFO_TYPE.HOME,
			icon: ICONS.HOME,
			onClick: this.onMarkerClicked.bind(this)
		}
	}

	buildServiceMarker(service) {
		return {
			id: service.id,
			type: INFO_TYPE.SERVICE,
			lattitude: service.lattitude,
			longitude: service.longitude,
			title: service.socialReason,
			icon: ICONS.SERVICE_ANY,
			onClick: this.onMarkerClicked.bind(this)
		}
	}

	buildServiceWithInterventionMarker(service) {
		return {
			id: service.id,
			type: INFO_TYPE.SERVICE,
			lattitude: service.lattitude,
			longitude: service.longitude,
			title: service.socialReason,
			icon: ICONS.SERVICE,
			onClick: this.onMarkerClicked.bind(this)
		}
	}

	buildInterventionCustomers(customer) {
		return {
			id: customer.id,
			type: INFO_TYPE.CUSTOMER,
			lattitude: customer.lattitude,
			longitude: customer.longitude,
			title: CustomerUtils.getFullName(customer),
			icon: ICONS.INTERVENTION,
			onClick: this.onMarkerClicked.bind(this)
		}
	}

	buildOfferCustomers(customer) {
		return {
			id: customer.id,
			type: INFO_TYPE.OFFER,
			lattitude: customer.lattitude,
			longitude: customer.longitude,
			title: CustomerUtils.getFullName(customer),
			icon: ICONS.OFFER,
			onClick: this.onMarkerClicked.bind(this)
		}
	}

	buildGeozones(zone) {
		return {
			id: zone.id,
			type: INFO_TYPE.geozone,
			lattitude: zone.lattitude,
			longitude: zone.longitude,
			title: zone.city,
			icon: ICONS.geozone,
			onClick: this.onMarkerClicked.bind(this)
		}
	}

	buildGeozoneCircle(geozone) { 
		return {
			id: geozone.id,
			lattitude: Number(geozone.lattitude),
			longitude: Number(geozone.longitude),
			radius: parseFloat(geozone.radius)
		}
	}

	resolveServices() {
		let exclude = this.resolveServiceIdWithIntervention()
		return Utils.reduce(ServiceHelper.getData(), function (services, service) {
			if (exclude.indexOf(service.id) === -1) {
				services.push(service)
			}
			return services
		}, [])
	}

	resolveServiceWithIntervention() {
		return Utils.reduce(InterventionHelper.getData(), function (services, intervention) {
			if (InterventionUtils.isActive(intervention) && services.indexOf(intervention.serviceId) === -1) {
				services.push(ServiceHelper.getData(intervention.serviceId))
			}
			return services
		}, [])
	}

	resolveServiceIdWithIntervention() {
		return Utils.reduce(InterventionHelper.getData(), function (services, intervention) {
			if (InterventionUtils.isActive(intervention) && services.indexOf(intervention.serviceId) === -1) {
				services.push(intervention.serviceId)
			}
			return services
		}, [])
	}

	resolveInterventions() {
		return Utils.reduce(CustomerHelper.getData(), function (customers, customer) {
			let state = this.customersState[customer.id] || {}
			if (state.hasIntervention)
				customers.push(customer)
			return customers
		}.bind(this), [])
	}

	resolveOffers() {
		return Utils.reduce(CustomerHelper.getData(), function (customers, customer) {
			let state = this.customersState[customer.id] || {}
			let hasOffer = state.hasOffer
			let hasIntervention = state.hasIntervention
			if (hasOffer && !hasIntervention)
				customers.push(customer)
			return customers
		}.bind(this), [])
	}

	resolvegeozoneCircles() {
		return Utils.reduce(GeozoneHelper.getData(), function (geozones, geozone) {
			if (geozone.type === GeozoneType.AREA.key)
				geozones.push(geozone)
			return geozones
		}, [])
	}

	__buildCustomersState() {
		let result = {}
		let interventions = Utils.map(InterventionHelper.getData())
		for (let i = 0; i < interventions.length; i++) {
			let intervention = interventions[i]
			if (intervention.auxiliaryId === this.auxiliary.id && InterventionUtils.isActive(intervention)) {
				result[intervention.customerId] = result[intervention.customerId] || {}
				result[intervention.customerId].hasIntervention = true
			}
		}
		let offers = Utils.map(OfferHelper.getData())
		for (let i = 0; i < offers.length; i++) {
			let offer = offers[i]
			result[offer.customerId] = result[offer.customerId] || {}
			if (!offer.hideToAux && offer.auxStatus !== 'DECLINED' && offer.sadStatus === 'PENDING') {
				result[offer.customerId] = result[offer.customerId] || {}
				let intervention = InterventionHelper.getData(offer.interventionId)
				let test1 = InterventionUtils.isCurrent(intervention)
				let test2 = !intervention.auxiliaryId
				if (InterventionUtils.isCurrent(intervention) && !intervention.auxiliaryId) {
					result[offer.customerId].hasOffer = true	
				}
				
			}
			
		}
		return result
	}

	handleGetReversegeozone(result, param) {
		switch (this.mode) {
		case MODE.CREATE:
		case MODE.EDIT:
			this.geozone.lattitude = param.lattitude
			this.geozone.longitude = param.longitude
			if (result[0].address_components.length === 7) {
				this.geozone.address = result[0].address_components[0].short_name + ' ' + result[0].address_components[1].short_name
				this.geozone.city = result[0].address_components[2].short_name
				this.geozone.postalCode = result[0].address_components[6].short_name
			} else {
				this.geozone.address = result[0].address_components[0].short_name
				this.geozone.city = result[0].address_components[2].short_name
				this.geozone.postalCode = result[0].address_components[5].short_name
			}
		}
	}
*/
}
let AuxiliaryZoneObj = new AuxiliaryZoneData()
//Dispatcher.register('GET_REVERSE_GEOCODE', AuxiliaryZoneObj.handleGetReversegeozone.bind(AuxiliaryZoneObj));
AuxiliaryZoneObj.ICONS = ICONS
AuxiliaryZoneObj.INFO_TYPE = INFO_TYPE
export default AuxiliaryZoneObj

