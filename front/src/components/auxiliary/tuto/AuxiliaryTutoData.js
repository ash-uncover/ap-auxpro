import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import AuxiliaryHelper from 'helpers/AuxiliaryHelper'

import { BaseData } from 'ap-react-bootstrap'

class AuxiliaryTutoData extends BaseData {

	constructor() {
		super(...arguments)

		this.SLIDES = [
			{ src: '/assets/images/tutoaux1.JPG', alt: 'Image tutorial 1' },
			{ src: '/assets/images/tutoaux2.JPG', alt: 'Image tutorial 2' },
			{ src: '/assets/images/tutoaux3.JPG', alt: 'Image tutorial 3' },
			{ src: '/assets/images/tutoaux4.JPG', alt: 'Image tutorial 4' },
			{ src: '/assets/images/tutoaux5.JPG', alt: 'Image tutorial 5' },
			{ src: '/assets/images/tutoaux6.JPG', alt: 'Image tutorial 6' }
		]
	}

	register(obj) {
		super.register(obj)
		
		this.declareFunction('onSlideChange')
		this.declareFunction('onFinishTutorial')

		this.obj.state = {
			currentIndex: 0,
			maxIndex: 0
		}
	}


	// View callbacks //
	// --------------------------------------------------------------------------------

	onSlideChange(index) {
		this.setState({
			currentIndex: index,
			maxIndex: Math.max(index, this.getState('maxIndex'))
		})
	}

	onFinishTutorial() {
		AppHelper.setBusy(true).
		then(function () {
			let auxiliary = AuxiliaryHelper.getData(AuthHelper.getEntityId())
			auxiliary.isTutoSkipped = true
			return AuxiliaryHelper.putAuxiliary(auxiliary)
		}).
		then(function () {
			return AuxiliaryHelper.getAuxiliary(AuthHelper.getEntityId())
		}).
		then(function () {
			return AppHelper.navigate('/auxiliary/redirect')
		}).
		then(function () {
			setTimeout(AppHelper.setBusy, 200)
		}).
		catch(function (error) {
			setTimeout(AppHelper.setBusy, 200)
			console.error('Tuto complete error')
			console.error(error)
		}) 
	}

}
var AuxiliaryTutoObj = new AuxiliaryTutoData()
export default AuxiliaryTutoObj
