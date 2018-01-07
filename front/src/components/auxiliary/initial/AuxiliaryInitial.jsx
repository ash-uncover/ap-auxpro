import React from 'react'
import AuxiliaryInitialData from './AuxiliaryInitialData'
import './AuxiliaryInitial.scss'

import { Button, Panel, Form, Grid } from 'ap-react-bootstrap'

import FormHelper from 'components-lib/FormHelper'

import AuxiliaryUtils from 'utils-lib/entities/AuxiliaryUtils'

class AuxiliaryInitial extends React.Component {

	constructor(props) {
		super(props)

		this.state = {}

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
		let submitEnabled = this.state.dirty && this.state.auxiliaryValid
		return (
			<div className='ap-auxiliary-initial'>
				<Panel>
					<Panel.Header>
						Statut profil	
					</Panel.Header>
					{submitEnabled ?
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
					bsStyle={submitEnabled ? 'success' : 'default'}
					disabled={!submitEnabled}
					tooltip={submitEnabled ? 'Enregistrer vos informations' : 'Vous devez remplir les informations'}
					onClick={this.onSubmit}>
					Continuer vers AuXpros
				</Button>
				<br/>
			</div>
		)
	}

}
export default AuxiliaryInitial
