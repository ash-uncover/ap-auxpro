import React from 'react'
import ServiceInfosEditSocietyData from './ServiceInfosEditSocietyData'
import './ServiceInfosEditSociety.scss'

import ServiceUtils from 'utils-lib/entities/ServiceUtils'

import { Button, Panel, Form, Grid, Google } from 'ap-react-bootstrap'

import Image from 'components-lib/Image/Image'

class ServiceInfosEditSociety extends React.Component {

	constructor(props) {
		super(props)
		this.buildFormGroup = this._buildFormGroup.bind(this)
		this.buildFormControl = this._buildFormControl.bind(this)
	}

	componentWillMount() {
		ServiceInfosEditSocietyData.register(this)
	}

	componentWillUnmount() {
		ServiceInfosEditSocietyData.unregister()
	}

	_buildFormGroup(field) { 
		let state = ''
		if (field.validator) {
			state = field.validator.getState(this.state[field.key])
			
		}
		return (
			<Form.Group key={field.key} state={state}>
				<Form.Label className='col-sm-5 col-md-4'>
					{field.name || ServiceUtils.getFieldName(field.key)}
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
					onChange={this.onChangeAddress.bind(this)} />
				)
			default: return (
				<Form.Static>
					{this.state[field.key]}
				</Form.Static>
			)
		}
	}

	checkValidity() {
		for (let i = 0 ; i < ServiceInfosEditSocietyData.FIELDS.length ; i++) {
			let field = ServiceInfosEditSocietyData.FIELDS[i]
			if (field.validator && field.validator.getState(this.state[field.key]) === 'error') {
				return false
			}
		}
		return true
	}

	render() {
		let submitDiabled = !this.state.dirty || !this.checkValidity()
		return (
			<div className='ap-service-infos-edit-society'>
				<Button block bsStyle='primary' onClick={this.onCancel}>Retour au profil</Button>
				<br/>
				<Panel>
					<Panel.Header>
						Modifier mes information de société
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
									{ServiceInfosEditSocietyData.FIELDS_FORM1.map(this.buildFormGroup)}
								</Grid.Col>
								<Grid.Col sm={6} lg={5}>
									{ServiceInfosEditSocietyData.FIELDS_FORM2.map(this.buildFormGroup)}
								</Grid.Col>
							</Grid.Row>
						</Form>
					</Panel.Body>
					<Panel.Footer>
					</Panel.Footer>
				</Panel>
				<Button 
					block 
					bsStyle={submitDiabled ? 'default' : 'success' }
					disabled={submitDiabled}
					onClick={this.onSubmit}>
					Enregistrer modifications
				</Button>
				<br/>
			</div>
		)
	}

}
export default ServiceInfosEditSociety
