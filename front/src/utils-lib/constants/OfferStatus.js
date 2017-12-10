class OfferStatus {

	static get RECEIVED() {
		return _RECEIVED
	}

	static get WAITING() {
		return _WAITING
	}

	static get PLANNED() {
		return _PLANNED
	}

	static get VALUES() {
		return [
			_RECEIVED,
			_WAITING,
			_PLANNED,
		]
	}

	static get(id) {
		return id && OfferStatus[id.toUpperCase()]
	}

}
let _RECEIVED = { key: 'Received' }
let _WAITING = { key: 'Waiting' }
let _PLANNED = { key: 'Planned' }
export default OfferStatus
