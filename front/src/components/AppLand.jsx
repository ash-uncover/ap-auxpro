import React from 'react'
import AppLandData from './AppLandData'
import './AppLand.scss'

import { Grid, Panel, Button } from 'ap-react-bootstrap'

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

				<section className='ap-app-land-section ap-app-platform'>
					<Grid.Container>
						<Grid.Col xs={12}>
							<h1 className='bigtitle'>
								La plateforme des professionnels du SAP
							</h1>
							<Button bsStyle='primary'>ESSSAYER MAINTENANT</Button>
							<Button bsStyle='default'>EN SAVOIR PLUS</Button>
						</Grid.Col>
					</Grid.Container>
				</section>

				<section className='ap-app-land-section ap-app-discover'>
					<Grid.Container>
						<Grid.Col sm={6}>
							<div className='ap-app-discover-content'>
								<h2 className='title'>
									Découvrez AuXpros, votre futur<br/>
									outil de recrutement
								</h2>
								<p className='subtitle'>
									Un choix sur mesure adapté à chaque usager
								</p>
								<p className='content'>
									AuXpros est le premier outil d'aide au recrutement sur le<br/>
									secteur de l'aide à la personne. Il offre la possibilité pour<br/>
									les organismes de recruter des intervenantes répondant<br/>
									à des critères précis d'organisation et de compétences.
								</p>
								<Button bsStyle='primary'>Découvrir</Button>
							</div>
						</Grid.Col>
						<Grid.Col sm={6}>
							<img src='/assets/images/auxpro-land-image1.jpg'></img>
						</Grid.Col>
					</Grid.Container>
				</section>

				<section className='ap-app-land-section ap-app-video'>
					<Grid.Container>
						<Grid.Col sm={7}>
							<iframe 
								width='550'
								height='315'
								src='https://www.youtube.com/embed/79hXWPst6HE'>
							</iframe>
						</Grid.Col>
						<Grid.Col sm={5}>
							<div className='ap-app-video-content'>
								<h2 className='title'>
									Des offres d'emploi pour<br/>
									les auxiliaires de vie
								</h2>
								<p className='subtitle'>
									Organisez votre activité sur mesure
								</p>
								<p className='content'>
									AuXpros vous permet de maîtriser l'organisation de<br/>
									votre travail au quoptidien en fonction de vos contraintes.<br/>
									Ainsi les missions qui vous seront proposées seront en<br/>
									adéquation avec votre emploi du temps personnel.
								</p>
							</div>
						</Grid.Col>
					</Grid.Container>
				</section>

				<section className='ap-app-land-section ap-app-roles'>
					<Grid.Container>
						<Grid.Col sm={6}>
							<div className='ap-app-roles-tile'>
								<img 
									className='ap-app-roles-image'
									src='/assets/images/auxpro-land-image-sad.jpg'></img>
								<div className='ap-app-roles-content'>
									<p className='ap-app-roles-title'>
										Vous êtes un SAP
									</p>
									<div className='ap-app-roles-separator'/>
									<p className='ap-app-roles-text'>
										Découvrez les avantages d'AuXpros
									</p>
								</div>
							</div>
						</Grid.Col>
						<Grid.Col sm={6}>
							<div className='ap-app-roles-tile'>
								<img 
									className='ap-app-roles-image'
									src='/assets/images/auxpro-land-image-aux.jpg'></img>
								<div className='ap-app-roles-content'>
									<p className='ap-app-roles-title'>
										Vous êtes un(e) intervenant(e)
									</p>
									<div className='ap-app-roles-separator'/>
									<p className='ap-app-roles-text'>
										Trouvez des offres d'emploi
									</p>
								</div>
							</div>
						</Grid.Col>
					</Grid.Container>
				</section>

				<section className='ap-app-land-section ap-app-tool'>
					<Grid.Container>
						<Grid.Col sm={6}>
							<h2>Un outil indispensable pour les professionnels de l'aide à domicile</h2>
							<p><b>AuXpros au coeur des enjeux du secteur</b></p>
							<p>
								Fort de 30 années d'expérience, nous constatons que l'une des principales difficultés pour les Services d'Aide à la Personne est de trouver des salariés compétents pour l'ensemble de ses clients.
							</p>
							<p>
								La réelle problématique constatée dans la gestion quotidienne d'une structure de maintien à domicile est, pour le dirigeant, l'adéquation entre les contraintes des missions et les exigences de travail des intervenants.
							</p>
						</Grid.Col>
						<Grid.Col sm={6}>
							<img src='/assets/images/auxpro-land-image2.png'></img>
						</Grid.Col>
					</Grid.Container>
				</section>

				<section className='ap-app-land-section ap-app-news'>
					<Grid.Container>
						<h1>A LA UNE</h1>
						<Grid.Col sm={6}>
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
						</Grid.Col>
						<Grid.Col sm={6}>
							<TwitterTimeline
								lang='fr'
								width={350}
								height={494}
								theme='light'
								href='https://twitter.com/AuXpros?ref_src=twsrc%5Etfw'
								name='Tweets by AuXpros' />
						</Grid.Col>
					</Grid.Container>
				</section>

				<section className='ap-app-land-section ap-app-experience'>
					<Grid.Container>
						<Grid.Col xs={12} className='ap-app-experience-content'>
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
						</Grid.Col>
					</Grid.Container>
				</section>
			</div>
		)
	}

}
export default AppLand
