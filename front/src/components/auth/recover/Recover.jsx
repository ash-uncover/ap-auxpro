import React from 'react'
import RecoverData from './RecoverData'
import './Recover.scss'

import { Panel, Form, Grid, Button } from 'ap-react-bootstrap'

import Link from 'components-lib/Link/Link'

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
		let submitDisabled = !this.state.email
		return (
			<Grid.Container className='ap-recover'>
				<Panel>
					<Panel.Header>
						Mot de passe oublié
					</Panel.Header>
					<Panel.Body>
						<Form>
							<Form.Group>
								<Form.Label 
									htmlFor='recoverEmail'>
									Addresse électronique
								</Form.Label>
								<Form.Input 
									id='recoverEmail'
									type='text'
									value={this.state.email}
									onChange={this.onChange.bind(this, 'email')} />
							</Form.Group>
							<Link href='/auth/recover/confirm'>J'ai déjà un code.</Link>
							<Form.Submit
								disabled={submitDisabled}
								onSubmit={this.onSubmit} />
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
									bsStyle={ submitDisabled ? 'default' : 'success' }
									disabled={submitDisabled}
									onClick={this.onSubmit}>
									Récupération
								</Button>
							</Grid.Col>
							</Grid.Row>
					</Panel.Footer>
				</Panel>
			</Grid.Container>
		)
	}

}
export default Recover
