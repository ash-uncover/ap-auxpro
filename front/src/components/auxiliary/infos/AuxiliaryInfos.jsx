import React from 'react'
import AuxiliaryInfosData from './AuxiliaryInfosData'
import './AuxiliaryInfos.scss'

import I18NHelper from 'helpers/I18NHelper'

import { Button, Panel, Form, Grid, RaterStar } from 'ap-react-bootstrap'
import Gauge from 'components-lib/Gauge/Gauge'
import Image from 'components-lib/Image/Image'

import AuxiliaryUtils from 'utils-lib/entities/AuxiliaryUtils'
import SkillUtils from 'utils-lib/entities/SkillUtils'
import Skills from 'utils/constants/Skills'

class AuxiliaryInfos extends React.Component {

  constructor(props) {
    super(props)

    this.state = {}

    this.buildFormGroup = this.buildFormGroup.bind(this)
    this.buildSkillFormGroup = this.buildSkillFormGroup.bind(this)
  }

  componentWillMount() {
    AuxiliaryInfosData.register(this)
  }

  componentWillUnmount() {
    AuxiliaryInfosData.unregister()
  }

  buildFormGroup(field) { 
    return (
      <Form.Group key={field.key}>
        <Form.Label className='col-sm-5'>
          {field.name || AuxiliaryUtils.getFieldName(field.key)}
        </Form.Label>
        <Form.Static className={'col-sm-7 user-select-text ap-form-' + field.key}>
          {field.key === 'diploma' ? 
            this.state[field.key].map((value) => value.toUpperCase()).map(I18NHelper.get.bind(I18NHelper)) 
          : 
            this.state[field.key]
          }
        </Form.Static>
      </Form.Group>
    )
  }

  buildSkillFormGroup(field) { 
    if (!field.hidden || !field.hidden() && this.state[field.key]) {
      return (
        <Form.Group key={field.key}>
          <Form.Label className='col-sm-5'>
            {I18NHelper.get(field.name)}
          </Form.Label>
          <RaterStar 
              value={this.state[field.key]} 
              starMax={5}/>
        </Form.Group>
      )
    }
  }

  render() {
    return (
      <Grid.Row className='ap-auxiliary-infos'>
        <Grid.Col smPush={9} sm={3}>
          <Panel>
            <Panel.Header>
              Profil rempli a 
            </Panel.Header>
            <Panel.Body>
              <Gauge value={this.state.profilProgression} />
            </Panel.Body>
            <Panel.Footer>
            </Panel.Footer>
          </Panel>
        </Grid.Col>
        <Grid.Col smPull={3} sm={9}>
          <Panel>
            <Panel.Header>
              Mes informations
            </Panel.Header>
            <Panel.Body>
              <h4>Mes informations personnelles</h4>
              <Form horizontal>
                <Grid.Row>
                  <Grid.Col xs={12} className='ap-auxiliary-infos-image-container'>
                    <Image 
                      className={this.state.avatar ? '' : 'ap-no-image'}
                      alt='<Ma photo>' 
                      id={this.state.avatar} />
                  </Grid.Col>
                  <Grid.Col sm={6} lg={5} lgOffset={1}>
                    {AuxiliaryInfosData.FIELDS_FORM1.map(this.buildFormGroup)}
                  </Grid.Col>
                  <Grid.Col sm={6} lg={5}>
                    {AuxiliaryInfosData.FIELDS_FORM2.map(this.buildFormGroup)}
                  </Grid.Col>
                </Grid.Row>
              </Form>
              <h4>Mes informations professionnelles</h4>
              <Form horizontal>
                <Grid.Row>
                  <Grid.Col sm={10} smOffset={1} md={8} mdOffset={2}>
                    {AuxiliaryInfosData.FIELDS_FORM3.map(this.buildFormGroup)}
                  </Grid.Col>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Col sm={10} smOffset={1} md={8} mdOffset={2}>
                    {AuxiliaryInfosData.FIELDS_FORM4.map(this.buildSkillFormGroup)}
                  </Grid.Col>
                </Grid.Row>
              </Form>
              <br/>
              <Button 
                className='ap-auxiliary-infos-to-edit'
                block bsStyle='primary'
                onClick={this.onModifyInfos}>
                  Modifier mes informations
              </Button>
            </Panel.Body>
            <Panel.Footer>
            </Panel.Footer>
          </Panel>

          <Panel>
            <Panel.Header>
              Mon compte AuXpros
            </Panel.Header>
            <Panel.Body>
              <h4>Type de compte</h4>
              <Button block bsStyle='primary' onClick={this.onModifyAccount}>Modifier mon compte</Button>

              <h4>Adresse électronique</h4>
              <Button block bsStyle='primary' onClick={this.onModifyEmail}>Modifier mon adresse électronique</Button>

              <h4>Mot de passe</h4>
              <Button block bsStyle='primary' onClick={this.onModifyPassword}>Modifier mon mot de passe</Button>
            </Panel.Body>
            <Panel.Footer>
            </Panel.Footer>
          </Panel>
        </Grid.Col>
      </Grid.Row>
    )
  }
}
export default AuxiliaryInfos
