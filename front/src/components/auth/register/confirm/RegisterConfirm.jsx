import React from 'react'
import RegisterConfirmData from './RegisterConfirmData'
import './RegisterConfirm.scss'

import { Panel, Form, Grid, Button } from 'ap-react-bootstrap'

class RegisterConfirm extends React.Component {

	constructor(props) {
		super(props)
	}

	componentWillMount() {
		RegisterConfirmData.register(this, this.props.email)
	}

	componentWillUnmount() {
		RegisterConfirmData.unregister()
	}

	render() {
		if (this.state.confirmed) {
			return this.renderConfirmed()
		}
		return this.renderCode()
	}

	renderConfirmed() {
		return (
			<Grid.Container>
				<Panel className='ap-register-confirm'>
					<Panel.Header>
						Compte confirmé
					</Panel.Header>
					<Panel.Body>
						<p>Votre compte a bien été confirmé.</p>
						<p>Vous pouvez à présent utiliser vos identifiants pour vous connecter à nos services.</p>
					</Panel.Body>
					<Panel.Footer>
					</Panel.Footer>
				</Panel>
			</Grid.Container>
		)
	}

	renderCode() {
		let submitDisable = !this.state.token || !this.state.email
		return (
			<Grid.Container>
				<Panel className='ap-register-confirm'>
					<Panel.Header>
						{this.state.errorLastTry ? 'Echec de confirmation de compte' : 'Confirmation de compte' }
					</Panel.Header>
					<Panel.Body>
						<Form>
							{this.state.emailSet ?
								<p>Un code de confirmation a été envoyé à votre adresse électronique, veuillez le saisir ci-dessous.</p>
							:
								<p>Veuillez saisir les informations de confirmation de votre demande de création de compte.</p>
							}
							{!this.state.emailSet ?
								<Form.Group>
									<Form.Label 
										htmlFor='confirmEmail'>
										Adresse électronique
									</Form.Label>
									<Form.Input 
										id='confirmEmail'
										type='text'
										value={this.state.email}
										onChange={this.onChange.bind(this, 'email')} />
								</Form.Group>
							: null }
							<Form.Group>
								<Form.Label 
									htmlFor='confirmToken'>
									Code de confirmation
								</Form.Label>
								<Form.Input 
									id='confirmToken'
									type='text'
									value={this.state.token}
									onChange={this.onChange.bind(this, 'token')} />
							</Form.Group>
							<Form.Submit 
								className='ap-hidden' 
								type='submit' 
								disabled={this.state.errorJustHappened || submitDisable}
								onSubmit={this.onSubmit} />
						</Form>
						{this.state.errorJustHappened && this.state.errorMessage}
					</Panel.Body>
					<Panel.Footer>
						<Grid.Row>
							<Grid.Col sm={6}>
								<Button 
									block 
									bsSize='large' 
									bsStyle='primary'
									onClick={this.onCancel}>
									Annuler
								</Button>
							</Grid.Col>
							<br className='visible-xs-block'/>
							<Grid.Col sm={6}>
								<Button 
									block 
									bsSize='large' 
									bsStyle={submitDisable ? 'default' : 'success'}
									disabled={submitDisable}
									onClick={this.onSubmit}>
									Envoyer code
								</Button>
							</Grid.Col>
							</Grid.Row>
					</Panel.Footer>
				</Panel>
			</Grid.Container>
		)
	}

}
export default RegisterConfirm
