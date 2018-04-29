import React from 'react'
import AuxiliaryIndisponibilityEditData from './AuxiliaryIndisponibilityEditData'
import './AuxiliaryIndisponibilityEdit.scss'

import { Button, Panel, Grid, Form } from 'ap-react-bootstrap'

// components-lib
import FormGroupBuilder from 'components-lib/FormGroup/FormGroupBuilder'
import ModalDialog from 'components-lib/Modal/ModalDialog'
// utils
import IndisponibilityRecurencePeriod from 'utils/constants/IndisponibilityRecurencePeriod'

class AuxiliaryIndisponibilityEdit extends React.Component {

	constructor() {
		super(...arguments)

		this.state = {}

		this.buildFormGroup = FormGroupBuilder.buildFormGroup.bind(this)
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
		console.log(this.state)
		let submitDisabled = !this.state.dirty || this.state.errorShow || this.state.warningShow
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
							{Object.keys(AuxiliaryIndisponibilityEditData.FIELDS_FORM1).map((key) => (
                                this.buildFormGroup(key, AuxiliaryIndisponibilityEditData.FIELDS_FORM1[key], true)
                            ))}
							{ this.state.indisponibilityNightly ?
								<p className='ap-warning col-sm-7 col-sm-offset-5 col-md-8 col-md-offset-4'>
									Cette indisponibilité a lieu de nuit et se termine le lendemain.
								</p>
							: null }
						</Form>
						{ this.state.period !== IndisponibilityRecurencePeriod.HOURS.key && this.state.period !== IndisponibilityRecurencePeriod.DAYS.key ?
						<Form className='col-sm-3 col-lg-2'>
							{Object.keys(AuxiliaryIndisponibilityEditData.FIELDS_FORM2).map((key) => (
                                this.buildFormGroup(key, AuxiliaryIndisponibilityEditData.FIELDS_FORM2[key])
                            ))}
						</Form>
						: null }
					</Panel.Body>
					<Panel.Footer>
					</Panel.Footer>
				</Panel>
				{this.state.warningShow ?
					<Panel>
						<Panel.Body className='ap-warning'>
							<div>Veuillez vérifier les valeurs</div>
							<ul>
								{this.state.warningMsg.map((warning, index) => (<li key={index}>{warning}</li>) )}
							</ul>
						</Panel.Body>
					</Panel>
				: null}
				{this.state.errorShow ?
					<Panel>
						<Panel.Body className='ap-error'>
							<div>Une erreur est survenue</div>
							<ul>
								{this.state.errorMsg.map((error, index) => (<li key={index}>{error}</li>) )}
							</ul>
						</Panel.Body>
					</Panel>
				: null}
				{ this.state.mode === AuxiliaryIndisponibilityEditData.MODES.CREATE ?
					<Button 
						block 
						bsStyle={this.state.errorShow ? 'danger' : submitDisabled ? 'default' : 'success'}
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
								bsStyle={this.state.errorShow ? 'danger' : submitDisabled ? 'default' : 'success'}
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
