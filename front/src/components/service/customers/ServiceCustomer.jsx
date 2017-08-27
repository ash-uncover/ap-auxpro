import React from 'react'
import ServiceCustomerData from 'components/service/customers/ServiceCustomerData'
import './ServiceCustomer.scss'

import CustomerUtils from 'utils-lib/entities/CustomerUtils'

import { Button, Panel, Form, Grid } from 'ap-react-bootstrap'

import SkillTile from 'components-lib/SkillTile/SkillTile'

class ServiceCustomer extends React.Component {

	constructor(props) {
		super(props)

		this.buildSkill = this._buildSkill.bind(this)
		this.sortSkills = this._sortSkills.bind(this)
	}

	componentWillMount() {
		ServiceCustomerData.register(this, this.props.params.customerId)
	}

	componentWillUnmount() {
		ServiceCustomerData.unregister()
	}

	_buildFromGroup(label, value) { return (
		<Form.Group>
			<Form.Label className='col-sm-5 col-md-4'>{label}</Form.Label>
			<Form.Static className='col-sm-7 col-md-8 user-select-text'>{value}</Form.Static>
		</Form.Group>
	)}

	_prepareSkills() {
		let skills = []
		if (this.state.skillHousework) {
			skills.push({ title: 'Entretien maison', value: this.state.skillHousework})
		}
		if (this.state.skillChildhood) {
			skills.push({ title: 'Aide petite enfance', value: this.state.skillChildhood})
		}
		if (this.state.skillShopping) {
			skills.push({ title: 'Courses & aide au repas', value: this.state.skillShopping})
		}
		if (this.state.skillNursing) {
			skills.push({ title: 'Nursing', value: this.state.skillNursing})
		}
		if (this.state.skillCompagny) {
			skills.push({ title: 'Dame de compagnie', value: this.state.skillCompagny})
		}
		if (this.state.skillAdministrative) {
			skills.push({ title: 'Aide administrative', value: this.state.skillAdministrative})
		}
		if (this.state.skillDoityourself) {
			skills.push({ title: 'Petit bricolage', value: this.state.skillDoityourself})
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
			</div>
		)
	}

}
export default ServiceCustomer