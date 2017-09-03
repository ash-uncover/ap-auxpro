import React from 'react'
import ServiceInfosData from './ServiceInfosData'
import './ServiceInfos.scss'

import ServiceUtils from 'utils-lib/entities/ServiceUtils'

import { Button, Panel, Form, Grid } from 'ap-react-bootstrap'

import Image from 'components-lib/Image/Image'

class ServiceInfos extends React.Component {

	constructor(props) {
		super(props)
		this.buildFormGroup = this._buildFormGroup.bind(this)
	}

	componentWillMount() {
		ServiceInfosData.register(this)
	}

	componentWillUnmount() {
		ServiceInfosData.unregister()
	}

	_buildFormGroup(field) { 
		return (
			<Form.Group key={field.key}>
				<Form.Label className='col-sm-5'>
					{field.name || ServiceUtils.getFieldName(field.key)}
				</Form.Label>
				<Form.Static className='col-sm-7 user-select-text'>
					{this.state[field.key]}
				</Form.Static>
			</Form.Group>
		)
	}

	render() {
		return (
			<div className='ap-service-infos'>
				<Panel>
					<Panel.Header>
						Mes information de société
					</Panel.Header>
					<Panel.Body>
						<Form horizontal>
							<Grid.Row>
								<Grid.Col xs={12} className='ap-service-infos-image-container'>
									<Image 
										className={this.state.avatar ? '' : 'ap-no-image'}
										alt='<Ma photo>' 
										id={this.state.avatar} />
								</Grid.Col>
								<Grid.Col sm={6} lg={5} lgOffset={1}>
									{ServiceInfosData.FIELDS_FORM1.map(this.buildFormGroup)}
								</Grid.Col>
								<Grid.Col sm={6} lg={5}>
									{ServiceInfosData.FIELDS_FORM2.map(this.buildFormGroup)}
								</Grid.Col>
							</Grid.Row>
						</Form>
						<Button block bsStyle='primary' onClick={this.onModifySociety}>Modifier mes informations</Button>
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
export default ServiceInfos
