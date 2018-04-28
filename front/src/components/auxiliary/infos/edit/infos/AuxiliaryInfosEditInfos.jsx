import React from 'react'
import PropTypes from 'prop-types'
import AuxiliaryInfosEditInfosData from './AuxiliaryInfosEditInfosData'
import './AuxiliaryInfosEditInfos.scss'

import { Button, Panel, Form, Grid } from 'ap-react-bootstrap'

// components-lib
import FormHelper from 'components-lib/FormHelper'
import FormGroup from 'components-lib/FormGroup/FormGroup'
import FormGroupBuilder from 'components-lib/FormGroup/FormGroupBuilder'
import ImageUploader from 'components-lib/Image/ImageUploader'

class AuxiliaryInfosEditInfos extends React.Component {

    constructor(props) {
        super(props)

        this.state = {}
        
        this.buildFormGroup = this._buildFormGroup.bind(this)
        this.buildFormControl = FormHelper.buildFormControl.bind(this)
        
        this.buildFormGroup2 = this._buildFormGroup2.bind(this)
        this.buildFormControl2 = FormGroupBuilder.buildFormControl.bind(this)

    }

    componentWillMount() {
        AuxiliaryInfosEditInfosData.register(this)
    }

    componentWillUnmount() {
        AuxiliaryInfosEditInfosData.unregister()
    }


    // Rendering functions //
    // --------------------------------------------------------------------------------

    _buildFormGroup(field) { 
        if ((field.hidden === true) || (field.hidden && field.hidden())) return
        return (
            <Form.Group key={field.key} state={this.state[field.key + 'State']}>
                <Form.Label className='col-sm-5 col-md-4'>
                    {field.name}
                </Form.Label>
                <Grid.Col sm={7} md={8}>
                    {this.buildFormControl(field)}
                </Grid.Col>
            </Form.Group>
        )
    }

    _buildFormGroup2(id, field) { 
        if ((field.hidden === true) || (field.hidden && field.hidden())) return

        return (
            <FormGroup 
                key={field.key} 
                label={field.name}
                state={this.state[field.key + 'State']}>
                {this.buildFormControl2(id, field)}
            </FormGroup>
        )
    }

    render() {
        let submitDisabled = !this.state.dirty || this.state.errorShow || this.state.warningShow
        return (
            <div className='ap-auxiliary-infos-edit-infos'>
                <Button className='ap-cancel' block bsStyle='primary' onClick={this.onCancel}>
                    Retour au profil
                </Button>
                <br/>
                <Panel>
                    <Panel.Header>
                        Modifier mes informations
                    </Panel.Header>
                    <Panel.Body>
                        <Form horizontal className='row'>
                            <h4 className='col-xs-12'>Mes informations personnelles</h4>
                            <Grid.Col xs={12} className='ap-auxiliary-infos-avatar-container'>
                                <ImageUploader 
                                    id='avatarFile'
                                    className={this.state.avatar ? '' : 'ap-no-image'}
                                    src={this.state.avatarSrc}
                                    onChange={this.onChange.bind(this, 'AVATAR')} />
                            </Grid.Col>
                            <br/>
                            <br/>
                            <Grid.Col sm={6} lg={5} lgOffset={1}>
                                {Object.keys(AuxiliaryInfosEditInfosData.FIELDS_FORM1).map((key) => (
                                    this.buildFormGroup2(key, AuxiliaryInfosEditInfosData.FIELDS_FORM1[key])
                                ))}
                            </Grid.Col>
                            <Grid.Col sm={6} lg={5}>
                            	{Object.keys(AuxiliaryInfosEditInfosData.FIELDS_FORM2).map((key) => (
                                    this.buildFormGroup2(key, AuxiliaryInfosEditInfosData.FIELDS_FORM2[key])
                                ))}
                            </Grid.Col>
                            <h4 className='col-xs-12'>Mes informations professionnelles</h4>
                            <br/>
                            <Grid.Col xs={12} sm={10} smOffset={1} md={8} mdOffset={2}>
                                {Object.keys(AuxiliaryInfosEditInfosData.FIELDS_FORM3).map((key) => (
                                    this.buildFormGroup2(key, AuxiliaryInfosEditInfosData.FIELDS_FORM3[key])
                                ))}
                            </Grid.Col>
                        </Form>
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
                    className='ap-submit'
                    bsStyle={this.state.errorShow ? 'danger' : submitDisabled ?  'default' : 'success'}
                    disabled={submitDisabled}
                    onClick={this.onSubmit}>
                    Enregistrer modifications
                </Button>
                <br/>
            </div>
        )
    }
}

AuxiliaryInfosEditInfos.propTypes = {
    avatar: PropTypes.string,
    civility: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string
}

export default AuxiliaryInfosEditInfos
