import React from 'react'
import AuxiliaryIndisponibilityEditData from './AuxiliaryIndisponibilityEditData'
import './AuxiliaryIndisponibilityEdit.scss'

import { Button, Panel, Grid, Form } from 'ap-react-bootstrap'

import FormHelper from 'components-lib/FormHelper'
import FormSelectWeekDays from 'components-lib/FormSelectWeekDays/FormSelectWeekDays'

import ModalDialog from 'components-lib/Modal/ModalDialog'

import IndisponibilityRecurencePeriod from 'utils/constants/IndisponibilityRecurencePeriod'

import IndisponibilityUtils from 'utils-lib/entities/IndisponibilityUtils'

class AuxiliaryIndisponibilityEdit extends React.Component {

	constructor(props) {
		super(props)
		this.state = {}
		this.buildFormGroup = FormHelper.buildFormGroup.bind(this, IndisponibilityUtils.getFieldName)
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
		let submitDisabled = !this.state.dirty || !this.state.indisponibilityValid
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
				{ this.state.errorJustHappened ?
					<Panel>
						<Panel.Body className='ap-error'>
							<div>Une erreur est survenue</div>
							<div>Veuillez vérifier les valeurs saisies</div>
						</Panel.Body>
					</Panel>
				: null }
				{ this.state.mode === AuxiliaryIndisponibilityEditData.MODES.CREATE ?
					<Button 
						block 
						bsStyle={this.state.errorJustHappened ? 'danger' : submitDisabled ? 'default' : 'success'}
						disabled={this.state.errorJustHappened || submitDisabled}
						onClick={this.onSubmit}>
						{ this.state.errorJustHappened ? 'Erreur' : 'Créer indisponibilité' }
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
								bsStyle={this.state.errorJustHappened ? 'danger' : submitDisabled ? 'default' : 'success'}
								disabled={this.state.errorJustHappened || submitDisabled}
								onClick={this.onSubmit}>
								{ this.state.errorJustHappened ? 'Erreur' : 'Enregistrer modifications' }
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
