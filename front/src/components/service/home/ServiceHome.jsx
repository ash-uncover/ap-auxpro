import React from 'react'
import ServiceHomeData from './ServiceHomeData'
import './ServiceHome.scss'

import { Panel } from 'ap-react-bootstrap'

class ServiceHome extends React.Component {

	constructor(props) {
		super(props)
	}

	componentWillMount() {
		ServiceHomeData.register(this)
	}

	componentWillUnmount() {
		ServiceHomeData.unregister()
	}

	render() {
		return (
			<Panel className='ap-service-home'>
				<Panel.Header>
					Service Home Header
				</Panel.Header>
				<Panel.Body>
					Service Home Body
				</Panel.Body>
				<Panel.Footer>
					Service Home Footer
				</Panel.Footer>
			</Panel>
		)
	}

}
export default ServiceHome
