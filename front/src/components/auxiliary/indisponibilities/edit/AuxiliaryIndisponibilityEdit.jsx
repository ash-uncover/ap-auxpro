import React from 'react'
import AuxiliaryIndisponibilityEditData from './AuxiliaryIndisponibilityEditData'
import './AuxiliaryIndisponibilityEdit.scss'

import { Button, Panel, Grid, Form } from 'ap-react-bootstrap'
import FormSelectWeekDays from 'components-lib/FormSelectWeekDays/FormSelectWeekDays'
import ModalDialog from 'components-lib/Modal/ModalDialog'

import IndisponibilityRecurencePeriod from 'utils/constants/IndisponibilityRecurencePeriod'

import IndisponibilityUtils from 'utils-lib/entities/IndisponibilityUtils'

class AuxiliaryIndisponibilityEdit extends React.Component {

	constructor(props) {
		super(props)
		this.state = {}
		this.buildFormGroup = this._buildFormGroup.bind(this)
		this.buildFormControl = this._buildFormControl.bind(this)
	}

	componentWillMount() {
		AuxiliaryIndisponibilityEditData.register(this, this.props.params.indisponibilityId)
	}

	componentWillUnmount() {
		AuxiliaryIndisponibilityEditData.unregister()
	}


	// Rendering functions //
	// --------------------------------------------------------------------------------

	_buildFormGroup(field) {
		if (this.state.period === IndisponibilityRecurencePeriod.HOURS.key && 
			(field.key === 'endDate' || field.key === 'days') ) {
			return null
		}
		if (this.state.period === IndisponibilityRecurencePeriod.DAYS.key && 
			(field.key === 'startTime' || field.key === 'endTime' || field.key === 'days') ) {
			return null
		}
		let state = null
		if (field.validator) {
			state = field.validator.getState(this.state[field.key])	
		}
		return (
			<Form.Group key={field.key} state={state}>
				<Form.Label className='col-sm-3 col-md-4'>
					{field.name || IndisponibilityUtils.getFieldName(field.key)}
				</Form.Label>
				<Grid.Col sm={9} md={8}>
					{this.buildFormControl(field)}
				</Grid.Col>
			</Form.Group>
		)
	}

	_buildFormControl(field) {
		switch (field.form) {
			case 'select': return (
				<Form.Select 
					values={field.values}
					value={this.state[field.key]}
					onChange={this.onChangeDirty.bind(this, field.key)} />
				)
			case 'date': return (
				<Form.Date 
					date={this.state[field.key][2]}
					month={this.state[field.key][1]}
					year={this.state[field.key][0]}
					onChange={this.onChangeDirty.bind(this, field.key)} />
				)
			case 'time': return (
				<Form.Time 
					hour={this.state[field.key][0]}
					minute={this.state[field.key][1]}
					minuteValues={[{key: 0, value: '00'}, {key: 15, value: '15'}, {key: 30, value: '30'}, {key: 45, value: '45'}]}
					onChange={this.onChangeDirty.bind(this, field.key)} />
				)
			case 'days': return (
				<FormSelectWeekDays 
					values={this.state.days} 
					onChange={this.onChangeDirty.bind(this, 'days')}/>
				)
			default: return (
				<Form.Static>
					{this.state[field.key]}
				</Form.Static>
			)
		}
	}

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
						<Form className='col-sm-3 col-lg-2'>
							{AuxiliaryIndisponibilityEditData.FIELDS_FORM2.map(this.buildFormGroup)}
						</Form>
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
