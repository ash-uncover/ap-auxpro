
/* This class was auto-generated by the JavaScriptWriter */
/* DO NOT MODIFY THIS FILE IT WILL BE REGENERATED IN THE FUTURE */
class InterventionRecurencePeriod {

	static get HOURS() {
		return _HOURS
	}

	static get WEEK1() {
		return _WEEK1
	}

	static get WEEK2() {
		return _WEEK2
	}

	static get WEEK3() {
		return _WEEK3
	}

	static get WEEK4() {
		return _WEEK4
	}

	static get VALUES() {
		return [
			_HOURS,
			_WEEK1,
			_WEEK2,
			_WEEK3,
			_WEEK4,
		]
	}

	static get(id) {
		return id && InterventionRecurencePeriod[id.toUpperCase()]
	}

}
const _HOURS = { key: 'Hours', keyName: 'HOURS' }
const _WEEK1 = { key: 'Week1', keyName: 'WEEK1' }
const _WEEK2 = { key: 'Week2', keyName: 'WEEK2' }
const _WEEK3 = { key: 'Week3', keyName: 'WEEK3' }
const _WEEK4 = { key: 'Week4', keyName: 'WEEK4' }
export default InterventionRecurencePeriod
