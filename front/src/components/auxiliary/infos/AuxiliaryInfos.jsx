import React from 'react'
import AuxiliaryInfosData from './AuxiliaryInfosData'
import './AuxiliaryInfos.scss'

import { Button, Panel, Form, Grid } from 'ap-react-bootstrap'

import AuxiliaryUtils from 'utils-lib/entities/AuxiliaryUtils'
import SkillUtils from 'utils-lib/entities/SkillUtils'
import Skills from 'utils/constants/Skills'

import SkillTile from 'components-lib/SkillTile/SkillTile'
import Image from 'components-lib/Image/Image'

class AuxiliaryInfos extends React.Component {

	constructor(props) {
		super(props)
		this.buildFormGroup = this._buildFormGroup.bind(this)

		this.buildSkill = this._buildSkill.bind(this)
		this.sortSkills = this._sortSkills.bind(this)
	}

	componentWillMount() {
		AuxiliaryInfosData.register(this)
	}

	componentWillUnmount() {
		AuxiliaryInfosData.unregister()
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


	_buildFormGroup(field) { 
		return (
			<Form.Group key={field.key}>
				<Form.Label className='col-sm-5'>
					{field.name || AuxiliaryUtils.getFieldName(field.key)}
				</Form.Label>
				<Form.Static className='col-sm-7 user-select-text'>
					{this.state[field.key]}
				</Form.Static>
			</Form.Group>
		)
	}

	render() {
		return (
			<div className='ap-auxiliary-infos'>
				<Panel>
					<Panel.Header>
						Mes informations
					</Panel.Header>
					<Panel.Body>
						<h4>Mes informations personelles</h4>
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
						<h4>Mes informations profesionelles</h4>
						<Form horizontal>
							<Grid.Row>
								<Grid.Col sm={10} smOffset={1} md={8} mdOffset={2}>
									{AuxiliaryInfosData.FIELDS_FORM4.map(this.buildFormGroup)}
								</Grid.Col>
								<Grid.Col xs={12} className='ap-auxiliary-infos-image-container'>
									<Image 
										className={this.state.diplomaImage ? '' : 'ap-no-image'}
										alt='<Ma photo>' 
										id={this.state.diplomaImage} />
								</Grid.Col>
							</Grid.Row>
						</Form>
						<Button block bsStyle='primary' onClick={this.onModifyInfos}>Modifier mes informations</Button>
					</Panel.Body>
					<Panel.Footer>
					</Panel.Footer>
				</Panel>

				<Panel>
					<Panel.Header>
						Mes compétences
					</Panel.Header>
					<Panel.Body>
						{this.state.areSkillSet ?
							this._buildSkills()
						:
							<p>Vous devez remplir le questionnaire afin d'obtenir vos score de compétences.</p>
						}
						{this.state.areSkillSet ?
							<Button block bsStyle='primary' onClick={this.onViewQuestionary}>Voir mon questionnaire</Button>
						:
							<Button block bsStyle='primary' onClick={this.onModifyQuestionary}>Remplir le questionnaire AuXpros</Button>
						}
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
			</div>
		)
	}
}
export default AuxiliaryInfos
