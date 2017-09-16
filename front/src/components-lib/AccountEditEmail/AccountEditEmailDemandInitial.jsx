import React from 'react'
import AccountEditEmailDemandInitialData from './AccountEditEmailDemandInitialData'
import './AccountEditEmail.scss'

import { Button, Panel, Form, Grid } from 'ap-react-bootstrap'
 
class AccountEditEmailDemandInitial extends React.Component {

	constructor(props) {
		super(props)
	}

	componentWillMount() {
		AccountEditEmailDemandInitialData.register(this)
	}

	componentWillUnmount() {
		AccountEditEmailDemandInitialData.unregister()
	}

	render() {
		return (
			<div className='ap-account-edit-email'>
				<Button block bsStyle='primary' onClick={this.onCancel}>Retour au profil</Button>
				<br/>
				<Panel>
					<Panel.Header>
						<h4>Modifier mon adresse électronique</h4>
					</Panel.Header>
					<Panel.Body>
						<p>
							Afin de vous permettre de modifier votre adresse électronique, nous souhaitons vérifier votre identité.
							<br/>
							Un code de confirmation va être envoyé sur votre adresse électronique actuelle.
							Ce code sera nécessaire pour poursuivre le changement d'adresse électronique.
						</p>
						<Button 
							bsStyle={'link'}
							onClick={this.onHasCode}>
							J'ai déjà un code
						</Button>
						<p className='ap-error'>{this.state.errorMessage}</p>
						<Button 
							block 
							bsStyle='success'
							onClick={this.onSubmit}>
							Envoyer demande
						</Button>
					</Panel.Body>
				</Panel>
			</div>
		)
	}
}

export default AccountEditEmailDemandInitial