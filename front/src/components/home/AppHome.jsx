import React from 'react'
import AppHomeData from './AppHomeData'
import './AppHome.scss'

import { Row, Col, Panel, Button } from 'ap-react-bootstrap'

import ImageUploader from 'components-lib/Image/ImageUploader'

class AppHome extends React.Component {

	constructor(props) {
		super(props)
	}

	componentWillMount() {
		AppHomeData.register(this)
	}

	componentWillUnmount() {
		AppHomeData.unregister()
	}

	render() {
		return (
			<div className='ap-app-home'>
				<Col sm={4}>
					<Button
						block
						bsSize='lg'
						bsStyle='primary'
						className='ap-land-button'
						onClick={this.onLogon.bind(this)}>
						<b>Se Connecter</b>
					</Button>
				</Col>
				<br className='visible-xs-block'/>
				<Col sm={4}>
					<Button
						block
						bsStyle='primary'
						bsSize='lg'
						className='ap-land-button'
						onClick={this.onRegisterAux.bind(this)}>
						<b>Créer un compte<br/>Auxiliaire de vie</b>
					</Button>
				</Col>
				<br className='visible-xs-block'/>
				<Col sm={4}>
					<Button
						block
						bsSize='lg'
						bsStyle='primary'
						className='ap-land-button'
						onClick={this.onRegisterSad.bind(this)}>
						<b>Créer un compte<br/>SAD</b>
					</Button>
				</Col>
				<Row>
					<Col smOffset={1} sm={10}>
						<div className='ap-auxpro-home-ext-panel'>
							<div>
								<h2>Je recherche un soutien à domicile</h2>
								<p className='ap-auxpro-home-ext-text'>Pour être redirigé vers l'annuaire des services à la personne de la <b>Direction Générale des Entreprises</b> du ministère chargé de l'économie</p>
							</div>
							<Button bsSize='lg' bsStyle='primary' onClick={this.onNavDGE.bind(this)}>CLIQUEZ ICI</Button>
						</div>
					</Col>
				</Row>
			</div>
		)
	}

}
export default AppHome
