import React from 'react'
import AccountEditEmailChangeCodeData from './AccountEditEmailChangeCodeData'
import './AccountEditEmail.scss'

import { Button, Panel, Form, Grid } from 'ap-react-bootstrap'
 
class AccountEditEmailChangeCode extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			token: '',
			errorMessage: ''
		}
	}

	componentWillMount() {
		AccountEditEmailChangeCodeData.register(this)
	}

	componentWillUnmount() {
		AccountEditEmailChangeCodeData.unregister()
	}

	render() {
		let submitDisabled = this.isSubmitDisabled()
		return (
			<div className='ap-account-edit-email'>
				<Button block bsStyle='primary' onClick={this.onCancel}>Retour au profil</Button>
				<br/>
				<Panel>
					<Panel.Header>
						<h4>Confirmer demande de modification</h4>
					</Panel.Header>
					<Panel.Body>
						<p>
							Vous avez recu un code de confirmation sur votre nouvelle adresse électronique.
							<br/>
							Veuillez saisir ce code ci dessous pour valider le changement d'adresse électronique.
						</p>
						<Form horizontal>
							<Form.Group>
								<Form.Label className='col-sm-5 col-md-4' htmlFor='token'>
									Code de confirmation
								</Form.Label>
								<Grid.Col sm={7} md={8}>
									<Form.Input 
										id='token' 
										value={this.state.token}
										onChange={this.onChange.bind(this, 'token')} />
								</Grid.Col>
								<Form.Submit 
									disabled={this.state.errorJustHappened || submitDisabled}
									onSubmit={this.onSubmit} />
							</Form.Group>
							<Grid.Row>
								<Grid.Col sm={7} smOffset={5} md={8} mdOffset={4}>
									<p className='ap-error'>{this.state.errorMessage}</p>
									<Button 
										block 
										bsStyle={submitDisabled ? 'default' : 'success'}
										disabled={submitDisabled}
										onClick={this.onSubmit}>
										Envoyer code
									</Button>
								</Grid.Col>
							</Grid.Row>
						</Form>
					</Panel.Body>
				</Panel>
			</div>
		)
	}
}

export default AccountEditEmailChangeCode