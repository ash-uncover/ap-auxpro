
/* This class was auto-generated by the JavaScriptWriter */
/* DO NOT MODIFY THIS FILE IT WILL BE REGENERATED IN THE FUTURE */
class Civility {

	static get MR() {
		return _MR
	}

	static get MME() {
		return _MME
	}

	static get VALUES() {
		return [
			_MR,
			_MME,
		]
	}

	static get(id) {
		return id && Civility[id.toUpperCase()]
	}

}
const _MR = { key: 'Mr', keyName: 'MR' }
const _MME = { key: 'Mme', keyName: 'MME' }
export default Civility
