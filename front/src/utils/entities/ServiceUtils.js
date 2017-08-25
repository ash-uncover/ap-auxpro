class ServiceUtils {

	static getAddress(service) {
		return service.address + ' ' + service.postalCode + ' ' + service.city
	}
}
export default ServiceUtils