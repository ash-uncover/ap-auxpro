import React from 'react'
import ServiceData from 'components/service/ServiceData'
import './Service.scss'

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
				{this.props.children}
			</div>
		)
	}

}
export default Service
