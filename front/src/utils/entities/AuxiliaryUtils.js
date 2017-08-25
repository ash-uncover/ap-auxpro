class AuxiliaryUtils {

	static getFullName(auxiliary) {
		return auxiliary.civility + ' ' + auxiliary.firstName + ' ' + auxiliary.lastName
	}

	static getAddress(auxiliary) {
		return auxiliary.address + ' ' + auxiliary.postalCode + ' ' + auxiliary.city
	}
}
export default AuxiliaryUtils