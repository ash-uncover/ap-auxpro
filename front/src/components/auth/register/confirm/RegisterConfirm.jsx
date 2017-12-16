import React from 'react'
import RegisterConfirmData from './RegisterConfirmData'
import './RegisterConfirm.scss'

import { Panel, Form, Grid, Button } from 'ap-react-bootstrap'

class RegisterConfirm extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			email: '',
			emailSet: false,
			token: '',
			tokenSet: false
		}

		this.buildHeader = this._buildHeader.bind(this)
		this.buildMessage = this._buildMessage.bind(this)
		this.buildFooter = this._buildFooter.bind(this)
	}

	componentWillMount() {
		RegisterConfirmData.register(this, this.props.params.data)
	}

	componentWillUnmount() {
		RegisterConfirmData.unregister()
	}

	render() {
		if (this.state.confirmed) {
			return this.renderConfirmed()
		}
		return this.renderForm()
	}

	renderConfirmed() {
		return (
			<Grid.Container className='ap-register-confirm'>
				<Panel>
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

	_buildHeader() {
		return (
			<Panel.Header>
				{this.state.errorLastTry ? 'Echec de confirmation de compte' : 'Confirmation de compte' }
			</Panel.Header>
		)
	}

	_buildMessage() {
		switch(this.state.state) {
		case RegisterConfirmData.STATES.ASK_ALL:
			return (<p>Veuillez saisir les informations de confirmation de votre demande de création de compte.</p>)
		case RegisterConfirmData.STATES.ASK_CODE:
			return (<p>Un code de confirmation a été envoyé à votre adresse électronique, veuillez le saisir ci-dessous.</p>)
		case RegisterConfirmData.STATES.ASK_NONE:
			return !this.state.errorLastTry && (<p>Validation de votre compte en cours.</p>)
		}
	}

	_buildFooter() {
		console.log(this.state)
		let submitDisable = !this.state.token || !this.state.email
		return (
			<Panel.Footer>
			{this.state.state !== RegisterConfirmData.STATES.ASK_NONE &&
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
			}
			</Panel.Footer>
		)
	}

	renderForm() {
		let submitDisable = !this.state.token || !this.state.email
		return (
			<Grid.Container className='ap-register-confirm'>
				<Panel>
					{this.buildHeader()}
					<Panel.Body>
						<Form>
							{this.buildMessage()}
							{!this.state.emailSet &&
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
							}
							{!this.state.tokenSet &&
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
							}
							{RegisterConfirmData.STATES.ASK_NONE !== this.state.state &&
								<Form.Submit 
									className='ap-hidden' 
									type='submit' 
									disabled={this.state.errorJustHappened || submitDisable}
									onSubmit={this.onSubmit} />
							}
						</Form>
						{this.state.errorJustHappened && this.state.errorMessage}
					</Panel.Body>
					{this.buildFooter()}
				</Panel>
			</Grid.Container>
		)
	}

}
export default RegisterConfirm
