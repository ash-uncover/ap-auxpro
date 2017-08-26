import React from 'react'
import RecoverData from 'components/auth/recover/RecoverData'
import './Recover.scss'

import { Panel, Form, Grid, Button } from 'ap-react-bootstrap'

class Recover extends React.Component {

	constructor(props) {
		super(props)
	}

	componentWillMount() {
		RecoverData.register(this)
	}

	componentWillUnmount() {
		RecoverData.unregister()
	}

	render() {
		return (
			<Panel className='ap-recover'>
				<Panel.Header>
					Mot de passe oublié
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
								onChange={this.onChange.bind(this, 'username')} />
						</Form.Group>
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
								disabled={!this.state.username}
								onClick={this.onSubmit}>
								Récupération
							</Button>
						</Grid.Col>
						</Grid.Row>
				</Panel.Footer>
			</Panel>
		)
	}

}
export default Recover
