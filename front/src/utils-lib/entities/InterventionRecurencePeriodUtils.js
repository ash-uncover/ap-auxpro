import InterventionRecurencePeriod from 'utils/constants/InterventionRecurencePeriod'

class InterventionRecurencePeriodUtils {

	static getName(func) {
		switch (func) {
			case InterventionRecurencePeriod.HOURS:
			case InterventionRecurencePeriod.HOURS.key: return 'Prestation unique'
			case InterventionRecurencePeriod.WEEK1:
			case InterventionRecurencePeriod.WEEK1.key: return 'Prestation hebdomadaire'
			case InterventionRecurencePeriod.WEEK2:
			case InterventionRecurencePeriod.WEEK2.key: return 'Prestation une semaine sur deux'
			case InterventionRecurencePeriod.WEEK3:
			case InterventionRecurencePeriod.WEEK3.key: return 'Prestation une semaine sur trois'
			case InterventionRecurencePeriod.WEEK4:
			case InterventionRecurencePeriod.WEEK4.key: return 'Prestation une semaine sur quatre'
		}
		return ''
	}

	static getShortName(func) {
		switch (func) {
			case InterventionRecurencePeriod.HOURS:
			case InterventionRecurencePeriod.HOURS.key: return 'Unique'
			case InterventionRecurencePeriod.WEEK1:
			case InterventionRecurencePeriod.WEEK1.key: return 'Hebdomadaire'
			case InterventionRecurencePeriod.WEEK2:
			case InterventionRecurencePeriod.WEEK2.key: return 'Une semaine sur deux'
			case InterventionRecurencePeriod.WEEK3:
			case InterventionRecurencePeriod.WEEK3.key: return 'Une semaine sur trois'
			case InterventionRecurencePeriod.WEEK4:
			case InterventionRecurencePeriod.WEEK4.key: return 'Une semaine sur quatre'
		}
		return ''
	}

	static getDaysBetween(func) {
		switch (func) {
			case InterventionRecurencePeriod.HOURS:
			case InterventionRecurencePeriod.HOURS.key: return 0
			case InterventionRecurencePeriod.WEEK1:
			case InterventionRecurencePeriod.WEEK1.key: return 7
			case InterventionRecurencePeriod.WEEK2:
			case InterventionRecurencePeriod.WEEK2.key: return 14
			case InterventionRecurencePeriod.WEEK3:
			case InterventionRecurencePeriod.WEEK3.key: return 21
			case InterventionRecurencePeriod.WEEK4:
			case InterventionRecurencePeriod.WEEK4.key: return 28
		}
		return ''
	}
}
export default InterventionRecurencePeriodUtils