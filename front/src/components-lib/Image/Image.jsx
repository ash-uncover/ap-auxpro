import React from 'react'
import './Image.scss'

import { BaseComponent } from 'ap-react-bootstrap'

import ImageHelper from 'helpers/ImageHelper'

class Image extends BaseComponent {

	constructor(props) {
		super(props)
		// Base classes
		this.baseClasses = [ 'ap-image' ]
		this.state = {}
		// Component properties
		this.propsInfos = {
			required : {
				id: {}
			},
			optionnal : {
				alt: {}
			}
		}
        this.onImageUpdate = this.onImageUpdate.bind(this)
	}

	componentWillMount() {
		this.onImageUpdate()
		this.registerImage(this.props.id)
	}

	componentWillReceiveProps(props) {
		ImageHelper.unregister(props.id, this.onImageUpdate)
		this.registerImage(props.id)
	}

	componentWillUnmount() {
		ImageHelper.unregister(this.props.id, this.onImageUpdate)
	}

	registerImage(id) {
		if (id) {
			ImageHelper.register(id, this.onImageUpdate)
			if (!ImageHelper.getData(id)) {
				ImageHelper.getImage(id)
			}
		}
	}

	onImageUpdate() {
		this.setState({ src: ImageHelper.getData(this.props.id) })
	}

	render() {
		this.buildProps('Image')
		return (
			<img 
				className={this.className} 
				alt={this.props.alt} 
				src={this.state.src} />
		)
	}

}
export default Image
