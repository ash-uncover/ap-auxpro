
/* This class was auto-generated by the JavaScriptWriter */
/* DO NOT MODIFY THIS FILE IT WILL BE REGENERATED IN THE FUTURE */
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
const _AREA = { key: 'Area', keyName: 'AREA' }
const _CITY = { key: 'City', keyName: 'CITY' }
export default GeozoneType
