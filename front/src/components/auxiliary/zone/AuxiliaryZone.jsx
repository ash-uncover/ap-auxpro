import React from 'react'
import AuxiliaryZoneData from './AuxiliaryZoneData'
import './AuxiliaryZone.scss'

import AuxiliaryZoneEdit from './AuxiliaryZoneEdit'
import AuxiliaryZoneInfoAuxiliary from './AuxiliaryZoneInfoAuxiliary'
import AuxiliaryZoneInfoCustomer from './AuxiliaryZoneInfoCustomer'
import AuxiliaryZoneInfoGeozone from './AuxiliaryZoneInfoGeozone'
import AuxiliaryZoneInfoService from './AuxiliaryZoneInfoService'

import { Grid, Panel, Form, GoogleMap, FormBuilder, Button, Glyphicon } from 'ap-react-bootstrap'

import ModalDialog from 'components-lib/Modal/ModalDialog'

import CustomerUtils from 'utils-lib/entities/CustomerUtils'

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
				onChange={this.onChangeFilter.bind(this, value)} />
		)
	}

	render() {
		return (
			<Grid.Row className='ap-auxiliary-zone'>
				<Grid.Col sm={8}>
					<Panel>
						<Panel.Header>
							Répartition géographique
						</Panel.Header>
						<Panel.Body>
							<GoogleMap
								centerLattitude={this.state.centerLattitude} 
								centerLongitude={this.state.centerLongitude}
								markers={this.state.markers}
								circles={this.state.circles}
								onMapClicked={this.onMapClicked} />
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
					{ this.state.mode !== AuxiliaryZoneData.MODE.EDIT ?
						<Button 
							block
							disabled={this.state.geozonesCount >= 3}
							bsStyle={this.state.geozonesCount >= 3 ? 'warning' : 'primary'}
							onClick={this.onAddGeozone} >
							{this.state.geozonesCount >= 3 ? 'Maximum 3 zones' : 'Ajouter une zone'}
						</Button>
					: null }
					{ this.state.mode !== AuxiliaryZoneData.MODE.EDIT ?
						<br/>
					: null }
					{ this.renderInfo() }
					<ModalDialog 
						title="Supprimer la zone d'intervention ?"
						show={this.state.showDelete}
						onCancel={this.onCancelDeleteGeozone}
						onConfirm={this.onConfirmDeleteGeozone}>
						Êtes-vous sûr ?
					</ModalDialog>
				</Grid.Col>
			</Grid.Row>
		)
	}

	renderInfo() {
		if (this.state.mode === AuxiliaryZoneData.MODE.EDIT) {
			return this.renderInfoEdit()
		} else if (this.state.auxiliaryId) {
			return this.renderInfoAuxiliary()
		} else if (this.state.customerId) {
			return this.renderInfoCustomer()
		} else if (this.state.geozoneId) {
			return this.renderInfoGeozone()
		} else if (this.state.serviceId) {
			return this.renderInfoService()
		}
		return null
	}

	renderInfoEdit() {
		return (
			<AuxiliaryZoneEdit 
				geozoneId={this.state.geozoneId}
				onCancel={this.onCancelEditGeozone}
				onGeozoneUpdate={this.onGeozoneUpdate} />
		)
	}

	renderInfoAuxiliary() {
		return (
			<AuxiliaryZoneInfoAuxiliary 
				auxiliaryId={this.state.auxiliaryId} />
		)
	}

	renderInfoCustomer() {
		return (
			<AuxiliaryZoneInfoCustomer 
				customerId={this.state.customerId} />
		)
	}

	renderInfoGeozone() {
		return (
			<AuxiliaryZoneInfoGeozone 
				geozoneId={this.state.geozoneId} 
				onEdit={this.onEditGeozone}
				onDelete={this.onDeleteGeozone} />
		)
	}

	renderInfoService() {
		return (
			<AuxiliaryZoneInfoService 
				serviceId={this.state.serviceId} />
		)
	}
}
export default AuxiliaryZone

/*
{this.state.panelGeozoneData ?
						<Panel {...this.state.panelGeozoneData}>
							<Grid.Col xs={12}>
								<Form horizontal>
									<Form.Group>
										<Form.Label>Type</Form.Label>
										<Form.Static>{'test'}</Form.Static>
									</Form.Group>
								</Form>
								<Button {...this.state.buttonAddData} />
								<br/>
								<Button {...this.state.buttonCancelData} />
							</Grid.Col>
						</Panel>
					: 
						<Button {...this.state.buttonAddData} />
					}
					{this.state.infoType === AuxiliaryZoneData.INFO_TYPE.HOME ? 
						<Panel>
							<Panel.Header>
								Mon domicile
							</Panel.Header>
							<Panel.Body>
								<p><strong>{this.state.auxiliary.civility + ' ' + this.state.auxiliary.lastName + ' ' + this.state.auxiliary.firstName}</strong></p>
								<div>{this.state.auxiliary.address}</div>
								<div>{this.state.auxiliary.postalCode + ' ' + this.state.auxiliary.city}</div>
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
					{this.state.infoType === AuxiliaryZoneData.INFO_TYPE.GEOZONE ? 
						<Panel>
							<Panel.Header>
								Zone
								<Button 
									bsSize='xs' 
									tooltip='Editer' 
									onClick={this.onEditGeozone.bind(this, this.state.geozoneId)}>
									<Glyphicon glyph='pencil'/>
								</Button>
								<Button 
									bsSize='xs' 
									tooltip='Supprimer' 
									onClick={this.onDeleteGeozone.bind(this, this.state.geozoneId)}>
									<Glyphicon glyph='remove'/>
								</Button>
							</Panel.Header>
							<Panel.Body>
								<div>{this.state.geoZone.type === 'Area' ? 'Autour de' : 'Par Ville'}</div>
								<p><strong>{this.state.geoZone.city}</strong></p>
								{this.state.geoZone.type === 'Area' ? <div>{(this.state.geoZone.radius / 1000) + 'km'}</div> : null}
							</Panel.Body>
							<Panel.Footer>
							</Panel.Footer>
						</Panel>
					: null }
*/