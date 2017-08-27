class CustomerUtils {

	static getFullName(customer) {
		if (!customer.civility || !customer.firstName || !customer.lastName) {
			return null
		}
		return customer.civility + ' ' + customer.firstName + ' ' + customer.lastName
	}

	static getName(customer) {
		if (!customer.firstName || !customer.lastName) {
			return null
		}
		return customer.firstName + ' ' + customer.lastName
	}

	static getAddress(customer) {
		if (!customer.address || !customer.postalCode || !customer.city) {
			return null
		}
		return customer.address + ' ' + customer.postalCode + ' ' + customer.city
	}

}
export default CustomerUtils