let MISSING_VALUE = '<Information non renseignée>'

String.prototype.replaceAll = function(target, replacement) {
  return this.split(target).join(replacement);
}

class StringUtils {

	static valueOrMissing(value) {
		return value ? value : MISSING_VALUE
	}

}

export default StringUtils