import React from 'react'
import RegisterAuxiliaryData from './RegisterAuxiliaryData'
import './RegisterAuxiliary.scss'

import { Panel, Form, Grid, Button } from 'ap-react-bootstrap'

import Link from 'components-lib/Link/Link'

class RegisterAuxiliary extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			email: '',
			password: '',
			confirm: '',
			errorLastTry: false,
			errorJustHappened: false,
			errorMessage: ''
		}
	}

	componentWillMount() {
		RegisterAuxiliaryData.register(this)
	}

	componentWillUnmount() {
		RegisterAuxiliaryData.unregister()
	}

	render() {
		let submitDisable = !this.state.email || !this.state.password || !this.state.confirm || (this.state.password !== this.state.confirm)
		return (
			<Grid.Container className='ap-register-auxiliary'>
				<Panel>
					<Panel.Header>
						{this.state.errorLastTry ? 'Echec de création de compte' : 'Création compte Auxiliaire' }
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
							<Link href='/auth/register/confirm'>J'ai déjà un code.</Link>
							<p className='ap-error'>{this.state.errorJustHappened && this.state.errorMessage}</p>
							<Form.Submit 
								disabled={this.state.errorJustHappened || submitDisable}
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
			</Grid.Container>
		)
	}

}
export default RegisterAuxiliary
