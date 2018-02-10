import React from 'react'
import AuxiliaryIndisponibilityEditData from './AuxiliaryIndisponibilityEditData'
import './AuxiliaryIndisponibilityEdit.scss'

import { Button, Panel, Grid, Form } from 'ap-react-bootstrap'

// components-lib
import FormHelper from 'components-lib/FormHelper'
import FormSelectWeekDays from 'components-lib/FormSelectWeekDays/FormSelectWeekDays'
import ModalDialog from 'components-lib/Modal/ModalDialog'
// utils
import IndisponibilityRecurencePeriod from 'utils/constants/IndisponibilityRecurencePeriod'

class AuxiliaryIndisponibilityEdit extends React.Component {

	constructor(props) {
		super(props)
		this.state = {}
		this.buildFormGroup = FormHelper.buildFormGroup.bind(this)
		this.buildFormControl = FormHelper.buildFormControl.bind(this)
	}

	componentWillMount() {
		AuxiliaryIndisponibilityEditData.register(this, this.props.params.indisponibilityId)
	}

	componentWillUnmount() {
		AuxiliaryIndisponibilityEditData.unregister()
	}


	// Rendering functions //
	// --------------------------------------------------------------------------------

	render() {
		let submitDisabled = !this.state.dirty || !this.state.indisponibilityValid || this.state.showError || this.state.showWarning
		return (
			<div className='ap-auxiliary-indisponibility-edit'>
				<Button block bsStyle='primary' onClick={this.onCancel}>Annuler</Button>
				<br/>
				<Panel>
					<Panel.Header>
						{this.state.mode === AuxiliaryIndisponibilityEditData.MODES.CREATE ?
							'Créer nouvelle indisponibilité'
						:
							'Modifier indisponibilité'
						}
					</Panel.Header>
					<Panel.Body>
						<Form horizontal className='col-sm-8 col-lg-7'>
							{AuxiliaryIndisponibilityEditData.FIELDS_FORM1.map(this.buildFormGroup)}
							{ this.state.indisponibilityNightly ?
								<p className='ap-warning col-sm-7 col-sm-offset-5 col-md-8 col-md-offset-4'>
									Cette indisponibilité a lieu de nuit et se termine le lendemain.
								</p>
							: null }
						</Form>
						{ this.state.period !== IndisponibilityRecurencePeriod.HOURS.key && this.state.period !== IndisponibilityRecurencePeriod.DAYS.key ?
						<Form className='col-sm-3 col-lg-2'>
							<Form.Group>
								<Form.Label>Jours</Form.Label>
								<FormSelectWeekDays values={this.state.days} onChange={this.onChange.bind(this, 'days')}/>
							</Form.Group>
						</Form>
						: null }
					</Panel.Body>
					<Panel.Footer>
					</Panel.Footer>
				</Panel>
				{this.state.showWarning ?
					<Panel>
						<Panel.Body className='ap-warning'>
							<div>Veuillez vérifier les valeurs</div>
							<ul>
								{this.state.warningMsg.map((msg, index) => (<li key={index}>{msg}</li>) )}
							</ul>
						</Panel.Body>
					</Panel>
				: null}
				{this.state.showError ?
					<Panel>
						<Panel.Body className='ap-error'>
							<div>Une erreur est survenue</div>
							<ul>
								{this.state.errorMsg.map((msg, index) => (<li key={index}>{msg}</li>) )}
							</ul>
						</Panel.Body>
					</Panel>
				: null}
				{ this.state.mode === AuxiliaryIndisponibilityEditData.MODES.CREATE ?
					<Button 
						block 
						bsStyle={this.state.showError ? 'danger' : this.state.showWarning ? 'warning' : submitDisabled ? 'default' : 'success'}
						disabled={submitDisabled}
						onClick={this.onSubmit}>
						Créer indisponibilité
					</Button>
				:
					<Grid.Row>
						<Grid.Col sm={6}>
							<Button 
								block 
								bsStyle='warning'
								onClick={this.onDelete}>
								Supprimer indisponibilité
							</Button>
						</Grid.Col>
						<br className='visible-xs-block'/>
						<Grid.Col sm={6}>
							<Button 
								block 
								bsStyle={this.state.showWarning ? 'danger' : submitDisabled ? 'default' : 'success'}
								disabled={submitDisabled}
								onClick={this.onSubmit}>
								Enregistrer modifications
							</Button>
						</Grid.Col>
					</Grid.Row>
				}
				<br/>
				<ModalDialog 
					title="Supprimer l'indisponibilité ?"
					show={this.state.showDelete}
					onCancel={this.onCancelDelete}
					onConfirm={this.onConfirmDelete}>
					Êtes-vous sûr ?
					<br/>
					Toutes les occurences seront supprimées
				</ModalDialog>
			</div>
		)
	}
}
export default AuxiliaryIndisponibilityEdit
