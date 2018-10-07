import React from 'react'
import ServiceCustomerEditData from './ServiceCustomerEditData'
import './ServiceCustomerEdit.scss'

import I18NHelper from 'helpers/I18NHelper'

import { Button, Panel, Form, Grid } from 'ap-react-bootstrap'

// components-lib
import FormGroupBuilder from 'components-lib/FormGroup/FormGroupBuilder'
import SkillTile from 'components-lib/SkillTile/SkillTile'
import SkillTileAdd from 'components-lib/SkillTile/SkillTileAdd'
// utils
import CustomerFields from 'utils/entities/CustomerFields'
// utils-lib
import AuxiliarySkillsUtils from 'utils-lib/entities/AuxiliarySkillsUtils'
import CustomerUtils from 'utils-lib/entities/CustomerUtils'

class ServiceCustomerEdit extends React.Component {

  constructor(props) {
    super(props)
    
    this.state = {}

    this.buildFormGroup = this.buildFormGroup.bind(this)

    this.buildSkill = this._buildSkill.bind(this)
    this.onSkillChange = this._onSkillChange.bind(this)
  }


  // Component lifecycle //
  // --------------------------------------------------------------------------------

  componentWillMount() {
    ServiceCustomerEditData.register(this, this.props.params.customerId)
  }

  componentWillUnmount() {
    ServiceCustomerEditData.unregister()
  }


  // Rendering functions //
  // --------------------------------------------------------------------------------

  buildFormGroup(id, field, horizontal) {
    if (field.form === 'select') {
      field.values = field.values.map((value) => {
        if (value.key && !value.name) {
          value.value = I18NHelper.get(value.key.toUpperCase())
          if (value.value.toUpperCase() === value.key.toUpperCase()) {
            delete value.value
          }
        }
        return value
      })
    }
    return FormGroupBuilder.buildFormGroup.call(this, id, field, horizontal)
  }

  _buildSkill(id, skill) {
    return (
      <SkillTile
        key={skill.key}
        title={skill.name}
        value={this.state[skill.key]}
        starMax={5}
        onChange={this.onSkillChange.bind(this, id)}/>
    )
  }
  _onSkillChange(id, event, value) {
    this.onChange(id, value)
  }

  render() {
    let submitDisabled = !this.state.dirty || this.state.errorShow || this.state.warningShow
    return (
      <div className='ap-service-customer-edit'>
        <Button block bsStyle='primary' onClick={this.onCancel}>Annuler</Button>
        <br/>
        <Panel>
          <Panel.Header>
            {this.state.customerName}
          </Panel.Header>
          <Panel.Body>
            <Form horizontal>
              <h4>Informations</h4>
              <p>
                Veuillez remplir les informations relatives à l'usager<br/>
                Les champs marqués en rouge sont obligatoires, les champs marqués en orange possèdent une valeur par défaut que vous devriez vérifier
              </p>
              <Grid.Row>
                <Grid.Col sm={6} lg={5} lgOffset={1}>
                  {Object.keys(ServiceCustomerEditData.FIELDS_FORM1).map((key) => (
                    this.buildFormGroup(key, ServiceCustomerEditData.FIELDS_FORM1[key], true)
                  ))}
                </Grid.Col>
                <Grid.Col sm={6} lg={5}>
                  {Object.keys(ServiceCustomerEditData.FIELDS_FORM2).map((key) => (
                    this.buildFormGroup(key, ServiceCustomerEditData.FIELDS_FORM2[key], true)
                  ))}
                </Grid.Col>
              </Grid.Row>
              <h4>Besoins</h4>
              <p>Veuillez saisir les besoins de l'usager</p>
              {Object.keys(ServiceCustomerEditData.FIELDS_FORM_SKILLS).filter((id) => {
                const field = ServiceCustomerEditData.FIELDS_FORM_SKILLS[id]
                return !field.hidden() && (!this.state.showAddSkill || this.state[field.key])
              }).map((id) => {
                const field = ServiceCustomerEditData.FIELDS_FORM_SKILLS[id]
                return this.buildSkill(id, field)
              })}
              {this.state.showAddSkill &&
                <SkillTileAdd onClick={this.onSkillAdd}/>
              }
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
          bsStyle={this.state.errorShow ? 'danger' : submitDisabled ? 'default' : 'success'}
          disabled={submitDisabled}
          onClick={this.onSubmit}>
          { this.state.mode === ServiceCustomerEditData.MODES.CREATE ? 'Créer utilisateur' : 'Enregistrer modifications' }
        </Button>
        <br/>
      </div>
    )
  }

}
export default ServiceCustomerEdit
