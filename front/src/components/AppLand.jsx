import React from 'react'
import AppLandData from './AppLandData'
import './AppLand.scss'

import { Row, Col, Panel, Button } from 'ap-react-bootstrap'

import FacebookPage from 'components-lib/Facebook/FacebookPage'
import TwitterTimeline from 'components-lib/Twitter/TwitterTimeline'

class AppLand extends React.Component {

	constructor(props) {
		super(props)
	}

	componentWillMount() {
		AppLandData.register(this)
	}

	componentWillUnmount() {
		AppLandData.unregister()
	}

	render() {
		return (
			<div className='ap-app-land'>

				<Row className='ap-app-platform'>
					<Col xs={12}>
						<h1>La plateforme des professionnels du SAP</h1>
						<Button bsStyle='primary'>ESSSAYER MAINTENANT</Button>
						<Button bsStyle='default'>EN SAVOIR PLUS</Button>
					</Col>
				</Row>

				<Row className='ap-app-discover'>
					<Col sm={6}>
						<h2>Découvrez AuXpros, votre futur outil de recrutement</h2>
						<p><b>Un choix sur mesure adapté à chaque usager</b></p>
						<p>
							AuXpros est le premier outil d'aide au recrutement sur le secteur de l'aide à la personne. 
							Il offre la possibilité pour les organismes de recruter des intervenantes répondant à des critères précis d'organisation et de compétences.
						</p>
						<Button bsStyle='primary'>Découvrir</Button>
					</Col>
					<Col sm={6}>
						<img src='/assets/images/auxpro-land-image1.jpg' width="100%"></img>
					</Col>
				</Row>

				<Row className='ap-app-video'>
					<Col sm={8}>
						<iframe 
							width='550'
							height='315'
							src='https://www.youtube.com/embed/79hXWPst6HE'>
						</iframe>
					</Col>
					<Col sm={4}>
						<h2>Des offres d'emploi pour les auxiliaires de vie</h2>
						<p><b>Organisez votre activité sur mesure</b></p>
						<p>
							AuXpros vous permet de maîtriser l'organisation de votre travail au quoptidien en fonction de vos contraintes.
							Ainsi les missions qui vous seront proposées seront en adéquation avec votre emploi du temps personnel.
						</p>
					</Col>
				</Row>

				<Row className='ap-app-roles'>
					<Col sm={6}>
						<p>Vous êtes un SAP</p>
						<p>Découvrez les avantages d'AuXpros</p>
					</Col>
					<Col sm={6}>
						<p>Vous êtes un(e) intervenant(e)</p>
						<p>Trouvez des offres d'emploi</p>
					</Col>
				</Row>

				<Row className='ap-app-tool'>
					<Col sm={6}>
						<h2>Un outil indispensable pour les professionnels de l'aide à domicile</h2>
						<p><b>AuXpros au coeur des enjeux du secteur</b></p>
						<p>
							Fort de 30 années d'expérience, nous constatons que l'une des principales difficultés pour les Services d'Aide à la Personne est de trouver des salariés compétents pour l'ensemble de ses clients.
						</p>
						<p>
							La réelle problématique constatée dans la gestion quotidienne d'une structure de maintien à domicile est, pour le dirigeant, l'adéquation entre les contraintes des missions et les exigences de travail des intervenants.
						</p>
					</Col>
					<Col sm={6}>
						<img src='/assets/images/auxpro-land-image2.png'></img>
					</Col>
				</Row>

				<Row className='ap-app-news'>
					<h1>A LA UNE</h1>
					<Col sm={6}>
						<FacebookPage 
							name='AuXpros' 
							link='https://www.facebook.com/Auxpros/'
							width={350}
							height={500}
							tabs='timeline'
							smallHeader={true}
							adaptContainerWidth={true}
							hideCover={true}
							showFacepile={false} />
					</Col>
					<Col sm={6}>
						<TwitterTimeline
							lang='fr'
							width={350}
							height={494}
							theme='light'
							href='https://twitter.com/AuXpros?ref_src=twsrc%5Etfw'
							name='Tweets by AuXpros' />
					</Col>
				</Row>

				<Row className='ap-app-experience'>
					<Col xs={12} className='ap-app-experience-content'>
						<div>
							<h1>VENEZ TENTER<br/>L'EXPERIENCE AUXPROS !</h1>
							<p><b>Inscrivez-vous gratuitement</b></p>
							<p className='ap-app-experience-grayed'>Créez votre profil en quelques minutes et laissez-vous<br/>guider jusqu'à votre première mission chez AuXpros.</p>
							<p><b>Et n'hésitez pas à nous rejoinre sur les réseaux sociaux !</b></p>
							<div className='ap-app-experience-links'>
								<Button 
									bsStyle='primary'>
									S'inscrire
								</Button>
								<a 
									className='ap-app-experience-link ap-twitter'
									target='_blank'
									title='Twitter'
									href='https://twitter.com/AuXpros' />
								<a 
									className='ap-app-experience-link ap-facebook'
									target='_blank'
									title='Facebook'
									href='https://www.facebook.com/Auxpros' />
								<a 
									className='ap-app-experience-link ap-youtube'
									target='_blank'
									title='Youtube'
									href='https://www.youtube.com/channel/UC0E73ybLlgPiLQohO1UGEqA/featured' />
								
							</div>

						</div>
					</Col>
				</Row>
			</div>
		)
	}

}
export default AppLand
