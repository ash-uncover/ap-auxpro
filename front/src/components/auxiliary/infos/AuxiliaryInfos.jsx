import React from 'react'
import AuxiliaryInfosData from './AuxiliaryInfosData'
import './AuxiliaryInfos.scss'

import AuxiliaryUtils from 'utils-lib/entities/AuxiliaryUtils'

import { Button, Panel, Form, Grid } from 'ap-react-bootstrap'

import Image from 'components-lib/Image/Image'

class AuxiliaryInfos extends React.Component {

	constructor(props) {
		super(props)
		this.buildFormGroup = this._buildFormGroup.bind(this)
	}

	componentWillMount() {
		AuxiliaryInfosData.register(this)
	}

	componentWillUnmount() {
		AuxiliaryInfosData.unregister()
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
						Mes information personnelles
					</Panel.Header>
					<Panel.Body>
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
						<Button block bsStyle='primary' onClick={this.onModifyPerso}>Modifier mes informations personelles</Button>
					</Panel.Body>
					<Panel.Footer>
					</Panel.Footer>
				</Panel>

				<Panel>
					<Panel.Header>
						Mes informations profresionelles
					</Panel.Header>
					<Panel.Body>
						<Form horizontal>
							<Grid.Row>
								<Grid.Col sm={6} lg={5} lgOffset={1}>
								</Grid.Col>
								<Grid.Col sm={6} lg={5}>
								</Grid.Col>
							</Grid.Row>
						</Form>
						<Button block bsStyle='primary' onClick={this.onModifyPro}>Modifier mes informations profesionelles</Button>
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
