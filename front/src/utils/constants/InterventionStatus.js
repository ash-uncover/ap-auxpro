
/* This class was auto-generated by the JavaScriptWriter */
/* DO NOT MODIFY THIS FILE IT WILL BE REGENERATED IN THE FUTURE */
class InterventionStatus {

	static get PENDING() {
		return _PENDING
	}

	static get MATCHING() {
		return _MATCHING
	}

	static get ONGOING() {
		return _ONGOING
	}

	static get CANCELED() {
		return _CANCELED
	}

	static get VALUES() {
		return [
			_PENDING,
			_MATCHING,
			_ONGOING,
			_CANCELED,
		]
	}

	static get(id) {
		return id && InterventionStatus[id.toUpperCase()]
	}

}
let _PENDING = { key: 'Pending' }
let _MATCHING = { key: 'Matching' }
let _ONGOING = { key: 'OnGoing' }
let _CANCELED = { key: 'Canceled' }
export default InterventionStatus
