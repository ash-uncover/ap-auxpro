
/* This class was auto-generated by the JavaScriptWriter */
/* DO NOT MODIFY THIS FILE IT WILL BE REGENERATED IN THE FUTURE */
class IndisponibilityRecurencePeriod {

	static get HOURS() {
		return _HOURS
	}

	static get DAYS() {
		return _DAYS
	}

	}

	}

	}

	}

	static get VALUES() {
		return [
			_HOURS,
			_DAYS,
		]
	}

	static get(id) {
		return id && IndisponibilityRecurencePeriod[id.toUpperCase()]
	}

}
let _HOURS = { key: 'Hours' }
let _DAYS = { key: 'Days' }
export default IndisponibilityRecurencePeriod
