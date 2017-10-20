import React from 'react'
import ServiceInterventionEditData from './ServiceInterventionEditData'
import './ServiceInterventionEdit.scss'

import { Button, Panel, Form, Grid } from 'ap-react-bootstrap'

import FormSelectWeekDays from 'components-lib/FormSelectWeekDays/FormSelectWeekDays'

import InterventionRecurencePeriod from 'utils/constants/InterventionRecurencePeriod'

import InterventionUtils from 'utils-lib/entities/InterventionUtils'

class ServiceInterventionEdit extends React.Component {

	constructor(props) {
		super(props)
		this.buildFormGroup = this._buildFormGroup.bind(this)
		this.buildFormControl = this._buildFormControl.bind(this)
	}

	componentWillMount() {
		ServiceInterventionEditData.register(this, this.props.params.interventionId)
	}

	componentWillUnmount() {
		ServiceInterventionEditData.unregister()
	}


	// Rendering functions //
	// --------------------------------------------------------------------------------

	_buildFormGroup(field) {
		if (this.state.period === InterventionRecurencePeriod.HOURS.key && field.key === 'endDate') {
			return null
		}
		let state = null
		if (field.validator) {
			state = field.validator.getState(this.state[field.key])	
		}
		return (
			<Form.Group key={field.key}>
				<Form.Label className='col-sm-4'>
					{field.name || InterventionUtils.getFieldName(field.key)}
				</Form.Label>
				<Grid.Col sm={8}>
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
					onChange={this.onChangeAddress.bind(this)} 
					options={{ componentRestrictions: { country: 'fr' } }} />
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
			default: return (
				<Form.Static>
					{this.state[field.key]}
				</Form.Static>
			)
		}
	}

	checkValidity() {
		for (let i = 0 ; i < ServiceInterventionEditData.FIELDS.length ; i++) {
			let field = ServiceInterventionEditData.FIELDS[i]
			if (field.validator && field.validator.getState(this.state[field.key]) === 'error') {
				return false
			}
		}
		return true
	}

	render() {
		let errors = InterventionUtils.checkValidity(this.state)
		let submitDisabled = !this.state.dirty ||  errors !== null
		return (
			<div className='ap-service-intervention-edit'>
				<Button 
					block 
					bsStyle='primary'
					onClick={this.onCancel}>
					Retour
				</Button>
				<br/>
				<Panel> 
					<Panel.Header>
						{ this.state.mode === ServiceInterventionEditData.MODES.CREATE ? 'Nouvelle demande de prestation' : 'Modifier demande de prestation' }
					</Panel.Header>
					<Panel.Body>
						<Grid.Row>
							<Grid.Col sm={8} md={7} lg={6} lgOffset={1}>
								<Form horizontal>
									{ServiceInterventionEditData.FIELDS_FORM1.map(this.buildFormGroup)}
								</Form>
							</Grid.Col>
							{ this.state.period !== InterventionRecurencePeriod.HOURS.key ?
							<Grid.Col sm={3} smOffset={1}>
								<Form>
									<Form.Group>
										<Form.Label>Jours</Form.Label>
										<FormSelectWeekDays values={this.state.days} onChange={this.onChangeDirty.bind(this, 'days')}/>
									</Form.Group>
								</Form>
							</Grid.Col>
							: null }
						</Grid.Row>
					</Panel.Body>
					<Panel.Footer>
					</Panel.Footer>
				</Panel>
				<Button 
					block 
					bsStyle={submitDisabled ? 'default' : 'success'}
					disabled={submitDisabled}
					onClick={this.onSubmit}>
					{ this.state.mode === ServiceInterventionEditData.MODES.CREATE ? 'Créer demande de prestation' : 'Enregistrer modifications' }
				</Button>
				<br/>
			</div>
		)
	}

}
export default ServiceInterventionEdit
