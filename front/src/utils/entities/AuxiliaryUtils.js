class AuxiliaryUtils {

	static getFullName(auxiliary) {
		if (!auxiliary.civility || !auxiliary.firstName || !auxiliary.lastName) {
			return null
		}
		return auxiliary.civility + ' ' + auxiliary.firstName + ' ' + auxiliary.lastName
	}

	static getAddress(auxiliary) {
		if (!auxiliary.address || !auxiliary.postalCode || !auxiliary.city) {
			return null
		}
		return auxiliary.address + ' ' + auxiliary.postalCode + ' ' + auxiliary.city
	}

}
export default AuxiliaryUtils