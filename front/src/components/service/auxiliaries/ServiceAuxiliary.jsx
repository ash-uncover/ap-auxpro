import React from 'react'
import ServiceAuxiliaryData from './ServiceAuxiliaryData'
import './ServiceAuxiliary.scss'

import I18NHelper from 'helpers/I18NHelper'

import { Button, Panel, Form, Grid } from 'ap-react-bootstrap'
// components-lib
import Image from 'components-lib/Image/Image'
import SkillTile from 'components-lib/SkillTile/SkillTile'
// utils
import AuxiliaryDiploma from 'utils/constants/AuxiliaryDiploma'
import AuxiliarySkills from 'utils/constants/AuxiliarySkills'
// utils-lib
import DiplomaUtils from 'utils-lib/entities/DiplomaUtils'
import SkillUtils from 'utils-lib/entities/SkillUtils'

class ServiceAuxiliary extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      avatar: '',
      name: '',
      address: '',
      email: '',
      diploma: []
    }
    this.buildSkill = this._buildSkill.bind(this)
  }

  componentWillMount() {
    ServiceAuxiliaryData.register(this, this.props.params.auxiliaryId)
  }

  componentWillUnmount() {
    ServiceAuxiliaryData.unregister()
  }

  _prepareSkills() {
    return AuxiliarySkills.VALUES
      .map((skill) => ({
        title: I18NHelper.get(skill.keyName),
        value: this.state[skill.key]
      }))
      .filter((skill) => Boolean(skill.value))
      .sort((skill1, skill2) => skill2.value - skill1.value)
  }

  _buildSkills() {
    return this._prepareSkills().map(this.buildSkill)
  }

  _buildSkill(skill, index) {
    return (<SkillTile xs={6} key={index} {...skill} />)
  }

  _buildDiploma(diploma) {
    return (
      <li key={diploma}>
        {I18NHelper.get(AuxiliaryDiploma.get(diploma).keyName)}
      </li>
    )
  }

  render() {
    return (
      <div className='ap-service-auxiliary'>
        <Button 
          block 
          bsStyle='primary'
          onClick={this.onCancel}>
          Retour
          </Button>
        <br/>
        <Panel>
          <Panel.Header>
          </Panel.Header>
          <Panel.Body>
            <Grid.Col sm={4} md={3} lg={2} className='ap-image-column'>
              <Image 
                alt='<Sa photo>' 
                id={this.state.avatar} 
                className={this.state.avatar ? '' : 'ap-no-image'} />
            </Grid.Col>
            <Grid.Col sm={8} md={9} lg={10} className='ap-info-column'>
              <p><b>{this.state.name}</b></p>
              <p>{this.state.address}</p>
              { this.state.phone ? 
                <p>{this.state.phone}</p>
              : null }
              { this.state.email ? 
                <p>{this.state.email}</p>
              : null }
            </Grid.Col>
          </Panel.Body>
          <Panel.Footer>
          </Panel.Footer>
        </Panel>
        <Grid.Row>
          <Grid.Col sm={6}>
            <Panel>
              <Panel.Header>Ses Plus</Panel.Header>
              <Panel.Body>
                <p>{this.state.description}</p>
              </Panel.Body>
              <Panel.Footer />
            </Panel>
            <Panel>
              <Panel.Header>Ses Diplômes</Panel.Header>
              <Panel.Body className='ap-diploma-column'>
                <ul>
                  {this.state.diploma.map(this._buildDiploma)}
                </ul>
              </Panel.Body>
              <Panel.Footer />
            </Panel>            
          </Grid.Col>
          <Grid.Col sm={6} >
            <Panel>
              <Panel.Header>Ses Compétences</Panel.Header>
              <Panel.Body>
                {this._buildSkills()}
              </Panel.Body>
              <Panel.Footer />
            </Panel>
          </Grid.Col>
        </Grid.Row>
      </div>
    )
  }
}
export default ServiceAuxiliary
