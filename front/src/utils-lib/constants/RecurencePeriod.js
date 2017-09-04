let _ONE = { key: 'ONE' }
let _P1W = { key: 'P1W' }
let _P2W = { key: 'P2W' }
let _P3W = { key: 'P3W' }
let _P4W = { key: 'P4W' }

class RecurencePeriod {

	static get ONE() { return _ONE }
	static get P1W() { return _P1W }
	static get P2W() { return _P2W }
	static get P3W() { return _P3W }
	static get P4W() { return _P4W }

	static get VALUES() {
		return [
			_ONE,
			_P1W,
			_P2W,
			_P3W,
			_P4W,
		]
	}

	static get(id) {
		return id && RecurencePeriod[id.toUpperCase()]
	}

}

export default RecurencePeriod
