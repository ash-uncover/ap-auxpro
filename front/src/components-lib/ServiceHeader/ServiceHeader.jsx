import React from 'react'
import ServiceHeaderData from 'components-lib/ServiceHeader/ServiceHeaderData'
import './ServiceHeader.scss'

import { Col, Panel, Form } from 'ap-react-bootstrap'

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
			<Panel className='ap-service-header hidden-xs'>
				<Panel.Body>
					<Col sm={4} md={3} lg={2}>
						<img alt='Ma photo' className='ap-header-img' src={this.state.avatarImage} />
					</Col>
					<Col sm={8} md={9} lg={10}>
						<Form horizontal>
							<Form.Group>
								<Form.Label className='col-sm-2'>Société</Form.Label>
								<Form.Static className='col-sm-10'>{this.state.society}</Form.Static>
							</Form.Group>
							<Form.Group>
								<Form.Label className='col-sm-2'>Adresse</Form.Label>
								<Form.Static className='col-sm-10'>{this.state.address}</Form.Static>
							</Form.Group>
							<Form.Group>
								<Form.Label className='col-sm-2'>Email</Form.Label>
								<Form.Static className='col-sm-10'>{this.state.email}</Form.Static>
							</Form.Group>
							<Form.Group>
								<Form.Label className='col-sm-2'>Raison Sociale</Form.Label>
								<Form.Static className='col-sm-10'>{this.state.socialReason}</Form.Static>
							</Form.Group>
						</Form>
					</Col>
				</Panel.Body>
			</Panel>
		)
	}

}
export default ServiceHeader
