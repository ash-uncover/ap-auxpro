import React from 'react'
import AppHeaderData from 'components-lib/AppHeader/AppHeaderData'
import './AppHeader.scss'

import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'

import { Navbar } from 'ap-react-bootstrap'

class AppHeader extends React.Component {

	constructor(props) {
		super(props)
	}

	componentWillMount() {
		AppHeaderData.register(this)
	}

	componentWillUnmount() {
		AppHeaderData.unregister()
	}

	_buildText(text, type) { 
		return (
			<Navbar.Text 
				text={text} 
				active={this.state.authType === type} />
		)
	}

	_buildLink(text, link) { 
		return (
			<Navbar.Link 
				text={text} 
				link={link} 
				onNavigate={AppHelper.navigate} 
				active={(AppHelper.getData('/path') || '').startsWith(link)} />
		)
	}

	_buildLinks() { 
		switch (this.state.authType) {
			case 'auxiliary': return (
				<Navbar.Group right>
					{this._buildLink('Accueil','/auxiliary/home')}
					{this._buildLink('Profil','/auxiliary/infos')}
					{this._buildLink('Planing','/auxiliary/planing')}
					{this._buildLink('Zone','/auxiliary/zone')}
					{this._buildLink('Offres','/auxiliary/offers')}
					{this._buildLink('Déconnexion','/logout')}
				</Navbar.Group>
			)
			case 'service': return (
				<Navbar.Group right>
					{this._buildLink('Accueil','/service/home')}
					{this._buildLink('Profil','/service/infos')}
					{this._buildLink('Zone','/service/zone')}
					{this._buildLink('Usagers','/service/customers')}
					{this._buildLink('Interventions','/service/interventions')}
					{this._buildLink('Déconnexion','/logout')}
				</Navbar.Group>
			)
			default: return (
				<Navbar.Group right>
					{this._buildLink('Connexion','/auth/login')}
					{this._buildLink("S'inscrire",'/auth/register')}
				</Navbar.Group>
			)
		}
	}

	render() {
		return (
			<header className='hidden-print ap-app-header'>
				<Navbar fixedTop>
					<Navbar.Header 
						brandText='AuXpros'
						brandImage='assets/images/auxpro-logo.png'
						brandLink='/home'
						onNavigate={AppHelper.navigate} />
					<Navbar.Group>
						{this._buildText('AUX','auxiliary')}
						{this._buildText('SAD','service')}
					</Navbar.Group>
					{this._buildLinks()}
				</Navbar>
			</header>
		)
	}
}
export default AppHeader
