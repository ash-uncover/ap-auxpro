import { Dispatcher, StoreBase } from 'ap-flux'
import { Utils } from 'ap-react-bootstrap'
import InterventionUtils from 'utils-lib/entities/InterventionUtils'

const AuthStore = new StoreBase ({ name: 'AUTH_STORE', content: {} })
const ImageStore = new StoreBase ({ name: 'IMAGE_STORE', content: {} })
const RestStore = new StoreBase ({ name: 'REST_STORE', content: {} })

AuthStore.handleGetAuth = function(result, params) {
	const content = AuthStore.content
	content.entityId = result.entityId
	content.username = result.username
	content.email = result.email
	content.type = result.type
	AuthStore.notify()
}

AuthStore.handlePostAuth = function(result, params) {
    console.log('---------------------')
    console.log(params)
    console.log(result)
    const content = AuthStore.content
    content.token = result.token
    AuthStore.storeToLocalStorage()
    AuthStore.notify()
}

AuthStore.handleLogout = function(result, params) {
	AuthStore.content = {}
	AuthStore.removeFromLocalStorage()
	AuthStore.notify()
}

AuthStore.handlePutPassword = function(result, params) {
	let content = AuthStore.content
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
	let content = ImageStore.content
	content[params.id] = source
	ImageStore.notify('/' + params.id)
}

RestStore.handleLogout = function(results, params) {
	RestStore.content = {}
}

RestStore.handleGetAuxiliarys = function(result, params) {
	let content = RestStore.content
	content.auxiliary = {};
	if (result && result.length)
		for (var i = 0; i < result.length; i++)
			content.auxiliary[result[i].id] = result[i];
	RestStore.notify('/auxiliary')
}

RestStore.handleGetAuxiliary = function(result, params) {
	let content = RestStore.content
	if (!content.auxiliary)
		content.auxiliary = {};
	content.auxiliary[result.id] = result;
	RestStore.notify('/auxiliary/' + result.id)
}

RestStore.handleGetAuxiliaryServices = function(result, params) {
	let content = RestStore.content
	content.service = {};
	if (result && result.length)
		for (var i = 0; i < result.length; i++)
			content.service[result[i].id] = result[i];
	RestStore.notify('/service')
}

RestStore.handleGetAuxiliaryCustomers = function(result, params) {
	let content = RestStore.content
	content.customer = {};
	if (result && result.length)
		for (var i = 0; i < result.length; i++)
			content.customer[result[i].id] = result[i];
	RestStore.notify('/customer')
}

RestStore.handleGetAuxiliaryInterventions = function(result, params) {
	let content = RestStore.content
	content.intervention = {};
	if (result && result.length)
		for (var i = 0; i < result.length; i++)
			content.intervention[result[i].id] = result[i];
	RestStore.notify('/intervention')
}

RestStore.handleGetAuxiliaryOffers = function(result, params) {
	let content = RestStore.content
	content.offer = {};
	if (result && result.length)
		for (var i = 0; i < result.length; i++)
			content.offer[result[i].id] = result[i];
	RestStore.notify('/offer')
}

RestStore.handleGetAuxiliaryMissions = function(result, params) {
	let content = RestStore.content
	content.mission = {};
	if (result && result.length)
		for (var i = 0; i < result.length; i++)
			content.mission[result[i].id] = result[i];
	RestStore.notify('/mission')
}

RestStore.handleGetAuxiliaryIndisponibilitys = function(result, params) {
	let content = RestStore.content
	content.indisponibility = {};
	if (result && result.length)
		for (var i = 0; i < result.length; i++)
			content.indisponibility[result[i].id] = result[i];
	RestStore.notify('/indisponibility')
}

RestStore.handleGetAuxiliaryGeozones = function(result, params) {
	let content = RestStore.content
	content.geozone = {};
	if (result && result.length)
		for (var i = 0; i < result.length; i++)
			content.geozone[result[i].id] = result[i];
	RestStore.notify('/geozone')
}

RestStore.handleGetCustomer = function(result, params) {
	let content = RestStore.content
	if (!content.customer)
		content.customer = {};
	content.customer[result.id] = result;
	RestStore.notify('/customer/' + result.id)
}

RestStore.handleGetCustomerInterventions = function(result, params) {
	let content = RestStore.content
	content.intervention = {};
	if (result && result.length)
		for (var i = 0; i < result.length; i++)
			content.intervention[result[i].id] = result[i];
	RestStore.notify('/intervention')
}

RestStore.handleGetGeozone = function(result, params) {
	let content = RestStore.content
	if (!content.geozone)
		content.geozone = {};
	content.geozone[result.id] = result;
	RestStore.notify('/geozone/' + result.id)
}

RestStore.handleGetHelpTopics = function(result, params) {
	let content = RestStore.content
	content.helptopic = {};
	if (result && result.length)
		for (var i = 0; i < result.length; i++)
			content.helptopic[result[i].id] = result[i];
	RestStore.notify('/helptopic')
}

RestStore.handleGetHelpFaqs = function(result, params) {
	let content = RestStore.content
	content.helpfaq = {};
	if (result && result.length)
		for (var i = 0; i < result.length; i++)
			content.helpfaq[result[i].id] = result[i];
	RestStore.notify('/helpfaq')
}

RestStore.handleGetIndisponibility = function(result, params) {
	let content = RestStore.content
	if (!content.indisponibility)
		content.indisponibility = {};
	content.indisponibility[result.id] = result;
	RestStore.notify('/indisponibility/' + result.id)
}

RestStore.handleGetIntervention = function(result, params) {
	let content = RestStore.content
	if (!content.intervention)
		content.intervention = {};
	content.intervention[result.id] = result;
	RestStore.notify('/intervention/' + result.id)
}

RestStore.handleGetInterventionMatch = function(result, params) {
	InterventionUtils.storeInterventionMatch(result, params)
}

RestStore.handleGetMission = function(result, params) {
	let content = RestStore.content
	if (!content.mission)
		content.mission = {};
	content.mission[result.id] = result;
	RestStore.notify('/mission/' + result.id)
}

RestStore.handleGetOffer = function(result, params) {
	let content = RestStore.content
	if (!content.offer)
		content.offer = {};
	content.offer[result.id] = result;
	RestStore.notify('/offer/' + result.id)
}

RestStore.handleGetServices = function(result, params) {
	let content = RestStore.content
	content.service = {};
	if (result && result.length)
		for (var i = 0; i < result.length; i++)
			content.service[result[i].id] = result[i];
	RestStore.notify('/service')
}

RestStore.handleGetService = function(result, params) {
	let content = RestStore.content
	if (!content.service)
		content.service = {};
	content.service[result.id] = result;
	RestStore.notify('/service/' + result.id)
}

RestStore.handleGetServiceAuxiliarys = function(result, params) {
	let content = RestStore.content
	content.auxiliary = {};
	if (result && result.length)
		for (var i = 0; i < result.length; i++)
			content.auxiliary[result[i].id] = result[i];
	RestStore.notify('/auxiliary')
}

RestStore.handleGetServiceCustomers = function(result, params) {
	let content = RestStore.content
	content.customer = {};
	if (result && result.length)
		for (var i = 0; i < result.length; i++)
			content.customer[result[i].id] = result[i];
	RestStore.notify('/customer')
}

RestStore.handleGetServiceInterventions = function(result, params) {
	let content = RestStore.content
	content.intervention = {};
	if (result && result.length)
		for (var i = 0; i < result.length; i++)
			content.intervention[result[i].id] = result[i];
	RestStore.notify('/intervention')
}

RestStore.handleGetServiceOffers = function(result, params) {
	let content = RestStore.content
	content.offer = {};
	if (result && result.length)
		for (var i = 0; i < result.length; i++)
			content.offer[result[i].id] = result[i];
	RestStore.notify('/offer')
}

RestStore.handleGetServiceMissions = function(result, params) {
	let content = RestStore.content
	content.mission = {};
	if (result && result.length)
		for (var i = 0; i < result.length; i++)
			content.mission[result[i].id] = result[i];
	RestStore.notify('/mission')
}

Dispatcher.register('GET_AUTH', AuthStore.handleGetAuth)
Dispatcher.register('POST_AUTH', AuthStore.handlePostAuth)
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
Dispatcher.register('GET_SERVICE', RestStore.handleGetService)
Dispatcher.register('GET_SERVICE_AUXILIARYS', RestStore.handleGetServiceAuxiliarys)
Dispatcher.register('GET_SERVICE_CUSTOMERS', RestStore.handleGetServiceCustomers)
Dispatcher.register('GET_SERVICE_INTERVENTIONS', RestStore.handleGetServiceInterventions)
Dispatcher.register('GET_SERVICE_OFFERS', RestStore.handleGetServiceOffers)
Dispatcher.register('GET_SERVICE_MISSIONS', RestStore.handleGetServiceMissions)
