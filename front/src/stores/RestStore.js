import { Dispatcher, StoreBase } from 'ap-flux'
import { Utils } from 'ap-react-bootstrap'
import InterventionUtils from 'utils-lib/entities/InterventionUtils'

var AuthStore = new StoreBase ({ name: 'AUTH_STORE', content: {} })
var ImageStore = new StoreBase ({ name: 'IMAGE_STORE', content: {} })
var RestStore = new StoreBase ({ name: 'REST_STORE', content: {} })

AuthStore.handleGetAuth = function(result, params) {
	let content = AuthStore.getContent()
	content.entityId = result.entityId
	content.username = result.username
	content.email = result.email
	content.type = result.type
	content.token = Utils.encode(params.username, params.password)
	AuthStore.storeToLocalStorage()
	AuthStore.notify()
}

AuthStore.handleLogout = function(result, params) {
	AuthStore.setContent({})
	AuthStore.removeFromLocalStorage()
	AuthStore.notify()
}

AuthStore.handlePutPassword = function(result, params) {
	let content = AuthStore.getContent()
	content.token = Utils.encode(content.username, params.data.password)
	AuthStore.storeToLocalStorage()
	AuthStore.notify()
}

ImageStore.handleGetImage = function(result, params) {
	let uarr = new Uint8Array(result.content)
	let strings = [], chunksize = 0xffff
	let len = uarr.length
	for (let i = 0; i * chunksize < len; i++){
		strings.push(String.fromCharCode.apply(null, uarr.subarray(i * chunksize, (i + 1) * chunksize)))
	}
	let btoaResult = btoa(strings.join(''))
	let source = 'data:' + result.type + ';base64,' + btoaResult
	let content = ImageStore.getContent()
	content[params.id] = source
	ImageStore.notifyPath('/' + params.id)
}

RestStore.handleLogout = function(results, params) {
	RestStore.setContent({});
}

RestStore.handleGetAuxiliarys = function(result, params) {
	let content = RestStore.getContent()
	content.auxiliary = {};
	if (result && result.length)
		for (var i = 0; i < result.length; i++)
			content.auxiliary[result[i].id] = result[i];
	RestStore.notifyPath('/auxiliary')
}

RestStore.handleGetAuxiliary = function(result, params) {
	let content = RestStore.getContent()
	if (!content.auxiliary)
		content.auxiliary = {};
	content.auxiliary[result.id] = result;
	RestStore.notifyPath('/auxiliary/' + result.id)
}

RestStore.handleGetAuxiliaryServices = function(result, params) {
	let content = RestStore.getContent()
	content.service = {};
	if (result && result.length)
		for (var i = 0; i < result.length; i++)
			content.service[result[i].id] = result[i];
	RestStore.notifyPath('/service')
}

RestStore.handleGetAuxiliaryCustomers = function(result, params) {
	let content = RestStore.getContent()
	content.customer = {};
	if (result && result.length)
		for (var i = 0; i < result.length; i++)
			content.customer[result[i].id] = result[i];
	RestStore.notifyPath('/customer')
}

RestStore.handleGetAuxiliaryInterventions = function(result, params) {
	let content = RestStore.getContent()
	content.intervention = {};
	if (result && result.length)
		for (var i = 0; i < result.length; i++)
			content.intervention[result[i].id] = result[i];
	RestStore.notifyPath('/intervention')
}

RestStore.handleGetAuxiliaryOffers = function(result, params) {
	let content = RestStore.getContent()
	content.offer = {};
	if (result && result.length)
		for (var i = 0; i < result.length; i++)
			content.offer[result[i].id] = result[i];
	RestStore.notifyPath('/offer')
}

RestStore.handleGetAuxiliaryMissions = function(result, params) {
	let content = RestStore.getContent()
	content.mission = {};
	if (result && result.length)
		for (var i = 0; i < result.length; i++)
			content.mission[result[i].id] = result[i];
	RestStore.notifyPath('/mission')
}

RestStore.handleGetAuxiliaryIndisponibilitys = function(result, params) {
	let content = RestStore.getContent()
	content.indisponibility = {};
	if (result && result.length)
		for (var i = 0; i < result.length; i++)
			content.indisponibility[result[i].id] = result[i];
	RestStore.notifyPath('/indisponibility')
}

RestStore.handleGetAuxiliaryGeozones = function(result, params) {
	let content = RestStore.getContent()
	content.geozone = {};
	if (result && result.length)
		for (var i = 0; i < result.length; i++)
			content.geozone[result[i].id] = result[i];
	RestStore.notifyPath('/geozone')
}

RestStore.handleGetCustomer = function(result, params) {
	let content = RestStore.getContent()
	if (!content.customer)
		content.customer = {};
	content.customer[result.id] = result;
	RestStore.notifyPath('/customer/' + result.id)
}

RestStore.handleGetCustomerInterventions = function(result, params) {
	let content = RestStore.getContent()
	content.intervention = {};
	if (result && result.length)
		for (var i = 0; i < result.length; i++)
			content.intervention[result[i].id] = result[i];
	RestStore.notifyPath('/intervention')
}

RestStore.handleGetGeozone = function(result, params) {
	let content = RestStore.getContent()
	if (!content.geozone)
		content.geozone = {};
	content.geozone[result.id] = result;
	RestStore.notifyPath('/geozone/' + result.id)
}

RestStore.handleGetHelpTopics = function(result, params) {
	let content = RestStore.getContent()
	content.helptopic = {};
	if (result && result.length)
		for (var i = 0; i < result.length; i++)
			content.helptopic[result[i].id] = result[i];
	RestStore.notifyPath('/helptopic')
}

RestStore.handleGetHelpFaqs = function(result, params) {
	let content = RestStore.getContent()
	content.helpfaq = {};
	if (result && result.length)
		for (var i = 0; i < result.length; i++)
			content.helpfaq[result[i].id] = result[i];
	RestStore.notifyPath('/helpfaq')
}

RestStore.handleGetIndisponibility = function(result, params) {
	let content = RestStore.getContent()
	if (!content.indisponibility)
		content.indisponibility = {};
	content.indisponibility[result.id] = result;
	RestStore.notifyPath('/indisponibility/' + result.id)
}

RestStore.handleGetIntervention = function(result, params) {
	let content = RestStore.getContent()
	if (!content.intervention)
		content.intervention = {};
	content.intervention[result.id] = result;
	RestStore.notifyPath('/intervention/' + result.id)
}

RestStore.handleGetInterventionMatch = function(result, params) {
	InterventionUtils.storeInterventionMatch(result, params)
}

RestStore.handleGetMission = function(result, params) {
	let content = RestStore.getContent()
	if (!content.mission)
		content.mission = {};
	content.mission[result.id] = result;
	RestStore.notifyPath('/mission/' + result.id)
}

RestStore.handleGetOffer = function(result, params) {
	let content = RestStore.getContent()
	if (!content.offer)
		content.offer = {};
	content.offer[result.id] = result;
	RestStore.notifyPath('/offer/' + result.id)
}

RestStore.handleGetServices = function(result, params) {
	let content = RestStore.getContent()
	content.service = {};
	if (result && result.length)
		for (var i = 0; i < result.length; i++)
			content.service[result[i].id] = result[i];
	RestStore.notifyPath('/service')
}

RestStore.handleGetServiceValid = function(result, params) {
	let content = RestStore.getContent()
	content.service = {};
	if (result && result.length)
		for (var i = 0; i < result.length; i++)
			content.service[result[i].id] = result[i];
	RestStore.notifyPath('/service')
}

RestStore.handleGetService = function(result, params) {
	let content = RestStore.getContent()
	if (!content.service)
		content.service = {};
	content.service[result.id] = result;
	RestStore.notifyPath('/service/' + result.id)
}

RestStore.handleGetServiceAuxiliarys = function(result, params) {
	let content = RestStore.getContent()
	content.auxiliary = {};
	if (result && result.length)
		for (var i = 0; i < result.length; i++)
			content.auxiliary[result[i].id] = result[i];
	RestStore.notifyPath('/auxiliary')
}

RestStore.handleGetServiceCustomers = function(result, params) {
	let content = RestStore.getContent()
	content.customer = {};
	if (result && result.length)
		for (var i = 0; i < result.length; i++)
			content.customer[result[i].id] = result[i];
	RestStore.notifyPath('/customer')
}

RestStore.handleGetServiceInterventions = function(result, params) {
	let content = RestStore.getContent()
	content.intervention = {};
	if (result && result.length)
		for (var i = 0; i < result.length; i++)
			content.intervention[result[i].id] = result[i];
	RestStore.notifyPath('/intervention')
}

RestStore.handleGetServiceOffers = function(result, params) {
	let content = RestStore.getContent()
	content.offer = {};
	if (result && result.length)
		for (var i = 0; i < result.length; i++)
			content.offer[result[i].id] = result[i];
	RestStore.notifyPath('/offer')
}

RestStore.handleGetServiceMissions = function(result, params) {
	let content = RestStore.getContent()
	content.mission = {};
	if (result && result.length)
		for (var i = 0; i < result.length; i++)
			content.mission[result[i].id] = result[i];
	RestStore.notifyPath('/mission')
}

Dispatcher.register('GET_AUTH', AuthStore.handleGetAuth)
Dispatcher.register('LOGOUT', AuthStore.handleLogout)
Dispatcher.register('PUT_AUTH_PASSWORD', AuthStore.handlePutPassword)
Dispatcher.register('GET_IMAGE', ImageStore.handleGetImage)
Dispatcher.register('LOGOUT', RestStore.handleLogout)
Dispatcher.register('GET_AUXILIARYS', RestStore.handleGetAuxiliarys)
Dispatcher.register('GET_AUXILIARY', RestStore.handleGetAuxiliary)
Dispatcher.register('GET_AUXILIARY_SERVICES', RestStore.handleGetAuxiliaryServices)
Dispatcher.register('GET_AUXILIARY_CUSTOMERS', RestStore.handleGetAuxiliaryCustomers)
Dispatcher.register('GET_AUXILIARY_INTERVENTIONS', RestStore.handleGetAuxiliaryInterventions)
Dispatcher.register('GET_AUXILIARY_OFFERS', RestStore.handleGetAuxiliaryOffers)
Dispatcher.register('GET_AUXILIARY_MISSIONS', RestStore.handleGetAuxiliaryMissions)
Dispatcher.register('GET_AUXILIARY_INDISPONIBILITYS', RestStore.handleGetAuxiliaryIndisponibilitys)
Dispatcher.register('GET_AUXILIARY_GEOZONES', RestStore.handleGetAuxiliaryGeozones)
Dispatcher.register('GET_CUSTOMER', RestStore.handleGetCustomer)
Dispatcher.register('GET_CUSTOMER_INTERVENTIONS', RestStore.handleGetCustomerInterventions)
Dispatcher.register('GET_GEOZONE', RestStore.handleGetGeozone)
Dispatcher.register('GET_HELP_TOPICS', RestStore.handleGetHelpTopics)
Dispatcher.register('GET_HELP_FAQS', RestStore.handleGetHelpFaqs)
Dispatcher.register('GET_INDISPONIBILITY', RestStore.handleGetIndisponibility)
Dispatcher.register('GET_INTERVENTION', RestStore.handleGetIntervention)
Dispatcher.register('GET_INTERVENTION_MATCH', RestStore.handleGetInterventionMatch)
Dispatcher.register('GET_MISSION', RestStore.handleGetMission)
Dispatcher.register('GET_OFFER', RestStore.handleGetOffer)
Dispatcher.register('GET_SERVICES', RestStore.handleGetServices)
Dispatcher.register('GET_SERVICE_VALID', RestStore.handleGetServiceValid)
Dispatcher.register('GET_SERVICE', RestStore.handleGetService)
Dispatcher.register('GET_SERVICE_AUXILIARYS', RestStore.handleGetServiceAuxiliarys)
Dispatcher.register('GET_SERVICE_CUSTOMERS', RestStore.handleGetServiceCustomers)
Dispatcher.register('GET_SERVICE_INTERVENTIONS', RestStore.handleGetServiceInterventions)
Dispatcher.register('GET_SERVICE_OFFERS', RestStore.handleGetServiceOffers)
Dispatcher.register('GET_SERVICE_MISSIONS', RestStore.handleGetServiceMissions)
