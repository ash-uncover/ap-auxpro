import React from 'react'
import AppData from 'components/AppData'
import './App.scss'

import AppHelper from 'helpers/AppHelper'

import { Grid, Navbar, Button } from 'ap-react-bootstrap'

class App extends React.Component {

	constructor(props) {
		super(props)
	}

	componentWillMount() {
		AppData.register(this)
	}

	componentWillUnmount() {
		AppData.unregister()
	}

	render() {
		return (
			<div className='ap-app'>
				<Navbar fixedTop>
				<Navbar.Header brandText='AuXpros' brandLink="/" onNavigate={AppHelper.navigate}/>
					<Navbar.Group right>
						<Navbar.Link text='Connexion' link='/auth/login' onNavigate={AppHelper.navigate}/>
						<Navbar.Link text="S'inscrire"  link='/auth/register' onNavigate={AppHelper.navigate}/>
					</Navbar.Group>
				</Navbar>
				<Grid.Container className='ap-app-main-content'>
					{this.props.children}
				</Grid.Container>
			</div>
		)
	}
}
App.contextTypes = {
	router: React.PropTypes.object
}
export default App
