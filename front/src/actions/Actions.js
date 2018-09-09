import { ActionBase } from 'ap-flux'
import { Utils, RestService } from 'ap-react-bootstrap'

let get_auth = new ActionBase({ name: 'GET_AUTH' })
let put_auth_password = new ActionBase({ name: 'PUT_AUTH_PASSWORD' })
let post_auth_register = new ActionBase({ name: 'POST_AUTH_REGISTER' })
let post_auth_recover = new ActionBase({ name: 'POST_AUTH_RECOVER' })
let post_auth_recover_check = new ActionBase({ name: 'POST_AUTH_RECOVER_CHECK' })
let put_auth_recover = new ActionBase({ name: 'PUT_AUTH_RECOVER' })
let post_auth_changemail = new ActionBase({ name: 'POST_AUTH_CHANGEMAIL' })
let post_auth_changemail_check = new ActionBase({ name: 'POST_AUTH_CHANGEMAIL_CHECK' })
let put_auth_changemail = new ActionBase({ name: 'PUT_AUTH_CHANGEMAIL' })
let post_auth_changemail_confirm = new ActionBase({ name: 'POST_AUTH_CHANGEMAIL_CONFIRM' })
let get_image = new ActionBase({ name: 'GET_IMAGE' })
let post_image = new ActionBase({ name: 'POST_IMAGE' })
let get_auxiliarys = new ActionBase({ name: 'GET_AUXILIARYS' })
let post_auxiliary = new ActionBase({ name: 'POST_AUXILIARY' })
let get_auxiliary = new ActionBase({ name: 'GET_AUXILIARY' })
let put_auxiliary = new ActionBase({ name: 'PUT_AUXILIARY' })
let post_auxiliary_questionary = new ActionBase({ name: 'POST_AUXILIARY_QUESTIONARY' })
let post_auxiliary_code = new ActionBase({ name: 'POST_AUXILIARY_CODE' })
let get_auxiliary_services = new ActionBase({ name: 'GET_AUXILIARY_SERVICES' })
let get_auxiliary_customers = new ActionBase({ name: 'GET_AUXILIARY_CUSTOMERS' })
let get_auxiliary_interventions = new ActionBase({ name: 'GET_AUXILIARY_INTERVENTIONS' })
let get_auxiliary_offers = new ActionBase({ name: 'GET_AUXILIARY_OFFERS' })
let get_auxiliary_missions = new ActionBase({ name: 'GET_AUXILIARY_MISSIONS' })
let get_auxiliary_indisponibilitys = new ActionBase({ name: 'GET_AUXILIARY_INDISPONIBILITYS' })
let get_auxiliary_geozones = new ActionBase({ name: 'GET_AUXILIARY_GEOZONES' })
let post_customer = new ActionBase({ name: 'POST_CUSTOMER' })
let get_customer = new ActionBase({ name: 'GET_CUSTOMER' })
let put_customer = new ActionBase({ name: 'PUT_CUSTOMER' })
let delete_customer = new ActionBase({ name: 'DELETE_CUSTOMER' })
let get_customer_interventions = new ActionBase({ name: 'GET_CUSTOMER_INTERVENTIONS' })
let post_geozone = new ActionBase({ name: 'POST_GEOZONE' })
let get_geozone = new ActionBase({ name: 'GET_GEOZONE' })
let put_geozone = new ActionBase({ name: 'PUT_GEOZONE' })
let delete_geozone = new ActionBase({ name: 'DELETE_GEOZONE' })
let get_help_topics = new ActionBase({ name: 'GET_HELP_TOPICS' })
let get_help_faqs = new ActionBase({ name: 'GET_HELP_FAQS' })
let post_indisponibility = new ActionBase({ name: 'POST_INDISPONIBILITY' })
let get_indisponibility = new ActionBase({ name: 'GET_INDISPONIBILITY' })
let put_indisponibility = new ActionBase({ name: 'PUT_INDISPONIBILITY' })
let delete_indisponibility = new ActionBase({ name: 'DELETE_INDISPONIBILITY' })
let post_intervention = new ActionBase({ name: 'POST_INTERVENTION' })
let get_intervention = new ActionBase({ name: 'GET_INTERVENTION' })
let put_intervention = new ActionBase({ name: 'PUT_INTERVENTION' })
let get_intervention_match = new ActionBase({ name: 'GET_INTERVENTION_MATCH' })
let put_intervention_cancel = new ActionBase({ name: 'PUT_INTERVENTION_CANCEL' })
let get_mission = new ActionBase({ name: 'GET_MISSION' })
let put_mission = new ActionBase({ name: 'PUT_MISSION' })
let delete_mission = new ActionBase({ name: 'DELETE_MISSION' })
let post_offer = new ActionBase({ name: 'POST_OFFER' })
let get_offer = new ActionBase({ name: 'GET_OFFER' })
let put_offer_accept = new ActionBase({ name: 'PUT_OFFER_ACCEPT' })
let put_offer_decline = new ActionBase({ name: 'PUT_OFFER_DECLINE' })
let put_offer_confirm = new ActionBase({ name: 'PUT_OFFER_CONFIRM' })
let get_services = new ActionBase({ name: 'GET_SERVICES' })
let post_service = new ActionBase({ name: 'POST_SERVICE' })
let get_service = new ActionBase({ name: 'GET_SERVICE' })
let put_service = new ActionBase({ name: 'PUT_SERVICE' })
let post_service_code = new ActionBase({ name: 'POST_SERVICE_CODE' })
let get_service_auxiliarys = new ActionBase({ name: 'GET_SERVICE_AUXILIARYS' })
let get_service_customers = new ActionBase({ name: 'GET_SERVICE_CUSTOMERS' })
let get_service_interventions = new ActionBase({ name: 'GET_SERVICE_INTERVENTIONS' })
let get_service_offers = new ActionBase({ name: 'GET_SERVICE_OFFERS' })
let get_service_missions = new ActionBase({ name: 'GET_SERVICE_MISSIONS' })

get_auth.do = function(args) {
	Utils.checkMembers(args, ['username', 'password']);
	var reqParam = {
		method: 'GET',
		url: '/auth',
		token : Utils.encode(args.username, args.password)
	};
	return RestService.request(reqParam);
}

put_auth_password.do = function(args) {
	Utils.checkMembers(args, ['data', 'token']);
	var reqParam = {
		method: 'PUT',
		url: '/auth/password',
		token : args.token,
		data: args.data
	};
	return RestService.request(reqParam);
}

post_auth_register.do = function(args) {
	Utils.checkMembers(args, ['data']);
	var reqParam = {
		method: 'POST',
		url: '/auth/register',
		data: args.data
	};
	return RestService.request(reqParam);
}

post_auth_recover.do = function(args) {
	Utils.checkMembers(args, ['data']);
	var reqParam = {
		method: 'POST',
		url: '/auth/recover',
		data: args.data
	};
	return RestService.request(reqParam);
}

post_auth_recover_check.do = function(args) {
	Utils.checkMembers(args, ['data']);
	var reqParam = {
		method: 'POST',
		url: '/auth/recover/check',
		data: args.data
	};
	return RestService.request(reqParam);
}

put_auth_recover.do = function(args) {
	Utils.checkMembers(args, ['data']);
	var reqParam = {
		method: 'PUT',
		url: '/auth/recover',
		data: args.data
	};
	return RestService.request(reqParam);
}

post_auth_changemail.do = function(args) {
	Utils.checkMembers(args, ['token']);
	var reqParam = {
		method: 'POST',
		url: '/auth/changemail',
		token : args.token
	};
	return RestService.request(reqParam);
}

post_auth_changemail_check.do = function(args) {
	Utils.checkMembers(args, ['data', 'token']);
	var reqParam = {
		method: 'POST',
		url: '/auth/changemail/check',
		token : args.token,
		data: args.data
	};
	return RestService.request(reqParam);
}

put_auth_changemail.do = function(args) {
	Utils.checkMembers(args, ['data', 'token']);
	var reqParam = {
		method: 'PUT',
		url: '/auth/changemail',
		token : args.token,
		data: args.data
	};
	return RestService.request(reqParam);
}

post_auth_changemail_confirm.do = function(args) {
	Utils.checkMembers(args, ['data', 'token']);
	var reqParam = {
		method: 'POST',
		url: '/auth/changemail/confirm',
		token : args.token,
		data: args.data
	};
	return RestService.request(reqParam);
}

get_image.do = function(args) {
	Utils.checkMembers(args, ['token', 'id']);
	var reqParam = {
		method: 'GET',
		token : args.token,
		url: '/image/' + args.id,
		type  : 'arraybuffer'
	};
	return RestService.request(reqParam);
}

post_image.do = function(args) {
	Utils.checkMembers(args, ['token', 'data']);
	var reqParam = {
		method: 'POST',
		token : args.token,
		url: '/image',
		data  : args.data
	};
	return RestService.sendData(reqParam);
}

get_auxiliarys.do = function(args) {
	Utils.checkMembers(args, ['token']);
	var reqParam = {
		method: 'GET',
		url: '/auxiliarys',
		query: args.query,
		token: args.token,
	};
	return RestService.request(reqParam);
}

post_auxiliary.do = function(args) {
	Utils.checkMembers(args, ['data']);
	var reqParam = {
		method: 'POST',
		url: '/auxiliarys',
		data: args.data,
	};
	return RestService.request(reqParam);
}

get_auxiliary.do = function(args) {
	Utils.checkMembers(args, ['token', 'id']);
	var reqParam = {
		method: 'GET',
		url: '/auxiliarys/' + args.id + '',
		token: args.token,
	};
	return RestService.request(reqParam);
}

put_auxiliary.do = function(args) {
	Utils.checkMembers(args, ['token', 'id', 'data']);
	var reqParam = {
		method: 'PUT',
		url: '/auxiliarys/' + args.id + '',
		data: args.data,
		token: args.token,
	};
	return RestService.request(reqParam);
}

post_auxiliary_questionary.do = function(args) {
	Utils.checkMembers(args, ['token', 'id', 'data']);
	var reqParam = {
		method: 'POST',
		url: '/auxiliarys/' + args.id + '/questionary',
		data: args.data,
		token: args.token,
	};
	return RestService.request(reqParam);
}

post_auxiliary_code.do = function(args) {
	Utils.checkMembers(args, ['token', 'id', 'data']);
	var reqParam = {
		method: 'POST',
		url: '/auxiliarys/' + args.id + '/code',
		data: args.data,
		token: args.token,
	};
	return RestService.request(reqParam);
}

get_auxiliary_services.do = function(args) {
	Utils.checkMembers(args, ['token', 'auxiliaryId']);
	var reqParam = {
		method: 'GET',
		url: '/auxiliarys/' + args.auxiliaryId + '/services',
		query: args.query,
		token: args.token,
	};
	return RestService.request(reqParam);
}

get_auxiliary_customers.do = function(args) {
	Utils.checkMembers(args, ['token', 'auxiliaryId']);
	var reqParam = {
		method: 'GET',
		url: '/auxiliarys/' + args.auxiliaryId + '/customers',
		query: args.query,
		token: args.token,
	};
	return RestService.request(reqParam);
}

get_auxiliary_interventions.do = function(args) {
	Utils.checkMembers(args, ['token', 'auxiliaryId']);
	var reqParam = {
		method: 'GET',
		url: '/auxiliarys/' + args.auxiliaryId + '/interventions',
		query: args.query,
		token: args.token,
	};
	return RestService.request(reqParam);
}

get_auxiliary_offers.do = function(args) {
	Utils.checkMembers(args, ['token', 'auxiliaryId']);
	var reqParam = {
		method: 'GET',
		url: '/auxiliarys/' + args.auxiliaryId + '/offers',
		query: args.query,
		token: args.token,
	};
	return RestService.request(reqParam);
}

get_auxiliary_missions.do = function(args) {
	Utils.checkMembers(args, ['token', 'auxiliaryId']);
	var reqParam = {
		method: 'GET',
		url: '/auxiliarys/' + args.auxiliaryId + '/missions',
		query: args.query,
		token: args.token,
	};
	return RestService.request(reqParam);
}

get_auxiliary_indisponibilitys.do = function(args) {
	Utils.checkMembers(args, ['token', 'auxiliaryId']);
	var reqParam = {
		method: 'GET',
		url: '/auxiliarys/' + args.auxiliaryId + '/indisponibilitys',
		query: args.query,
		token: args.token,
	};
	return RestService.request(reqParam);
}

get_auxiliary_geozones.do = function(args) {
	Utils.checkMembers(args, ['token', 'auxiliaryId']);
	var reqParam = {
		method: 'GET',
		url: '/auxiliarys/' + args.auxiliaryId + '/geozones',
		query: args.query,
		token: args.token,
	};
	return RestService.request(reqParam);
}

post_customer.do = function(args) {
	Utils.checkMembers(args, ['token', 'data']);
	var reqParam = {
		method: 'POST',
		url: '/customers',
		data: args.data,
		token: args.token,
	};
	return RestService.request(reqParam);
}

get_customer.do = function(args) {
	Utils.checkMembers(args, ['token', 'id']);
	var reqParam = {
		method: 'GET',
		url: '/customers/' + args.id + '',
		token: args.token,
	};
	return RestService.request(reqParam);
}

put_customer.do = function(args) {
	Utils.checkMembers(args, ['token', 'id', 'data']);
	var reqParam = {
		method: 'PUT',
		url: '/customers/' + args.id + '',
		data: args.data,
		token: args.token,
	};
	return RestService.request(reqParam);
}

delete_customer.do = function(args) {
	Utils.checkMembers(args, ['token', 'id']);
	var reqParam = {
		method: 'DELETE',
		url: '/customers/' + args.id + '',
		token: args.token,
	};
	return RestService.request(reqParam);
}

get_customer_interventions.do = function(args) {
	Utils.checkMembers(args, ['token', 'customerId']);
	var reqParam = {
		method: 'GET',
		url: '/customers/' + args.customerId + '/interventions',
		query: args.query,
		token: args.token,
	};
	return RestService.request(reqParam);
}

post_geozone.do = function(args) {
	Utils.checkMembers(args, ['token', 'data']);
	var reqParam = {
		method: 'POST',
		url: '/geozones',
		data: args.data,
		token: args.token,
	};
	return RestService.request(reqParam);
}

get_geozone.do = function(args) {
	Utils.checkMembers(args, ['token', 'id']);
	var reqParam = {
		method: 'GET',
		url: '/geozones/' + args.id + '',
		token: args.token,
	};
	return RestService.request(reqParam);
}

put_geozone.do = function(args) {
	Utils.checkMembers(args, ['token', 'id', 'data']);
	var reqParam = {
		method: 'PUT',
		url: '/geozones/' + args.id + '',
		data: args.data,
		token: args.token,
	};
	return RestService.request(reqParam);
}

delete_geozone.do = function(args) {
	Utils.checkMembers(args, ['token', 'id']);
	var reqParam = {
		method: 'DELETE',
		url: '/geozones/' + args.id + '',
		token: args.token,
	};
	return RestService.request(reqParam);
}

get_help_topics.do = function(args) {
	Utils.checkMembers(args, ['token']);
	var reqParam = {
		method: 'GET',
		url: '/help/topics',
		query: args.query,
		token: args.token,
	};
	return RestService.request(reqParam);
}

get_help_faqs.do = function(args) {
	Utils.checkMembers(args, ['token']);
	var reqParam = {
		method: 'GET',
		url: '/help/faqs',
		query: args.query,
		token: args.token,
	};
	return RestService.request(reqParam);
}

post_indisponibility.do = function(args) {
	Utils.checkMembers(args, ['token', 'data']);
	var reqParam = {
		method: 'POST',
		url: '/indisponibilitys',
		data: args.data,
		token: args.token,
	};
	return RestService.request(reqParam);
}

get_indisponibility.do = function(args) {
	Utils.checkMembers(args, ['token', 'id']);
	var reqParam = {
		method: 'GET',
		url: '/indisponibilitys/' + args.id + '',
		token: args.token,
	};
	return RestService.request(reqParam);
}

put_indisponibility.do = function(args) {
	Utils.checkMembers(args, ['token', 'id', 'data']);
	var reqParam = {
		method: 'PUT',
		url: '/indisponibilitys/' + args.id + '',
		data: args.data,
		token: args.token,
	};
	return RestService.request(reqParam);
}

delete_indisponibility.do = function(args) {
	Utils.checkMembers(args, ['token', 'id']);
	var reqParam = {
		method: 'DELETE',
		url: '/indisponibilitys/' + args.id + '',
		token: args.token,
	};
	return RestService.request(reqParam);
}

post_intervention.do = function(args) {
	Utils.checkMembers(args, ['token', 'data']);
	var reqParam = {
		method: 'POST',
		url: '/interventions',
		data: args.data,
		token: args.token,
	};
	return RestService.request(reqParam);
}

get_intervention.do = function(args) {
	Utils.checkMembers(args, ['token', 'id']);
	var reqParam = {
		method: 'GET',
		url: '/interventions/' + args.id + '',
		token: args.token,
	};
	return RestService.request(reqParam);
}

put_intervention.do = function(args) {
	Utils.checkMembers(args, ['token', 'id', 'data']);
	var reqParam = {
		method: 'PUT',
		url: '/interventions/' + args.id + '',
		data: args.data,
		token: args.token,
	};
	return RestService.request(reqParam);
}

get_intervention_match.do = function(args) {
	Utils.checkMembers(args, ['token', 'id']);
	var reqParam = {
		method: 'GET',
		url: '/interventions/' + args.id + '/match',
		query: args.query,
		token: args.token,
	};
	return RestService.request(reqParam);
}

put_intervention_cancel.do = function(args) {
	Utils.checkMembers(args, ['token', 'id', 'data']);
	var reqParam = {
		method: 'PUT',
		url: '/interventions/' + args.id + '/cancel',
		data: args.data,
		token: args.token,
	};
	return RestService.request(reqParam);
}

get_mission.do = function(args) {
	Utils.checkMembers(args, ['token', 'id']);
	var reqParam = {
		method: 'GET',
		url: '/missions/' + args.id + '',
		token: args.token,
	};
	return RestService.request(reqParam);
}

put_mission.do = function(args) {
	Utils.checkMembers(args, ['token', 'id', 'data']);
	var reqParam = {
		method: 'PUT',
		url: '/missions/' + args.id + '',
		data: args.data,
		token: args.token,
	};
	return RestService.request(reqParam);
}

delete_mission.do = function(args) {
	Utils.checkMembers(args, ['token', 'id']);
	var reqParam = {
		method: 'DELETE',
		url: '/missions/' + args.id + '',
		token: args.token,
	};
	return RestService.request(reqParam);
}

post_offer.do = function(args) {
	Utils.checkMembers(args, ['token', 'data']);
	var reqParam = {
		method: 'POST',
		url: '/offers',
		data: args.data,
		token: args.token,
	};
	return RestService.request(reqParam);
}

get_offer.do = function(args) {
	Utils.checkMembers(args, ['token', 'id']);
	var reqParam = {
		method: 'GET',
		url: '/offers/' + args.id + '',
		token: args.token,
	};
	return RestService.request(reqParam);
}

put_offer_accept.do = function(args) {
	Utils.checkMembers(args, ['token', 'id', 'data']);
	var reqParam = {
		method: 'PUT',
		url: '/offers/' + args.id + '/accept',
		data: args.data,
		token: args.token,
	};
	return RestService.request(reqParam);
}

put_offer_decline.do = function(args) {
	Utils.checkMembers(args, ['token', 'id', 'data']);
	var reqParam = {
		method: 'PUT',
		url: '/offers/' + args.id + '/decline',
		data: args.data,
		token: args.token,
	};
	return RestService.request(reqParam);
}

put_offer_confirm.do = function(args) {
	Utils.checkMembers(args, ['token', 'id', 'data']);
	var reqParam = {
		method: 'PUT',
		url: '/offers/' + args.id + '/confirm',
		data: args.data,
		token: args.token,
	};
	return RestService.request(reqParam);
}

get_services.do = function(args) {
	Utils.checkMembers(args, ['token']);
	var reqParam = {
		method: 'GET',
		url: '/services',
		query: args.query,
		token: args.token,
	};
	return RestService.request(reqParam);
}

post_service.do = function(args) {
	Utils.checkMembers(args, ['data']);
	var reqParam = {
		method: 'POST',
		url: '/services',
		data: args.data,
	};
	return RestService.request(reqParam);
}

get_service.do = function(args) {
	Utils.checkMembers(args, ['token', 'id']);
	var reqParam = {
		method: 'GET',
		url: '/services/' + args.id + '',
		token: args.token,
	};
	return RestService.request(reqParam);
}

put_service.do = function(args) {
	Utils.checkMembers(args, ['token', 'id', 'data']);
	var reqParam = {
		method: 'PUT',
		url: '/services/' + args.id + '',
		data: args.data,
		token: args.token,
	};
	return RestService.request(reqParam);
}

post_service_code.do = function(args) {
	Utils.checkMembers(args, ['token', 'id', 'data']);
	var reqParam = {
		method: 'POST',
		url: '/services/' + args.id + '/code',
		data: args.data,
		token: args.token,
	};
	return RestService.request(reqParam);
}

get_service_auxiliarys.do = function(args) {
	Utils.checkMembers(args, ['token', 'serviceId']);
	var reqParam = {
		method: 'GET',
		url: '/services/' + args.serviceId + '/auxiliarys',
		query: args.query,
		token: args.token,
	};
	return RestService.request(reqParam);
}

get_service_customers.do = function(args) {
	Utils.checkMembers(args, ['token', 'serviceId']);
	var reqParam = {
		method: 'GET',
		url: '/services/' + args.serviceId + '/customers',
		query: args.query,
		token: args.token,
	};
	return RestService.request(reqParam);
}

get_service_interventions.do = function(args) {
	Utils.checkMembers(args, ['token', 'serviceId']);
	var reqParam = {
		method: 'GET',
		url: '/services/' + args.serviceId + '/interventions',
		query: args.query,
		token: args.token,
	};
	return RestService.request(reqParam);
}

get_service_offers.do = function(args) {
	Utils.checkMembers(args, ['token', 'serviceId']);
	var reqParam = {
		method: 'GET',
		url: '/services/' + args.serviceId + '/offers',
		query: args.query,
		token: args.token,
	};
	return RestService.request(reqParam);
}

get_service_missions.do = function(args) {
	Utils.checkMembers(args, ['token', 'serviceId']);
	var reqParam = {
		method: 'GET',
		url: '/services/' + args.serviceId + '/missions',
		query: args.query,
		token: args.token,
	};
	return RestService.request(reqParam);
}

