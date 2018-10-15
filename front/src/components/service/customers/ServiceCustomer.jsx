import React from 'react'
import ServiceCustomerData from './ServiceCustomerData'
import './ServiceCustomer.scss'

import { Button, Panel, Form, Grid } from 'ap-react-bootstrap'

import SkillTile from 'components-lib/SkillTile/SkillTile'

import I18NHelper from 'helpers/I18NHelper'

import AuxiliarySkills from 'utils/constants/AuxiliarySkills'

import CustomerUtils from 'utils-lib/entities/CustomerUtils'
import SkillUtils from 'utils-lib/entities/SkillUtils'

class ServiceCustomer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
    
    this.buildFormGroup = this.buildFormGroup.bind(this)
  }

  componentWillMount() {
    ServiceCustomerData.register(this, this.props.params.customerId)
  }

  componentWillUnmount() {
    ServiceCustomerData.unregister()
  }

  buildFormGroup(field) { 
    return (
      <Form.Group key={field.key}>
        <Form.Label className='col-sm-5 col-md-4'>
          {field.name || CustomerUtils.getFieldName(field.key)}
        </Form.Label>
        <Form.Static className='col-sm-7 col-md-8 user-select-text'>
          {field.formatter ? field.formatter(this.state[field.key]) : this.state[field.key]}
        </Form.Static>
      </Form.Group>
    )
  }

  render() {
    return (
      <div className='ap-service-customer'>
        <Button block bsStyle='primary' onClick={this.onBack}>Retour</Button>
        <br/>
        <Panel>
          <Panel.Header>
            {this.state.fullName}
          </Panel.Header>
          <Panel.Body>
            <Form horizontal>
              <h4>Informations</h4>
              <Grid.Row>
                <Grid.Col sm={6} md={5} mdOffset={1} lg={4} lgOffset={2}>
                  {ServiceCustomerData.FIELDS_FORM1.map(this.buildFormGroup)}
                </Grid.Col>
                <Grid.Col sm={6} md={5} lg={4}>
                  {ServiceCustomerData.FIELDS_FORM2.map(this.buildFormGroup)}
                </Grid.Col>
              </Grid.Row>
            </Form>
          </Panel.Body>
          <Panel.Footer>
          </Panel.Footer>
        </Panel>
      </div>
    )
  }

}
export default ServiceCustomer