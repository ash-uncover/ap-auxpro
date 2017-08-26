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
}
export default AuxiliaryUtils