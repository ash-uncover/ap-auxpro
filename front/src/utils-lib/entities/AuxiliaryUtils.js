import AuxiliaryFields from 'utils/entities/AuxiliaryFields'

class AuxiliaryUtils {

	static getFieldName(field) {
		switch (field) {
			case AuxiliaryFields.CIVILITY.key: return 'Civilité'
			case AuxiliaryFields.LAST_NAME.key: return 'Nom'
			case AuxiliaryFields.FIRST_NAME.key: return 'Prénom'
			case AuxiliaryFields.AVATAR.key: return 'Photo'
			case AuxiliaryFields.PHONE.key: return 'Téléphone'
			case AuxiliaryFields.NATIONALITY.key: return 'Nationalité'
			case AuxiliaryFields.BIRTH_DATE.key: return 'Date de naissance'
			case AuxiliaryFields.BIRTH_CITY.key: return 'Ville de naissance'
			case AuxiliaryFields.BIRTH_COUNTRY.key: return 'Pays de naissance'
			case AuxiliaryFields.POSTAL_CODE.key: return 'Code postal'
			case AuxiliaryFields.DESCRIPTION.key: return 'Mes plus'
			case AuxiliaryFields.ADDRESS.key: return 'Adresse'
			case AuxiliaryFields.CITY.key: return 'Ville'
			case AuxiliaryFields.COUNTRY.key: return 'Pays'
			case AuxiliaryFields.LATTITUDE.key: return 'Lattitude'
			case AuxiliaryFields.LONGITUDE.key: return 'Longitude'
			case AuxiliaryFields.SOCIAL_NUMBER.key: return 'Numéro de sécurité sociale'
			case AuxiliaryFields.DIPLOMA.key: return 'Mes diplômes'
			case AuxiliaryFields.IS_TUTO_SKIPPED.key: return 'Tutorial effectué'
			case AuxiliaryFields.ACCOUNT_TYPE.key: return 'Type de compte'
			case AuxiliaryFields.ACCOUNT_EXPIRY_DATE.key: return "Date d'expiration"
			case AuxiliaryFields.NOTIFY_OFFERS_SMS.key: return ''
			case AuxiliaryFields.NOTIFY_OFFERS_MAIL.key: return ''
			case AuxiliaryFields.NOTIFY_PARTNERS.key: return ''
			case AuxiliaryFields.NOTIFY_AUXPROS.key: return ''
			case AuxiliaryFields.ARE_SKILL_SET.key: return ''
			case AuxiliaryFields.SKILL_ANSWERS.key: return ''
			case AuxiliaryFields.SKILL_ADMINISTRATIVE.key: return ''
			case AuxiliaryFields.SKILL_SHOPPING.key: return ''
			case AuxiliaryFields.SKILL_DOITYOURSELF.key: return ''
			case AuxiliaryFields.SKILL_NURSING.key: return ''
			case AuxiliaryFields.SKILL_CHILDHOOD.key: return ''
			case AuxiliaryFields.SKILL_HOUSEWORK.key: return ''
			case AuxiliaryFields.SKILL_COMPAGNY.key: return ''
			case AuxiliaryFields.IS_ENTREPRENEUR.key: return 'Auto-entrepreneur ?'
		}
		return '! UNKNOWN FIELD !'
	}

	static getAge(auxiliary) {
		return String(moment(auxiliary.birthDate).toNow(true))
	}

	static getFullName(auxiliary) {
		if (!auxiliary.civility || !auxiliary.firstName || !auxiliary.lastName) {
			return null
		}
		return auxiliary.civility + ' ' + auxiliary.firstName + ' ' + auxiliary.lastName
	}
	static getShortName(auxiliary) {
		if (!auxiliary.civility || !auxiliary.firstName || !auxiliary.lastName) {
			return null
		}
		return auxiliary.civility + ' ' + auxiliary.firstName + ' ' + auxiliary.lastName.substring(0, 1) + '.'
	}
	static getNameFL(auxiliary) {
		return auxiliary.lastName + ' ' + auxiliary.firstName
	}
	static getNameLF(auxiliary) {
		return auxiliary.firstName + ' ' + auxiliary.lastName
	}

	static getAddress(auxiliary) {
		if (!auxiliary.address || !auxiliary.postalCode || !auxiliary.city) {
			return null
		}
		return auxiliary.address + ' ' + auxiliary.postalCode + ' ' + auxiliary.city
	}
	static getShortAddress(auxiliary) {
		return auxiliary.postalCode + ' ' + auxiliary.city
	}
}
export default AuxiliaryUtils