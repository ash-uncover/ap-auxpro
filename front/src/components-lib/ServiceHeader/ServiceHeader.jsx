import React from 'react'
import ServiceHeaderData from 'components-lib/ServiceHeader/ServiceHeaderData'
import './ServiceHeader.scss'

import { Col, Panel } from 'ap-react-bootstrap'

class ServiceHeader extends React.Component {

	constructor(props) {
		super(props)
	}

	componentWillMount() {
		ServiceHeaderData.register(this)
	}

	componentWillUnmount() {
		ServiceHeaderData.unregister()
	}

	render() {
		return (
			<Panel className='ap-service-header hidden-xs' header=' ' footer=' ' >
				<Col sm={4}>
					ma photo
				</Col>
				<Col sm={8}>
					Mes infos
				</Col>
			</Panel>
		)
	}

}
export default ServiceHeader
