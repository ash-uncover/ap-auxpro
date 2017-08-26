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
                active={(AuthHelper.getType() || '') === type} />
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

	render() {
		switch (this.state.authType) {
			case 'auxiliary': return this.renderAuxiliary()
			case 'service': return this.renderService()
			default: return this.renderDefault()
		}
	}

	renderDefault() {
		return (
            <header className='hidden-print ap-app-header'>
                <Navbar fixedTop>
                	<Navbar.Header brandText='AuXpros' brandLink="/home" onNavigate={AppHelper.navigate}/>
                    <Navbar.Group>
                        {this._buildText('AUX','auxiliary')}
                        {this._buildText('SAD','service')}
                    </Navbar.Group>
                    <Navbar.Group right>
                        {this._buildLink('Connexion','/auth/login')}
                        {this._buildLink("S'inscrire",'/auth/register')}
                    </Navbar.Group>
                </Navbar>
            </header>
        )
	}

	renderAuxiliary() {
		return (
            <header className='hidden-print ap-app-header'>
                <Navbar fixedTop>
               		<Navbar.Header brandText='AuXpros' brandLink="/home" onNavigate={AppHelper.navigate}/>
                    <Navbar.Group>
                        {this._buildText('AUX','auxiliary')}
                        {this._buildText('SAD','service')}
                    </Navbar.Group>
                    <Navbar.Group right>
                        {this._buildLink('Accueil','/auxiliary/home')}
                        {this._buildLink('Profil','/auxiliary/infos')}
                        {this._buildLink('Planing','/auxiliary/planing')}
                        {this._buildLink('Zone','/auxiliary/zone')}
                        {this._buildLink('Offres','/auxiliary/offers')}
                        {this._buildLink('Déconnexion','/logout')}
                    </Navbar.Group>
                </Navbar>
            </header>
        )
	}

	renderService() {
		return (
            <header className='hidden-print ap-app-header'>
                <Navbar fixedTop>
                	<Navbar.Header brandText='AuXpros' brandLink="/home" onNavigate={AppHelper.navigate}/>
                    <Navbar.Group>
                        {this._buildText('AUX','auxiliary')}
                        {this._buildText('SAD','service')}
                    </Navbar.Group>
                    <Navbar.Group right>
                        {this._buildLink('Accueil','/service/home')}
                        {this._buildLink('Profil','/service/infos')}
                        {this._buildLink('Zone','/service/zone')}
                        {this._buildLink('Usagers','/service/customers')}
                        {this._buildLink('Interventions','/service/interventions')}
                        {this._buildLink('Déconnexion','/logout')}
                    </Navbar.Group>
                </Navbar>
            </header>
        )
	}

}
export default AppHeader
