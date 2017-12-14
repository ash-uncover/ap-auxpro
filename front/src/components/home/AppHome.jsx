import React from 'react'
import AppHomeData from './AppHomeData'
import './AppHome.scss'

import { Grid, Panel, Button } from 'ap-react-bootstrap'

class AppHome extends React.Component {

	constructor(props) {
		super(props)
		this.state = {}
	}

	componentWillMount() {
		AppHomeData.register(this)
	}

	componentWillUnmount() {
		AppHomeData.unregister()
	}

	render() {
		return (
			<Grid.Container className='ap-app-home'>
				<Grid.Col sm={4}>
					<Button
						block
						bsSize='lg'
						bsStyle='primary'
						className='ap-land-button'
						onClick={this.onLogon.bind(this)}>
						<b>Se Connecter</b>
					</Button>
				</Grid.Col>
				<br className='visible-xs-block'/>
				<Grid.Col sm={4}>
					<Button
						block
						bsStyle='primary'
						bsSize='lg'
						className='ap-land-button'
						onClick={this.onRegisterAux.bind(this)}>
						<b>Créer un compte<br/>Auxiliaire de vie</b>
					</Button>
				</Grid.Col>
				<br className='visible-xs-block'/>
				<Grid.Col sm={4}>
					<Button
						block
						bsSize='lg'
						bsStyle='primary'
						className='ap-land-button'
						onClick={this.onRegisterSad.bind(this)}>
						<b>Créer un compte<br/>SAD</b>
					</Button>
				</Grid.Col>
				<Grid.Row>
					<Grid.Col smOffset={1} sm={10}>
						<div className='ap-auxpro-home-ext-panel'>
							<div>
								<h2>Je recherche un soutien à domicile</h2>
								<p className='ap-auxpro-home-ext-text'>Pour être redirigé vers l'annuaire des services à la personne de la <b>Direction Générale des Entreprises</b> du ministère chargé de l'économie</p>
							</div>
							<Button bsSize='lg' bsStyle='primary' onClick={this.onNavDGE.bind(this)}>CLIQUEZ ICI</Button>
						</div>
					</Grid.Col>
				</Grid.Row>
			</Grid.Container>
		)
	}
}
export default AppHome
