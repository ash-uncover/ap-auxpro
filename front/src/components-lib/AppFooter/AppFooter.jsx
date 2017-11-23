import React from 'react'
import './AppFooter.scss'

import AppHelper from 'helpers/AppHelper'

import { Grid } from 'ap-react-bootstrap'

import Link from 'components-lib/Link/Link'

class AppFooter extends React.Component {

	constructor(props) {
		super(props)
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
						<Link href='/'>Accueil</Link>
						<Link href='/infos/presentation'>Qui sommes-nous</Link>
						<Link href='/infos/contact'>Nous contacter</Link>
						<a className='ap-footer-logo ap-twitter' href='https://twitter.com/AuXpros' target="_blank"/>
						<a className='ap-footer-logo ap-facebook' href='https://www.facebook.com/Auxpros' target="_blank"/>
						<a className='ap-footer-logo ap-linkedin' href='https://www.linkedin.com/company/11210733/' target="_blank"/>
						<a className='ap-footer-logo ap-youtube' href='https://www.youtube.com/channel/UC0E73ybLlgPiLQohO1UGEqA/featured' target="_blank"/>
					</Grid.Col>
					<Grid.Col md={5} className='ap-footer-area-services'>
						<h3 className='ap-footer-title'>
							Nos services
						</h3>
						<p className='ap-footer-text'>
							L'outil d'AuXpros s'adresse aux Services d'Aide à la Personne, mais également aux intervenantes.
						</p>
						<Link href='/infos/services/service'>Vous êtes un SAP</Link>
						<Link href='/infos/services/auxiliary'>Vous êtes un(e) intervenant(e)</Link>
					</Grid.Col>
					<Grid.Col md={2} className='ap-footer-area-navigation'>
						<h3 className='ap-footer-title'>
							Navigation
						</h3>
						<Link href='/infos/cgu'>CGV / CGU</Link>
						<Link href='/infos/cgu'>Mentions légales</Link>
						<Link href='/infos/faq'>S'informer (FAQ)</Link>
						<Link href='/auth/login'>Connexion</Link>
					</Grid.Col>
				</Grid.Container>
			</footer>
		)
	}
}
export default AppFooter
