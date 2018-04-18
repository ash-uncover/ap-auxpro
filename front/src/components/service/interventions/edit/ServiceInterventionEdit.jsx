import React from 'react'
import ServiceInterventionEditData from './ServiceInterventionEditData'
import './ServiceInterventionEdit.scss'

import { Button, Panel, Form, Grid } from 'ap-react-bootstrap'

import FormHelper from 'components-lib/FormHelper'
import FormSelectWeekDays from 'components-lib/FormSelectWeekDays/FormSelectWeekDays'

import InterventionRecurencePeriod from 'utils/constants/InterventionRecurencePeriod'

class ServiceInterventionEdit extends React.Component {

	constructor(props) {
		super(props)
		this.state = {}
		//this.buildFormGroup = FormHelper.buildFormGroup.bind(this)
        this.buildFormGroup = this._renderFromGroup.bind(this)        
		this.renderFormControl = FormHelper.buildFormControl.bind(this)
	}

	componentWillMount() {
		ServiceInterventionEditData.register(this, this.props.params.interventionId)
	}

	componentWillUnmount() {
		ServiceInterventionEditData.unregister()
	}


	// Rendering functions //
	// --------------------------------------------------------------------------------

    _renderFromGroup(field) {
        if ((field.hidden === true) || (field.hidden && field.hidden())) return
        return (
            <Form.Group key={field.key} state={this.state[field.key + 'State']}>
                <Form.Label className='col-sm-5 col-md-4'>
                    {field.name}
                </Form.Label>
                <Grid.Col sm={7} md={8}>
                    {this.renderFormControl(field)}
                </Grid.Col>
            </Form.Group>
        )
    }

	render() {
		let submitDisabled = !this.state.dirty || this.state.errorShow || this.state.warningShow
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
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Col sm={8} md={7} lg={6} lgOffset={1}>
                                <h4>Prestation</h4>
                                <Form horizontal>
                                    {ServiceInterventionEditData.FIELDS_FORM1.map(this.buildFormGroup)}
                                </Form>
                            </Grid.Col>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Col sm={8} md={7} lg={6} lgOffset={1}>
                                <h4>Planification</h4>
                            </Grid.Col>
                        </Grid.Row>
                        <Grid.Row>
							<Grid.Col sm={8} md={7} lg={6} lgOffset={1}>
								<Form horizontal>
									{ServiceInterventionEditData.FIELDS_FORM2.map(this.buildFormGroup)}
								</Form>
                                { this.state.endTime[0] < this.state.startTime[0] || (this.state.endTime[0] === this.state.startTime[0] && this.state.endTime[1] === this.state.startTime[1]) ?
                                    <p className='ap-warning col-sm-7 col-sm-offset-5 col-md-8 col-md-offset-4'>
                                        Cette intervention a lieu de nuit et se termine le lendemain
                                    </p>
                                : null}
							</Grid.Col>
							{ this.state.period !== InterventionRecurencePeriod.HOURS.key ?
							<Grid.Col sm={3} smOffset={1}>
								<Form>
									<Form.Group state={this.state.daysState}>
										<Form.Label>Jours</Form.Label>
										<FormSelectWeekDays values={this.state.days} onChange={this.onChange.bind(this, 'days')}/>
									</Form.Group>
								</Form>
							</Grid.Col>
							: null }
							<Grid.Col sm={8} md={7} lg={6} lgOffset={1}>
								<h4>Compétences requises</h4>
								<p>Si vous ajoutez des critères ci dessous, seules les auxiliaires possédant au moins l'un des diplômes sélectionnés seront retenues lors du MATCHING.</p>
								<Form horizontal>
									{ServiceInterventionEditData.FIELDS_FORM4.map(this.buildFormGroup)}
								</Form>
							</Grid.Col>
						</Grid.Row>
					</Panel.Body>
					<Panel.Footer>
					</Panel.Footer>
				</Panel>
                {this.state.warningShow ?
                    <Panel>
                        <Panel.Body className='ap-warning'>
                            <div>Veuillez vérifier les valeurs</div>
                            <ul>
                                {this.state.warningMsg.map((warning, index) => (<li key={warning.key}>{warning.value}</li>) )}
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
				<Button 
					block 
					bsStyle={this.state.errorShow ? 'danger' : submitDisabled ? 'default' : 'success'}
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
