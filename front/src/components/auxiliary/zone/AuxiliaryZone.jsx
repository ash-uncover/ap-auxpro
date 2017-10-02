import React from 'react'
import AuxiliaryZoneData from './AuxiliaryZoneData'
import './AuxiliaryZone.scss'

import CustomerUtils from 'utils-lib/entities/CustomerUtils'

import { Grid, Panel, Form, GoogleMap } from 'ap-react-bootstrap'

/* This class was auto-generated by the JavaScriptWriter */
class AuxiliaryZone extends React.Component {

	constructor(props) {
		super(props)
	}

	componentWillMount() {
		AuxiliaryZoneData.register(this)
	}

	componentWillUnmount() {
		AuxiliaryZoneData.unregister()
	}

	_buildLegend(icon, label) {
		return (
			<Grid.Col xs={6} md={3} className='ap-auxiliary-zone-legend'>
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
				onChange={null} />
		)
	}

	render() {
		return (
			<Grid.Row className='ap-auxiliaryzone'>
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
							{this._buildLegend(AuxiliaryZoneData.ICONS.HOME, 'Mon domicile')}
							{this._buildLegend(AuxiliaryZoneData.ICONS.GEOZONE, 'Mes zones')}
							{this._buildLegend(AuxiliaryZoneData.ICONS.OFFER, 'Mes offres')}
							{this._buildLegend(AuxiliaryZoneData.ICONS.INTERVENTION, 'Mes interventions')}
							{this._buildLegend(AuxiliaryZoneData.ICONS.SERVICE, 'Mes SAD')}
							{this._buildLegend(AuxiliaryZoneData.ICONS.SERVICE_ANY, 'Tous les SAD')}
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
							{this._buildFilter('showOffers', 'Afficher Offres')}
							{this._buildFilter('showInterventions', 'Afficher mes Usagers')}
							{this._buildFilter('showServices', 'Afficher mes SAD')}
							{this._buildFilter('showAllServices', 'Afficher tous les SAD')}
						</Panel.Body>
						<Panel.Footer>
						</Panel.Footer>
					</Panel>
					{this.state.infoType === AuxiliaryZoneData.INFO_TYPE.HOME ? 
						<Panel>
							<Panel.Header>
								Mon domicile
							</Panel.Header>
							<Panel.Body>
								<p><strong>{this.state.auxliary.civility + ' ' + this.state.auxliary.lastName + ' ' + this.state.auxliary.firstName}</strong></p>
								<div>{this.state.auxliary.address}</div>
								<div>{this.state.auxliary.postalCode + ' ' + this.state.auxliary.city}</div>
							</Panel.Body>
							<Panel.Footer>
							</Panel.Footer>
						</Panel>
					: null }
					{this.state.infoType === AuxiliaryZoneData.INFO_TYPE.SERVICE ? 
						<Panel>
							<Panel.Header>
								Service
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
					{this.state.infoType === AuxiliaryZoneData.INFO_TYPE.CUSTOMER || this.state.infoType === AuxiliaryZoneData.INFO_TYPE.OFFER ? 
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
				</Grid.Col>
			</Grid.Row>
		)
	}

}
export default AuxiliaryZone
