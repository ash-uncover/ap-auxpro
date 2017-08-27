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
		if (this.state.loaded) {
			return (
				<div className='ap-service'>
					{this.state.showHeader ?
						<ServiceHeader />
					: null }
					{this.props.children}
				</div>
			)
		} else {
			return (
				<div className='ap-service' />
			)
		}
	}

}
export default Service
