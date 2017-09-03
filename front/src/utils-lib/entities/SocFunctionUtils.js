import SocFunction from 'utils/constants/SocFunction'

class SocFunctionUtils {

	static getName(func) {
		switch (func) {
			case SocFunction.MAND.key: return 'Mandataire'
			case SocFunction.PREST.key: return 'Prestataire'
			case SocFunction.BOTH.key: return 'Prestataire & Mandataire'
		}
		return ''
	}

	static getValues() {
		return SocFunction.VALUES.reduce(function (filtered, value) { 
			let name = SocFunctionUtils.getName(value.key)
			if (name) {
				filtered.push({
					key: value.key,
					value: name
				})
			}
			return filtered
		}, []).sort(function (value1, value2) {
			return (value1.value.localeCompare(value2.value))
		})
	}
}
export default SocFunctionUtils 