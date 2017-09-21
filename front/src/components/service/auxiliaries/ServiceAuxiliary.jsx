import React from 'react'
import ServiceAuxiliaryData from './ServiceAuxiliaryData'
import './ServiceAuxiliary.scss'

import { Button, Panel, Form, Grid } from 'ap-react-bootstrap'
import Image from 'components-lib/Image/Image'
import SkillTile from 'components-lib/SkillTile/SkillTile'

import Skills from 'utils/constants/Skills'

import SkillUtils from 'utils-lib/entities/SkillUtils'

class ServiceAuxiliary extends React.Component {

	constructor(props) {
		super(props)

		this.buildSkill = this._buildSkill.bind(this)
		this.sortSkills = this._sortSkills.bind(this)
	}

	componentWillMount() {
		ServiceAuxiliaryData.register(this, this.props.params.auxiliaryId)
	}

	componentWillUnmount() {
		ServiceAuxiliaryData.unregister()
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
		return (<SkillTile xs={6} key={index} {...skill} />)
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
							<p>{this.state.email}</p>
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
							<Panel.Header>Son Diplôme</Panel.Header>
							<Panel.Body className='ap-diploma-column'>
								<Image 
									alt='<Son diplôme>' 
									id={this.state.diplomaImage} 
									className={'ap-diploma-image' + (this.state.diplomaImage ? '' : ' ap-no-image')} />
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
