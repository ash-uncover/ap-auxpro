import React from 'react'
import RegisterData from './RegisterData'
import './Register.scss'

import { Grid, Button } from 'ap-react-bootstrap'

class Register extends React.Component {

	constructor(props) {
		super(props)
	}

	componentWillMount() {
		RegisterData.register(this)
	}

	componentWillUnmount() {
		RegisterData.unregister()
	}

	render() {
		return (
			<Grid.Container className='ap-register'>
				<Grid.Col sm={6}>
					<Button
						block
						bsSize='lg'
						bsStyle='primary'
						className='ap-register-button'
						onClick={this.onRegisterAux.bind(this)}>
						<b>Créer un compte<br/>Intervenant</b>
					</Button>
				</Grid.Col>
				<br className='visible-xs-block'/>
				<Grid.Col sm={6}>
					<Button
						block
						bsStyle='primary'
						bsSize='lg'
						className='ap-register-button'
						onClick={this.onRegisterSad.bind(this)}>
						<b>Créer un compte<br/>SAD</b>
					</Button>
				</Grid.Col>
			</Grid.Container>
		)
	}

}
export default Register
