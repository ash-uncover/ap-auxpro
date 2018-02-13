import React from 'react'
import LoginData from './LoginData'
import './Login.scss'

import { Panel, Form, Grid, Button } from 'ap-react-bootstrap'

import Link from 'components-lib/Link/Link'

class Login extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			username: '',
			password: '',
			errorLastTry: false,
			errorJustHappened: false,
			errorMessage: ''
		}
	}

	componentWillMount() {
		LoginData.register(this)
	}

	componentWillUnmount() {
		LoginData.unregister()
	}

	render() { 
		let submitDisable = !this.state.username || !this.state.password || this.state.errorJustHappened
		return (
			<Grid.Container className='ap-login'>
				<Panel>
					<Panel.Header>
						{this.state.errorLastTry ? 'Echec de connexion' : 'Connexion' }
					</Panel.Header>
					<Panel.Body>
						<Form>
							<Form.Group>
								<Form.Label 
									htmlFor='loginUsername'>
									Nom d'utilisateur ou adresse mail
								</Form.Label>
								<Form.Input 
									id='loginUsername'
									type='text'
									value={this.state.username}
									onChange={this.onChangeNoError.bind(this, 'username')} />
							</Form.Group>
							<Form.Group>
								<Form.Label 
									htmlFor='loginPassword'>
									Mot de passe
								</Form.Label>
								<Form.Input 
									id='loginPassword'
									type='password'
									value={this.state.password}
									onChange={this.onChangeNoError.bind(this, 'password')} />
							</Form.Group>
							<Link href='/auth/recover'>Mot de passe oublié ?</Link>
							{ this.state.errorJustHappened ?
								<p className='ap-login-error'>{this.state.errorMessage}</p>
							: null }
							<Form.Submit
								disabled={this.state.errorJustHappened || submitDisable}
								onSubmit={this.onSubmit} />
						</Form>
					</Panel.Body>
					<Panel.Footer>
						<Grid.Row>
							<Grid.Col sm={6}>
								<Button 
                                    className='ap-login-cancel'
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
                                    className='ap-login-submit'
									block 
									bsSize='large' 
									bsStyle={ submitDisable ? 'default' : 'success' }
									disabled={submitDisable}
									onClick={this.onSubmit}>
									Connexion
								</Button>
							</Grid.Col>
							</Grid.Row>
					</Panel.Footer>
				</Panel>
			</Grid.Container>
		)
	}

}
export default Login
