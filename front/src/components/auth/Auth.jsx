import React from 'react'
import AuthData from './AuthData'
import './Auth.scss'

import { Grid } from 'ap-react-bootstrap'

/* This class was auto-generated by the JavaScriptWriter */
class Auth extends React.Component {

	constructor(props) {
		super(props)
	}

	componentWillMount() {
		AuthData.register(this)
	}

	componentWillUnmount() {
		AuthData.unregister()
	}

	render() {
		return (
			<Grid.Container className='ap-auth'>
				{this.props.children}
			</Grid.Container>
		)
	}

}
export default Auth
