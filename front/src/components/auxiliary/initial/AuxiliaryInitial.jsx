import React from 'react'
import AuxiliaryInitialData from './AuxiliaryInitialData'
import './AuxiliaryInitial.scss'

import { Button, Panel, Form, Grid, Google } from 'ap-react-bootstrap'

import FormHelper from 'components-lib/FormHelper'

import AuxiliaryUtils from 'utils-lib/entities/AuxiliaryUtils'

class AuxiliaryInitial extends React.Component {

	constructor(props) {
		super(props)

		this.buildFormGroup = FormHelper.buildFormGroup.bind(this, AuxiliaryUtils.getFieldName)
		this.buildFormControl = FormHelper.buildFormControl.bind(this)
	}

	componentWillMount() {
		AuxiliaryInitialData.register(this)
	}

	componentWillUnmount() {
		AuxiliaryInitialData.unregister()
	}


	// Rendering functions //
	// --------------------------------------------------------------------------------

	render() {
		return (
			<div className='ap-auxiliary-initial'>
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
						Saisir mes informations obligatoires
					</Panel.Header>
					<Panel.Body>
						<Form horizontal className='row'>
							<Grid.Col sm={6} lg={5} lgOffset={1}>
								{AuxiliaryInitialData.FIELDS_FORM1.map(this.buildFormGroup)}
							</Grid.Col>
							<Grid.Col sm={6} lg={5}>
								{AuxiliaryInitialData.FIELDS_FORM2.map(this.buildFormGroup)}
							</Grid.Col>
						</Form>
					</Panel.Body>
					<Panel.Footer>
					</Panel.Footer>
				</Panel>
				<Button 
					block 
					bsStyle={this.state.dirty && this.state.auxiliaryValid ? 'success' : 'default'}
					disabled={!this.state.dirty || !this.state.auxiliaryValid}
					onClick={this.onSubmit}>
					Enregistrer modifications
				</Button>
				<br/>
			</div>
		)
	}

}
export default AuxiliaryInitial
