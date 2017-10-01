import React from 'react'
import './AppFooter.scss'

import AppHelper from 'helpers/AppHelper'

import { Grid } from 'ap-react-bootstrap'

class AppFooter extends React.Component {

	constructor(props) {
		super(props)

		this.onNavigateFacebook = this.onNavigateExternal.bind(this, 'https://www.facebook.com/Auxpros')
		this.onNavigateYoutube = this.onNavigateExternal.bind(this, 'https://www.youtube.com/channel/UC0E73ybLlgPiLQohO1UGEqA/featured')
		this.onNavigateTwitter = this.onNavigateExternal.bind(this, 'https://twitter.com/AuXpros')

		this.onNavigatePresentation = AppHelper.navigate.bind(AppHelper, '/infos/presentation')
		this.onNavigateServices = AppHelper.navigate.bind(AppHelper, '/infos/services')
		this.onNavigateCGU = AppHelper.navigate.bind(AppHelper, '/infos/cgu')
		this.onNavigateCGV = AppHelper.navigate.bind(AppHelper, '/infos/cgv')
		this.onNavigateConfidential = AppHelper.navigate.bind(AppHelper, '/infos/confidential')
		this.onNavigateFAQ = AppHelper.navigate.bind(AppHelper, '/infos/faq')
		this.onNavigateHelp = AppHelper.navigate.bind(AppHelper, '/infos/help')
		this.onNavigateContact = AppHelper.navigate.bind(AppHelper, '/infos/contact')
	}

	onNavigateExternal(url) {
		window.open(url, '_blank').focus()
	}

	render() {
		return (
			<footer className='hidden-print ap-app-footer'>
				<Grid.Row>
					<Grid.Col md={3} className='ap-footer-area-logos'>
						<div className='ap-footer-title'>Rejoignez notre comunauté</div>
						<div className='ap-footer-logos'>
							<span className='ap-footer-logo ap-facebook' onClick={this.onNavigateFacebook}/>
							<span className='ap-footer-logo ap-youtube' onClick={this.onNavigateYoutube}/>
							<span className='ap-footer-logo ap-tweeter' onClick={this.onNavigateTwitter}/>
						</div>
					</Grid.Col>
					<Grid.Col sm={4} md={3} className='ap-footer-area-links'>
						<Grid.Col lg={6} className='ap-footer-title'>
							AuxPros
						</Grid.Col>
						<Grid.Col lg={6} className='ap-footer-links'>
							<a className='ap-footer-link' onClick={this.onNavigatePresentation}>Qui sommes-nous ?</a>
							<a className='ap-footer-link' onClick={this.onNavigateServices}>Nos Services</a>
						</Grid.Col>
					</Grid.Col>
					<Grid.Col sm={4} md={3}  className='ap-footer-area-links'>
						<Grid.Col lg={6} className='ap-footer-title'>
							Informations Légales
						</Grid.Col>
						<Grid.Col lg={6} className='ap-footer-links'>
							<a className='ap-footer-link' onClick={this.onNavigateCGU}>CGU</a>
							<a className='ap-footer-link' onClick={this.onNavigateCGV}>CGV</a>
							<a className='ap-footer-link' onClick={this.onNavigateConfidential}>Confidentialité</a>
						</Grid.Col>
					</Grid.Col>
					<Grid.Col sm={4} md={3}  className='ap-footer-area-links'>
						<Grid.Col lg={6} className='ap-footer-title'>
							Questions
						</Grid.Col>
						<Grid.Col lg={6} className='ap-footer-links'>
							<a className='ap-footer-link' onClick={this.onNavigateFAQ}>FAQ</a>
							<a className='ap-footer-link' onClick={this.onNavigateHelp}>Aide</a>
							<a className='ap-footer-link' onClick={this.onNavigateContact}>Contact</a>
						</Grid.Col>
					</Grid.Col>
				</Grid.Row>
			</footer>
		)
	}
}
export default AppFooter
