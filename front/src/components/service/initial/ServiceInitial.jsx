import React from 'react'
import ServiceInitialData from './ServiceInitialData'
import './ServiceInitial.scss'

import { Button, Panel, Form, Grid } from 'ap-react-bootstrap'
import FormHelper from 'components-lib/FormHelper'

import ImageUploader from 'components-lib/Image/ImageUploader'

class ServiceInitial extends React.Component {

	constructor(props) {
		super(props)
		this.state = {}
		this.buildFormGroup = this._buildFormGroup.bind(this)
		this.buildFormControl = FormHelper.buildFormControl.bind(this)
	}

	componentWillMount() {
		ServiceInitialData.register(this)
	}

	componentWillUnmount() {
		ServiceInitialData.unregister()
	}


	// Rendering functions //
	// --------------------------------------------------------------------------------

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

	render() {
		let submitDisabled = !this.state.dirty || this.state.errorShow || this.state.warningShow
		return (
			<div className='ap-service-initial'>
				<Panel>
					<Panel.Header>
						Statut profil	
					</Panel.Header>
					{this.state.isAccountUpdate ?
						<Panel.Body className='ap-error'>
							Suite à des changements sur le site veuillez revalider vos informations. Merci.
						</Panel.Body>
					:
						<Panel.Body className='ap-error'>
							Votre profil est incomplet, veuillez saisir les champs obligatoires ci-dessous
						</Panel.Body>
					}
					<Panel.Footer>	
					</Panel.Footer>
				</Panel>
				<Panel>
					<Panel.Header>
						Modifier mes informations de société
					</Panel.Header>
					<Panel.Body>
						<Form horizontal>
							<Grid.Row>
								<Grid.Col sm={6} lg={5} lgOffset={1}>
									{ServiceInitialData.FIELDS_FORM1.map(this.buildFormGroup)}
								</Grid.Col>
								<Grid.Col sm={6} lg={5}>
									{ServiceInitialData.FIELDS_FORM2.map(this.buildFormGroup)}
								</Grid.Col>
							</Grid.Row>
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
					{this.state.errorJustHappened ? 'Erreur' : 'Enregistrer modifications' }
				</Button>
				<br/>
			</div>
		)
	}

}
export default ServiceInitial
