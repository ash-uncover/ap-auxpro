import React from 'react'
import ServiceCustomerEditData from './ServiceCustomerEditData'
import './ServiceCustomerEdit.scss'

import { Button, Panel, Form, Grid, Google } from 'ap-react-bootstrap'

// components-lib
import FormHelper from 'components-lib/FormHelper'
import SkillTile from 'components-lib/SkillTile/SkillTile'
import SkillTileAdd from 'components-lib/SkillTile/SkillTileAdd'
// utils
import CustomerFields from 'utils/entities/CustomerFields'
// utils-lib
import CustomerUtils from 'utils-lib/entities/CustomerUtils'
import SkillUtils from 'utils-lib/entities/SkillUtils'

class ServiceCustomerEdit extends React.Component {

	constructor(props) {
		super(props)
		
		this.state = {}

		this.buildFormGroup = this._buildFormGroup.bind(this)
		this.buildFormControl = FormHelper.buildFormControl.bind(this)
		this.buildSkill = this._buildSkill.bind(this)
	}

	componentWillMount() {
		ServiceCustomerEditData.register(this, this.props.params.customerId)
	}

	componentWillUnmount() {
		ServiceCustomerEditData.unregister()
	}

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

	_buildSkill(skill) {
		if (this.state.showAllSkills || this.state[skill.key]) {
			return (
				<SkillTile
					key={skill.key}
					title={SkillUtils.getName(skill)}
					value={this.state[skill.key]}
					starMax={5}
					onChange={this.onChange.bind(this, skill.key)}/>
			)
		}
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
				{this.state.warningShow ?
					<Panel>
						<Panel.Body className='ap-warning'>
							<div>Veuillez vérifier les valeurs</div>
							<ul>
								{this.state.warningMsg.map((warning, index) => (<li key={warning.key}>{warning.value}</li>) )}
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
