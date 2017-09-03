import React from 'react'
import AccountEditEmailChangeConfirmData from './AccountEditEmailChangeConfirmData'
import './AccountEditEmail.scss'

import { Button, Panel } from 'ap-react-bootstrap'

class AccountEditEmailChangeConfirm extends React.Component {

	constructor(props) {
		super(props)
	}

	componentWillMount() {
		AccountEditEmailChangeConfirmData.register(this)
	}

	componentWillUnmount() {
		AccountEditEmailChangeConfirmData.unregister()
	}

	render() {
		return (
			<Panel className='ap-account-edit-email'>
				<Panel.Header>
					<h4>Adresse électronique modifiée</h4>
				</Panel.Header>
				<Panel.Body>
					<p>Votre adresse électronique a été changée avec succès</p>
					<p>Vous devrez utiliser votre nouvelle adresse électronique lors de vos prochaines connexions à AuXpros !</p>
					<br/>
					<Button 
						block 
						bsStyle='primary'
						onClick={this.onComplete}>
						Retour au profile
					</Button>
				</Panel.Body>
			</Panel>
		)
	}
}
export default AccountEditEmailChangeConfirm
