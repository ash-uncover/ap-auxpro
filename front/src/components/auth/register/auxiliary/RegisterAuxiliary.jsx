import React from 'react'
import RegisterAuxiliaryData from 'components/auth/register/auxiliary/RegisterAuxiliaryData'
import './RegisterAuxiliary.scss'

import { Panel, Form, Grid, Button } from 'ap-react-bootstrap'

class RegisterAuxiliary extends React.Component {

	constructor(props) {
		super(props)
	}

	componentWillMount() {
		RegisterAuxiliaryData.register(this)
	}

	componentWillUnmount() {
		RegisterAuxiliaryData.unregister()
	}

	render() {
		return (
			<Panel className='ap-register-auxiliary'>
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
						{this.state.errorJustHappened && this.state.errorMessage}
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
								bsStyle='success'
								disabled={!this.state.email || !this.state.password || !this.state.confirm || (this.state.password !== this.state.confirm)}
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
export default RegisterAuxiliary
