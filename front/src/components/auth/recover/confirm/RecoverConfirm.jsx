import React from 'react'
import RecoverConfirmData from './RecoverConfirmData'
import './RecoverConfirm.scss'

import { Panel, Form, Grid, Button } from 'ap-react-bootstrap'
import PanelFooterConfirm from 'components-lib/Panel/PanelFooterConfirm'

class RecoverConfirm extends React.Component {

	constructor(props) {
		super(props)
		
		this.state = {
			email: '',
			emailSet: false,
			token: '',
			password: '',
			confirm: ''
		}
	}

	componentWillMount() {
		RecoverConfirmData.register(this, this.props.params.data)
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
			<Grid.Container className='ap-recover-confirm'>
				<Panel>
					<Panel.Header>
						Mot de passe modifié
					</Panel.Header>
					<Panel.Body>
						<p>Votre mot de passe a bien été modifié.</p>
						<p>Vous pouvez à présent utiliser vos identifiants pour vous connecter à nos services.</p>
					</Panel.Body>
					<Panel.Footer>
					</Panel.Footer>
				</Panel>
			</Grid.Container>
		)
	}

	renderConfirmed() {
		let submitDisable = !this.state.token || !this.state.email || !this.state.password || !this.state.confirm || (this.state.password !== this.state.confirm)
		return (
			<Grid.Container  className='ap-recover-confirm'>
				<Panel>
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
					<PanelFooterConfirm 
						onCancel={this.onCancel}
						submitDisabled={submitDisable}
						onSubmit={this.onSubmitPassword}
						submitText='Modifier mot de passe' />
				</Panel>
			</Grid.Container>
		)
	}

	_buildCodeMessage() {
		if (this.state.emailSet && this.state.tokenSet && !this.state.errorLastTry) {
			return 'Vérification du lien.'
		}
		if (this.state.emailSet) {
			return 'Un code de confirmation a été envoyé à votre adresse électronique, veuillez le saisir ci-dessous.'
		}
		return 'Veuillez saisir les informations de confirmation de votre demande de réinitialisation de mot de passe.'
	}

	renderCode() {
		let submitDisable = !this.state.token || !this.state.email
		return (
			<Grid.Container className='ap-recover-confirm'>
				<Panel>
					<Panel.Header>
						{this.state.errorLastTry ? 'Echec de confirmation de réinitialisation' : 'Réinitialisation du mot de passe' }
					</Panel.Header>
					<Panel.Body>
						{this._buildCodeMessage()}
						<Form>
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
										onChange={this.onChangeNoError.bind(this, 'email')} />
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
										onChange={this.onChangeNoError.bind(this, 'token')} />
								</Form.Group>
							}
							<Form.Submit 
								disabled={this.state.errorJustHappened || submitDisable}
								onSubmit={this.onSubmitCode} />
						</Form>
						{this.state.errorJustHappened && this.state.errorMessage}
					</Panel.Body>
					{(!this.state.emailSet || !this.state.tokenSet) &&
						<PanelFooterConfirm 
							onCancel={this.onCancel}
							submitDisabled={submitDisable}
							onSubmit={this.onSubmitCode}
							submitText='Envoyer code' />
					}
				</Panel>
			</Grid.Container>
		)
	}
}
export default RecoverConfirm
