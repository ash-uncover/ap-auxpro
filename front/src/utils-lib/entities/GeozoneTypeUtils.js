import GeozoneType from 'utils/constants/GeozoneType'

class GeozoneTypeUtils {

	static getName(key) {
		switch (key) {
			case GeozoneType.AREA.key: return 'Par proximité'
			case GeozoneType.CITY.key: return 'Par ville'
		}
		return ''
	}
}
export default GeozoneTypeUtils 