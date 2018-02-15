import React from 'react'
import AppHeaderData from 'components-lib/AppHeader/AppHeaderData'
import './AppHeader.scss'

import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'

import { Navbar } from 'ap-react-bootstrap'

class AppHeader extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			authType: null,
			tutoMode: true,
			profilMode: true
		}
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
					<Navbar.Group right className='collapse navbar-collapse ap-auxpro-header-auxiliary' id='myNavbar'>
						{this._buildLink('AuXpros','/auxiliary/home', this.state.tutoMode || this.state.profilMode, 'ap-app-header-aux-home')}
						{this._buildLink('Profil','/auxiliary/infos', this.state.tutoMode || this.state.profilMode, 'ap-app-header-aux-infos')}
						{this._buildLink('Planning','/auxiliary/planing', this.state.tutoMode || this.state.profilMode, 'ap-app-header-aux-planing')}
						{this._buildLink('Zone','/auxiliary/zone', this.state.tutoMode || this.state.profilMode, 'ap-app-header-aux-zone')}
						{this._buildLink('Missions','/auxiliary/offers', this.state.tutoMode || this.state.profilMode, 'ap-app-header-aux-offers')}
						{this._buildLink('Déconnexion','/logout', false, 'ap-app-header-logout')}
					</Navbar.Group>
				)
			case 'service': 
				return (
					<Navbar.Group right className='collapse navbar-collapse ap-auxpro-header-service' id='myNavbar'>
						{this._buildLink('AuXpros','/service/home', this.state.tutoMode || this.state.profilMode, 'ap-app-header-sad-home')}
						{this._buildLink('Profil','/service/infos', this.state.tutoMode || this.state.profilMode, 'ap-app-header-sad-infos')}
						{this._buildLink('Zone','/service/zone', this.state.tutoMode || this.state.profilMode, 'ap-app-header-sad-zone')}
						{this._buildLink('Usagers','/service/customers', this.state.tutoMode || this.state.profilMode, 'ap-app-header-sad-customers')}
						{this._buildLink('Interventions','/service/interventions', this.state.tutoMode || this.state.profilMode, 'ap-app-header-sad-interventions')}
						{this._buildLink('Déconnexion','/logout', false, 'ap-app-header-logout')}
					</Navbar.Group>
				)
			default: 
				return (
					<Navbar.Group right className='collapse navbar-collapse ap-auxpro-header-default' id='myNavbar'>
						{this._buildLink('AuXpros','/home', false, 'ap-app-header-default-home')}
						{this._buildLink('Qui sommes-nous','/infos/presentation', false, 'ap-app-header-default-presentation')}
						{this._buildLink('Nos services','/infos/services', false, 'ap-app-header-default-service')}
						{this._buildLink('Connexion','/auth/login', false, 'navbar-btn-default ap-app-header-default-login')}
						{this._buildLink("S'inscrire",'/auth/register', false, 'navbar-btn-primary ap-app-header-default-register')}
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
