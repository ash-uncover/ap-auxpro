import ServiceFields from 'utils/entities/ServiceFields'

class ServiceUtils {

	static getFieldName(field) {
		switch (field) {
			case ServiceFields.COUNTRY:
            case ServiceFields.COUNTRY.key: return 'Pays'
			case ServiceFields.ADDRESS:
            case ServiceFields.ADDRESS.key: return 'Adresse'
			case ServiceFields.CITY:
            case ServiceFields.CITY.key: return 'Ville'
			case ServiceFields.LATTITUDE:
            case ServiceFields.LATTITUDE.key: return 'Lattitude'
			case ServiceFields.ACCOUNT_TYPE:
            case ServiceFields.ACCOUNT_TYPE.key: return 'Type de compte'
			case ServiceFields.POSTAL_CODE:
            case ServiceFields.POSTAL_CODE.key: return 'Code postal'
			case ServiceFields.IS_TUTO_SKIPPED:
            case ServiceFields.IS_TUTO_SKIPPED.key: return 'Tutorial effectué'
			case ServiceFields.NOTIFY_PARTNERS:
            case ServiceFields.NOTIFY_PARTNERS.key: return 'Notifier les partenaires'
			case ServiceFields.AVATAR:
            case ServiceFields.AVATAR.key: return 'Photo'
			case ServiceFields.ACCOUNT_EXPIRY_DATE:
            case ServiceFields.ACCOUNT_EXPIRY_DATE.key: return "Date d'expiration"
			case ServiceFields.SIRET:
            case ServiceFields.SIRET.key: return 'Numéro de Siret'
			case ServiceFields.NOTIFY_AUXPROS:
            case ServiceFields.NOTIFY_AUXPROS.key: return 'Notifier AuXpros'
			case ServiceFields.PHONE:
            case ServiceFields.PHONE.key: return 'Téléphone'
			case ServiceFields.FUNCTION:
            case ServiceFields.FUNCTION.key: return 'Fonctionnement'
			case ServiceFields.SOCIAL_REASON:
            case ServiceFields.SOCIAL_REASON.key: return 'Société'
			case ServiceFields.LONGITUDE:
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
}
export default ServiceUtils