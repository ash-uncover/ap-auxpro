let _PENDING = { key: 'PENDING' }
let _OFFERED = { key: 'OFFERED' }
let _PLANNED = { key: 'PLANNED' }

export default class InterventionType {

	static get PENDING() { return _PENDING }
	static get OFFERED() { return _OFFERED }
	static get PLANNED() { return _PLANNED }

	static get TYPES() { 
		return [
			_PENDING,
			_OFFERED,
			_PLANNED
		]
	}

	static get(id) {
		return id && InterventionType[id.toUpperCase()];
	}
}