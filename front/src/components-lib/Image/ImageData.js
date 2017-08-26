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

		if (id) {
			ImageHelper.register(id, this, this._onImageUpdate.bind(this))
			if (!ImageHelper.getData(id)) {
				ImageHelper.getImage(id)
			}
		}
	}

	unregister() {
		ImageHelper.unregister(this)
	}

	_onImageUpdate() {
		this.setState({ src: ImageHelper.getData(this.id) })
	}
}
var ImageObj = new ImageData()
export default ImageObj
