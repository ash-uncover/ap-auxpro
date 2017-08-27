import React from 'react'
import ServiceCustomerData from 'components/service/customers/ServiceCustomerData'
import './ServiceCustomer.scss'

import CustomerUtils from 'utils/entities/CustomerUtils'

import { Button, Panel, Form, Grid } from 'ap-react-bootstrap'

class ServiceCustomer extends React.Component {

	constructor(props) {
		super(props)
	}

	componentWillMount() {
		ServiceCustomerData.register(this, this.props.params.customerId)
	}

	componentWillUnmount() {
		ServiceCustomerData.unregister()
	}

	_buildFromGroup(label, value) { return (
		<Form.Group>
			<Form.Label className='col-sm-5 col-md-4'>{label}</Form.Label>
			<Form.Static className='col-sm-7 col-md-8 user-select-text'>{value}</Form.Static>
		</Form.Group>
	)}

	render() {
		return (
			<div className='ap-service-customer'>
				<Button block bsStyle='primary' onClick={this.onBack}>Retour</Button>
				<br/>
				<Panel>
					<Panel.Header>
						{CustomerUtils.getFullName(this.state.customer)}
					</Panel.Header>
					<Panel.Body>
						<Form horizontal>
							<h4>Informations</h4>
							<Grid.Row>
								<Grid.Col sm={6} md={5} mdOffset={1} lg={4} lgOffset={2}>
									{this._buildFromGroup('Civilité', this.state.civility)}
									{this._buildFromGroup('Nom', this.state.lastName)}
									{this._buildFromGroup('Prénom', this.state.firstName)}
									{this._buildFromGroup('Date de naissance', this.state.birthDate)}
									{this._buildFromGroup('Nationalité', this.state.nationality)}
								</Grid.Col>
								<Grid.Col sm={6} md={5} lg={4}>
									{this._buildFromGroup('Adresse', this.state.address)}
									{this._buildFromGroup('Code postal', this.state.postalCode)}
									{this._buildFromGroup('Ville', this.state.city)}
									{this._buildFromGroup('Pays', this.state.country)}
									{this._buildFromGroup('Téléphone', this.state.phone)}
									{this._buildFromGroup('Email', this.state.email)}
								</Grid.Col>
							</Grid.Row>
							<h4>Besoins</h4>
						</Form>
					</Panel.Body>
					<Panel.Footer>
					</Panel.Footer>
				</Panel>
			</div>
		)
	}

}
export default ServiceCustomer