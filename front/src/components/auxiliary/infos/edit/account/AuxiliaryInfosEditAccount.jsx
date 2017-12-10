import React from 'react'
import AuxiliaryInfosEditAccountData from './AuxiliaryInfosEditAccountData'
import './AuxiliaryInfosEditAccount.scss'

import { Button, Panel, Form, Grid } from 'ap-react-bootstrap'

class AuxiliaryInfosEditAccount extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			accountType: null,
			accountExpiryDate: null,
			accountCode: '',
			errorMessage: ''
		}
	}

	componentWillMount() {
		AuxiliaryInfosEditAccountData.register(this)
	}

	componentWillUnmount() {
		AuxiliaryInfosEditAccountData.unregister()
	}

	render() {
		let submitDisabled = this.isSubmitDisabled()
		return (
			<div className='ap-auxiliary-infos-edit-account'>
				<Button block bsStyle='primary' onClick={this.onCancel}>Retour au profil</Button>
				<br/>
				<Panel>
					<Panel.Header>
						Modifier mon compte AuXpros
					</Panel.Header>

					<Panel.Body>
						<h4>Mon abonnement AuXpros</h4>
						<p>
							Le type d'abonnement AuXpros auquel vous souscrivez détermine le degrès d'accès que vous avez à nos services.
							<br/>
							Si votre compte n'est pas PREMIUM vous ne pourrez pas recevoir d'offres des partenaires AuXpros.
						</p>
						<Form horizontal>
							<Form.Group>
								<Form.Label className='col-sm-4 col-md-3'>Type de compte</Form.Label>
								<Form.Static className='col-sm-8 col-md-9'>{this.state.accountType}</Form.Static>
							</Form.Group>
							<Form.Group>
								<Form.Label className='col-sm-4 col-md-3'>Date d'expiration</Form.Label>
								<Form.Static className='col-sm-8 col-md-9'>{this.state.accountExpiryDate}</Form.Static>
							</Form.Group>
							<Form.Group>
								<Form.Label className='col-sm-4 col-md-3' htmlFor='accountCode'>
									Saisir un code AuXpros
								</Form.Label>
								<Grid.Col sm={8} md={9}>
									<Form.Input 
										id='accountCode' 
										value={this.state.accountCode}
										onChange={this.onChange.bind(this, 'accountCode')} />
								</Grid.Col>
								<Form.Submit
									disabled={submitDisabled}
									onSubmit={this.onSubmit} />
							</Form.Group>
						</Form>
						<Grid.Row>
							<Grid.Col sm={8} smOffset={4} md={9} mdOffset={3}>
								<p className='ap-error'>{this.state.errorMessage}</p>
								<Button 
									block 
									bsStyle={submitDisabled ? 'default' : 'success'}
									disabled={submitDisabled}
									onClick={this.onSubmit}>
									Ajouter code AuXpros
								</Button>
							</Grid.Col>
						</Grid.Row>
					</Panel.Body>
					<Panel.Footer>
					</Panel.Footer>
				</Panel>
			</div>
		)
	}
} 
export default AuxiliaryInfosEditAccount
