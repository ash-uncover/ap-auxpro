import React from 'react'
import ServiceCustomerEditData from './ServiceCustomerEditData'
import './ServiceCustomerEdit.scss'

import { Button, Panel, Form, Grid, Google } from 'ap-react-bootstrap'

import SkillTile from 'components-lib/SkillTile/SkillTile'
import SkillTileAdd from 'components-lib/SkillTile/SkillTileAdd'

import CustomerFields from 'utils/entities/CustomerFields'


import CustomerUtils from 'utils-lib/entities/CustomerUtils'
import SkillUtils from 'utils-lib/entities/SkillUtils'

class ServiceCustomerEdit extends React.Component {

	constructor(props) {
		super(props)
		this.state = {}

		this.buildFormGroup = this._buildFormGroup.bind(this)
		this.buildFormControl = this._buildFormControl.bind(this)
		this.buildSkill = this._buildSkill.bind(this)
	}

	componentWillMount() {
		ServiceCustomerEditData.register(this, this.props.params.customerId)
	}

	componentWillUnmount() {
		ServiceCustomerEditData.unregister()
	}

	_buildFormGroup(field) { 
		let state = this.state[field.key + 'Default']
		if (!state && field.validator) {
			state = field.validator.getState(this.state[field.key])	
		}
		return (
			<Form.Group key={field.key} state={state}>
				<Form.Label className='col-sm-5 col-md-4'>
					{field.name || CustomerUtils.getFieldName(field.key)}
				</Form.Label>
				<Grid.Col sm={7} md={8}>
					{this.buildFormControl(field)}
				</Grid.Col>
			</Form.Group>
		)
	}

	_buildFormControl(field) {
		switch (field.form) {
			case 'input': return (
				<Form.Input 
					value={this.state[field.key]} 
					onChange={this.onChangeDirty.bind(this, field.key)} />
				)
			case 'select': return (
				<Form.Select 
					values={field.values}
					value={this.state[field.key]}
					onChange={this.onChangeDirty.bind(this, field.key)} />
				)
			case 'address': return (
				<Google.Autocomplete 
					placeholder='Saisir adresse.'
					onChange={this.onChangeAddress.bind(this)}
					options={{ componentRestrictions: { country: 'fr' } }}  />
				)
			case 'date': return (
				<Form.Date 
					date={this.state[field.key][2]}
					month={this.state[field.key][1]}
					year={this.state[field.key][0]}
					onChange={this.onChangeDirty.bind(this, field.key)} />
				)
			default: return (
				<Form.Static>
					{this.state[field.key]}
				</Form.Static>
			)
		}
	}

	_buildSkill(skill) {
		if (this.state.showAllSkills || this.state[skill.key]) {
			return (
				<SkillTile
					key={skill.key}
					title={SkillUtils.getName(skill)}
					value={this.state[skill.key]}
					starMax={5}
					onChange={this.onChangeDirty.bind(this, skill.key)}/>
			)
		}
	}


	checkValidity() {
		for (let i = 0 ; i < ServiceCustomerEditData.FIELDS.length ; i++) {
			let field = ServiceCustomerEditData.FIELDS[i]
			if (field.validator && field.validator.getState(this.state[field.key]) === 'error') {
				return false
			}
		}
		return true
	}

	render() {
		let submitDisabled = !this.state.dirty || !this.checkValidity()
		return (
			<div className='ap-service-customer-edit'>
				<Button block bsStyle='primary' onClick={this.onBack}>Annuler</Button>
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
									{ServiceCustomerEditData.FIELDS_FORM1.map(this.buildFormGroup)}
								</Grid.Col>
								<Grid.Col sm={6} lg={5}>
									{ServiceCustomerEditData.FIELDS_FORM2.map(this.buildFormGroup)}	
								</Grid.Col>
							</Grid.Row>
							<h4>Besoins</h4>
							<p>Veuillez saisir les besoins de l'usager</p>
							{this.state.skills.map(this.buildSkill)}
							{!this.state.showAllSkills ?
								<SkillTileAdd onClick={this.onSkillAdd}/>
							: null }
						</Form>
					</Panel.Body>
					<Panel.Footer>
					</Panel.Footer>
				</Panel>
				<Button 
					block 
					bsStyle={submitDisabled ? 'default' : 'success'}
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
