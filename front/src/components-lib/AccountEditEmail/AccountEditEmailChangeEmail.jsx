import React from 'react'
import AccountEditEmailChangeEmailData from './AccountEditEmailChangeEmailData'
import './AccountEditEmail.scss'

import { Button, Panel, Form, Grid } from 'ap-react-bootstrap'
 
class AccountEditEmailChangeEmail extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			email: '',
			token: null
		}
	}

	componentWillMount() {
		AccountEditEmailChangeEmailData.register(this, this.props.token)
	}

	componentWillUnmount() {
		AccountEditEmailChangeEmailData.unregister()
	}

	render() {
		let submitDisabled = this.isSubmitDisabled()
		return (
			<div className='ap-account-edit-email'>
				<Button block bsStyle='primary' onClick={this.onCancel}>Retour au profil</Button>
				<br/>
				<Panel>
					<Panel.Header>
						<h4>Modification de l'adresse électronique</h4>
					</Panel.Header>
					<Panel.Body>
						<p>
						</p>
						<Form horizontal>
							<Form.Group>
								<Form.Label className='col-sm-5 col-md-4' htmlFor='email'>
									Nouvelle adresse électronique
								</Form.Label>
								<Grid.Col sm={7} md={8}>
									<Form.Input 
										id='email' 
										value={this.state.email}
										onChange={this.onChange.bind(this, 'email')} />
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
										Envoyer demande
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

export default AccountEditEmailChangeEmail