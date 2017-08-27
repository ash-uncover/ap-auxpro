import React from 'react'
import ImageData from 'components-lib/Image/ImageData'
import './Image.scss'

class Image extends React.Component {

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
			<img className={'ap-image' + this.props.className ? ' ' + this.props.className : ''} alt={this.props.alt} src={this.state.src} />
		)
	}

}
export default Image
