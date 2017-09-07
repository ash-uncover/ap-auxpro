import RecurencePeriod from 'utils/constants/RecurencePeriod'

class RecurencePeriodUtils {

	static getName(func) {
		switch (func) {
			case RecurencePeriod.ONE.key: return 'Prestation unique'
			case RecurencePeriod.P1W.key: return 'Prestation hebdomadaire'
			case RecurencePeriod.P2W.key: return 'Prestation une semaine sur deux'
			case RecurencePeriod.P3W.key: return 'Prestation une semaine sur trois'
			case RecurencePeriod.P4W.key: return 'Prestation une semaine sur quatre'
		}
		return ''
	}

	static getShortName(func) {
		switch (func) {
			case RecurencePeriod.ONE.key: return 'Unique'
			case RecurencePeriod.P1W.key: return 'Hebdomadaire'
			case RecurencePeriod.P2W.key: return 'Une semaine sur deux'
			case RecurencePeriod.P3W.key: return 'Une semaine sur trois'
			case RecurencePeriod.P4W.key: return 'Une semaine sur quatre'
		}
		return ''
	}

	static getDaysBetween(func) {
		switch (func) {
			case RecurencePeriod.ONE.key: return 0
			case RecurencePeriod.P1W.key: return 7
			case RecurencePeriod.P2W.key: return 14
			case RecurencePeriod.P3W.key: return 21
			case RecurencePeriod.P4W.key: return 28
		}
		return ''
	}
}
export default RecurencePeriodUtils