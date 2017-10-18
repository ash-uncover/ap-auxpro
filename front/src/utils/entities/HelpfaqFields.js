import { Validators } from 'ap-react-bootstrap'

/* This class was auto-generated by the JavaScriptWriter */
/* DO NOT MODIFY THIS FILE IT WILL BE REGENERATED IN THE FUTURE */
class HelpfaqFields {

	static get LAST_UPDATE_DATE() {
		return _LAST_UPDATE_DATE
	}

	static get ID() {
		return _ID
	}

	static get TITLE() {
		return _TITLE
	}

	static get CREATION_DATE() {
		return _CREATION_DATE
	}

	static get CONTENT() {
		return _CONTENT
	}

	static get VALUES() {
		return [
			_LAST_UPDATE_DATE,
			_ID,
			_TITLE,
			_CREATION_DATE,
			_CONTENT,
		]
	}

	static get(id) {
		for (let i = 0 ; i < HelpfaqFields.VALUES.length ; i++) {
			if (HelpfaqFields.VALUES[i].key === id) {
				return HelpfaqFields.VALUES[i]
			}
		}
	}

}
let _LAST_UPDATE_DATE = {
	key: 'lastUpdateDate',
	type: 'Date',
}
let _ID = {
	key: 'id',
	type: 'string',
}
let _TITLE = {
	key: 'title',
	type: 'string',
}
let _CREATION_DATE = {
	key: 'creationDate',
	type: 'Date',
}
let _CONTENT = {
	key: 'content',
	type: 'string',
}
export default HelpfaqFields
