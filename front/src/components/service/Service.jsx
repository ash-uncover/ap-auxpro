import React from 'react'
import ServiceData from 'components/service/ServiceData'
import './Service.scss'

import ServiceHeader from 'components-lib/ServiceHeader/ServiceHeader'

class Service extends React.Component {

	constructor(props) {
		super(props)
	}

	componentWillMount() {
		ServiceData.register(this)
	}

	componentWillUnmount() {
		ServiceData.unregister()
	}

	render() {
		return (
			<div className='ap-service'>
				<ServiceHeader />
				{this.props.children}
			</div>
		)
	}

}
export default Service
