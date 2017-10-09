import React from 'react'
import AuxiliaryZoneEditData from './AuxiliaryZoneEditData'
import './AuxiliaryZone.scss'

import { Grid, Panel, Form, Button, Google } from 'ap-react-bootstrap'

import GeozoneType from 'utils/constants/GeozoneType'

import GeozoneUtils from 'utils-lib/entities/GeozoneUtils'

class AuxiliaryZoneEdit extends React.Component {

	constructor(props) {
		super(props)

		this.buildFormGroup = this._buildFormGroup.bind(this)
		this.buildFormControl = this._buildFormControl.bind(this)
	}

	componentWillMount() {
		AuxiliaryZoneEditData.register(this, this.props.geozoneId)
	}

	componentWillUnmount() {
		AuxiliaryZoneEditData.unregister()
	}

	_buildFormGroup(field) { 
		let state = this.state[field.key + 'Default']
		if (!state && field.validator) {
			state = field.validator.getState(this.state[field.key])	
		}
		return (
			<Form.Group key={field.key} state={state}>
				<Form.Label className='col-sm-5 col-md-4'>
					{field.name || GeozoneUtils.getFieldName(field.key)}
				</Form.Label>
				<Grid.Col sm={7} md={8}>
					{this.buildFormControl(field)}
				</Grid.Col>
			</Form.Group>
		)
	}

	_buildFormControl(field) {
		switch (field.form) {
			case 'input': return (
				<Form.Input 
					value={this.state[field.key]} 
					onChange={this.onChangeDirty.bind(this, field.key)} />
				)
			case 'select': return (
				<Form.Select 
					values={field.values}
					value={this.state[field.key]}
					onChange={this.onChangeDirty.bind(this, field.key)} />
				)
			case 'address': return (
				<Google.Autocomplete 
					placeholder='Saisir adresse.'
					onChange={this.onChangeAddress.bind(this)} />
				)
			default: return (
				<Form.Static>
					{this.state[field.key]}
				</Form.Static>
			)
		}
	}

	render() {
		let submitEnabled = this.state.dirty && this.state.geozoneValid
		return (
			<Panel className='ap-auxiliary-zone-edit'>
				<Panel.Header>
					{ this.state.mode === AuxiliaryZoneEditData.MODES.CREATE ? "Créer zone d'intervention" : "Modifier zone d'intervention" }
				</Panel.Header>
				<Panel.Body>
					<Form horizontal>
						{ this.state.type === GeozoneType.AREA.key ? 
							AuxiliaryZoneEditData.FIELDS_FORM1.map(this.buildFormGroup)
						: 
							AuxiliaryZoneEditData.FIELDS_FORM2.map(this.buildFormGroup) 
						}
					</Form>
					<Button
						block
						bsStyle='primary'
						onClick={this.onCancel}>
						Annuler
					</Button>
					<Button
						block
						disabled={!submitEnabled}
						bsStyle={submitEnabled ? 'success' : 'default'}
						onClick={this.onSubmit}>
						{ this.state.mode === AuxiliaryZoneEditData.MODES.CREATE ? 'Créer zone' : 'Enregistrer modifications' }
					</Button>
				</Panel.Body>
				<Panel.Footer>
				</Panel.Footer>
			</Panel>
		)
	}
}
export default AuxiliaryZoneEdit