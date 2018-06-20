 	import React from 'react'
import ServiceInterventionsData from './ServiceInterventionsData'
import './ServiceInterventions.scss'

import { Panel, Form, Grid, Button, Glyphicon, SearchBar, TextUtils } from 'ap-react-bootstrap'

import AuxiliaryHelper from 'helpers/AuxiliaryHelper'
import CustomerHelper from 'helpers/CustomerHelper'

import ServiceInterventionTilePending from 'components-lib/ServiceInterventionTile/ServiceInterventionTilePending'
import ServiceInterventionTileOffered from 'components-lib/ServiceInterventionTile/ServiceInterventionTileOffered'
import ServiceInterventionTilePlanned from 'components-lib/ServiceInterventionTile/ServiceInterventionTilePlanned'
import Text from 'components-lib/Text/Text'
import ModalDialog from 'components-lib/Modal/ModalDialog'

import AuxiliaryUtils from 'utils-lib/entities/AuxiliaryUtils'
import CustomerUtils from 'utils-lib/entities/CustomerUtils'
import InterventionUtils from 'utils-lib/entities/InterventionUtils'

class ServiceInterventions extends React.Component {

	constructor(props) {
		super(props)
		this.state = {}
		this.buildPending = this._buildPending.bind(this)
		this.buildOffered = this._buildOffered.bind(this)
		this.buildPlanned = this._buildPlanned.bind(this)
	}

	componentWillMount() {
		ServiceInterventionsData.register(this)
	}

	componentWillUnmount() {
		ServiceInterventionsData.unregister()
	}


	// Rendering functions //
	// --------------------------------------------------------------------------------

	_buildPending(intervention, index) {
        const result = []
		result.push(
            <ServiceInterventionTilePending 
				key={intervention.id}
				onEdit={this.onEditIntervention.bind(this, intervention.id)}
				onMatch={this.onMatchIntervention.bind(this, intervention.id)}
				onDelete={this.onDeleteIntervention.bind(this, intervention.id)}>
				{this.__buildCustomerContent(intervention.customerId)}
				<Text text={InterventionUtils.getText(intervention)} />
			</ServiceInterventionTilePending>
		)
        this._buildClearfix(result, index)
        return result
	}
	_buildOffered(intervention, index) {
		const result = []
        result.push(
			<ServiceInterventionTileOffered 
				key={intervention.id}
				onFollow={this.onFollowMatching.bind(this, intervention.id)}
				onCancel={this.onCancelMatching.bind(this, intervention.id)}>
				{this.__buildCustomerContent(intervention.customerId)}
				<Text text={InterventionUtils.getText(intervention)} />
			</ServiceInterventionTileOffered>
		)
        this._buildClearfix(result, index)
        return result
	}
	_buildPlanned(intervention, index) {
		let auxiliary = AuxiliaryHelper.getData(intervention.auxiliaryId)
		const result = []
        result.push(
			<ServiceInterventionTilePlanned 
				key={intervention.id}
				onCancel={this.onCancelIntervention.bind(this, intervention.id)}>
				{this.__buildCustomerContent(intervention.customerId)}
				<Text text={InterventionUtils.getText(intervention)} />
				<div className='ap-intile-strong'>
					<b>Assurée par {AuxiliaryUtils.getFullName(auxiliary)}</b>
					<Button 
						bsSize='xs' 
						className='ap-intile-action' 
						tooltip='Voir détail auxiliaire'
						onClick={this.onViewAuxiliary.bind(this, auxiliary.id)}>
						<Glyphicon glyph='user' />
					</Button>
				</div>
			</ServiceInterventionTilePlanned>
		)
        this._buildClearfix(result, index)
        return result
	}
    _buildClearfix(result, index) {
        if (index && index % 3 === 2) {
            result.push(
                <Grid.Clearfix key={`md-${index}`} className='hidden-xs hidden-sm'/>
            )
        }
        if (index && index % 2 === 1) {
            result.push(
                <Grid.Clearfix key={`sm-${index}`} className='visible-sm'/>
            )
        }
    }

	__buildCustomerContent(customerId) {
		let customer = CustomerHelper.getData(customerId)
		return (
			<div className='ap-intile-strong'>
				<b>{CustomerUtils.getFullName(customer)}</b>
				<Button 
					className='ap-intile-action'
					bsSize='xs'
					tooltip='Voir détail usager'
					onClick={this.onViewCustomer.bind(this, customerId)}>
					<Glyphicon glyph='user' />
				</Button>
			</div>
		)
	}

	buildPendingLabel() {
		let l = this.state.pending && this.state.pending.length || 0
		return l + ' ' + TextUtils.pluralize('demande', l) + ' de prestation'
	}
	buildOfferedLabel() {
		let l = this.state.offered.length
		return l + ' ' + TextUtils.pluralize('matching', l) + ' actifs'
	}
	buildPlannedLabel() {
		let l = this.state.planned.length
		return l + ' ' + TextUtils.pluralize('intervention', l) + ' en cours'
	}

	render() {
		return (
			<div className='ap-service-interventions'>
				
				{this.state.canCreateInter ? 
					<Button 
						block 
						bsStyle='primary'
						onClick={this.onCreateIntervention}>
						Saisir nouvelle prestation
					</Button>
					:
					<div>Il faut un usager pour ajouter une prestation</div>
				}
				<br/>
				{ this.state.pending.length ?
				<Panel>
					<Panel.Header>
						Demandes de prestation
					</Panel.Header>
					<Panel.Body>
						<Grid.Row>
							{this.state.pending.map(this.buildPending)}
						</Grid.Row>
					</Panel.Body>
					<Panel.Footer>
						{this.buildPendingLabel()}
					</Panel.Footer>
				</Panel>
				: null }
				{ this.state.offered.length ?
				<Panel>
					<Panel.Header>
						Matching actifs
					</Panel.Header>
					<Panel.Body>
						<Grid.Row>
							{this.state.offered.map(this.buildOffered)}
						</Grid.Row>
					</Panel.Body>
					<Panel.Footer>
						{this.buildOfferedLabel()}
					</Panel.Footer>
				</Panel>
				: null }
				{ this.state.planned.length ?
				<Panel>
					<Panel.Header>
						Interventions en cours
					</Panel.Header>
					<Panel.Body>
						<Grid.Row>
							{this.state.planned.map(this.buildPlanned)}
						</Grid.Row>
					</Panel.Body>
					<Panel.Footer>
						{this.buildPlannedLabel()}
					</Panel.Footer>
				</Panel>
				: null }

				<ModalDialog 
					title="Supprimer l'intervention ?"
					show={this.state.showDeleteIntervention}
					onCancel={this.onCancelDeleteIntervention}
					onConfirm={this.onConfirmDeleteIntervention}>
					Êtes-vous sûr ?
				</ModalDialog>

				<ModalDialog 
					title='Annuler le MATCHING ?'
					show={this.state.showCancelMatching}
					onCancel={this.onCancelCancelMatching}
					onConfirm={this.onConfirmCancelMatching}>
					Êtes-vous sûr ?
				</ModalDialog>

				<ModalDialog 
					title="Annuler l'intervention ?"
					show={this.state.showCancelIntervention}
					onCancel={this.onCancelCancelIntervention}
					onConfirm={this.onConfirmCancelIntervention}>
					Êtes-vous sûr ?
				</ModalDialog>
				
			</div>
		)
	}

}
export default ServiceInterventions
