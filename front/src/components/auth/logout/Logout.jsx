import React from 'react'
import LogoutData from 'components/auth/logout/LogoutData'
import './Logout.scss'

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
