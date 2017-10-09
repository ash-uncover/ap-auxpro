import React from 'react'
import './AuxiliaryZone.scss'

import ServiceHelper from 'helpers/ServiceHelper'

import { Grid, Panel } from 'ap-react-bootstrap'

import ServiceUtils from 'utils-lib/entities/ServiceUtils'

class AuxiliaryZoneInfoService extends React.Component {

	constructor(props) {
		super(props)
	}

	render() {
		let service = ServiceHelper.getData(this.props.serviceId)
		return (
			<Panel className='ap-auxiliary-zone-info ap-auxiliary-zone-info-service'>
				<Panel.Header>
					Service
				</Panel.Header>
				<Panel.Body>
					<div><b>{service.socialReason}</b></div>
					<div>{service.address}</div>
					<div>{service.postalCode + ' ' + service.city}</div>
				</Panel.Body>
				<Panel.Footer>
				</Panel.Footer>
			</Panel>
		)
	}
}
export default AuxiliaryZoneInfoService