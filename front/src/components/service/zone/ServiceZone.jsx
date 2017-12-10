import React from 'react'
import ServiceZoneData from './ServiceZoneData'
import './ServiceZone.scss'

import { Grid, Panel, Form, GoogleMap } from 'ap-react-bootstrap'

import AuxiliaryUtils from 'utils-lib/entities/AuxiliaryUtils'
import CustomerUtils from 'utils-lib/entities/CustomerUtils'

class ServiceZone extends React.Component {

	constructor(props) {
		super(props)
		this.state = {}
	}

	componentWillMount() {
		ServiceZoneData.register(this)
	}

	componentWillUnmount() {
		ServiceZoneData.unregister()
	}

	_buildLegend(icon, label) {
		return (
			<Grid.Col xs={6} md={3} className='ap-service-zone-legend'>
				<img src={icon}/>
				<p>{label}</p>
			</Grid.Col>
		)
	}

	_buildFilter(value, label) {
		return (
			<Form.Switch 
				key={value}
				text={label}
				value={this.state[value]}
				onChange={this.onChangeFilter.bind(this, value)} />
		)
	}

	_buildIntervenant(auxiliary) {
		return (
			<div key={auxiliary.id}>
				{AuxiliaryUtils.getFullName(auxiliary)}
			</div>
		)
	}

	render() {
		return (
			<Grid.Row className='ap-service-zone'>
				<Grid.Col sm={8}>
					<Panel>
						<Panel.Header>
							Répartition géographique
						</Panel.Header>
						<Panel.Body>
							<GoogleMap
								centerLattitude={this.state.centerLattitude} 
								centerLongitude={this.state.centerLongitude}
								markers={this.state.markers} />
							<br/>
							{this._buildLegend(ServiceZoneData.ICONS.HOME, 'Ma Société')}
							{this._buildLegend(ServiceZoneData.ICONS.INTERVENTION, 'Mes interventions')}
							{this._buildLegend(ServiceZoneData.ICONS.CUSTOMER, 'Mes autres usagers')}
							{this._buildLegend(ServiceZoneData.ICONS.AUXILIARY, 'Mes auxiliaires')}
						</Panel.Body>
						<Panel.Footer>
						</Panel.Footer>
					</Panel>
				</Grid.Col>
				<Grid.Col sm={4}>
					<Panel>
						<Panel.Header>
							Filtres
						</Panel.Header>
						<Panel.Body>
							{this._buildFilter('showInterventions', 'Afficher Interventions')}
							{this._buildFilter('showCustomers', 'Afficher autres Usagers')}
							{this._buildFilter('showAuxiliaries', 'Afficher Auxiliaires')}
						</Panel.Body>
						<Panel.Footer>
						</Panel.Footer>
					</Panel>
					{this.state.infoType === ServiceZoneData.INFO_TYPE.HOME ? 
						<Panel>
							<Panel.Header>
								Ma société
							</Panel.Header>
							<Panel.Body>
								<p><strong>{this.state.service.socialReason}</strong></p>
								<div>{this.state.service.address}</div>
								<div>{this.state.service.postalCode + ' ' + this.state.service.city}</div>
							</Panel.Body>
							<Panel.Footer>
							</Panel.Footer>
						</Panel>
					: null }
					{this.state.infoType === ServiceZoneData.INFO_TYPE.AUXILIARY && this.state.showAuxiliaries ? 
						<Panel>
							<Panel.Header>
								Auxiliaire
							</Panel.Header>
							<Panel.Body>
								<p><strong>{AuxiliaryUtils.getFullName(this.state.auxiliary)}</strong></p>
								<div>{this.state.auxiliary.address}</div>
								<div>{this.state.auxiliary.postalCode + ' ' + this.state.auxiliary.country}</div>
								<div>{'Tel   : ' + this.state.auxiliary.phone}</div>
								<div>{'Email : ' + this.state.auxiliary.email}</div>
							</Panel.Body>
							<Panel.Footer>
							</Panel.Footer>
						</Panel>
					: null }
					{this.state.infoType === ServiceZoneData.INFO_TYPE.CUSTOMER && this.state.showCustomers ? 
						<Panel>
							<Panel.Header>
								Usager
							</Panel.Header>
							<Panel.Body>
								<p><strong>{CustomerUtils.getFullName(this.state.customer)}</strong></p>
								<div>{this.state.customer.address}</div>
								<div>{this.state.customer.postalCode + ' ' + this.state.customer.city}</div>
								<div>{'Tel   : ' + this.state.customer.phone}</div>
								<div>{'Email : ' + this.state.customer.email}</div>
							</Panel.Body>
							<Panel.Footer>
							</Panel.Footer>
						</Panel>
					: null }
					{this.state.infoType === ServiceZoneData.INFO_TYPE.INTERVENTION && this.state.showInterventions ? 
						<Panel>
							<Panel.Header>
								Usager
							</Panel.Header>
							<Panel.Body>
								<p><strong>{CustomerUtils.getFullName(this.state.customer)}</strong></p>
								<div>{this.state.customer.address}</div>
								<div>{this.state.customer.postalCode + ' ' + this.state.customer.city}</div>
								<div>{'Tel   : ' + this.state.customer.phone}</div>
								<div>{'Email : ' + this.state.customer.email}</div>
								{this.state.interventions.length ? <br /> : null }
								{this.state.interventions.length ?
									<p><strong>Intervenants</strong></p>
								: null }
								{this.state.interventions.map(this._buildIntervenant)}
							</Panel.Body>
							<Panel.Footer>
							</Panel.Footer>
						</Panel>
					: null }
				</Grid.Col>
			</Grid.Row>
		)
	}

}
export default ServiceZone
