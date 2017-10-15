import React from 'react'
import LoginData from './LoginData'
import './Login.scss'

import { Panel, Form, Grid, Button } from 'ap-react-bootstrap'

import Link from 'components-lib/Link/Link'

class Login extends React.Component {

	constructor(props) {
		super(props)
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
			<Panel className='ap-login'>
				<Panel.Header>
					{this.state.errorLastTry ? 'Echec de connexion' : 'Connexion' }
				</Panel.Header>
				<Panel.Body>
					<Form>
						<Form.Group>
							<Form.Label 
								htmlFor='loginUsername'>
								Nom d'utilisateur ou addresse mail
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
						<Link link='/auth/recover'>Mot de passe oublié ?</Link>
						{ this.state.errorJustHappened ?
							<p>{this.state.errorMessage}</p>
						: null }
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
								bsStyle={ submitDisable ? 'default' : 'success' }
								disabled={submitDisable}
								onClick={this.onSubmit}>
								Connexion
							</Button>
						</Grid.Col>
						</Grid.Row>
				</Panel.Footer>
			</Panel>
		)
	}

}
export default Login
