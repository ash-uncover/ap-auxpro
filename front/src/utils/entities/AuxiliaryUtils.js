class AuxiliaryUtils {

	static getFullName(auxiliary) {
		if (!auxiliary.civility || !auxiliary.firstName || !auxiliary.lastName) {
			return '<Information non renseignée>'
		}
		return auxiliary.civility + ' ' + auxiliary.firstName + ' ' + auxiliary.lastName
	}

	static getAddress(auxiliary) {
		if (!auxiliary.address || !auxiliary.postalCode || !auxiliary.city) {
			return '<Information non renseignée>'
		}
		return auxiliary.address + ' ' + auxiliary.postalCode + ' ' + auxiliary.city
	}

	static getDiploma(auxiliary) {
		if (!auxiliary.diploma) {
			return '<Information non renseignée>'
		}
		return auxiliary.diploma
	}
}
export default AuxiliaryUtils