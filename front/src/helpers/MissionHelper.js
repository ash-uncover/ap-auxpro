import { Dispatcher, StoreRegistry } from 'ap-flux'
import AuthHelper from 'helpers/AuthHelper'

/* This class was auto-generated by the JavaScriptWriter */
class MissionHelper {

	register(obj, callback) {
		StoreRegistry.register('REST_STORE/mission', obj, callback);
	}

	unregister(obj) {
		StoreRegistry.unregister('REST_STORE', obj);
	}

	getAuxiliaryMissions(auxiliaryId) {
		return Dispatcher.issue('GET_AUXILIARY_MISSIONS', {token: AuthHelper.getToken(), auxiliaryId: auxiliaryId});
	}

	getInterventionMissions(interventionId) {
		return Dispatcher.issue('GET_INTERVENTION_MISSIONS', {token: AuthHelper.getToken(), interventionId: interventionId});
	}

	getMission(id) {
		return Dispatcher.issue('GET_MISSION', {token: AuthHelper.getToken(), id: id});
	}

	putMission(data) {
		return Dispatcher.issue('PUT_MISSION', {token: AuthHelper.getToken(), id: data.id, data: data});
	}

	deleteMission(id) {
		return Dispatcher.issue('DELETE_MISSION', {token: AuthHelper.getToken(), id: id});
	}

	getServiceMissions(serviceId) {
		return Dispatcher.issue('GET_SERVICE_MISSIONS', {token: AuthHelper.getToken(), serviceId: serviceId});
	}

	getData(id) {
		return StoreRegistry.getStore('REST_STORE').getData('/mission' + (id ? '/' + id : ''));
	}

}
var MissionObj = new MissionHelper()
export default MissionObj
