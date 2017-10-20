import IndisponibilityRecurencePeriod from 'utils/constants/IndisponibilityRecurencePeriod'

class IndisponibilityRecurencePeriodUtils {

	static getName(func) {
		switch (func) {
			case IndisponibilityRecurencePeriod.HOURS:
			case IndisponibilityRecurencePeriod.HOURS.key: return 'Absence journalière'
			case IndisponibilityRecurencePeriod.DAYS:
			case IndisponibilityRecurencePeriod.DAYS.key: return 'Absence prolongée'
			case IndisponibilityRecurencePeriod.WEEK1:
			case IndisponibilityRecurencePeriod.WEEK1.key: return 'Absence hebdomadaire'
			case IndisponibilityRecurencePeriod.WEEK2:
			case IndisponibilityRecurencePeriod.WEEK2.key: return 'Absence une semaine sur deux'
			case IndisponibilityRecurencePeriod.WEEK3:
			case IndisponibilityRecurencePeriod.WEEK3.key: return 'Absence une semaine sur trois'
			case IndisponibilityRecurencePeriod.WEEK4:
			case IndisponibilityRecurencePeriod.WEEK4.key: return 'Absence une semaine sur quatre'
		}
		return ''
	}

	static getShortName(func) {
		switch (func) {
			case IndisponibilityRecurencePeriod.HOURS:
			case IndisponibilityRecurencePeriod.HOURS.key: return 'Journalière'
			case IndisponibilityRecurencePeriod.DAYS:
			case IndisponibilityRecurencePeriod.DAYS.key: return 'Prolongée'
			case IndisponibilityRecurencePeriod.WEEK1:
			case IndisponibilityRecurencePeriod.WEEK1.key: return 'Hebdomadaire'
			case IndisponibilityRecurencePeriod.WEEK2:
			case IndisponibilityRecurencePeriod.WEEK2.key: return 'Une semaine sur deux'
			case IndisponibilityRecurencePeriod.WEEK3:
			case IndisponibilityRecurencePeriod.WEEK3.key: return 'Une semaine sur trois'
			case IndisponibilityRecurencePeriod.WEEK4:
			case IndisponibilityRecurencePeriod.WEEK4.key: return 'Une semaine sur quatre'
		}
		return ''
	}

	static getDaysBetween(func) {
		switch (func) {
			case IndisponibilityRecurencePeriod.HOURS:
			case IndisponibilityRecurencePeriod.HOURS.key: return 0
			case IndisponibilityRecurencePeriod.DAYS:
			case IndisponibilityRecurencePeriod.DAYS.key: return 0
			case IndisponibilityRecurencePeriod.WEEK1:
			case IndisponibilityRecurencePeriod.WEEK1.key: return 7
			case IndisponibilityRecurencePeriod.WEEK2:
			case IndisponibilityRecurencePeriod.WEEK2.key: return 14
			case IndisponibilityRecurencePeriod.WEEK3:
			case IndisponibilityRecurencePeriod.WEEK3.key: return 21
			case IndisponibilityRecurencePeriod.WEEK4:
			case IndisponibilityRecurencePeriod.WEEK4.key: return 28
		}
		return ''
	}
}
export default IndisponibilityRecurencePeriodUtils