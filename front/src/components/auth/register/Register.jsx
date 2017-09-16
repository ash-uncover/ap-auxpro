import React from 'react'
import RegisterData from './RegisterData'
import './Register.scss'

import { Col, Button } from 'ap-react-bootstrap'

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
			<div className='ap-register'>
				<Col sm={6}>
					<Button
						block
						bsSize='lg'
						bsStyle='primary'
						className='ap-register-button'
						onClick={this.onRegisterAux.bind(this)}>
						<b>Créer un compte<br/>Auxiliaire de vie</b>
					</Button>
				</Col>
				<br className='visible-xs-block'/>
				<Col sm={6}>
					<Button
						block
						bsStyle='primary'
						bsSize='lg'
						className='ap-register-button'
						onClick={this.onRegisterSad.bind(this)}>
						<b>Créer un compte<br/>SAD</b>
					</Button>
				</Col>
			</div>
		)
	}

}
export default Register
