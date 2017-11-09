import React from 'react'
import AppLandData from './AppLandData'
import './AppLand.scss'

import { Grid, Panel, Button } from 'ap-react-bootstrap'

import Link from 'components-lib/Link/Link'
import UserRoleTile from 'components-lib/UserRoleTile/UserRoleTile'

import FacebookPage from 'components-lib/Facebook/FacebookPage'
import TwitterTimeline from 'components-lib/Twitter/TwitterTimeline'
import YoutubeVideo from 'components-lib/Youtube/YoutubeVideo'

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
						<Grid.Row className='row-title'>
							<Grid.Col xs={12} className='column-title'>
								<h1>
									La plateforme des professionnels du SAP
								</h1>
							</Grid.Col>
						</Grid.Row>
						<Grid.Row className='row-buttons'>
							<Grid.Col sm={6} className='column-button1'>
								<Link className='ap-land-link ap-primary' href='/auth/register'>
									Essayer maintenant
								</Link>
							</Grid.Col>
							<Grid.Col sm={6} className='column-button2'>
								<Link className='ap-land-link ap-default' href='/infos/presentation'>
									En savoir plus
								</Link>
							</Grid.Col>
						</Grid.Row>
					</Grid.Container>
				</section>


				<section className='ap-app-land-section ap-app-discover'>
					<Grid.Container> 
						<Grid.Row>
							<Grid.Col sm={6} className='col-content'>
								<div>
									<h2>
										Découvrez AuXpros, votre futur outil de recrutement
									</h2>
									<h3>
										Un choix sur mesure adapté à chaque usager
									</h3>
									<p>
										AuXpros est le premier outil d'aide au recrutement sur le
										secteur de l'aide à la personne. Il offre la possibilité pour
										les organismes de recruter des intervenantes répondant
										à des critères précis d'organisation et de compétences.
									</p>
									<Link className='ap-land-link ap-primary' href='/infos/presentation'>
										Découvrir
									</Link>
								</div>
							</Grid.Col>
							<Grid.Col sm={6} className='col-image hidden-xs'>
								<div className='ap-app-discover-image' />
							</Grid.Col>
						</Grid.Row>
					</Grid.Container>
				</section>


				<section className='ap-app-land-section ap-app-video'>
					<Grid.Container>
						<Grid.Row>
							<Grid.Col sm={5} smPush={7} className='col-content'>
								<div className='ap-app-video-content'>
									<h2>
										Des offres d'emploi pour les auxiliaires de vie
									</h2>
									<h3>
										Organisez votre activité sur mesure
									</h3>
									<p>
										AuXpros vous permet de maîtriser l'organisation de votre travail au quotidien en fonction de vos contraintes.
										<br/>
										Ainsi les missions qui vous seront proposées seront en adéquation avec votre emploi du temps personnel.
									</p>
								</div>
							</Grid.Col>
							<Grid.Col sm={7} smPull={5} className='col-video'>
								<YoutubeVideo src='https://www.youtube.com/embed/79hXWPst6HE' />
							</Grid.Col>
						</Grid.Row>
					</Grid.Container>
				</section>

				<section className='ap-app-land-section ap-app-roles'>
					<Grid.Container>
						<Grid.Row>
							<Grid.Col sm={6}>
								<UserRoleTile 
									href='/infos/services/service'
									image='/assets/images/auxpro-land-image-sad.png'
									title='Vous êtes un SAP'
									text="Découvrez les avantages d'AuXpros" />
							</Grid.Col>
							<Grid.Col sm={6}>
								<UserRoleTile 
									href='/infos/services/auxiliary'
									image='/assets/images/auxpro-land-image-aux.png'
									title='Vous êtes un(e) intervenant(e)'
									text="Trouvez des offres d'emploi" />
							</Grid.Col>
						</Grid.Row>
					</Grid.Container>
				</section>

				<section className='ap-app-land-section ap-app-tool'>
					<Grid.Container>
						<Grid.Col sm={6}>
							<div className='ap-app-tool-content'>
								<h2 className='ap-title-h2'>
									Un outil indispensable pour les professionnels de l'aide à domicile
								</h2>
								<p className='ap-subtitle'>
									AuXpros au coeur des enjeux du secteur
								</p>
								<p className='ap-content'>
									Fort de 30 années d'expérience, nous constatons que l'une des principales difficultés pour les Services d'Aide à la Personne est de trouver des salariés compétents pour l'ensemble de ses clients.
								</p>
								<p className='ap-content'>
									La réelle problématique constatée dans la gestion quotidienne d'une structure de maintien à domicile est, pour le dirigeant, l'adéquation entre les contraintes des missions et les exigences de travail des intervenants.
								</p>
							</div>
						</Grid.Col>
						<Grid.Col sm={6}>
							<div className='ap-app-tool-image' />
						</Grid.Col>
					</Grid.Container>
				</section>

				<section className='ap-app-land-section ap-app-news'>
					<Grid.Container>
						<h1 className='ap-title-h1'>
							A LA UNE
						</h1>
						<Grid.Col sm={6}>
							<FacebookPage 
								name='AuXpros' 
								link='https://www.facebook.com/Auxpros/'
								width={450}
								height={850}
								tabs='timeline'
								smallHeader={true}
								adaptContainerWidth={true}
								hideCover={true}
								showFacepile={false} />
						</Grid.Col>
						<Grid.Col sm={6}>
							<TwitterTimeline
								lang='fr'
								width={450}
								height={845}
								theme='light'
								href='https://twitter.com/AuXpros?ref_src=twsrc%5Etfw'
								name='Tweets by AuXpros' />
						</Grid.Col>
					</Grid.Container>
				</section>

				<section className='ap-app-land-section ap-app-experience'>
					<div className='ap-app-experience-content'>
						<Grid.Container>
							<Grid.Col sm={12}>
								<div>
									<h2 className='ap-title-h2'>
										VENEZ TENTER<br/>L'EXPERIENCE AUXPROS !
									</h2>
									<p className='ap-subtitle'>
										Inscrivez-vous gratuitement
									</p>
									<p className='ap-content'>
										Créez votre profil en quelques minutes et laissez-vous<br/>guider jusqu'à votre première mission chez AuXpros.
									</p>
									<p className='ap-subtitle'>
										Et n'hésitez pas à nous rejoinre sur les réseaux sociaux !
									</p>
									<div className='ap-app-experience-links'>
										<Link className='ap-land-link ap-primary' href='/auth/login'>
											S'inscrire
										</Link>
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
											className='ap-app-experience-link ap-linkedin'
											target='_blank'
											title='Linkedin'
											href='https://www.linkedin.com/company/11210733/' />
										<a 
											className='ap-app-experience-link ap-youtube'
											target='_blank'
											title='Youtube'
											href='https://www.youtube.com/channel/UC0E73ybLlgPiLQohO1UGEqA/featured' />
										
									</div>
								</div>
							</Grid.Col>
						</Grid.Container>
					</div>
				</section>
			</div>
		)
	}

}
export default AppLand
