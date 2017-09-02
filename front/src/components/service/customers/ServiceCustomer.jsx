import React from 'react'
import ServiceCustomerData from 'components/service/customers/ServiceCustomerData'
import './ServiceCustomer.scss'

import { Button, Panel, Form, Grid } from 'ap-react-bootstrap'

import SkillTile from 'components-lib/SkillTile/SkillTile'

import Skills from 'utils/constants/Skills'

import CustomerUtils from 'utils-lib/entities/CustomerUtils'
import SkillUtils from 'utils-lib/entities/SkillUtils'

class ServiceCustomer extends React.Component {

	constructor(props) {
		super(props)

		this.buildFormGroup = this._buildFormGroup.bind(this)

		this.buildSkill = this._buildSkill.bind(this)
		this.sortSkills = this._sortSkills.bind(this)
	}

	componentWillMount() {
		ServiceCustomerData.register(this, this.props.params.customerId)
	}

	componentWillUnmount() {
		ServiceCustomerData.unregister()
	}

	_buildFormGroup(field) { 
		return (
			<Form.Group key={field.key}>
				<Form.Label className='col-sm-5 col-md-4'>
					{field.name || CustomerUtils.getFieldName(field.key)}
				</Form.Label>
				<Form.Static className='col-sm-7 col-md-8 user-select-text'>
					{this.state[field.key]}
				</Form.Static>
			</Form.Group>
		)
	}

	_prepareSkills() {
		let skills = []
		for (let i = 0; i < Skills.VALUES.length; i++) {
			let skill = Skills.VALUES[i]
			if (this.state[skill.key]) {
				skills.push({ title: SkillUtils.getName(skill), value: this.state[skill.key] })
			}
		}
		return skills.sort(this.sortSkills)
	}

	_buildSkills() {
		return this._prepareSkills().map(this.buildSkill)
	}
	
	_sortSkills(s1, s2) {
		return s2.value - s1.value
	}

	_buildSkill(skill, index) {
		return (<SkillTile key={index} {...skill} />)
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
							<h4>Besoins</h4>
							{this._buildSkills()}
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