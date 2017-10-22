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
				<Grid.Container>
					<Grid.Col md={5} className='ap-footer-area-logos'>
						<h3 className='ap-footer-title'>
							AuXpros
						</h3>
						<p className='ap-footer-text'>
							Nous sommes AuXpros, créateurs de la plateforme dédiée aux professionnels des services à la personne.
						</p>
						<a className='ap-footer-link'>Accueil</a>
						<a className='ap-footer-link'>Qui sommes-nous</a>
						<a className='ap-footer-link'>Nous contacter</a>
						<a className='ap-footer-logo ap-tweeter'/>
						<a className='ap-footer-logo ap-facebook'/>
						<a className='ap-footer-logo ap-youtube'/>
					</Grid.Col>
					<Grid.Col md={5} className='ap-footer-area-services'>
						<h3 className='ap-footer-title'>
							Nos services
						</h3>
						<p className='ap-footer-text'>
							L'outil d'AuXpros s'adresse aux Services d'Aide à la Personne, mais également aux intervenantes.
						</p>
						<a className='ap-footer-link'>Vous êtes un SAP</a>
						<a className='ap-footer-link'>Vous êtes une intervenante</a>
					</Grid.Col>
					<Grid.Col md={2} className='ap-footer-area-navigation'>
						<h3 className='ap-footer-title'>
							Navigation
						</h3>				
						<a className='ap-footer-link'>CGV / CGU</a>
						<a className='ap-footer-link'>Mentions légales</a>
						<a className='ap-footer-link'>S'informer (FAQ)</a>
						<a className='ap-footer-link'>Connexion</a>
					</Grid.Col>
				</Grid.Container>
			</footer>
		)
	}
}
export default AppFooter
