import React from 'react'
import ServiceInfosEditPhotoData from 'components/service/infos/edit/photo/ServiceInfosEditPhotoData'
import './ServiceInfosEditPhoto.scss'

/* This class was auto-generated by the JavaScriptWriter */
class ServiceInfosEditPhoto extends React.Component {

	constructor(props) {
		super(props)
	}

	componentWillMount() {
		ServiceInfosEditPhotoData.register(this)
	}

	componentWillUnmount() {
		ServiceInfosEditPhotoData.unregister()
	}

	render() {
		return (
			<div className='ap-serviceinfoseditphoto'>
				ServiceInfosEditPhoto
			</div>
		)
	}

}
export default ServiceInfosEditPhoto
