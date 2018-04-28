// jquery is required for bootstrap
import $ from 'jquery'
// bootstrap
import 'bootstrap'
import GoogleMapActions from 'actions/GoogleMapActions'
import I18NActions from 'actions/I18NActions'
import I18NStore from 'stores/I18NStore'

import { StoreRegistry } from 'ap-flux'


const version = '1.1'
const versionItem = 'AP-LS_VERSION'

let currentVersion = localStorage.getItem(versionItem)

if (currentVersion === version) {
	console.warn('Info retrieved from local storage')
	StoreRegistry.getStore('AUTH_STORE').loadFromLocalStorage()
} else {
	console.warn('New version detected, reseting local storage')
	StoreRegistry.getStore('AUTH_STORE').removeFromLocalStorage()
	localStorage.setItem(versionItem, version)
}

class Boot {
	static onUpdate() {
		window.scrollTo(0, 0)
		let element = document.getElementsByClassName('ap-auxpro')[0]
		if (element) {
			element.scrollTop = 0
		}
	}
}

export default Boot