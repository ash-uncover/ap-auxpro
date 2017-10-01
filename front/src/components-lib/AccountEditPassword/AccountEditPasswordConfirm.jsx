import React from 'react'
import AccountEditPasswordConfirmData from './AccountEditPasswordConfirmData'
import './AccountEditPassword.scss'

import { Button, Panel } from 'ap-react-bootstrap'

class AccountEditPasswordConfirm extends React.Component {

	constructor(props) {
		super(props)
	}

	componentWillMount() {
		AccountEditPasswordConfirmData.register(this)
	}

	componentWillUnmount() {
		AccountEditPasswordConfirmData.unregister()
	}

	render() {
		return (
			<Panel className='ap-account-edit-password'>
				<Panel.Header>
					<h4>Mot de passe modifié</h4>
				</Panel.Header>
				<Panel.Body>
					<p>Votre mot de passe a été changé avec succès</p>
					<p>Vous devrez utiliser votre nouveau mot de passe lors de vos prochaines connexions à AuXpros !</p>
					<br/>
					<Button 
						block 
						bsStyle='primary'
						onClick={this.onComplete}>
						Retour au profil
					</Button>
				</Panel.Body>
			</Panel>
		)
	}
}
export default AccountEditPasswordConfirm
