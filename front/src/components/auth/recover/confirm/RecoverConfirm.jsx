import React from 'react'
import RecoverConfirmData from './RecoverConfirmData'
import './RecoverConfirm.scss'

import { Panel, Form, Grid, Button } from 'ap-react-bootstrap'

class RecoverConfirm extends React.Component {

	constructor(props) {
		super(props)
	}

	componentWillMount() {
		RecoverConfirmData.register(this, this.props.email)
	}

	componentWillUnmount() {
		RecoverConfirmData.unregister()
	}

	_buildButton(text, disabled, callback) {
		return (
			<Grid.Col sm={6}>
				<Button 
					block 
					bsSize='large' 
					bsStyle={disabled ? 'default' : 'success'}
					disabled={disabled}
					onClick={callback}>
					{text}
				</Button>
			</Grid.Col>
		)
	}

	render() {
		if (this.state.completed) {
			return this.renderCompleted()
		}
		if (this.state.confirmed) {
			return this.renderConfirmed()
		}
		return this.renderCode()
	}

	renderCompleted() {
		return (
			<Panel className='ap-register-confirm'>
				<Panel.Header>
					Mot de passe modifiié
				</Panel.Header>
				<Panel.Body>
					<p>Votre mot de passe a bien été modifié.</p>
					<p>Vous pouvez à présent utiliser vos identifiants pour vous connecter à nos services.</p>
				</Panel.Body>
				<Panel.Footer>
				</Panel.Footer>
			</Panel>
		)
	}

	renderConfirmed() {
		let submitDisable = !this.state.token || !this.state.email || !this.state.password || !this.state.confirm || (this.state.password !== this.state.confirm)
		return (
			<Panel className='ap-recover-confirm'>
				<Panel.Header>
					{this.state.errorLastTry ? 'Echec de modification du mot de passe' : 'Sassissez votre nouveau mot de passe' }
				</Panel.Header>
				<Panel.Body>
					<Form>
						<Form.Group>
							<Form.Label 
								htmlFor='recoverPassword'>
								Mot de passe
							</Form.Label>
							<Form.Input 
								id='recoverPassword'
								type='password'
								value={this.state.password}
								onChange={this.onChangeNoError.bind(this, 'password')} />
						</Form.Group>
						<Form.Group>
							<Form.Label 
								htmlFor='recoverConfirm'>
								Confirmer mot de passe
							</Form.Label>
							<Form.Input 
								id='recoverConfirm'
								type='password'
								value={this.state.confirm}
								onChange={this.onChangeNoError.bind(this, 'confirm')} />
						</Form.Group>
						<Form.Submit
							disabled={this.state.errorJustHappened || submitDisable}
							onSubmit={this.onSubmitPassword} />
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
								onClick={this.onSubmitPassword}>
								Modifier mot de passe
							</Button>
						</Grid.Col>
					</Grid.Row>
				</Panel.Footer>
			</Panel>
		)
	}

	renderCode() {
		let submitDisable = !this.state.token || !this.state.email
		return (
			<Panel className='ap-recover-confirm'>
				<Panel.Header>
					{this.state.errorLastTry ? 'Echec de confirmation de réinitialisation' : 'Réinitialisation du mot de passe' }
				</Panel.Header>
				<Panel.Body>
					<Form>
						{this.state.emailSet ?
							<p>Un code de confirmation a été envoyé à votre adresse électronique, veuillez le saisir ci-dessous.</p>
						:
							<p>Veuillez saisir les informations de confirmation de votre demande de réinitialisation de mot de passe.</p>
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
									onChange={this.onChangeNoError.bind(this, 'email')} />
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
								onChange={this.onChangeNoError.bind(this, 'token')} />
						</Form.Group>
						<Form.Submit 
							disabled={this.state.errorJustHappened || submitDisable}
							onSubmit={this.onSubmitCode} />
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
								onClick={this.onSubmitCode}>
								Envoyer code
							</Button>
						</Grid.Col>
					</Grid.Row>
				</Panel.Footer>
			</Panel>
		)
	}
}
export default RecoverConfirm
