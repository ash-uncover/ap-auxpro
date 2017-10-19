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

	_buildLink(text, link, disabled, className) { 
		return (
			<Navbar.Link 
				className={className}
				text={text} 
				link={link} 
				onNavigate={AppHelper.navigate} 
				disabled={disabled}
				active={(AppHelper.getData('/path') || '').startsWith(link)} />
		)
	}

	_buildLinks() { 
		switch (this.state.authType) {
			case 'auxiliary': 
				return (
					<Navbar.Group right className='collapse navbar-collapse' id='myNavbar'>
						{this._buildLink('Accueil','/auxiliary/home', this.state.tutoMode || this.state.profilMode)}
						{this._buildLink('Profil','/auxiliary/infos', this.state.tutoMode || this.state.profilMode)}
						{this._buildLink('Planing','/auxiliary/planing', this.state.tutoMode || this.state.profilMode)}
						{this._buildLink('Zone','/auxiliary/zone', this.state.tutoMode || this.state.profilMode)}
						{this._buildLink('Offres','/auxiliary/offers', this.state.tutoMode || this.state.profilMode)}
						{this._buildLink('Déconnexion','/logout')}
					</Navbar.Group>
				)
			case 'service': 
				return (
					<Navbar.Group right className='collapse navbar-collapse' id='myNavbar'>
						{this._buildLink('Accueil','/service/home', this.state.tutoMode || this.state.profilMode)}
						{this._buildLink('Profil','/service/infos', this.state.tutoMode || this.state.profilMode)}
						{this._buildLink('Zone','/service/zone', this.state.tutoMode || this.state.profilMode)}
						{this._buildLink('Usagers','/service/customers', this.state.tutoMode || this.state.profilMode)}
						{this._buildLink('Interventions','/service/interventions', this.state.tutoMode || this.state.profilMode)}
						{this._buildLink('Déconnexion','/logout')}
					</Navbar.Group>
				)
			default: 
				return (
					<Navbar.Group right className='collapse navbar-collapse' id='myNavbar'>
						{this._buildLink('Accueil','/home')}
						{this._buildLink('Qui sommes-nous','/infos/presentation')}
						{this._buildLink('Nos services','/infos/services')}
						{this._buildLink('Connexion','/auth/login', false, 'navbar-btn-default')}
						{this._buildLink("S'inscrire",'/auth/register', false, 'navbar-btn-primary')}
					</Navbar.Group>
				)
		}
	}

	render() {
		return (
			<header className='hidden-print ap-app-header'>
				<Navbar staticTop>
					<Navbar.Header 
						target='#myNavbar'
						brandText='AuXpros'
						brandImage='/assets/images/auxpro-logo.png'
						brandLink='/'
						onNavigate={AppHelper.navigate} />
					{this._buildLinks()}
				</Navbar>
			</header>
		)
	}
}
export default AppHeader
