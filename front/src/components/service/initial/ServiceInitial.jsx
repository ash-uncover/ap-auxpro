import React from 'react'
import ServiceInitialData from './ServiceInitialData'
import './ServiceInitial.scss'

import ServiceUtils from 'utils-lib/entities/ServiceUtils'

import { Button, Panel, Form, Grid } from 'ap-react-bootstrap'
import FormHelper from 'components-lib/FormHelper'

import ImageUploader from 'components-lib/Image/ImageUploader'


class ServiceInitial extends React.Component {

	constructor(props) {
		super(props)
		this.buildFormGroup = FormHelper.buildFormGroup.bind(this, ServiceUtils.getFieldName)
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

	render() {
		let submitEnabled = this.state.dirty && this.state.valid
		return (
			<div className='ap-service-initial'>
				<Panel>
					<Panel.Header>
						Statut profil	
					</Panel.Header>
					<Panel.Body className='ap-error'>
						Votre profil est incomplet, veuillez saisir les champs obligatoires ci-dessous
					</Panel.Body>
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
				{ this.state.errorJustHappened ? 
					<Panel>
						<Panel.Body className='ap-error'>
							<div>Une erreur est survenue</div>
							<div>Veuillez vérifier les valeurs saisies</div>
						</Panel.Body>
					</Panel>
				: null }
				<Button 
					block 
					bsStyle={this.state.errorJustHappened ? 'danger' : submitEnabled ? 'success' : 'default'}
					disabled={this.state.errorJustHappened || !submitEnabled}
					onClick={this.onSubmit}>
					{this.state.errorJustHappened ? 'Erreur' : 'Enregistrer modifications' }
				</Button>
				<br/>
			</div>
		)
	}

}
export default ServiceInitial
