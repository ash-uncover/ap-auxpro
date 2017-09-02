import React from 'react'
import ServiceInfosEditEmailData from 'components/service/infos/edit/email/ServiceInfosEditEmailData'
import './ServiceInfosEditEmail.scss'

import { Button, Panel, Form, Grid } from 'ap-react-bootstrap'
 
class ServiceInfosEditEmail extends React.Component {

	constructor(props) {
		super(props)
	}

	componentWillMount() {
		ServiceInfosEditEmailData.register(this)
	}

	componentWillUnmount() {
		ServiceInfosEditEmailData.unregister()
	}

	render() {
		return (
			<Panel className='ap-service-infos-edit-email'>>
				<Panel.Header>
					<h4>Modifier mon mot de passe</h4>
				</Panel.Header>
				<Panel.Body>
					<Form horizontal>
						<Form.Group>
							<Form.Label className='col-sm-5 col-md-4' htmlFor='oldPassword'>
								Mot de passe actuel
							</Form.Label>
							<Grid.Col sm={7} md={8}>
								<Form.Input id='oldPassword' type='password' />
							</Grid.Col>
						</Form.Group>
						<Form.Group>
							<Form.Label className='col-sm-5 col-md-4' htmlFor='newPassword'>
								Nouveau mot de passe
							</Form.Label>
							<Grid.Col sm={7} md={8}>
								<Form.Input id='newPassword' type='password' />
							</Grid.Col>
						</Form.Group>
						<Form.Group>
							<Form.Label className='col-sm-5 col-md-4' htmlFor='newConfirm'>
								Confirmer nouveau mot de passe
							</Form.Label>
							<Grid.Col sm={7} md={8}>
								<Form.Input id='newConfirm' type='password' />
							</Grid.Col>
						</Form.Group>
						<Grid.Row>
							<Grid.Col sm={7} smOffset={5} md={8} mdOffset={4}>
								{this.state.error}
								<Button block bsStyle='success'>
									Changer mot de passe
								</Button>
							</Grid.Col>
						</Grid.Row>
					</Form>
				</Panel.Body>
			</Panel>
		)
	}

}
export default ServiceInfosEditEmail
