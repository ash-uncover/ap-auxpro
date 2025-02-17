import React from 'react'
import LogoutData from './LogoutData'
import './Logout.scss'

/* This class was auto-generated by the JavaScriptWriter */
class Logout extends React.Component {

	constructor(props) {
		super(props)
	}

	componentWillMount() {
		LogoutData.register(this)
	}

	componentWillUnmount() {
		LogoutData.unregister()
	}

	render() {
		return (
			<div className='ap-logout'>
				Déconnexion...
			</div>
		)
	}
}
export default Logout
