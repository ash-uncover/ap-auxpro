import React from 'react'
import ServiceInfosEditAccountData from 'components/service/infos/edit/account/ServiceInfosEditAccountData'
import './ServiceInfosEditAccount.scss'

import ServiceUtils from 'utils-lib/entities/ServiceUtils'

import { Button, Panel, Form, Grid } from 'ap-react-bootstrap'

class ServiceInfosEditAccount extends React.Component {

	constructor(props) {
		super(props)
	}

	componentWillMount() {
		ServiceInfosEditAccountData.register(this)
	}

	componentWillUnmount() {
		ServiceInfosEditAccountData.unregister()
	}

	render() {
		return (
			<div className='ap-service-infos-edit-account'>
				<Button block bsStyle='primary' onClick={this.onCancel}>Annuler</Button>
				<br/>
				<Panel>
					<Panel.Header>
						Modifier mon compte AuXpros
					</Panel.Header>

					<Panel.Body>
						<h4>Mon abonnement AuXpros</h4>
						<p>
							Le type d'abonnement AuXpros auquel vous souscrivez détermine le degrès d'accès que vous avez à nos services.
							<br/>
							Si votre compte n'est pas PREMIUM vous ne pourrez pas utiliser les fonctionalités de MATCHING pour émettre vos offres vers des auxiliarires de vie.
						</p>
						<Form horizontal>
							<Form.Group>
								<Form.Label className='col-sm-4 col-md-3'>Type de compte</Form.Label>
								<Form.Static className='col-sm-8 col-md-9'>Lol</Form.Static>
							</Form.Group>
							<Form.Group>
								<Form.Label className='col-sm-4 col-md-3'>Date d'expiration</Form.Label>
								<Form.Static className='col-sm-8 col-md-9'>Kiko</Form.Static>
							</Form.Group>
							<Form.Group>
								<Form.Label className='col-sm-4 col-md-3' htmlFor='accountCode'>
									Saisir un code AuXpros
								</Form.Label>
								<Grid.Col sm={8} md={9}>
									<Form.Input id='accountCode' />
								</Grid.Col>
							</Form.Group>
							<Grid.Row>
								<Grid.Col sm={8} smOffset={4} md={9} mdOffset={3}>
									{this.state.error}
									<Button block bsStyle='success'>
										Ajouter code AuXpros
									</Button>
								</Grid.Col>
							</Grid.Row>
						</Form>
						<h4>Mes informations de connection</h4>
						<p>
							Vous pouvez modifier vos identifiants de connection nécessaires pour accèder à nos services.
							<br/>
							Prenez soin de bien mémoriser vos nouveaux identifiants.
						</p>
						<Button block bsStyle='warning'>Modifier mon adresse électronique</Button>
						<br/>
						<Button block bsStyle='warning'>Modifier mon mot de passe</Button>
					</Panel.Body>

					<Panel.Footer>
					</Panel.Footer>
				</Panel>
			</div>
		)
	}

}
export default ServiceInfosEditAccount
