import GeozoneType from 'utils/constants/GeozoneType'
import GeozoneFields from 'utils/entities/GeozoneFields'

class GeozoneUtils {

	static getFieldName(field) {
		switch (field) {
			case GeozoneFields.AUXILIARY_ID.key: return 'Auxiliaire'
			case GeozoneFields.TYPE.key: return 'Type'
			case GeozoneFields.ADDRESS.key: return 'Addresse'
			case GeozoneFields.POSTAL_CODE.key: return 'Code postal'
			case GeozoneFields.CITY.key: return 'Ville'
			case GeozoneFields.RADIUS.key: return 'Distance (m)'
			case GeozoneFields.LATTITUDE.key: return 'Lattitude'
			case GeozoneFields.LONGITUDE.key: return 'Longitude'
		}
		return '! UNKNOWN FIELD !'
	}

	static isValid(geozone) {
		for (let i = 0; i < GeozoneFields.VALUES.length; i++) {
			let field = GeozoneFields.VALUES[i]
			if (!(geozone.type === GeozoneType.CITY.key && field === GeozoneFields.RADIUS)) {
				if (field.validator && field.validator.getState(geozone[field.key]) === 'error') {
					return false
				}
			}
		}
		return true
	}	
}
export default GeozoneUtils