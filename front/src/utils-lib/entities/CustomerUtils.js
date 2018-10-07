import CustomerFields from 'utils/entities/CustomerFields'

class CustomerUtils {

  static getFieldName(field) {
    switch (field) {
      case CustomerFields.LAST_NAME:
      case CustomerFields.LAST_NAME.key: return 'Nom'
      case CustomerFields.COUNTRY:
      case CustomerFields.COUNTRY.key: return 'Pays'
      case CustomerFields.CATEGORY:
      case CustomerFields.CATEGORY.key: return 'Catégorie de personne'
      case CustomerFields.CIVILITY:
      case CustomerFields.CIVILITY.key: return 'Civilité'
      case CustomerFields.ADDRESS:
      case CustomerFields.ADDRESS.key: return 'Voie'
      case CustomerFields.CITY:
      case CustomerFields.CITY.key: return 'Ville'
      case CustomerFields.LATTITUDE:
      case CustomerFields.LATTITUDE.key: return 'Lattitude'
      case CustomerFields.POSTAL_CODE:
      case CustomerFields.POSTAL_CODE.key: return 'Code postal'
      case CustomerFields.BIRTH_DATE:
      case CustomerFields.BIRTH_DATE.key: return 'Date de naissance'
      case CustomerFields.FIRST_NAME:
      case CustomerFields.FIRST_NAME.key: return 'Prénom'
      case CustomerFields.NATIONALITY:
      case CustomerFields.NATIONALITY.key: return 'Nationalité'
      case CustomerFields.PHONE:
      case CustomerFields.PHONE.key: return 'Téléphone'
      case CustomerFields.EMAIL:
      case CustomerFields.EMAIL.key: return 'Email'
      case CustomerFields.LONGITUDE:
      case CustomerFields.LONGITUDE.key: return 'Longitude'
    }
    return '! UNKNOWN FIELD !'
  }

  static getFullName(customer) {
    if (!customer.civility || !customer.firstName || !customer.lastName) {
      return null
    }
    return customer.civility + ' ' + customer.firstName + ' ' + customer.lastName
  }

  static getShortName(customer) {
    if (!customer.civility || !customer.firstName || !customer.lastName) {
      return null
    }
    return customer.civility + ' ' + customer.firstName + ' ' + customer.lastName.substring(0, 1) + '.'
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

  static getShortAddress(customer) {
    if (!customer.postalCode || !customer.city) {
      return null
    }
    return customer.postalCode + ' ' + customer.city
  }
}
export default CustomerUtils