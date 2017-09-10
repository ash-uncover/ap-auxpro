import ImageHelper from 'helpers/ImageHelper'

import { BaseData } from 'ap-react-bootstrap'

class ImageData extends BaseData {

	register(obj, id) {
		super.register(obj)

		this.id = id

		this.obj.state = {
			src: null
		}

		this._onImageUpdate()

		console.log('--------------------------------------')
		console.log(id)

		if (id) {
			ImageHelper.register(id, this, this.onImageUpdate.bind(this))
			if (!ImageHelper.getData(id)) {
				console.log('LOAD')
				ImageHelper.getImage(id)
			}
		}
	}

	unregister() {
		ImageHelper.unregister(this)
	}

	onImageUpdate() {
		console.log('LOADEEEDDDDDDDDDDD')
		this._onImageUpdate()
		this.forceUpdate()
	}

	_onImageUpdate() {
		this.obj.state.src = ImageHelper.getData(this.id)
	}
}
var ImageObj = new ImageData()
export default ImageObj
