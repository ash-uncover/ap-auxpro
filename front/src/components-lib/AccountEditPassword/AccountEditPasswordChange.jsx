import React from 'react'
import AccountEditPasswordChangeData from './AccountEditPasswordChangeData'
import './AccountEditPassword.scss'

import { Button, Panel, Form, Grid } from 'ap-react-bootstrap'

class AccountEditPasswordChange extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			oldPassword: '',
			newPassword: '',
			newConfirm: '',
			passwordChanged: false,
			errorLastTry: false,
			errorJustHappened: false,
			errorMessage: ''
		}
	}

	componentWillMount() {
		AccountEditPasswordChangeData.register(this)
	}

	componentWillUnmount() {
		AccountEditPasswordChangeData.unregister()
	}

	render() {
		let submitDisabled = this.isSubmitDisabled()
		return (
			<div className='ap-service-infos-edit-password'>
				<Button block bsStyle='primary' onClick={this.onCancel}>Retour au profil</Button>
				<br/>
				<Panel>
					<Panel.Header>
						<h4>Modifier mon mot de passe</h4>
					</Panel.Header>
					<Panel.Body>
						<p>
							Afin de modifier votre mot passe, veuillez saisir votre mot de passe actuel, votre nouveau mot de passe et une confirmation de celui-ci.
						</p>
						<br/>
						<Form horizontal>
							<Form.Group>
								<Form.Label 
									className='col-sm-5 col-md-4' 
									htmlFor='oldPassword'>
									Mot de passe actuel
								</Form.Label>
								<Grid.Col sm={7} md={8}>
									<Form.Input 
										id='oldPassword' 
										type='password'
										value={this.state.oldPassword}
										onChange={this.onChange.bind(this, 'oldPassword')} />
								</Grid.Col>
							</Form.Group>
							<Form.Group>
								<Form.Label 
									className='col-sm-5 col-md-4' 
									htmlFor='newPassword'>
									Nouveau mot de passe
								</Form.Label>
								<Grid.Col sm={7} md={8}>
									<Form.Input 
										id='newPassword' 
										type='password'
										value={this.state.newPassword}
										onChange={this.onChange.bind(this, 'newPassword')} />
								</Grid.Col>
							</Form.Group>
							<Form.Group>
								<Form.Label 
									className='col-sm-5 col-md-4' 
									htmlFor='newConfirm'>
									Confirmer nouveau mot de passe
								</Form.Label>
								<Grid.Col sm={7} md={8}>
									<Form.Input 
										id='newConfirm' 
										type='password'
										value={this.state.newConfirm}
										onChange={this.onChange.bind(this, 'newConfirm')} />
								</Grid.Col>
							</Form.Group>
							<Grid.Row>
								<Grid.Col sm={7} smOffset={5} md={8} mdOffset={4}>
									<p className='ap-error'>{this.state.errorMessage}</p>
									<Button 
										block 
										disabled={submitDisabled}
										bsStyle={submitDisabled ? 'default' : 'success'}
										onClick={this.onSubmit}>
										Changer mot de passe
									</Button>
								</Grid.Col>
							</Grid.Row>
						</Form>
					</Panel.Body>
				</Panel>
			</div>
		)
	}
}
export default AccountEditPasswordChange
