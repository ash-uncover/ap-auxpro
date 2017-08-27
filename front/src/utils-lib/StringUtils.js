let MISSING_VALUE = '<Information non renseignée>'

String.prototype.replaceAll = function(target, replacement) {
  return this.split(target).join(replacement);
}

class StringUtils {

	static valueOrMissing(value) {
		return value ? value : MISSING_VALUE
	}

	static plurify(value, nb) {
		if (nb > 1) {
			return value + 's'
		}
		return value
	}

	static easenSearch(value) {
		return value.toLowerCase()
			.replaceAll('à', 'a')
			.replaceAll('é', 'e')
			.replaceAll('è', 'e')
			.replaceAll('ê', 'e')
			.replaceAll('î', 'i')
			.replaceAll('ï', 'i')
			.replaceAll('ô', 'o')
			.replaceAll('ö', 'o')
			.replaceAll('û', 'u')
			.replaceAll('ù', 'u')
	}
}

export default StringUtils