import React from 'react'
import ServiceInterventionEditData from './ServiceInterventionEditData'
import './ServiceInterventionEdit.scss'

import { Button, Panel, Form, Grid } from 'ap-react-bootstrap'

// components-lib
import FormGroupBuilder from 'components-lib/FormGroup/FormGroupBuilder'
// utils
import InterventionRecurencePeriod from 'utils/constants/InterventionRecurencePeriod'

class ServiceInterventionEdit extends React.Component {

    constructor() {
        super(...arguments)
        
        this.state = {}
        
        this.buildFormGroup = FormGroupBuilder.buildFormGroup.bind(this)
    }


    // Component lifecycle //
    // --------------------------------------------------------------------------------

    componentWillMount() {
        ServiceInterventionEditData.register(this, this.props.params.interventionId)
    }

    componentWillUnmount() {
        ServiceInterventionEditData.unregister()
    }


    // Rendering functions //
    // --------------------------------------------------------------------------------

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
                                    {Object.keys(ServiceInterventionEditData.FIELDS_FORM0).map((key) => (
                                        this.buildFormGroup(key, ServiceInterventionEditData.FIELDS_FORM0[key], true)
                                    ))}
                                </Form>
                            </Grid.Col>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Col sm={8} md={7} lg={6} lgOffset={1}>
                                <h4>Prestation</h4>
                                <Form horizontal>
                                    {Object.keys(ServiceInterventionEditData.FIELDS_FORM1).map((key) => (
                                        this.buildFormGroup(key, ServiceInterventionEditData.FIELDS_FORM1[key], true)
                                    ))}
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
                                    {Object.keys(ServiceInterventionEditData.FIELDS_FORM2).map((key) => (
                                        this.buildFormGroup(key, ServiceInterventionEditData.FIELDS_FORM2[key], true)
                                    ))}
                                </Form>
                                { this.state.endTime[0] < this.state.startTime[0] || (this.state.endTime[0] === this.state.startTime[0] && this.state.endTime[1] === this.state.startTime[1]) ?
                                    <p className='ap-warning col-sm-7 col-sm-offset-5 col-md-8 col-md-offset-4'>
                                        Cette intervention a lieu de nuit et se termine le lendemain
                                    </p>
                                : null}
                            </Grid.Col>
                            { this.state.period !== InterventionRecurencePeriod.HOURS.key ?
                                <Form className='col-sm-3 col-lg-2'>
                                    {Object.keys(ServiceInterventionEditData.FIELDS_FORM3).map((key) => (
                                        this.buildFormGroup(key, ServiceInterventionEditData.FIELDS_FORM3[key])
                                    ))}
                                </Form>
                            : null }
                            <Grid.Col sm={8} md={7} lg={6} lgOffset={1}>
                                <h4>Compétences requises</h4>
                                <p>Si vous ajoutez des critères ci dessous, seules les auxiliaires possédant au moins l'un des diplômes sélectionnés seront retenues lors du MATCHING.</p>
                                <Form horizontal>
                                    {Object.keys(ServiceInterventionEditData.FIELDS_FORM4).map((key) => (
                                        this.buildFormGroup(key, ServiceInterventionEditData.FIELDS_FORM4[key], true)
                                    ))}
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
