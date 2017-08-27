import React from 'react'
import ServiceHeaderData from 'components-lib/ServiceHeader/ServiceHeaderData'
import './ServiceHeader.scss'

import { Col, Panel, Form } from 'ap-react-bootstrap'
import Image from 'components-lib/Image/Image'

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

	_buildFromGroup(label, value) { return (
		<Form.Group>
			<Form.Label className='col-sm-2'>{label}</Form.Label>
			<Form.Static className='col-sm-10 user-select-text'>{value}</Form.Static>
		</Form.Group>
	)}

	render() {
		return (
			<Panel className='ap-service-header hidden-xs'>
				<Panel.Body>
					<Col sm={4} md={3} lg={2} className='ap-image-column'>
						<Image alt='<Ma photo>' id={this.state.avatar} className={this.state.avatar ? '' : 'ap-no-image'}/>
					</Col>
					<Col sm={8} md={9} lg={10}>
						<Form horizontal>
							{this._buildFromGroup('Société', this.state.society)}
							{this._buildFromGroup('Adresse', this.state.address)}
							{this._buildFromGroup('Email', this.state.email)}
							{this._buildFromGroup('Raison Sociale', this.state.socialReason)}
						</Form>
					</Col>
				</Panel.Body>
			</Panel>
		)
	}

}
export default ServiceHeader
