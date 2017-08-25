import React from 'react'
import AppData from 'components/AppData'
import './App.scss'

import AppHelper from 'helpers/AppHelper'

import { Grid, Navbar, Button, Row, Col } from 'ap-react-bootstrap'

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

    _buildHeaderNoAuth() { return (
        <header className='hidden-print ap-app-header'>
            <Navbar fixedTop>
            <Navbar.Header brandText='AuXpros' brandLink="/home" onNavigate={AppHelper.navigate}/>
                <Navbar.Group right>
                    {this.__buildLink('Connexion','/auth/login')}
                    {this.__buildLink("S'inscrire",'/auth/register')}
                </Navbar.Group>
            </Navbar>
        </header>
    )}

    _buildHeaderAuxiliary() { return (
        <header className='hidden-print ap-app-header'>
            <Navbar fixedTop>
            <Navbar.Header brandText='AuXpros' brandLink="/home" onNavigate={AppHelper.navigate}/>
                <Navbar.Group right>
                    {this.__buildLink('Accueil','/auxiliary/home')}
                    {this.__buildLink('Profil','/auxiliary/infos')}
                    {this.__buildLink('Planing','/auxiliary/planing')}
                    {this.__buildLink('Zone','/auxiliary/zone')}
                    {this.__buildLink('Offres','/auxiliary/offers')}
                    {this.__buildLink('Déconnexion','/logout')}
                </Navbar.Group>
            </Navbar>
        </header>
    )}

    _buildHeaderService() {return (
        <header className='hidden-print ap-app-header'>
            <Navbar fixedTop>
            <Navbar.Header brandText='AuXpros' brandLink="/home" onNavigate={AppHelper.navigate}/>
                <Navbar.Group right>
                    {this.__buildLink('Accueil','/service/home')}
                    {this.__buildLink('Profil','/service/infos')}
                    {this.__buildLink('Zone','/service/zone')}
                    {this.__buildLink('Usagers','/service/customers')}
                    {this.__buildLink('Interventions','/service/interventions')}
                    {this.__buildLink('Déconnexion','/logout')}
                </Navbar.Group>
            </Navbar>
        </header>
    )}

    __buildLink(text, link) {
        return (<Navbar.Link text={text} link={link} onNavigate={AppHelper.navigate}/>)
    }

	render() {
		return (
			<div className='ap-app'>
				
				{ this.state.authType === 'auxiliary' ? this._buildHeaderAuxiliary() : null }
                { this.state.authType === 'service' ? this._buildHeaderService() : null }
                { this.state.authType === null ? this._buildHeaderNoAuth() : null }

				<Grid.Container className='ap-app-main-content'>
					{this.props.children}
				</Grid.Container>

				<footer className='hidden-print ap-app-footer'>
					<Row>
                        <Col md={3} className='ap-footer-area-logos'>
                            <div className='ap-footer-title'>Rejoignez notre comunauté</div>
                            <div className='ap-footer-logos'>
        						<span className='ap-footer-logo ap-facebook' onClick={this.onNavigateFacebook}/>
        						<span className='ap-footer-logo ap-youtube' onClick={this.onNavigateYoutube}/>
                                <span className='ap-footer-logo ap-tweeter' onClick={this.onNavigateTwitter}/>
                            </div>
    					</Col>
                        <Col sm={4} md={3} className='ap-footer-area-links'>
                            <Col lg={6} className='ap-footer-title'>
                                AuxPros
                            </Col>
                            <Col lg={6} className='ap-footer-links'>
                                <a className='ap-footer-link' onClick={this.onNavigatePresentation}>Qui sommes-nous ?</a>
                                <a className='ap-footer-link' onClick={this.onNavigateServices}>Nos Services</a>
                            </Col>
                        </Col>
                        <Col sm={4} md={3}  className='ap-footer-area-links'>
                            <Col lg={6} className='ap-footer-title'>
                                Informations Légales
                            </Col>
                            <Col lg={6} className='ap-footer-links'>
                                <a className='ap-footer-link' onClick={this.onNavigateCGU}>CGU</a>
                                <a className='ap-footer-link' onClick={this.onNavigateCGV}>CGV</a>
                                <a className='ap-footer-link' onClick={this.onNavigateConfidential}>Confidentialité</a>
                            </Col>
                        </Col>
                        <Col sm={4} md={3}  className='ap-footer-area-links'>
                            <Col lg={6} className='ap-footer-title'>
                                Questions
                            </Col>
                            <Col lg={6} className='ap-footer-links'>
                                <a className='ap-footer-link' onClick={this.onNavigateFAQ}>FAQ</a>
                                <a className='ap-footer-link' onClick={this.onNavigateHelp}>Aide</a>
                                <a className='ap-footer-link' onClick={this.onNavigateContact}>Contact</a>
                            </Col>
                        </Col>
                    </Row>
				</footer>

			</div>
		)
	}
}
App.contextTypes = {
	router: React.PropTypes.object
}
export default App
