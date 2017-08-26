// jquery is required for bootstrap
import $ from 'jquery'
// bootstrap
import 'bootstrap'

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