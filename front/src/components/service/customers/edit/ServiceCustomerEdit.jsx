import React from 'react'
import ServiceCustomerEditData from 'components/service/customers/edit/ServiceCustomerEditData'
import './ServiceCustomerEdit.scss'

import { Button, Panel, Form, Grid } from 'ap-react-bootstrap'

import SkillTile from 'components-lib/SkillTile/SkillTile'

import Skills from 'utils/constants/Skills'

import CustomerUtils from 'utils-lib/entities/CustomerUtils'
import SkillUtils from 'utils-lib/entities/SkillUtils'

class ServiceCustomerEdit extends React.Component {

	constructor(props) {
		super(props)

		this.buildSkill = this._buildSkill.bind(this)
		this.sortSkills = this._sortSkills.bind(this)
	}

	componentWillMount() {
		ServiceCustomerEditData.register(this, this.props.params.customerId)
	}

	componentWillUnmount() {
		ServiceCustomerEditData.unregister()
	}

	_buildFromGroup(label, value) { return (
		<Form.Group>
			<Form.Label className='col-sm-5 col-md-4'>{label}</Form.Label>
			<Form.Static className='col-sm-7 col-md-8 user-select-text'>{value}</Form.Static>
		</Form.Group>
	)}

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
			<div className='ap-service-customer-edit'>
				<Button block bsStyle='primary' onClick={this.onBack}>Annuler</Button>
				<br/>
				<Panel>
					<Panel.Header>
						{CustomerUtils.getFullName(this.state.customer)}
					</Panel.Header>
					<Panel.Body>
						<Form horizontal>
							<h4>Informations</h4>
							<Grid.Row>
								<Grid.Col sm={6} md={5} mdOffset={1} lg={4} lgOffset={2}>
									{this._buildFromGroup('Civilité', this.state.civility)}
									{this._buildFromGroup('Nom', this.state.lastName)}
									{this._buildFromGroup('Prénom', this.state.firstName)}
									{this._buildFromGroup('Date de naissance', this.state.birthDate)}
									{this._buildFromGroup('Nationalité', this.state.nationality)}
								</Grid.Col>
								<Grid.Col sm={6} md={5} lg={4}>
									{this._buildFromGroup('Adresse', this.state.address)}
									{this._buildFromGroup('Code postal', this.state.postalCode)}
									{this._buildFromGroup('Ville', this.state.city)}
									{this._buildFromGroup('Pays', this.state.country)}
									{this._buildFromGroup('Téléphone', this.state.phone)}
									{this._buildFromGroup('Email', this.state.email)}
								</Grid.Col>
							</Grid.Row>
							<h4>Besoins</h4>
							{this._buildSkills()}
						</Form>
					</Panel.Body>
					<Panel.Footer>
					</Panel.Footer>
				</Panel>
				<Button block bsStyle='success' onClick={this.onSubmit}>Enregistrer</Button>
				<br/>
			</div>
		)
	}

}
export default ServiceCustomerEdit
