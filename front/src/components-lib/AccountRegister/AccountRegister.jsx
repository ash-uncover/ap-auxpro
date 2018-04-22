import React from 'react'
import PropTypes from 'prop-types'

import { validators } from 'ap-validators'
import { Panel, Form, Grid, Button } from 'ap-react-bootstrap'

import Link from 'components-lib/Link/Link'

import './AccountRegister.scss'

class AccountRegister extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			email: '',
			emailError: '',
			password: '',
			passwordError: '',
			confirm: '',
			confirmError: '',
			errorLastTry: false,
			errorJustHappened: false,
			errorMessage: ''
		}

		this.onSubmit = this._onSubmit.bind(this)

		this.onEmailChange = this._onEmailChange.bind(this)
		this.onPasswordChange = this._onPasswordChange.bind(this)
		this.onConfirmChange = this._onConfirmChange.bind(this)
	}

	/* Component lifecycle */

	componentWillReceiveProps(newProps) {
		this.setState({
			password: '',
			confirm: '',
			errorMessage: newProps.error,
			errorJustHappened: !!newProps.error,
			errorLastTry: !!newProps.error
		})
	}

	/* View callbacks */

	_onSubmit() {
		this.props.onSubmit({
			email: this.state.email,
			password: this.state.password
		})
	}

	_onEmailChange(event, value) {
		const state = validators.email.isRequired.check(value)
		this.setState({
			email: value,
			emailError: this._buildEmailError(state),
			errorJustHappened: false
		})
	}
	_buildEmailError(state) {
		switch(state.message) {
			case 'CANNOT_BE_NULL': return 'Veuillez saisir une addresse électronique'
			case 'INVALID_EMAIL': return 'Veuillez saisir une addresse électronique valide'
		}
	}

	_onPasswordChange(event, value) {
		const state = validators.password.isRequired.check(value)
		this.setState({
			password: value,
			passwordError: this._buildPasswordError(state),
			confirmError: this._buildConfirmError(value, this.state.confirm),
			errorJustHappened: false,
			errorMessage: ''
		})
	}
	_buildPasswordError(state) {
		switch(state.message) {
			case 'CANNOT_BE_NULL': return 'Veuillez saisir un mot de passe'
			case 'MIN_LENGTH_EXCEEDED': return 'Le mot de passe doit faire au moins 8 caractères'
			case 'CONTAIN_FORBIDDEN_CHARS': return 'Le mot de passe ne peut contenir que des caractères alphanumérique et "_"'
			case 'MUST_CONTAIN_LOWERCASE': return 'Le mot de passe doit contenir au moins une lettre en minuscule'
			case 'MUST_CONTAIN_UPPERCASE': return 'Le mot de passe doit contenir au moins une lettre en majuscule'
			case 'MUST_CONTAIN_SPECIAL': return 'Le mot de passe doit contenir au moins un chiffre ou "_"'
		}
	}

	_onConfirmChange(event, value) {
		this.setState({
			confirm: value,
			confirmError: this._buildConfirmError(this.state.password, value),
			errorJustHappened: false,
			errorMessage: ''
		})
	}
	_buildConfirmError(password, confirm) {
		if (password !== confirm) {
			return 'les mots de passe ne sont pas identiques'
		}
	}

	/* Rendering functions */

	buildTitle() {
		if (this.state.errorLastTry) {
			return 'Echec de création de compte'
		}
		return this.props.title
	}

	buildEmailErrorClassName() {
		let result = 'ap-error'
		if (this.state.email && this.state.emailError) {
			result += ' visible'
		}
		return result
	}

	buildPasswordErrorClassName() {
		let result = 'ap-error'
		if (this.state.password && this.state.passwordError) {
			result += ' visible'
		}
		return result
	}

	buildConfirmErrorClassName() {
		let result = 'ap-error'
		if (this.state.confirm && this.state.confirmError) {
			result += ' visible'
		}
		return result
	}

	render() {
		let submitDisable = this.state.errorJustHappened
			|| !this.state.email 
			|| !this.state.password 
			|| !this.state.confirm 
			|| !!this.state.emailError
			|| !!this.state.passwordError
			|| !!this.state.confirmError
		console.log(submitDisable)
		return (
			<Grid.Container className='ap-account-register'>
				<Panel>
					<Panel.Header>
						{this.buildTitle()}
					</Panel.Header>
					<Panel.Body>
						<Form>
							<Form.Group>
								<Form.Label 
									htmlFor='registerEmail'>
									Adresse électronique
								</Form.Label>
								<Form.Input 
									id='registerEmail'
									type='text'
									value={this.state.email}
									onChange={this.onEmailChange} />
								<div className='ap-error-container'>
									<div className={this.buildEmailErrorClassName()}>
										{this.state.emailError}
									</div>
								</div>
							</Form.Group>
							<Form.Group>
								<Form.Label 
									htmlFor='registerPassword'>
									Mot de passe
								</Form.Label>
								<Form.Input 
									id='registerPassword'
									type='password'
									value={this.state.password}
									onChange={this.onPasswordChange} />
									<div className='ap-error-container'>
										<div className={this.buildPasswordErrorClassName()}>
											{this.state.passwordError}
										</div>
									</div>
							</Form.Group>
							<Form.Group>
								<Form.Label 
									htmlFor='registerConfirm'>
									Répéter mot de passe
								</Form.Label>
								<Form.Input 
									id='registerConfirm'
									type='password'
									value={this.state.confirm}
									onChange={this.onConfirmChange} />
								<div className='ap-error-container'>
									<div className={this.buildConfirmErrorClassName()}>
										{this.state.confirmError}
									</div>
								</div>
							</Form.Group>
							<Link href='/auth/register/confirm/e30='>
								J'ai déjà un code.
							</Link>
							<p className='ap-error'>
								{this.state.errorJustHappened && this.state.errorMessage}
							</p>
							<Form.Submit 
								disabled={submitDisable}
								onSubmit={this.onSubmit} />
						</Form>
					</Panel.Body>
					<Panel.Footer>
						<Grid.Row>
							<Grid.Col sm={6}>
								<Button 
									block 
									bsSize='large' 
									bsStyle='primary'
									onClick={this.props.onCancel}>
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
									Créer mon compte
								</Button>
							</Grid.Col>
							</Grid.Row>
					</Panel.Footer>
				</Panel>
			</Grid.Container>
		)
	}
}

AccountRegister.propTypes = {
	title: PropTypes.string.isRequired,
	error: PropTypes.string,
	onSubmit: PropTypes.func.isRequired,
	onCancel: PropTypes.func.isRequired
}

AccountRegister.defaultProps = {
	error: ''
}

export default AccountRegister
