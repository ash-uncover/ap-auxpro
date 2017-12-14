import React from 'react'
import ServiceInfosEditSocietyData from './ServiceInfosEditSocietyData'
import './ServiceInfosEditSociety.scss'

import ServiceUtils from 'utils-lib/entities/ServiceUtils'

import { Button, Panel, Form, Grid } from 'ap-react-bootstrap'
import FormHelper from 'components-lib/FormHelper'

import ImageUploader from 'components-lib/Image/ImageUploader'

class ServiceInfosEditSociety extends React.Component {

	constructor(props) {
		super(props)
		this.state = {}
		this.buildFormGroup = FormHelper.buildFormGroup.bind(this, ServiceUtils.getFieldName)
		this.buildFormControl = FormHelper.buildFormControl.bind(this)
	}

	componentWillMount() {
		ServiceInfosEditSocietyData.register(this)
	}

	componentWillUnmount() {
		ServiceInfosEditSocietyData.unregister()
	}


	// Rendering functions //
	// --------------------------------------------------------------------------------

	render() {
		let submitEnabled = this.isSubmitEnabled()
		return (
			<div className='ap-service-infos-edit-society'>
				<Button block bsStyle='primary' onClick={this.onCancel}>Retour au profil</Button>
				<br/>
				<Panel>
					<Panel.Header>
						Modifier mes informations de société
					</Panel.Header>
					<Panel.Body>
						<Form horizontal>
							<Grid.Row>
								<Grid.Col xs={12} className='ap-service-infos-image-container'>
									<ImageUploader 
										className={this.state.avatar ? '' : 'ap-no-image'}
										src={this.state.avatarSrc}
										onChange={this.onChangeImage} />
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
export default ServiceInfosEditSociety
