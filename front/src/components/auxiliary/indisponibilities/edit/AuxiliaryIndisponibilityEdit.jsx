import React from 'react'
import AuxiliaryIndisponibilityEditData from './AuxiliaryIndisponibilityEditData'
import './AuxiliaryIndisponibilityEdit.scss'

import { Button, Panel, Grid, Form } from 'ap-react-bootstrap'
import FormSelectWeekDays from 'components-lib/FormSelectWeekDays/FormSelectWeekDays'

import IndisponibilityUtils from 'utils-lib/entities/IndisponibilityUtils'

class AuxiliaryIndisponibilityEdit extends React.Component {

	constructor(props) {
		super(props)
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
		if (this.state.period === 'ONE' && (field.key === 'endDate' || field.key === 'days')) {
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
				<Button 
					block 
					bsStyle={submitDisabled ? 'default' : 'success'}
					disabled={submitDisabled}
					onClick={this.onSubmit}>
					{ this.state.mode === AuxiliaryIndisponibilityEditData.MODES.CREATE ? 'Créer indisponibilité' : 'Enregistrer modifications' }
				</Button>
				<br/>
			</div>
		)
	}

}
export default AuxiliaryIndisponibilityEdit
