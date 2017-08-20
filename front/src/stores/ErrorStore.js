import { Dispatcher, StoreBase } from 'ap-flux'

var ErrorStore = new StoreBase ({ name: 'ERROR_STORE', content: {} })

ErrorStore.handleLogout = function(results, params) {
	ErrorStore.setContent({});
}

ErrorStore.handleGetAuxiliarysSuccess = function(results, params) {
	delete ErrorStore._content.GET_AUXILIARYS;
	ErrorStore.notifyPath('/GET_AUXILIARYS');
}

ErrorStore.handleGetAuxiliarysError = function(error, params) {
	ErrorStore._content.GET_AUXILIARYS = error;
	ErrorStore.notifyPath('/GET_AUXILIARYS');
}

ErrorStore.handlePostAuxiliarySuccess = function(results, params) {
	delete ErrorStore._content.POST_AUXILIARY;
	ErrorStore.notifyPath('/POST_AUXILIARY');
}

ErrorStore.handlePostAuxiliaryError = function(error, params) {
	ErrorStore._content.POST_AUXILIARY = error;
	ErrorStore.notifyPath('/POST_AUXILIARY');
}

ErrorStore.handleGetAuxiliarySuccess = function(results, params) {
	delete ErrorStore._content.GET_AUXILIARY;
	ErrorStore.notifyPath('/GET_AUXILIARY');
}

ErrorStore.handleGetAuxiliaryError = function(error, params) {
	ErrorStore._content.GET_AUXILIARY = error;
	ErrorStore.notifyPath('/GET_AUXILIARY');
}

ErrorStore.handlePutAuxiliarySuccess = function(results, params) {
	delete ErrorStore._content.PUT_AUXILIARY;
	ErrorStore.notifyPath('/PUT_AUXILIARY');
}

ErrorStore.handlePutAuxiliaryError = function(error, params) {
	ErrorStore._content.PUT_AUXILIARY = error;
	ErrorStore.notifyPath('/PUT_AUXILIARY');
}

ErrorStore.handleDeleteAuxiliarySuccess = function(results, params) {
	delete ErrorStore._content.DELETE_AUXILIARY;
	ErrorStore.notifyPath('/DELETE_AUXILIARY');
}

ErrorStore.handleDeleteAuxiliaryError = function(error, params) {
	ErrorStore._content.DELETE_AUXILIARY = error;
	ErrorStore.notifyPath('/DELETE_AUXILIARY');
}

ErrorStore.handlePostAuxiliaryQuestionarySuccess = function(results, params) {
	delete ErrorStore._content.POST_AUXILIARY_QUESTIONARY;
	ErrorStore.notifyPath('/POST_AUXILIARY_QUESTIONARY');
}

ErrorStore.handlePostAuxiliaryQuestionaryError = function(error, params) {
	ErrorStore._content.POST_AUXILIARY_QUESTIONARY = error;
	ErrorStore.notifyPath('/POST_AUXILIARY_QUESTIONARY');
}

ErrorStore.handleGetAuxiliaryServicesSuccess = function(results, params) {
	delete ErrorStore._content.GET_AUXILIARY_SERVICES;
	ErrorStore.notifyPath('/GET_AUXILIARY_SERVICES');
}

ErrorStore.handleGetAuxiliaryServicesError = function(error, params) {
	ErrorStore._content.GET_AUXILIARY_SERVICES = error;
	ErrorStore.notifyPath('/GET_AUXILIARY_SERVICES');
}

ErrorStore.handleGetAuxiliaryCustomersSuccess = function(results, params) {
	delete ErrorStore._content.GET_AUXILIARY_CUSTOMERS;
	ErrorStore.notifyPath('/GET_AUXILIARY_CUSTOMERS');
}

ErrorStore.handleGetAuxiliaryCustomersError = function(error, params) {
	ErrorStore._content.GET_AUXILIARY_CUSTOMERS = error;
	ErrorStore.notifyPath('/GET_AUXILIARY_CUSTOMERS');
}

ErrorStore.handleGetAuxiliaryInterventionsSuccess = function(results, params) {
	delete ErrorStore._content.GET_AUXILIARY_INTERVENTIONS;
	ErrorStore.notifyPath('/GET_AUXILIARY_INTERVENTIONS');
}

ErrorStore.handleGetAuxiliaryInterventionsError = function(error, params) {
	ErrorStore._content.GET_AUXILIARY_INTERVENTIONS = error;
	ErrorStore.notifyPath('/GET_AUXILIARY_INTERVENTIONS');
}

ErrorStore.handleGetAuxiliaryOffersSuccess = function(results, params) {
	delete ErrorStore._content.GET_AUXILIARY_OFFERS;
	ErrorStore.notifyPath('/GET_AUXILIARY_OFFERS');
}

ErrorStore.handleGetAuxiliaryOffersError = function(error, params) {
	ErrorStore._content.GET_AUXILIARY_OFFERS = error;
	ErrorStore.notifyPath('/GET_AUXILIARY_OFFERS');
}

ErrorStore.handleGetAuxiliaryMissionsSuccess = function(results, params) {
	delete ErrorStore._content.GET_AUXILIARY_MISSIONS;
	ErrorStore.notifyPath('/GET_AUXILIARY_MISSIONS');
}

ErrorStore.handleGetAuxiliaryMissionsError = function(error, params) {
	ErrorStore._content.GET_AUXILIARY_MISSIONS = error;
	ErrorStore.notifyPath('/GET_AUXILIARY_MISSIONS');
}

ErrorStore.handleGetAuxiliaryIndisponibilitysSuccess = function(results, params) {
	delete ErrorStore._content.GET_AUXILIARY_INDISPONIBILITYS;
	ErrorStore.notifyPath('/GET_AUXILIARY_INDISPONIBILITYS');
}

ErrorStore.handleGetAuxiliaryIndisponibilitysError = function(error, params) {
	ErrorStore._content.GET_AUXILIARY_INDISPONIBILITYS = error;
	ErrorStore.notifyPath('/GET_AUXILIARY_INDISPONIBILITYS');
}

ErrorStore.handleGetAuxiliaryGeozonesSuccess = function(results, params) {
	delete ErrorStore._content.GET_AUXILIARY_GEOZONES;
	ErrorStore.notifyPath('/GET_AUXILIARY_GEOZONES');
}

ErrorStore.handleGetAuxiliaryGeozonesError = function(error, params) {
	ErrorStore._content.GET_AUXILIARY_GEOZONES = error;
	ErrorStore.notifyPath('/GET_AUXILIARY_GEOZONES');
}

ErrorStore.handlePostCustomerSuccess = function(results, params) {
	delete ErrorStore._content.POST_CUSTOMER;
	ErrorStore.notifyPath('/POST_CUSTOMER');
}

ErrorStore.handlePostCustomerError = function(error, params) {
	ErrorStore._content.POST_CUSTOMER = error;
	ErrorStore.notifyPath('/POST_CUSTOMER');
}

ErrorStore.handleGetCustomerSuccess = function(results, params) {
	delete ErrorStore._content.GET_CUSTOMER;
	ErrorStore.notifyPath('/GET_CUSTOMER');
}

ErrorStore.handleGetCustomerError = function(error, params) {
	ErrorStore._content.GET_CUSTOMER = error;
	ErrorStore.notifyPath('/GET_CUSTOMER');
}

ErrorStore.handlePutCustomerSuccess = function(results, params) {
	delete ErrorStore._content.PUT_CUSTOMER;
	ErrorStore.notifyPath('/PUT_CUSTOMER');
}

ErrorStore.handlePutCustomerError = function(error, params) {
	ErrorStore._content.PUT_CUSTOMER = error;
	ErrorStore.notifyPath('/PUT_CUSTOMER');
}

ErrorStore.handleDeleteCustomerSuccess = function(results, params) {
	delete ErrorStore._content.DELETE_CUSTOMER;
	ErrorStore.notifyPath('/DELETE_CUSTOMER');
}

ErrorStore.handleDeleteCustomerError = function(error, params) {
	ErrorStore._content.DELETE_CUSTOMER = error;
	ErrorStore.notifyPath('/DELETE_CUSTOMER');
}

ErrorStore.handleGetCustomerInterventionsSuccess = function(results, params) {
	delete ErrorStore._content.GET_CUSTOMER_INTERVENTIONS;
	ErrorStore.notifyPath('/GET_CUSTOMER_INTERVENTIONS');
}

ErrorStore.handleGetCustomerInterventionsError = function(error, params) {
	ErrorStore._content.GET_CUSTOMER_INTERVENTIONS = error;
	ErrorStore.notifyPath('/GET_CUSTOMER_INTERVENTIONS');
}

ErrorStore.handlePostGeozoneSuccess = function(results, params) {
	delete ErrorStore._content.POST_GEOZONE;
	ErrorStore.notifyPath('/POST_GEOZONE');
}

ErrorStore.handlePostGeozoneError = function(error, params) {
	ErrorStore._content.POST_GEOZONE = error;
	ErrorStore.notifyPath('/POST_GEOZONE');
}

ErrorStore.handleGetGeozoneSuccess = function(results, params) {
	delete ErrorStore._content.GET_GEOZONE;
	ErrorStore.notifyPath('/GET_GEOZONE');
}

ErrorStore.handleGetGeozoneError = function(error, params) {
	ErrorStore._content.GET_GEOZONE = error;
	ErrorStore.notifyPath('/GET_GEOZONE');
}

ErrorStore.handlePutGeozoneSuccess = function(results, params) {
	delete ErrorStore._content.PUT_GEOZONE;
	ErrorStore.notifyPath('/PUT_GEOZONE');
}

ErrorStore.handlePutGeozoneError = function(error, params) {
	ErrorStore._content.PUT_GEOZONE = error;
	ErrorStore.notifyPath('/PUT_GEOZONE');
}

ErrorStore.handleDeleteGeozoneSuccess = function(results, params) {
	delete ErrorStore._content.DELETE_GEOZONE;
	ErrorStore.notifyPath('/DELETE_GEOZONE');
}

ErrorStore.handleDeleteGeozoneError = function(error, params) {
	ErrorStore._content.DELETE_GEOZONE = error;
	ErrorStore.notifyPath('/DELETE_GEOZONE');
}

ErrorStore.handleGetHelpTopicsSuccess = function(results, params) {
	delete ErrorStore._content.GET_HELP_TOPICS;
	ErrorStore.notifyPath('/GET_HELP_TOPICS');
}

ErrorStore.handleGetHelpTopicsError = function(error, params) {
	ErrorStore._content.GET_HELP_TOPICS = error;
	ErrorStore.notifyPath('/GET_HELP_TOPICS');
}

ErrorStore.handleGetHelpFaqsSuccess = function(results, params) {
	delete ErrorStore._content.GET_HELP_FAQS;
	ErrorStore.notifyPath('/GET_HELP_FAQS');
}

ErrorStore.handleGetHelpFaqsError = function(error, params) {
	ErrorStore._content.GET_HELP_FAQS = error;
	ErrorStore.notifyPath('/GET_HELP_FAQS');
}

ErrorStore.handlePostIndisponibilitySuccess = function(results, params) {
	delete ErrorStore._content.POST_INDISPONIBILITY;
	ErrorStore.notifyPath('/POST_INDISPONIBILITY');
}

ErrorStore.handlePostIndisponibilityError = function(error, params) {
	ErrorStore._content.POST_INDISPONIBILITY = error;
	ErrorStore.notifyPath('/POST_INDISPONIBILITY');
}

ErrorStore.handleGetIndisponibilitySuccess = function(results, params) {
	delete ErrorStore._content.GET_INDISPONIBILITY;
	ErrorStore.notifyPath('/GET_INDISPONIBILITY');
}

ErrorStore.handleGetIndisponibilityError = function(error, params) {
	ErrorStore._content.GET_INDISPONIBILITY = error;
	ErrorStore.notifyPath('/GET_INDISPONIBILITY');
}

ErrorStore.handlePutIndisponibilitySuccess = function(results, params) {
	delete ErrorStore._content.PUT_INDISPONIBILITY;
	ErrorStore.notifyPath('/PUT_INDISPONIBILITY');
}

ErrorStore.handlePutIndisponibilityError = function(error, params) {
	ErrorStore._content.PUT_INDISPONIBILITY = error;
	ErrorStore.notifyPath('/PUT_INDISPONIBILITY');
}

ErrorStore.handleDeleteIndisponibilitySuccess = function(results, params) {
	delete ErrorStore._content.DELETE_INDISPONIBILITY;
	ErrorStore.notifyPath('/DELETE_INDISPONIBILITY');
}

ErrorStore.handleDeleteIndisponibilityError = function(error, params) {
	ErrorStore._content.DELETE_INDISPONIBILITY = error;
	ErrorStore.notifyPath('/DELETE_INDISPONIBILITY');
}

ErrorStore.handlePostInterventionSuccess = function(results, params) {
	delete ErrorStore._content.POST_INTERVENTION;
	ErrorStore.notifyPath('/POST_INTERVENTION');
}

ErrorStore.handlePostInterventionError = function(error, params) {
	ErrorStore._content.POST_INTERVENTION = error;
	ErrorStore.notifyPath('/POST_INTERVENTION');
}

ErrorStore.handleGetInterventionSuccess = function(results, params) {
	delete ErrorStore._content.GET_INTERVENTION;
	ErrorStore.notifyPath('/GET_INTERVENTION');
}

ErrorStore.handleGetInterventionError = function(error, params) {
	ErrorStore._content.GET_INTERVENTION = error;
	ErrorStore.notifyPath('/GET_INTERVENTION');
}

ErrorStore.handleGetInterventionMatchSuccess = function(results, params) {
	delete ErrorStore._content.GET_INTERVENTION_MATCH;
	ErrorStore.notifyPath('/GET_INTERVENTION_MATCH');
}

ErrorStore.handleGetInterventionMatchError = function(error, params) {
	ErrorStore._content.GET_INTERVENTION_MATCH = error;
	ErrorStore.notifyPath('/GET_INTERVENTION_MATCH');
}

ErrorStore.handlePutInterventionSuccess = function(results, params) {
	delete ErrorStore._content.PUT_INTERVENTION;
	ErrorStore.notifyPath('/PUT_INTERVENTION');
}

ErrorStore.handlePutInterventionError = function(error, params) {
	ErrorStore._content.PUT_INTERVENTION = error;
	ErrorStore.notifyPath('/PUT_INTERVENTION');
}

ErrorStore.handleDeleteInterventionSuccess = function(results, params) {
	delete ErrorStore._content.DELETE_INTERVENTION;
	ErrorStore.notifyPath('/DELETE_INTERVENTION');
}

ErrorStore.handleDeleteInterventionError = function(error, params) {
	ErrorStore._content.DELETE_INTERVENTION = error;
	ErrorStore.notifyPath('/DELETE_INTERVENTION');
}

ErrorStore.handleGetInterventionOffersSuccess = function(results, params) {
	delete ErrorStore._content.GET_INTERVENTION_OFFERS;
	ErrorStore.notifyPath('/GET_INTERVENTION_OFFERS');
}

ErrorStore.handleGetInterventionOffersError = function(error, params) {
	ErrorStore._content.GET_INTERVENTION_OFFERS = error;
	ErrorStore.notifyPath('/GET_INTERVENTION_OFFERS');
}

ErrorStore.handleGetInterventionMissionsSuccess = function(results, params) {
	delete ErrorStore._content.GET_INTERVENTION_MISSIONS;
	ErrorStore.notifyPath('/GET_INTERVENTION_MISSIONS');
}

ErrorStore.handleGetInterventionMissionsError = function(error, params) {
	ErrorStore._content.GET_INTERVENTION_MISSIONS = error;
	ErrorStore.notifyPath('/GET_INTERVENTION_MISSIONS');
}

ErrorStore.handleGetMissionSuccess = function(results, params) {
	delete ErrorStore._content.GET_MISSION;
	ErrorStore.notifyPath('/GET_MISSION');
}

ErrorStore.handleGetMissionError = function(error, params) {
	ErrorStore._content.GET_MISSION = error;
	ErrorStore.notifyPath('/GET_MISSION');
}

ErrorStore.handlePutMissionSuccess = function(results, params) {
	delete ErrorStore._content.PUT_MISSION;
	ErrorStore.notifyPath('/PUT_MISSION');
}

ErrorStore.handlePutMissionError = function(error, params) {
	ErrorStore._content.PUT_MISSION = error;
	ErrorStore.notifyPath('/PUT_MISSION');
}

ErrorStore.handleDeleteMissionSuccess = function(results, params) {
	delete ErrorStore._content.DELETE_MISSION;
	ErrorStore.notifyPath('/DELETE_MISSION');
}

ErrorStore.handleDeleteMissionError = function(error, params) {
	ErrorStore._content.DELETE_MISSION = error;
	ErrorStore.notifyPath('/DELETE_MISSION');
}

ErrorStore.handlePostOfferSuccess = function(results, params) {
	delete ErrorStore._content.POST_OFFER;
	ErrorStore.notifyPath('/POST_OFFER');
}

ErrorStore.handlePostOfferError = function(error, params) {
	ErrorStore._content.POST_OFFER = error;
	ErrorStore.notifyPath('/POST_OFFER');
}

ErrorStore.handleGetOfferSuccess = function(results, params) {
	delete ErrorStore._content.GET_OFFER;
	ErrorStore.notifyPath('/GET_OFFER');
}

ErrorStore.handleGetOfferError = function(error, params) {
	ErrorStore._content.GET_OFFER = error;
	ErrorStore.notifyPath('/GET_OFFER');
}

ErrorStore.handlePutOfferSuccess = function(results, params) {
	delete ErrorStore._content.PUT_OFFER;
	ErrorStore.notifyPath('/PUT_OFFER');
}

ErrorStore.handlePutOfferError = function(error, params) {
	ErrorStore._content.PUT_OFFER = error;
	ErrorStore.notifyPath('/PUT_OFFER');
}

ErrorStore.handleDeleteOfferSuccess = function(results, params) {
	delete ErrorStore._content.DELETE_OFFER;
	ErrorStore.notifyPath('/DELETE_OFFER');
}

ErrorStore.handleDeleteOfferError = function(error, params) {
	ErrorStore._content.DELETE_OFFER = error;
	ErrorStore.notifyPath('/DELETE_OFFER');
}

ErrorStore.handleGetServicesSuccess = function(results, params) {
	delete ErrorStore._content.GET_SERVICES;
	ErrorStore.notifyPath('/GET_SERVICES');
}

ErrorStore.handleGetServicesError = function(error, params) {
	ErrorStore._content.GET_SERVICES = error;
	ErrorStore.notifyPath('/GET_SERVICES');
}

ErrorStore.handlePostServiceSuccess = function(results, params) {
	delete ErrorStore._content.POST_SERVICE;
	ErrorStore.notifyPath('/POST_SERVICE');
}

ErrorStore.handlePostServiceError = function(error, params) {
	ErrorStore._content.POST_SERVICE = error;
	ErrorStore.notifyPath('/POST_SERVICE');
}

ErrorStore.handleGetServiceSuccess = function(results, params) {
	delete ErrorStore._content.GET_SERVICE;
	ErrorStore.notifyPath('/GET_SERVICE');
}

ErrorStore.handleGetServiceError = function(error, params) {
	ErrorStore._content.GET_SERVICE = error;
	ErrorStore.notifyPath('/GET_SERVICE');
}

ErrorStore.handlePutServiceSuccess = function(results, params) {
	delete ErrorStore._content.PUT_SERVICE;
	ErrorStore.notifyPath('/PUT_SERVICE');
}

ErrorStore.handlePutServiceError = function(error, params) {
	ErrorStore._content.PUT_SERVICE = error;
	ErrorStore.notifyPath('/PUT_SERVICE');
}

ErrorStore.handleDeleteServiceSuccess = function(results, params) {
	delete ErrorStore._content.DELETE_SERVICE;
	ErrorStore.notifyPath('/DELETE_SERVICE');
}

ErrorStore.handleDeleteServiceError = function(error, params) {
	ErrorStore._content.DELETE_SERVICE = error;
	ErrorStore.notifyPath('/DELETE_SERVICE');
}

ErrorStore.handleGetServiceAuxiliarysSuccess = function(results, params) {
	delete ErrorStore._content.GET_SERVICE_AUXILIARYS;
	ErrorStore.notifyPath('/GET_SERVICE_AUXILIARYS');
}

ErrorStore.handleGetServiceAuxiliarysError = function(error, params) {
	ErrorStore._content.GET_SERVICE_AUXILIARYS = error;
	ErrorStore.notifyPath('/GET_SERVICE_AUXILIARYS');
}

ErrorStore.handleGetServiceCustomersSuccess = function(results, params) {
	delete ErrorStore._content.GET_SERVICE_CUSTOMERS;
	ErrorStore.notifyPath('/GET_SERVICE_CUSTOMERS');
}

ErrorStore.handleGetServiceCustomersError = function(error, params) {
	ErrorStore._content.GET_SERVICE_CUSTOMERS = error;
	ErrorStore.notifyPath('/GET_SERVICE_CUSTOMERS');
}

ErrorStore.handleGetServiceInterventionsSuccess = function(results, params) {
	delete ErrorStore._content.GET_SERVICE_INTERVENTIONS;
	ErrorStore.notifyPath('/GET_SERVICE_INTERVENTIONS');
}

ErrorStore.handleGetServiceInterventionsError = function(error, params) {
	ErrorStore._content.GET_SERVICE_INTERVENTIONS = error;
	ErrorStore.notifyPath('/GET_SERVICE_INTERVENTIONS');
}

ErrorStore.handleGetServiceOffersSuccess = function(results, params) {
	delete ErrorStore._content.GET_SERVICE_OFFERS;
	ErrorStore.notifyPath('/GET_SERVICE_OFFERS');
}

ErrorStore.handleGetServiceOffersError = function(error, params) {
	ErrorStore._content.GET_SERVICE_OFFERS = error;
	ErrorStore.notifyPath('/GET_SERVICE_OFFERS');
}

ErrorStore.handleGetServiceMissionsSuccess = function(results, params) {
	delete ErrorStore._content.GET_SERVICE_MISSIONS;
	ErrorStore.notifyPath('/GET_SERVICE_MISSIONS');
}

ErrorStore.handleGetServiceMissionsError = function(error, params) {
	ErrorStore._content.GET_SERVICE_MISSIONS = error;
	ErrorStore.notifyPath('/GET_SERVICE_MISSIONS');
}

ErrorStore.handleGetAuthSuccess = function(results, params) {
	delete ErrorStore._content.GET_AUTH;
	ErrorStore.notifyPath('/GET_AUTH');
}

ErrorStore.handleGetAuthError = function(error, params) {
	ErrorStore._content.GET_AUTH = error;
	ErrorStore.notifyPath('/GET_AUTH');
}

ErrorStore.handlePutAuthPasswordSuccess = function(results, params) {
	delete ErrorStore._content.PUT_AUTH_PASSWORD;
	ErrorStore.notifyPath('/PUT_AUTH_PASSWORD');
}

ErrorStore.handlePutAuthPasswordError = function(error, params) {
	ErrorStore._content.PUT_AUTH_PASSWORD = error;
	ErrorStore.notifyPath('/PUT_AUTH_PASSWORD');
}

ErrorStore.handlePostAuthRegisterSuccess = function(results, params) {
	delete ErrorStore._content.POST_AUTH_REGISTER;
	ErrorStore.notifyPath('/POST_AUTH_REGISTER');
}

ErrorStore.handlePostAuthRegisterError = function(error, params) {
	ErrorStore._content.POST_AUTH_REGISTER = error;
	ErrorStore.notifyPath('/POST_AUTH_REGISTER');
}

ErrorStore.handlePostAuthRecoverSuccess = function(results, params) {
	delete ErrorStore._content.POST_AUTH_RECOVER;
	ErrorStore.notifyPath('/POST_AUTH_RECOVER');
}

ErrorStore.handlePostAuthRecoverError = function(error, params) {
	ErrorStore._content.POST_AUTH_RECOVER = error;
	ErrorStore.notifyPath('/POST_AUTH_RECOVER');
}

ErrorStore.handlePostAuthRecoverCheckSuccess = function(results, params) {
	delete ErrorStore._content.POST_AUTH_RECOVER_CHECK;
	ErrorStore.notifyPath('/POST_AUTH_RECOVER_CHECK');
}

ErrorStore.handlePostAuthRecoverCheckError = function(error, params) {
	ErrorStore._content.POST_AUTH_RECOVER_CHECK = error;
	ErrorStore.notifyPath('/POST_AUTH_RECOVER_CHECK');
}

ErrorStore.handlePutAuthRecoverSuccess = function(results, params) {
	delete ErrorStore._content.PUT_AUTH_RECOVER;
	ErrorStore.notifyPath('/PUT_AUTH_RECOVER');
}

ErrorStore.handlePutAuthRecoverError = function(error, params) {
	ErrorStore._content.PUT_AUTH_RECOVER = error;
	ErrorStore.notifyPath('/PUT_AUTH_RECOVER');
}

ErrorStore.handlePostAuthChangemailSuccess = function(results, params) {
	delete ErrorStore._content.POST_AUTH_CHANGEMAIL;
	ErrorStore.notifyPath('/POST_AUTH_CHANGEMAIL');
}

ErrorStore.handlePostAuthChangemailError = function(error, params) {
	ErrorStore._content.POST_AUTH_CHANGEMAIL = error;
	ErrorStore.notifyPath('/POST_AUTH_CHANGEMAIL');
}

ErrorStore.handlePostAuthChangemailCheckSuccess = function(results, params) {
	delete ErrorStore._content.POST_AUTH_CHANGEMAIL_CHECK;
	ErrorStore.notifyPath('/POST_AUTH_CHANGEMAIL_CHECK');
}

ErrorStore.handlePostAuthChangemailCheckError = function(error, params) {
	ErrorStore._content.POST_AUTH_CHANGEMAIL_CHECK = error;
	ErrorStore.notifyPath('/POST_AUTH_CHANGEMAIL_CHECK');
}

ErrorStore.handlePostAuthChangemailSuccess = function(results, params) {
	delete ErrorStore._content.POST_AUTH_CHANGEMAIL;
	ErrorStore.notifyPath('/POST_AUTH_CHANGEMAIL');
}

ErrorStore.handlePostAuthChangemailError = function(error, params) {
	ErrorStore._content.POST_AUTH_CHANGEMAIL = error;
	ErrorStore.notifyPath('/POST_AUTH_CHANGEMAIL');
}

ErrorStore.handlePostAuthChangemailConfirmSuccess = function(results, params) {
	delete ErrorStore._content.POST_AUTH_CHANGEMAIL_CONFIRM;
	ErrorStore.notifyPath('/POST_AUTH_CHANGEMAIL_CONFIRM');
}

ErrorStore.handlePostAuthChangemailConfirmError = function(error, params) {
	ErrorStore._content.POST_AUTH_CHANGEMAIL_CONFIRM = error;
	ErrorStore.notifyPath('/POST_AUTH_CHANGEMAIL_CONFIRM');
}

ErrorStore.handleGetImageSuccess = function(results, params) {
	delete ErrorStore._content.GET_IMAGE;
	ErrorStore.notifyPath('/GET_IMAGE');
}

ErrorStore.handleGetImageError = function(error, params) {
	ErrorStore._content.GET_IMAGE = error;
	ErrorStore.notifyPath('/GET_IMAGE');
}

ErrorStore.handlePostImageSuccess = function(results, params) {
	delete ErrorStore._content.POST_IMAGE;
	ErrorStore.notifyPath('/POST_IMAGE');
}

ErrorStore.handlePostImageError = function(error, params) {
	ErrorStore._content.POST_IMAGE = error;
	ErrorStore.notifyPath('/POST_IMAGE');
}

Dispatcher.register('LOGOUT', ErrorStore.handleLogout)
Dispatcher.register('GET_AUXILIARYS', ErrorStore.handleGetAuxiliarysSuccess, ErrorStore.handleGetAuxiliarysError)
Dispatcher.register('POST_AUXILIARY', ErrorStore.handlePostAuxiliarySuccess, ErrorStore.handlePostAuxiliaryError)
Dispatcher.register('GET_AUXILIARY', ErrorStore.handleGetAuxiliarySuccess, ErrorStore.handleGetAuxiliaryError)
Dispatcher.register('PUT_AUXILIARY', ErrorStore.handlePutAuxiliarySuccess, ErrorStore.handlePutAuxiliaryError)
Dispatcher.register('DELETE_AUXILIARY', ErrorStore.handleDeleteAuxiliarySuccess, ErrorStore.handleDeleteAuxiliaryError)
Dispatcher.register('POST_AUXILIARY_QUESTIONARY', ErrorStore.handlePostAuxiliaryQuestionarySuccess, ErrorStore.handlePostAuxiliaryQuestionaryError)
Dispatcher.register('GET_AUXILIARY_SERVICES', ErrorStore.handleGetAuxiliaryServicesSuccess, ErrorStore.handleGetAuxiliaryServicesError)
Dispatcher.register('GET_AUXILIARY_CUSTOMERS', ErrorStore.handleGetAuxiliaryCustomersSuccess, ErrorStore.handleGetAuxiliaryCustomersError)
Dispatcher.register('GET_AUXILIARY_INTERVENTIONS', ErrorStore.handleGetAuxiliaryInterventionsSuccess, ErrorStore.handleGetAuxiliaryInterventionsError)
Dispatcher.register('GET_AUXILIARY_OFFERS', ErrorStore.handleGetAuxiliaryOffersSuccess, ErrorStore.handleGetAuxiliaryOffersError)
Dispatcher.register('GET_AUXILIARY_MISSIONS', ErrorStore.handleGetAuxiliaryMissionsSuccess, ErrorStore.handleGetAuxiliaryMissionsError)
Dispatcher.register('GET_AUXILIARY_INDISPONIBILITYS', ErrorStore.handleGetAuxiliaryIndisponibilitysSuccess, ErrorStore.handleGetAuxiliaryIndisponibilitysError)
Dispatcher.register('GET_AUXILIARY_GEOZONES', ErrorStore.handleGetAuxiliaryGeozonesSuccess, ErrorStore.handleGetAuxiliaryGeozonesError)
Dispatcher.register('POST_CUSTOMER', ErrorStore.handlePostCustomerSuccess, ErrorStore.handlePostCustomerError)
Dispatcher.register('GET_CUSTOMER', ErrorStore.handleGetCustomerSuccess, ErrorStore.handleGetCustomerError)
Dispatcher.register('PUT_CUSTOMER', ErrorStore.handlePutCustomerSuccess, ErrorStore.handlePutCustomerError)
Dispatcher.register('DELETE_CUSTOMER', ErrorStore.handleDeleteCustomerSuccess, ErrorStore.handleDeleteCustomerError)
Dispatcher.register('GET_CUSTOMER_INTERVENTIONS', ErrorStore.handleGetCustomerInterventionsSuccess, ErrorStore.handleGetCustomerInterventionsError)
Dispatcher.register('POST_GEOZONE', ErrorStore.handlePostGeozoneSuccess, ErrorStore.handlePostGeozoneError)
Dispatcher.register('GET_GEOZONE', ErrorStore.handleGetGeozoneSuccess, ErrorStore.handleGetGeozoneError)
Dispatcher.register('PUT_GEOZONE', ErrorStore.handlePutGeozoneSuccess, ErrorStore.handlePutGeozoneError)
Dispatcher.register('DELETE_GEOZONE', ErrorStore.handleDeleteGeozoneSuccess, ErrorStore.handleDeleteGeozoneError)
Dispatcher.register('GET_HELP_TOPICS', ErrorStore.handleGetHelpTopicsSuccess, ErrorStore.handleGetHelpTopicsError)
Dispatcher.register('GET_HELP_FAQS', ErrorStore.handleGetHelpFaqsSuccess, ErrorStore.handleGetHelpFaqsError)
Dispatcher.register('POST_INDISPONIBILITY', ErrorStore.handlePostIndisponibilitySuccess, ErrorStore.handlePostIndisponibilityError)
Dispatcher.register('GET_INDISPONIBILITY', ErrorStore.handleGetIndisponibilitySuccess, ErrorStore.handleGetIndisponibilityError)
Dispatcher.register('PUT_INDISPONIBILITY', ErrorStore.handlePutIndisponibilitySuccess, ErrorStore.handlePutIndisponibilityError)
Dispatcher.register('DELETE_INDISPONIBILITY', ErrorStore.handleDeleteIndisponibilitySuccess, ErrorStore.handleDeleteIndisponibilityError)
Dispatcher.register('POST_INTERVENTION', ErrorStore.handlePostInterventionSuccess, ErrorStore.handlePostInterventionError)
Dispatcher.register('GET_INTERVENTION', ErrorStore.handleGetInterventionSuccess, ErrorStore.handleGetInterventionError)
Dispatcher.register('GET_INTERVENTION_MATCH', ErrorStore.handleGetInterventionMatchSuccess, ErrorStore.handleGetInterventionMatchError)
Dispatcher.register('PUT_INTERVENTION', ErrorStore.handlePutInterventionSuccess, ErrorStore.handlePutInterventionError)
Dispatcher.register('DELETE_INTERVENTION', ErrorStore.handleDeleteInterventionSuccess, ErrorStore.handleDeleteInterventionError)
Dispatcher.register('GET_INTERVENTION_OFFERS', ErrorStore.handleGetInterventionOffersSuccess, ErrorStore.handleGetInterventionOffersError)
Dispatcher.register('GET_INTERVENTION_MISSIONS', ErrorStore.handleGetInterventionMissionsSuccess, ErrorStore.handleGetInterventionMissionsError)
Dispatcher.register('GET_MISSION', ErrorStore.handleGetMissionSuccess, ErrorStore.handleGetMissionError)
Dispatcher.register('PUT_MISSION', ErrorStore.handlePutMissionSuccess, ErrorStore.handlePutMissionError)
Dispatcher.register('DELETE_MISSION', ErrorStore.handleDeleteMissionSuccess, ErrorStore.handleDeleteMissionError)
Dispatcher.register('POST_OFFER', ErrorStore.handlePostOfferSuccess, ErrorStore.handlePostOfferError)
Dispatcher.register('GET_OFFER', ErrorStore.handleGetOfferSuccess, ErrorStore.handleGetOfferError)
Dispatcher.register('PUT_OFFER', ErrorStore.handlePutOfferSuccess, ErrorStore.handlePutOfferError)
Dispatcher.register('DELETE_OFFER', ErrorStore.handleDeleteOfferSuccess, ErrorStore.handleDeleteOfferError)
Dispatcher.register('GET_SERVICES', ErrorStore.handleGetServicesSuccess, ErrorStore.handleGetServicesError)
Dispatcher.register('POST_SERVICE', ErrorStore.handlePostServiceSuccess, ErrorStore.handlePostServiceError)
Dispatcher.register('GET_SERVICE', ErrorStore.handleGetServiceSuccess, ErrorStore.handleGetServiceError)
Dispatcher.register('PUT_SERVICE', ErrorStore.handlePutServiceSuccess, ErrorStore.handlePutServiceError)
Dispatcher.register('DELETE_SERVICE', ErrorStore.handleDeleteServiceSuccess, ErrorStore.handleDeleteServiceError)
Dispatcher.register('GET_SERVICE_AUXILIARYS', ErrorStore.handleGetServiceAuxiliarysSuccess, ErrorStore.handleGetServiceAuxiliarysError)
Dispatcher.register('GET_SERVICE_CUSTOMERS', ErrorStore.handleGetServiceCustomersSuccess, ErrorStore.handleGetServiceCustomersError)
Dispatcher.register('GET_SERVICE_INTERVENTIONS', ErrorStore.handleGetServiceInterventionsSuccess, ErrorStore.handleGetServiceInterventionsError)
Dispatcher.register('GET_SERVICE_OFFERS', ErrorStore.handleGetServiceOffersSuccess, ErrorStore.handleGetServiceOffersError)
Dispatcher.register('GET_SERVICE_MISSIONS', ErrorStore.handleGetServiceMissionsSuccess, ErrorStore.handleGetServiceMissionsError)
Dispatcher.register('GET_AUTH', ErrorStore.handleGetAuthSuccess, ErrorStore.handleGetAuthError)
Dispatcher.register('PUT_AUTH_PASSWORD', ErrorStore.handlePutAuthPasswordSuccess, ErrorStore.handlePutAuthPasswordError)
Dispatcher.register('POST_AUTH_REGISTER', ErrorStore.handlePostAuthRegisterSuccess, ErrorStore.handlePostAuthRegisterError)
Dispatcher.register('POST_AUTH_RECOVER', ErrorStore.handlePostAuthRecoverSuccess, ErrorStore.handlePostAuthRecoverError)
Dispatcher.register('POST_AUTH_RECOVER_CHECK', ErrorStore.handlePostAuthRecoverCheckSuccess, ErrorStore.handlePostAuthRecoverCheckError)
Dispatcher.register('PUT_AUTH_RECOVER', ErrorStore.handlePutAuthRecoverSuccess, ErrorStore.handlePutAuthRecoverError)
Dispatcher.register('POST_AUTH_CHANGEMAIL', ErrorStore.handlePostAuthChangemailSuccess, ErrorStore.handlePostAuthChangemailError)
Dispatcher.register('POST_AUTH_CHANGEMAIL_CHECK', ErrorStore.handlePostAuthChangemailCheckSuccess, ErrorStore.handlePostAuthChangemailCheckError)
Dispatcher.register('POST_AUTH_CHANGEMAIL', ErrorStore.handlePostAuthChangemailSuccess, ErrorStore.handlePostAuthChangemailError)
Dispatcher.register('POST_AUTH_CHANGEMAIL_CONFIRM', ErrorStore.handlePostAuthChangemailConfirmSuccess, ErrorStore.handlePostAuthChangemailConfirmError)
Dispatcher.register('GET_IMAGE', ErrorStore.handleGetImageSuccess, ErrorStore.handleGetImageError)
Dispatcher.register('POST_IMAGE', ErrorStore.handlePostImageSuccess, ErrorStore.handlePostImageError)
