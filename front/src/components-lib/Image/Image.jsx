import React from 'react'
import './Image.scss'

import ImageHelper from 'helpers/ImageHelper'

class Image extends React.Component {

	constructor(props) {
		super(props)
		this.state = {}
	}

	componentWillMount() {
		this.onImageUpdate()
		this.registerImage(this.props.id)
	}

	componentWillReceiveProps(props) {
		ImageHelper.unregister(this)
		this.registerImage(props.id)
	}

	componentWillUnmount() {
		ImageHelper.unregister(this)
	}

	registerImage(id) {
		if (id) {
			ImageHelper.register(id, this, this.onImageUpdate.bind(this))
			if (!ImageHelper.getData(id)) {
				ImageHelper.getImage(id)
			}
		}
	}

	onImageUpdate() {
		this.setState({ src: ImageHelper.getData(this.props.id) })
	}

	render() {
		return (
			<img className={'ap-image' + (this.props.className ? ' ' + this.props.className : '')} alt={this.props.alt} src={this.state.src} />
		)
	}

}
export default Image
