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
            <Navbar.Header brandText='AuXpros' brandLink="/" onNavigate={AppHelper.navigate}/>
                <Navbar.Group right>
                    <Navbar.Link text='Connexion' link='/auth/login' onNavigate={AppHelper.navigate}/>
                    <Navbar.Link text="S'inscrire"  link='/auth/register' onNavigate={AppHelper.navigate}/>
                </Navbar.Group>
            </Navbar>
        </header>
    )}

    _buildHeaderAuxiliary() { return (
        <header className='hidden-print ap-app-header'>
            <Navbar fixedTop>
            <Navbar.Header brandText='AuXpros' brandLink="/" onNavigate={AppHelper.navigate}/>
                <Navbar.Group right>
                    <Navbar.Link text='Déconnexion' link='/logout' onNavigate={AppHelper.navigate}/>
                </Navbar.Group>
            </Navbar>
        </header>
    )}

    _buildHeaderService() {return (
        <header className='hidden-print ap-app-header'>
            <Navbar fixedTop>
            <Navbar.Header brandText='AuXpros' brandLink="/" onNavigate={AppHelper.navigate}/>
                <Navbar.Group right>
                    <Navbar.Link text='Déconnexion' link='/logout' onNavigate={AppHelper.navigate}/>
                </Navbar.Group>
            </Navbar>
        </header>
    )}

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
