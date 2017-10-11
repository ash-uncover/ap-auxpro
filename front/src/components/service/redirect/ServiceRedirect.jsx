import React from 'react'
import ServiceRedirectData from './ServiceRedirectData'
import './ServiceRedirect.scss'

class ServiceRedirect extends React.Component {

	constructor(props) {
		super(props)
	}

	componentWillMount() {
		ServiceRedirectData.register(this)
	}

	componentWillUnmount() {
		ServiceRedirectData.unregister()
	}

	render() {
		return (
			<div className='ap-service-redirect' />
		)
	}

}
export default ServiceRedirect
