import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import ServiceHelper from 'helpers/ServiceHelper'

import { BaseData } from 'ap-react-bootstrap'

let SLIDES = [
	{ src: '/assets/images/tutoaux1.JPG', alt: 'Image tutorial 1' },
	{ src: '/assets/images/tutoaux2.JPG', alt: 'Image tutorial 2'  },
	{ src: '/assets/images/tutoaux3.JPG', alt: 'Image tutorial 3'  },
	{ src: '/assets/images/tutoaux4.JPG', alt: 'Image tutorial 4'  },
	{ src: '/assets/images/tutoaux5.JPG', alt: 'Image tutorial 5'  },
	{ src: '/assets/images/tutoaux6.JPG', alt: 'Image tutorial 6'  }
]

class ServiceTutoData extends BaseData {

	register(obj) {
		super.register(obj)
		
		this.obj.onSlideChange = this.onSlideChange.bind(this)
		this.obj.onFinishTutorial = this.onFinishTutorial.bind(this)
		this.obj.state = {
			currentIndex: 0,
			maxIndex: 0
		}
	}

	unregister() {
	}

	onSlideChange(index) {
		this.setState({
			currentIndex: index,
			maxIndex: Math.max(index, this.getState('maxIndex'))
		})
	}

	onFinishTutorial() {
		AppHelper.setBusy(true).
		then(ServiceHelper.putService.bind(ServiceHelper, {
			id: AuthHelper.getEntityId(),
			isTutoSkipped: true
		})).
		then(ServiceHelper.getService.bind(ServiceHelper, AuthHelper.getEntityId())).
		then(AppHelper.navigate.bind(AppHelper, '/service/home')).
		then(setTimeout(AppHelper.setBusy, 200)).
		catch(function (error) {
			setTimeout(AppHelper.setBusy, 200)
			console.error('Tuto complete error')
			console.error(error)
		}) 
	}

}
var ServiceTutoObj = new ServiceTutoData()
ServiceTutoObj.SLIDES = SLIDES
export default ServiceTutoObj
