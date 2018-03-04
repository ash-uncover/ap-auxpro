import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import AuxiliaryHelper from 'helpers/AuxiliaryHelper'
import CustomerHelper from 'helpers/CustomerHelper'
import GeozoneHelper from 'helpers/GeozoneHelper'
import InterventionHelper from 'helpers/InterventionHelper'
import OfferHelper from 'helpers/OfferHelper'
import ServiceHelper from 'helpers/ServiceHelper'

import { BaseData, Utils } from 'ap-react-bootstrap'
import { Dispatcher } from 'ap-flux'

import GeozoneType from 'utils/constants/GeozoneType'
import GeozoneFields from 'utils/entities/GeozoneFields'

import InterventionUtils from 'utils-lib/entities/InterventionUtils'
import CustomerUtils from 'utils-lib/entities/CustomerUtils'

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
			EDIT: 'EDIT'
		}
	}

	register(obj) {
		super.register(obj)

		this.declareFunction('onMapClicked')
		this.declareFunction('onChangeFilter')

		this.declareFunction('onGeozoneUpdate')
		this.declareFunction('onCancelEditGeozone')

		this.declareFunction('onAddGeozone')
		this.declareFunction('onEditGeozone')
		this.declareFunction('onDeleteGeozone')
		this.declareFunction('onCancelDeleteGeozone')
		this.declareFunction('onConfirmDeleteGeozone')

		this.buildGeozoneMarker = this._buildGeozoneMarker.bind(this)
		this.buildGeozoneCircle = this._buildGeozoneCircle.bind(this)
		this.buildOfferMarker = this._buildOfferMarker.bind(this)
		this.buildInterventionMarker = this._buildInterventionMarker.bind(this)
		this.buildServiceMarker = this._buildServiceMarker.bind(this)
		this.buildAllServiceMarker = this._buildAllServiceMarker.bind(this)


		this.onMarkerClicked = this._onMarkerClicked.bind(this)

		this.obj.state.mode = this.MODE.INFO
		this.obj.state.showOffers = true
		this.obj.state.showInterventions = true
		this.obj.state.showServices = true
		this.obj.state.showAllServices = true

		console.log(this.obj.state)

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
		this.obj.state.circles = this.geozoneCircles
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
		let geozone = this.getState('geozone')
		this.geozoneMarkers = Utils.reduce(GeozoneHelper.getData(), this.buildGeozoneMarker, [])
		if (geozone) {
			this.geozoneMarkers.push(this._getGeozoneMarker(geozone))
		}
		this.geozoneCircles = Utils.reduce(GeozoneHelper.getData(), this.buildGeozoneCircle, [])
		if (geozone) {
			this.geozoneCircles.push(this._getGeozoneCircle(geozone))
		}
		this.obj.state.geozonesCount = this.geozoneMarkers.length
	}
	_buildGeozoneMarker(markers, geozone) {
		if (geozone.id !== this.getState('geozoneId')) {
			markers.push(this._getGeozoneMarker(geozone))
		}
		return markers
	}
	_getGeozoneMarker(geozone) {
		let auxiliary = AuxiliaryHelper.getData(AuthHelper.getEntityId())
		return {
			id: geozone.id,
			lattitude: Number(geozone.lattitude || auxiliary.lattitude),
			longitude: Number(geozone.longitude || auxiliary.longitude),
			title: "Zone d'intervention",
			icon: ICONS.GEOZONE,
			auxiliaryId: null,
			customerId: null,
			geozoneId: geozone.id,
			serviceId: null,
			onClick: this.onMarkerClicked
		}
	}
	_buildGeozoneCircle(circles, geozone) {
		if (geozone.id !== this.getState('geozoneId') && geozone.type === GeozoneType.AREA.key) {
			let auxiliary = AuxiliaryHelper.getData(AuthHelper.getEntityId())
			circles.push(this._getGeozoneCircle(geozone))
		}
		return circles
	}
	_getGeozoneCircle(geozone) {
		let auxiliary = AuxiliaryHelper.getData(AuthHelper.getEntityId())
		return {
			id: geozone.id,
			lattitude: Number(geozone.lattitude || auxiliary.lattitude),
			longitude: Number(geozone.longitude || auxiliary.longitude),
			radius: parseFloat(geozone.radius || 0)
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
			id: customerId,
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
			id: customerId,
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
				services.push(service.id)
			}
			return services
		}, [])
		this.allServiceMarkers = allServices.map(this.buildAllServiceMarker)	
	}
	_buildServiceMarker(serviceId) {
		let service = ServiceHelper.getData(serviceId)
		return {
			id: serviceId,
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
			id: serviceId,
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

	onMapClicked(event) {
		if (this.getState('mode') !== this.MODE.INFO) {
			Dispatcher.issue('GET_REVERSE_GEOCODE', event)
		} else {
			this.setState({
				auxiliaryId: null,
				customerId: null,
				geozoneId: null,
				serviceId: null
			})
		}		
	}

	_onMarkerClicked(marker) {
		this.setState({
			auxiliaryId: marker.auxiliaryId,
			customerId: marker.customerId,
			geozoneId: marker.geozoneId,
			serviceId: marker.serviceId
		})
	}

	onChangeFilter(id, event, value) {
		this.obj.state[id] = value
		this.updateMarkers()
		this.updateCircles()
		this.forceUpdate()
	}

	onGeozoneUpdate(geozone) {
		this.obj.state.geozone = geozone
		this.buildGeozoneData()
		this.updateMarkers()
		this.updateCircles()
		this.forceUpdate()
	}

	onCancelEditGeozone() {
		this.obj.state.geozoneId = null
		this.obj.state.geozone = null
		this.buildGeozoneData()
		this.updateMarkers()
		this.updateCircles()
		this.obj.state.mode = this.MODE.INFO
		this.forceUpdate()
	}

	onAddGeozone() {
		this.setState({
			mode: this.MODE.EDIT,
			geozoneId: 'new'
		})
	}

	onEditGeozone() {
		this.setState({
			mode: this.MODE.EDIT,
			geozone: GeozoneHelper.getData(this.getState('geozoneId'))
		})
	}

	onDeleteGeozone() {
		this.setState({
			showDelete: true
		})	
	}

	onCancelDeleteGeozone() {
		this.setState({
			showDelete: false
		})	
	}

	onConfirmDeleteGeozone() {
		AppHelper.setBusy(true).
		then(function() {
			return GeozoneHelper.deleteGeozone(this.getState('geozoneId'))
		}.bind(this)).
		then(function (result) {
			return GeozoneHelper.getAuxiliaryGeozones(AuthHelper.getEntityId())
		}.bind(this)).
		then(function () {
			this.buildGeozoneData()
			this.updateMarkers()
			this.updateCircles()
			this.obj.state.showDelete = false
			this.obj.state.geozoneId = null
			this.forceUpdate()
			setTimeout(AppHelper.setBusy, 200)
		}.bind(this)).
		catch(function (error) {
			setTimeout(AppHelper.setBusy, 200)
			console.error('Geozone delete error')
			console.error(error)
		})
	}
}
let AuxiliaryZoneObj = new AuxiliaryZoneData()

AuxiliaryZoneObj.ICONS = ICONS
AuxiliaryZoneObj.INFO_TYPE = INFO_TYPE
export default AuxiliaryZoneObj

