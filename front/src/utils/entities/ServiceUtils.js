class ServiceUtils {

	static getAddress(service) {
		if (!service.address || !service.postalCode || !service.city) {
			return '<Information non renseignée>'
		}
		return service.address + ' ' + service.postalCode + ' ' + service.city
	}
}
export default ServiceUtils