let MISSING_VALUE = '<Information non renseignée>'

class StringUtils {

	static valueOrMissing(value) {
		return value ? value : MISSING_VALUE
	}
}

export default StringUtils