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

	static isValid() {

	}			
}
export default GeozoneUtils