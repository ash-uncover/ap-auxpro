
/* This class was auto-generated by the JavaScriptWriter */
/* DO NOT MODIFY THIS FILE IT WILL BE REGENERATED IN THE FUTURE */
class PeopleCategory {

  static get OLD_PEOPLE() {
    return _OLD_PEOPLE
  }

  static get CHILDREN() {
    return _CHILDREN
  }

  static get HANDICAP() {
    return _HANDICAP
  }

  static get AUTONOMOUS() {
    return _AUTONOMOUS
  }

  static get VALUES() {
    return [
    	_OLD_PEOPLE,
    	_CHILDREN,
    	_HANDICAP,
    	_AUTONOMOUS,
    ]
  }

  static get(id) {
    return id && PeopleCategory[id.toUpperCase()]
  }

}
const _OLD_PEOPLE = { key: 'old_people', keyName: 'OLD_PEOPLE' }
const _CHILDREN = { key: 'children', keyName: 'CHILDREN' }
const _HANDICAP = { key: 'handicap', keyName: 'HANDICAP' }
const _AUTONOMOUS = { key: 'autonomous', keyName: 'AUTONOMOUS' }
export default PeopleCategory
