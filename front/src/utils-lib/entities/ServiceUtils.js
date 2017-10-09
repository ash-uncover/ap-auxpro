import ServiceFields from 'utils/entities/ServiceFields'

class ServiceUtils {

	static getFieldName(field) {
		switch (field) {
			case ServiceFields.COUNTRY.key: return 'Pays'
			case ServiceFields.ADDRESS.key: return 'Adresse'
			case ServiceFields.CITY.key: return 'Ville'
			case ServiceFields.LATTITUDE.key: return 'Lattitude'
			case ServiceFields.ACCOUNT_TYPE.key: return 'Type de compte'
			case ServiceFields.POSTAL_CODE.key: return 'Code postal'
			case ServiceFields.IS_TUTO_SKIPPED.key: return 'Tutorial effectué'
			case ServiceFields.NOTIFY_PARTNERS.key: return 'Notifier les partenaires'
			case ServiceFields.AVATAR.key: return 'Photo'
			case ServiceFields.ACCOUNT_EXPIRY_DATE.key: return "Date d'expiration"
			case ServiceFields.SIRET.key: return 'Numéro de Siret'
			case ServiceFields.NOTIFY_AUXPROS.key: return 'Notifier AuXpros'
			case ServiceFields.PHONE.key: return 'Téléphone'
			case ServiceFields.PHONE_CHECKED.key: return 'Téléphone vérifié'
			case ServiceFields.FUNCTION.key: return 'Fonctionnement'
			case ServiceFields.ADDRESS_CHECKED.key: return 'Adresse vérifiée'
			case ServiceFields.SOCIAL_REASON.key: return 'Société'
			case ServiceFields.LONGITUDE.key: return 'Longitude'
		}
		return '! UNKNOWN FIELD !'
	}

	static getAddress(service) {
		if (!service.address || !service.postalCode || !service.city) {
			return '<Information non renseignée>'
		}
		return service.address + ' ' + service.postalCode + ' ' + service.city
	}

	static checkProfileCompleted(service) {
		if (service) {
			for (let field in ServiceFields.FIELDS) {
				if (ServiceFields.FIELDS.hasOwnProperty(field) && ServiceFields.FIELDS[field].validator) {
					if (service.hasOwnProperty(field)) {
						let value = service[field]
						let state = ServiceFields.FIELDS[field].validator.getState(value)
						if (state !== 'success') {
							console.error('field in error: ' + field + ' > ' + value)
							return false
						}
					} else {
						return false
					}
				}
			}
			return true
		}
		return false
	}
}
export default ServiceUtils