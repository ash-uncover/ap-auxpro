// jquery is required for bootstrap
import $ from 'jquery'
// bootstrap
import 'bootstrap'
import GoogleMapActions from 'actions/GoogleMapActions'

import { StoreRegistry } from 'ap-flux'
StoreRegistry.getStore('AUTH_STORE').loadFromLocalStorage()

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