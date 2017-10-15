import React from 'react'
import RegisterServiceData from './RegisterServiceData'
import './RegisterService.scss'

import { Panel, Form, Grid, Button } from 'ap-react-bootstrap'

import Link from 'components-lib/Link/Link'

class RegisterService extends React.Component {

	constructor(props) {
		super(props)
	}

	componentWillMount() {
		RegisterServiceData.register(this)
	}

	componentWillUnmount() {
		RegisterServiceData.unregister()
	}

	render() {
		let submitDisable = !this.state.email || !this.state.password || !this.state.confirm || (this.state.password !== this.state.confirm)
		return (
			<Panel className='ap-register-service'>
				<Panel.Header>
					{this.state.errorLastTry ? 'Echec de création de compte' : "Création compte Société d'aide à Domicile" }
				</Panel.Header>
				<Panel.Body>
					<Form>
						<Form.Group>
							<Form.Label 
								htmlFor='registerEmail'>
								Addresse électronique
							</Form.Label>
							<Form.Input 
								id='registerEmail'
								type='text'
								value={this.state.email}
								onChange={this.onChangeNoError.bind(this, 'email')} />
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
								onChange={this.onChangeNoError.bind(this, 'password')} />
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
								onChange={this.onChangeNoError.bind(this, 'confirm')} />
						</Form.Group>
						<Link link='/auth/register/confirm'>J'ai déjà un code.</Link>
						<p className='ap-error'>{this.state.errorJustHappened && this.state.errorMessage}</p>
						<Button 
							className='ap-hidden' 
							type='submit' 
							disabled={this.state.errorJustHappened || submitDisable}
							onClick={this.onSubmit} />
					</Form>
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
								Créer mon compte
							</Button>
						</Grid.Col>
						</Grid.Row>
				</Panel.Footer>
			</Panel>
		)
	}

}
export default RegisterService
