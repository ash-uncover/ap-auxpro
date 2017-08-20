
/* This class was auto-generated by the JavaScriptWriter */
class GeozoneType {

	static get AREA() {
		return _AREA
	}

	static get CITY() {
		return _CITY
	}

	static get VALUES() {
		return [
			_AREA,
			_CITY,
		]
	}

	static get(id) {
		return id && GeozoneType[id.toUpperCase()]
	}

}
let _AREA = { key: 'Area' }
let _CITY = { key: 'City' }
export default GeozoneType
