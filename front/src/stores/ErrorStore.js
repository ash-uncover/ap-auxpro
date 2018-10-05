import { Dispatcher, StoreBase } from 'ap-flux'

const ErrorStore = new StoreBase ({ name: 'ERROR_STORE', content: {} })

ErrorStore.handleLogout = function(results, params) {
	ErrorStore.content = {}
}

ErrorStore.handleGetAuxiliarysSuccess = function(results, params) {
	delete ErrorStore._content.GET_AUXILIARYS;
	ErrorStore.notify('/GET_AUXILIARYS');
}

ErrorStore.handleGetAuxiliarysError = function(error, params) {
	ErrorStore._content.GET_AUXILIARYS = error;
	ErrorStore.notify('/GET_AUXILIARYS');
}

ErrorStore.handlePostAuxiliarySuccess = function(results, params) {
	delete ErrorStore._content.POST_AUXILIARY;
	ErrorStore.notify('/POST_AUXILIARY');
}

ErrorStore.handlePostAuxiliaryError = function(error, params) {
	ErrorStore._content.POST_AUXILIARY = error;
	ErrorStore.notify('/POST_AUXILIARY');
}

ErrorStore.handleGetAuxiliarySuccess = function(results, params) {
	delete ErrorStore._content.GET_AUXILIARY;
	ErrorStore.notify('/GET_AUXILIARY');
}

ErrorStore.handleGetAuxiliaryError = function(error, params) {
	ErrorStore._content.GET_AUXILIARY = error;
	ErrorStore.notify('/GET_AUXILIARY');
}

ErrorStore.handlePutAuxiliarySuccess = function(results, params) {
	delete ErrorStore._content.PUT_AUXILIARY;
	ErrorStore.notify('/PUT_AUXILIARY');
}

ErrorStore.handlePutAuxiliaryError = function(error, params) {
	ErrorStore._content.PUT_AUXILIARY = error;
	ErrorStore.notify('/PUT_AUXILIARY');
}

ErrorStore.handlePostAuxiliaryCodeSuccess = function(results, params) {
	delete ErrorStore._content.POST_AUXILIARY_CODE;
	ErrorStore.notify('/POST_AUXILIARY_CODE');
}

ErrorStore.handlePostAuxiliaryCodeError = function(error, params) {
	ErrorStore._content.POST_AUXILIARY_CODE = error;
	ErrorStore.notify('/POST_AUXILIARY_CODE');
}

ErrorStore.handleGetAuxiliaryServicesSuccess = function(results, params) {
	delete ErrorStore._content.GET_AUXILIARY_SERVICES;
	ErrorStore.notify('/GET_AUXILIARY_SERVICES');
}

ErrorStore.handleGetAuxiliaryServicesError = function(error, params) {
	ErrorStore._content.GET_AUXILIARY_SERVICES = error;
	ErrorStore.notify('/GET_AUXILIARY_SERVICES');
}

ErrorStore.handleGetAuxiliaryCustomersSuccess = function(results, params) {
	delete ErrorStore._content.GET_AUXILIARY_CUSTOMERS;
	ErrorStore.notify('/GET_AUXILIARY_CUSTOMERS');
}

ErrorStore.handleGetAuxiliaryCustomersError = function(error, params) {
	ErrorStore._content.GET_AUXILIARY_CUSTOMERS = error;
	ErrorStore.notify('/GET_AUXILIARY_CUSTOMERS');
}

ErrorStore.handleGetAuxiliaryInterventionsSuccess = function(results, params) {
	delete ErrorStore._content.GET_AUXILIARY_INTERVENTIONS;
	ErrorStore.notify('/GET_AUXILIARY_INTERVENTIONS');
}

ErrorStore.handleGetAuxiliaryInterventionsError = function(error, params) {
	ErrorStore._content.GET_AUXILIARY_INTERVENTIONS = error;
	ErrorStore.notify('/GET_AUXILIARY_INTERVENTIONS');
}

ErrorStore.handleGetAuxiliaryOffersSuccess = function(results, params) {
	delete ErrorStore._content.GET_AUXILIARY_OFFERS;
	ErrorStore.notify('/GET_AUXILIARY_OFFERS');
}

ErrorStore.handleGetAuxiliaryOffersError = function(error, params) {
	ErrorStore._content.GET_AUXILIARY_OFFERS = error;
	ErrorStore.notify('/GET_AUXILIARY_OFFERS');
}

ErrorStore.handleGetAuxiliaryMissionsSuccess = function(results, params) {
	delete ErrorStore._content.GET_AUXILIARY_MISSIONS;
	ErrorStore.notify('/GET_AUXILIARY_MISSIONS');
}

ErrorStore.handleGetAuxiliaryMissionsError = function(error, params) {
	ErrorStore._content.GET_AUXILIARY_MISSIONS = error;
	ErrorStore.notify('/GET_AUXILIARY_MISSIONS');
}

ErrorStore.handleGetAuxiliaryIndisponibilitysSuccess = function(results, params) {
	delete ErrorStore._content.GET_AUXILIARY_INDISPONIBILITYS;
	ErrorStore.notify('/GET_AUXILIARY_INDISPONIBILITYS');
}

ErrorStore.handleGetAuxiliaryIndisponibilitysError = function(error, params) {
	ErrorStore._content.GET_AUXILIARY_INDISPONIBILITYS = error;
	ErrorStore.notify('/GET_AUXILIARY_INDISPONIBILITYS');
}

ErrorStore.handleGetAuxiliaryGeozonesSuccess = function(results, params) {
	delete ErrorStore._content.GET_AUXILIARY_GEOZONES;
	ErrorStore.notify('/GET_AUXILIARY_GEOZONES');
}

ErrorStore.handleGetAuxiliaryGeozonesError = function(error, params) {
	ErrorStore._content.GET_AUXILIARY_GEOZONES = error;
	ErrorStore.notify('/GET_AUXILIARY_GEOZONES');
}

ErrorStore.handlePostCustomerSuccess = function(results, params) {
	delete ErrorStore._content.POST_CUSTOMER;
	ErrorStore.notify('/POST_CUSTOMER');
}

ErrorStore.handlePostCustomerError = function(error, params) {
	ErrorStore._content.POST_CUSTOMER = error;
	ErrorStore.notify('/POST_CUSTOMER');
}

ErrorStore.handleGetCustomerSuccess = function(results, params) {
	delete ErrorStore._content.GET_CUSTOMER;
	ErrorStore.notify('/GET_CUSTOMER');
}

ErrorStore.handleGetCustomerError = function(error, params) {
	ErrorStore._content.GET_CUSTOMER = error;
	ErrorStore.notify('/GET_CUSTOMER');
}

ErrorStore.handlePutCustomerSuccess = function(results, params) {
	delete ErrorStore._content.PUT_CUSTOMER;
	ErrorStore.notify('/PUT_CUSTOMER');
}

ErrorStore.handlePutCustomerError = function(error, params) {
	ErrorStore._content.PUT_CUSTOMER = error;
	ErrorStore.notify('/PUT_CUSTOMER');
}

ErrorStore.handleDeleteCustomerSuccess = function(results, params) {
	delete ErrorStore._content.DELETE_CUSTOMER;
	ErrorStore.notify('/DELETE_CUSTOMER');
}

ErrorStore.handleDeleteCustomerError = function(error, params) {
	ErrorStore._content.DELETE_CUSTOMER = error;
	ErrorStore.notify('/DELETE_CUSTOMER');
}

ErrorStore.handleGetCustomerInterventionsSuccess = function(results, params) {
	delete ErrorStore._content.GET_CUSTOMER_INTERVENTIONS;
	ErrorStore.notify('/GET_CUSTOMER_INTERVENTIONS');
}

ErrorStore.handleGetCustomerInterventionsError = function(error, params) {
	ErrorStore._content.GET_CUSTOMER_INTERVENTIONS = error;
	ErrorStore.notify('/GET_CUSTOMER_INTERVENTIONS');
}

ErrorStore.handlePostGeozoneSuccess = function(results, params) {
	delete ErrorStore._content.POST_GEOZONE;
	ErrorStore.notify('/POST_GEOZONE');
}

ErrorStore.handlePostGeozoneError = function(error, params) {
	ErrorStore._content.POST_GEOZONE = error;
	ErrorStore.notify('/POST_GEOZONE');
}

ErrorStore.handleGetGeozoneSuccess = function(results, params) {
	delete ErrorStore._content.GET_GEOZONE;
	ErrorStore.notify('/GET_GEOZONE');
}

ErrorStore.handleGetGeozoneError = function(error, params) {
	ErrorStore._content.GET_GEOZONE = error;
	ErrorStore.notify('/GET_GEOZONE');
}

ErrorStore.handlePutGeozoneSuccess = function(results, params) {
	delete ErrorStore._content.PUT_GEOZONE;
	ErrorStore.notify('/PUT_GEOZONE');
}

ErrorStore.handlePutGeozoneError = function(error, params) {
	ErrorStore._content.PUT_GEOZONE = error;
	ErrorStore.notify('/PUT_GEOZONE');
}

ErrorStore.handleDeleteGeozoneSuccess = function(results, params) {
	delete ErrorStore._content.DELETE_GEOZONE;
	ErrorStore.notify('/DELETE_GEOZONE');
}

ErrorStore.handleDeleteGeozoneError = function(error, params) {
	ErrorStore._content.DELETE_GEOZONE = error;
	ErrorStore.notify('/DELETE_GEOZONE');
}

ErrorStore.handleGetHelpTopicsSuccess = function(results, params) {
	delete ErrorStore._content.GET_HELP_TOPICS;
	ErrorStore.notify('/GET_HELP_TOPICS');
}

ErrorStore.handleGetHelpTopicsError = function(error, params) {
	ErrorStore._content.GET_HELP_TOPICS = error;
	ErrorStore.notify('/GET_HELP_TOPICS');
}

ErrorStore.handleGetHelpFaqsSuccess = function(results, params) {
	delete ErrorStore._content.GET_HELP_FAQS;
	ErrorStore.notify('/GET_HELP_FAQS');
}

ErrorStore.handleGetHelpFaqsError = function(error, params) {
	ErrorStore._content.GET_HELP_FAQS = error;
	ErrorStore.notify('/GET_HELP_FAQS');
}

ErrorStore.handlePostIndisponibilitySuccess = function(results, params) {
	delete ErrorStore._content.POST_INDISPONIBILITY;
	ErrorStore.notify('/POST_INDISPONIBILITY');
}

ErrorStore.handlePostIndisponibilityError = function(error, params) {
	ErrorStore._content.POST_INDISPONIBILITY = error;
	ErrorStore.notify('/POST_INDISPONIBILITY');
}

ErrorStore.handleGetIndisponibilitySuccess = function(results, params) {
	delete ErrorStore._content.GET_INDISPONIBILITY;
	ErrorStore.notify('/GET_INDISPONIBILITY');
}

ErrorStore.handleGetIndisponibilityError = function(error, params) {
	ErrorStore._content.GET_INDISPONIBILITY = error;
	ErrorStore.notify('/GET_INDISPONIBILITY');
}

ErrorStore.handlePutIndisponibilitySuccess = function(results, params) {
	delete ErrorStore._content.PUT_INDISPONIBILITY;
	ErrorStore.notify('/PUT_INDISPONIBILITY');
}

ErrorStore.handlePutIndisponibilityError = function(error, params) {
	ErrorStore._content.PUT_INDISPONIBILITY = error;
	ErrorStore.notify('/PUT_INDISPONIBILITY');
}

ErrorStore.handleDeleteIndisponibilitySuccess = function(results, params) {
	delete ErrorStore._content.DELETE_INDISPONIBILITY;
	ErrorStore.notify('/DELETE_INDISPONIBILITY');
}

ErrorStore.handleDeleteIndisponibilityError = function(error, params) {
	ErrorStore._content.DELETE_INDISPONIBILITY = error;
	ErrorStore.notify('/DELETE_INDISPONIBILITY');
}

ErrorStore.handlePostInterventionSuccess = function(results, params) {
	delete ErrorStore._content.POST_INTERVENTION;
	ErrorStore.notify('/POST_INTERVENTION');
}

ErrorStore.handlePostInterventionError = function(error, params) {
	ErrorStore._content.POST_INTERVENTION = error;
	ErrorStore.notify('/POST_INTERVENTION');
}

ErrorStore.handleGetInterventionSuccess = function(results, params) {
	delete ErrorStore._content.GET_INTERVENTION;
	ErrorStore.notify('/GET_INTERVENTION');
}

ErrorStore.handleGetInterventionError = function(error, params) {
	ErrorStore._content.GET_INTERVENTION = error;
	ErrorStore.notify('/GET_INTERVENTION');
}

ErrorStore.handlePutInterventionSuccess = function(results, params) {
	delete ErrorStore._content.PUT_INTERVENTION;
	ErrorStore.notify('/PUT_INTERVENTION');
}

ErrorStore.handlePutInterventionError = function(error, params) {
	ErrorStore._content.PUT_INTERVENTION = error;
	ErrorStore.notify('/PUT_INTERVENTION');
}

ErrorStore.handleGetInterventionMatchSuccess = function(results, params) {
	delete ErrorStore._content.GET_INTERVENTION_MATCH;
	ErrorStore.notify('/GET_INTERVENTION_MATCH');
}

ErrorStore.handleGetInterventionMatchError = function(error, params) {
	ErrorStore._content.GET_INTERVENTION_MATCH = error;
	ErrorStore.notify('/GET_INTERVENTION_MATCH');
}

ErrorStore.handlePutInterventionCancelSuccess = function(results, params) {
	delete ErrorStore._content.PUT_INTERVENTION_CANCEL;
	ErrorStore.notify('/PUT_INTERVENTION_CANCEL');
}

ErrorStore.handlePutInterventionCancelError = function(error, params) {
	ErrorStore._content.PUT_INTERVENTION_CANCEL = error;
	ErrorStore.notify('/PUT_INTERVENTION_CANCEL');
}

ErrorStore.handleGetMissionSuccess = function(results, params) {
	delete ErrorStore._content.GET_MISSION;
	ErrorStore.notify('/GET_MISSION');
}

ErrorStore.handleGetMissionError = function(error, params) {
	ErrorStore._content.GET_MISSION = error;
	ErrorStore.notify('/GET_MISSION');
}

ErrorStore.handlePutMissionSuccess = function(results, params) {
	delete ErrorStore._content.PUT_MISSION;
	ErrorStore.notify('/PUT_MISSION');
}

ErrorStore.handlePutMissionError = function(error, params) {
	ErrorStore._content.PUT_MISSION = error;
	ErrorStore.notify('/PUT_MISSION');
}

ErrorStore.handleDeleteMissionSuccess = function(results, params) {
	delete ErrorStore._content.DELETE_MISSION;
	ErrorStore.notify('/DELETE_MISSION');
}

ErrorStore.handleDeleteMissionError = function(error, params) {
	ErrorStore._content.DELETE_MISSION = error;
	ErrorStore.notify('/DELETE_MISSION');
}

ErrorStore.handlePostOfferSuccess = function(results, params) {
	delete ErrorStore._content.POST_OFFER;
	ErrorStore.notify('/POST_OFFER');
}

ErrorStore.handlePostOfferError = function(error, params) {
	ErrorStore._content.POST_OFFER = error;
	ErrorStore.notify('/POST_OFFER');
}

ErrorStore.handleGetOfferSuccess = function(results, params) {
	delete ErrorStore._content.GET_OFFER;
	ErrorStore.notify('/GET_OFFER');
}

ErrorStore.handleGetOfferError = function(error, params) {
	ErrorStore._content.GET_OFFER = error;
	ErrorStore.notify('/GET_OFFER');
}

ErrorStore.handlePutOfferAcceptSuccess = function(results, params) {
	delete ErrorStore._content.PUT_OFFER_ACCEPT;
	ErrorStore.notify('/PUT_OFFER_ACCEPT');
}

ErrorStore.handlePutOfferAcceptError = function(error, params) {
	ErrorStore._content.PUT_OFFER_ACCEPT = error;
	ErrorStore.notify('/PUT_OFFER_ACCEPT');
}

ErrorStore.handlePutOfferDeclineSuccess = function(results, params) {
	delete ErrorStore._content.PUT_OFFER_DECLINE;
	ErrorStore.notify('/PUT_OFFER_DECLINE');
}

ErrorStore.handlePutOfferDeclineError = function(error, params) {
	ErrorStore._content.PUT_OFFER_DECLINE = error;
	ErrorStore.notify('/PUT_OFFER_DECLINE');
}

ErrorStore.handlePutOfferConfirmSuccess = function(results, params) {
	delete ErrorStore._content.PUT_OFFER_CONFIRM;
	ErrorStore.notify('/PUT_OFFER_CONFIRM');
}

ErrorStore.handlePutOfferConfirmError = function(error, params) {
	ErrorStore._content.PUT_OFFER_CONFIRM = error;
	ErrorStore.notify('/PUT_OFFER_CONFIRM');
}

ErrorStore.handleGetServicesSuccess = function(results, params) {
	delete ErrorStore._content.GET_SERVICES;
	ErrorStore.notify('/GET_SERVICES');
}

ErrorStore.handleGetServicesError = function(error, params) {
	ErrorStore._content.GET_SERVICES = error;
	ErrorStore.notify('/GET_SERVICES');
}

ErrorStore.handlePostServiceSuccess = function(results, params) {
	delete ErrorStore._content.POST_SERVICE;
	ErrorStore.notify('/POST_SERVICE');
}

ErrorStore.handlePostServiceError = function(error, params) {
	ErrorStore._content.POST_SERVICE = error;
	ErrorStore.notify('/POST_SERVICE');
}

ErrorStore.handleGetServiceSuccess = function(results, params) {
	delete ErrorStore._content.GET_SERVICE;
	ErrorStore.notify('/GET_SERVICE');
}

ErrorStore.handleGetServiceError = function(error, params) {
	ErrorStore._content.GET_SERVICE = error;
	ErrorStore.notify('/GET_SERVICE');
}

ErrorStore.handlePutServiceSuccess = function(results, params) {
	delete ErrorStore._content.PUT_SERVICE;
	ErrorStore.notify('/PUT_SERVICE');
}

ErrorStore.handlePutServiceError = function(error, params) {
	ErrorStore._content.PUT_SERVICE = error;
	ErrorStore.notify('/PUT_SERVICE');
}

ErrorStore.handlePostServiceCodeSuccess = function(results, params) {
	delete ErrorStore._content.POST_SERVICE_CODE;
	ErrorStore.notify('/POST_SERVICE_CODE');
}

ErrorStore.handlePostServiceCodeError = function(error, params) {
	ErrorStore._content.POST_SERVICE_CODE = error;
	ErrorStore.notify('/POST_SERVICE_CODE');
}

ErrorStore.handleGetServiceAuxiliarysSuccess = function(results, params) {
	delete ErrorStore._content.GET_SERVICE_AUXILIARYS;
	ErrorStore.notify('/GET_SERVICE_AUXILIARYS');
}

ErrorStore.handleGetServiceAuxiliarysError = function(error, params) {
	ErrorStore._content.GET_SERVICE_AUXILIARYS = error;
	ErrorStore.notify('/GET_SERVICE_AUXILIARYS');
}

ErrorStore.handleGetServiceCustomersSuccess = function(results, params) {
	delete ErrorStore._content.GET_SERVICE_CUSTOMERS;
	ErrorStore.notify('/GET_SERVICE_CUSTOMERS');
}

ErrorStore.handleGetServiceCustomersError = function(error, params) {
	ErrorStore._content.GET_SERVICE_CUSTOMERS = error;
	ErrorStore.notify('/GET_SERVICE_CUSTOMERS');
}

ErrorStore.handleGetServiceInterventionsSuccess = function(results, params) {
	delete ErrorStore._content.GET_SERVICE_INTERVENTIONS;
	ErrorStore.notify('/GET_SERVICE_INTERVENTIONS');
}

ErrorStore.handleGetServiceInterventionsError = function(error, params) {
	ErrorStore._content.GET_SERVICE_INTERVENTIONS = error;
	ErrorStore.notify('/GET_SERVICE_INTERVENTIONS');
}

ErrorStore.handleGetServiceOffersSuccess = function(results, params) {
	delete ErrorStore._content.GET_SERVICE_OFFERS;
	ErrorStore.notify('/GET_SERVICE_OFFERS');
}

ErrorStore.handleGetServiceOffersError = function(error, params) {
	ErrorStore._content.GET_SERVICE_OFFERS = error;
	ErrorStore.notify('/GET_SERVICE_OFFERS');
}

ErrorStore.handleGetServiceMissionsSuccess = function(results, params) {
	delete ErrorStore._content.GET_SERVICE_MISSIONS;
	ErrorStore.notify('/GET_SERVICE_MISSIONS');
}

ErrorStore.handleGetServiceMissionsError = function(error, params) {
	ErrorStore._content.GET_SERVICE_MISSIONS = error;
	ErrorStore.notify('/GET_SERVICE_MISSIONS');
}

ErrorStore.handleGetAuthSuccess = function(results, params) {
	delete ErrorStore._content.GET_AUTH;
	ErrorStore.notify('/GET_AUTH');
}

ErrorStore.handleGetAuthError = function(error, params) {
	ErrorStore._content.GET_AUTH = error;
	ErrorStore.notify('/GET_AUTH');
}

ErrorStore.handlePutAuthPasswordSuccess = function(results, params) {
	delete ErrorStore._content.PUT_AUTH_PASSWORD;
	ErrorStore.notify('/PUT_AUTH_PASSWORD');
}

ErrorStore.handlePutAuthPasswordError = function(error, params) {
	ErrorStore._content.PUT_AUTH_PASSWORD = error;
	ErrorStore.notify('/PUT_AUTH_PASSWORD');
}

ErrorStore.handlePostAuthRegisterSuccess = function(results, params) {
	delete ErrorStore._content.POST_AUTH_REGISTER;
	ErrorStore.notify('/POST_AUTH_REGISTER');
}

ErrorStore.handlePostAuthRegisterError = function(error, params) {
	ErrorStore._content.POST_AUTH_REGISTER = error;
	ErrorStore.notify('/POST_AUTH_REGISTER');
}

ErrorStore.handlePostAuthRecoverSuccess = function(results, params) {
	delete ErrorStore._content.POST_AUTH_RECOVER;
	ErrorStore.notify('/POST_AUTH_RECOVER');
}

ErrorStore.handlePostAuthRecoverError = function(error, params) {
	ErrorStore._content.POST_AUTH_RECOVER = error;
	ErrorStore.notify('/POST_AUTH_RECOVER');
}

ErrorStore.handlePostAuthRecoverCheckSuccess = function(results, params) {
	delete ErrorStore._content.POST_AUTH_RECOVER_CHECK;
	ErrorStore.notify('/POST_AUTH_RECOVER_CHECK');
}

ErrorStore.handlePostAuthRecoverCheckError = function(error, params) {
	ErrorStore._content.POST_AUTH_RECOVER_CHECK = error;
	ErrorStore.notify('/POST_AUTH_RECOVER_CHECK');
}

ErrorStore.handlePutAuthRecoverSuccess = function(results, params) {
	delete ErrorStore._content.PUT_AUTH_RECOVER;
	ErrorStore.notify('/PUT_AUTH_RECOVER');
}

ErrorStore.handlePutAuthRecoverError = function(error, params) {
	ErrorStore._content.PUT_AUTH_RECOVER = error;
	ErrorStore.notify('/PUT_AUTH_RECOVER');
}

ErrorStore.handlePostAuthChangemailSuccess = function(results, params) {
	delete ErrorStore._content.POST_AUTH_CHANGEMAIL;
	ErrorStore.notify('/POST_AUTH_CHANGEMAIL');
}

ErrorStore.handlePostAuthChangemailError = function(error, params) {
	ErrorStore._content.POST_AUTH_CHANGEMAIL = error;
	ErrorStore.notify('/POST_AUTH_CHANGEMAIL');
}

ErrorStore.handlePostAuthChangemailCheckSuccess = function(results, params) {
	delete ErrorStore._content.POST_AUTH_CHANGEMAIL_CHECK;
	ErrorStore.notify('/POST_AUTH_CHANGEMAIL_CHECK');
}

ErrorStore.handlePostAuthChangemailCheckError = function(error, params) {
	ErrorStore._content.POST_AUTH_CHANGEMAIL_CHECK = error;
	ErrorStore.notify('/POST_AUTH_CHANGEMAIL_CHECK');
}

ErrorStore.handlePostAuthChangemailSuccess = function(results, params) {
	delete ErrorStore._content.POST_AUTH_CHANGEMAIL;
	ErrorStore.notify('/POST_AUTH_CHANGEMAIL');
}

ErrorStore.handlePostAuthChangemailError = function(error, params) {
	ErrorStore._content.POST_AUTH_CHANGEMAIL = error;
	ErrorStore.notify('/POST_AUTH_CHANGEMAIL');
}

ErrorStore.handlePostAuthChangemailConfirmSuccess = function(results, params) {
	delete ErrorStore._content.POST_AUTH_CHANGEMAIL_CONFIRM;
	ErrorStore.notify('/POST_AUTH_CHANGEMAIL_CONFIRM');
}

ErrorStore.handlePostAuthChangemailConfirmError = function(error, params) {
	ErrorStore._content.POST_AUTH_CHANGEMAIL_CONFIRM = error;
	ErrorStore.notify('/POST_AUTH_CHANGEMAIL_CONFIRM');
}

ErrorStore.handleGetImageSuccess = function(results, params) {
	delete ErrorStore._content.GET_IMAGE;
	ErrorStore.notify('/GET_IMAGE');
}

ErrorStore.handleGetImageError = function(error, params) {
	ErrorStore._content.GET_IMAGE = error;
	ErrorStore.notify('/GET_IMAGE');
}

ErrorStore.handlePostImageSuccess = function(results, params) {
	delete ErrorStore._content.POST_IMAGE;
	ErrorStore.notify('/POST_IMAGE');
}

ErrorStore.handlePostImageError = function(error, params) {
	ErrorStore._content.POST_IMAGE = error;
	ErrorStore.notify('/POST_IMAGE');
}

Dispatcher.register('LOGOUT', ErrorStore.handleLogout)
Dispatcher.register('GET_AUXILIARYS', ErrorStore.handleGetAuxiliarysSuccess, ErrorStore.handleGetAuxiliarysError)
Dispatcher.register('POST_AUXILIARY', ErrorStore.handlePostAuxiliarySuccess, ErrorStore.handlePostAuxiliaryError)
Dispatcher.register('GET_AUXILIARY', ErrorStore.handleGetAuxiliarySuccess, ErrorStore.handleGetAuxiliaryError)
Dispatcher.register('PUT_AUXILIARY', ErrorStore.handlePutAuxiliarySuccess, ErrorStore.handlePutAuxiliaryError)
Dispatcher.register('POST_AUXILIARY_CODE', ErrorStore.handlePostAuxiliaryCodeSuccess, ErrorStore.handlePostAuxiliaryCodeError)
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
Dispatcher.register('PUT_INTERVENTION', ErrorStore.handlePutInterventionSuccess, ErrorStore.handlePutInterventionError)
Dispatcher.register('GET_INTERVENTION_MATCH', ErrorStore.handleGetInterventionMatchSuccess, ErrorStore.handleGetInterventionMatchError)
Dispatcher.register('PUT_INTERVENTION_CANCEL', ErrorStore.handlePutInterventionCancelSuccess, ErrorStore.handlePutInterventionCancelError)
Dispatcher.register('GET_MISSION', ErrorStore.handleGetMissionSuccess, ErrorStore.handleGetMissionError)
Dispatcher.register('PUT_MISSION', ErrorStore.handlePutMissionSuccess, ErrorStore.handlePutMissionError)
Dispatcher.register('DELETE_MISSION', ErrorStore.handleDeleteMissionSuccess, ErrorStore.handleDeleteMissionError)
Dispatcher.register('POST_OFFER', ErrorStore.handlePostOfferSuccess, ErrorStore.handlePostOfferError)
Dispatcher.register('GET_OFFER', ErrorStore.handleGetOfferSuccess, ErrorStore.handleGetOfferError)
Dispatcher.register('PUT_OFFER_ACCEPT', ErrorStore.handlePutOfferAcceptSuccess, ErrorStore.handlePutOfferAcceptError)
Dispatcher.register('PUT_OFFER_DECLINE', ErrorStore.handlePutOfferDeclineSuccess, ErrorStore.handlePutOfferDeclineError)
Dispatcher.register('PUT_OFFER_CONFIRM', ErrorStore.handlePutOfferConfirmSuccess, ErrorStore.handlePutOfferConfirmError)
Dispatcher.register('GET_SERVICES', ErrorStore.handleGetServicesSuccess, ErrorStore.handleGetServicesError)
Dispatcher.register('POST_SERVICE', ErrorStore.handlePostServiceSuccess, ErrorStore.handlePostServiceError)
Dispatcher.register('GET_SERVICE', ErrorStore.handleGetServiceSuccess, ErrorStore.handleGetServiceError)
Dispatcher.register('PUT_SERVICE', ErrorStore.handlePutServiceSuccess, ErrorStore.handlePutServiceError)
Dispatcher.register('POST_SERVICE_CODE', ErrorStore.handlePostServiceCodeSuccess, ErrorStore.handlePostServiceCodeError)
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
