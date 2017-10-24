import React from 'react'
import ServiceInterventionEditData from './ServiceInterventionEditData'
import './ServiceInterventionEdit.scss'

import { Button, Panel, Form, Grid } from 'ap-react-bootstrap'

import FormHelper from 'components-lib/FormHelper'
import FormSelectWeekDays from 'components-lib/FormSelectWeekDays/FormSelectWeekDays'

import InterventionRecurencePeriod from 'utils/constants/InterventionRecurencePeriod'

import InterventionUtils from 'utils-lib/entities/InterventionUtils'

class ServiceInterventionEdit extends React.Component {

	constructor(props) {
		super(props)

		this.buildFormGroup = FormHelper.buildFormGroup.bind(this, InterventionUtils.getFieldName)
		this.buildFormControl = FormHelper.buildFormControl.bind(this)
	}

	componentWillMount() {
		ServiceInterventionEditData.register(this, this.props.params.interventionId)
	}

	componentWillUnmount() {
		ServiceInterventionEditData.unregister()
	}


	// Rendering functions //
	// --------------------------------------------------------------------------------

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
								<h4>Usager</h4>
								<Form horizontal>
									{ServiceInterventionEditData.FIELDS_FORM0.map(this.buildFormGroup)}
								</Form>
							</Grid.Col>
							<Grid.Col sm={8} md={7} lg={6} lgOffset={1}>
								<h4>Planification</h4>
								<Form horizontal>
									{ServiceInterventionEditData.FIELDS_FORM1.map(this.buildFormGroup)}
								</Form>
							</Grid.Col>
							{ this.state.period !== InterventionRecurencePeriod.HOURS.key ?
							<Grid.Col sm={3} smOffset={1}>
								<Form>
									<Form.Group>
										<Form.Label>Jours</Form.Label>
										<FormSelectWeekDays values={this.state.days} onChange={this.onChange.bind(this, 'days')}/>
									</Form.Group>
								</Form>
							</Grid.Col>
							: null }
							<Grid.Col sm={8} md={7} lg={6} lgOffset={1}>
								<h4>Compétences requises</h4>
								<Form horizontal>
									{ServiceInterventionEditData.FIELDS_FORM3.map(this.buildFormGroup)}
								</Form>
							</Grid.Col>
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
