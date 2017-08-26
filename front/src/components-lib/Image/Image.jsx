import React from 'react'
import ImageData from 'components-lib/Image/ImageData'
import './Image.scss'

import { Base } from 'ap-react-bootstrap'

class APImage extends React.Component {

	constructor(props) {
		super(props)
	}

	componentWillMount() {
		ImageData.register(this, this.props.id)
	}

	componentWillReceiveProps(props) {
		ImageData.unregister()
		ImageData.register(this, props.id)
	}

	componentWillUnmount() {
		ImageData.unregister()
	}

	render() {
		return (
			<img className='ap-image' alt={this.props.alt} src={this.state.src} />
		)
	}

}
export default APImage
