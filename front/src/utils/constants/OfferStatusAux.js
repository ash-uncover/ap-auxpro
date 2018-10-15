
/* This class was auto-generated by the JavaScriptWriter */
/* DO NOT MODIFY THIS FILE IT WILL BE REGENERATED IN THE FUTURE */
class OfferStatusAux {

	static get PENDING() {
		return _PENDING
	}

	static get ACCEPTED() {
		return _ACCEPTED
	}

	static get DECLINED() {
		return _DECLINED
	}

	static get VALUES() {
		return [
			_PENDING,
			_ACCEPTED,
			_DECLINED,
		]
	}

	static get(id) {
		return id && OfferStatusAux[id.toUpperCase()]
	}

}
const _PENDING = { key: 'Pending', keyName: 'PENDING' }
const _ACCEPTED = { key: 'Accepted', keyName: 'ACCEPTED' }
const _DECLINED = { key: 'Declined', keyName: 'DECLINED' }
export default OfferStatusAux
