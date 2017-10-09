import React from 'react'
import './AuxiliaryZone.scss'

import CustomerHelper from 'helpers/CustomerHelper'

import { Grid, Panel } from 'ap-react-bootstrap'

import CustomerUtils from 'utils-lib/entities/CustomerUtils'

class AuxiliaryZoneInfoCustomer extends React.Component {

	constructor(props) {
		super(props)
	}

	render() {
		let customer = CustomerHelper.getData(this.props.customerId)
		return (
			<Panel className='ap-auxiliary-zone-info ap-auxiliary-zone-info-customer'>
				<Panel.Header>
					Usager
				</Panel.Header>
				<Panel.Body>
					<div><b>{CustomerUtils.getFullName(customer)}</b></div>
					<div>{customer.address}</div>
					<div>{customer.postalCode + ' ' + customer.city}</div>
				</Panel.Body>
				<Panel.Footer>
				</Panel.Footer>
			</Panel>
		)
	}
}
export default AuxiliaryZoneInfoCustomer