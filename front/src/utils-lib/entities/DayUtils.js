import { Day } from 'ap-react-bootstrap'

class DayUtils {

	static getName(day) {
		switch (day) {
			case Day.MONDAY.key: return 'Lundi'
			case Day.TUESDAY.key: return 'Mardi'
			case Day.WEDNESDAY.key: return 'Mercredi'
			case Day.THURSDAY.key: return 'Jeudi'
			case Day.FRIDAY.key: return 'Vendredi'
			case Day.SATURDAY.key: return 'Samedi'
			case Day.SUNDAY.key: return 'Dimanche'
		}
		return ''
	}

	static getNames(days) {
		let result = ''
		for (let i = 0; i < days.length; i++) {
			if (i && i < days.length - 1) {
				result+= ', '
			} else if (i) {
				result+= ' et '
			}
			result += DayUtils.getName(days[i])
		}
		return result
	}
}
export default DayUtils