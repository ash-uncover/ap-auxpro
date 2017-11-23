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
							<Grid.Col sm={6} smOffset={3} mdOffset={0} className='col-content'>
								<div>
									<h2>
										Découvrez AuXpros, votre outil de recrutement
									</h2>
									<h3>
										Un choix sur mesure adapté à chaque usager
									</h3>
									<p>
										AuXpros est le premier outil d'aide au recrutement sur le
										secteur de l'aide à la personne. Il offre la possibilité pour
										les organismes de recruter des intervenant(e)s répondant
										à des critères précis d'organisation et de compétences.
									</p>
									<Link className='ap-land-link ap-primary' href='/infos/presentation'>
										Découvrir
									</Link>
								</div>
							</Grid.Col>
							<Grid.Col md={6} className='col-image hidden-xs hidden-sm'>
								<img src='/assets/images/auxpro-land-image1.png' />
							</Grid.Col>
						</Grid.Row>
					</Grid.Container>
				</section>


				<section className='ap-app-land-section ap-app-video'>
					<Grid.Container>
						<Grid.Row>
							<Grid.Col sm={6} smOffset={3} md={5} mdPush={7} mdOffset={0} className='col-content'>
								<div className='ap-app-video-content'>
									<h2>
										Des offres d'emploi pour les intervenant(e)s à domicile
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
							<Grid.Col md={7} mdPull={5} className='col-video'>
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
						<Grid.Col sm={6} className='col-content'>
							<div>
								<h2>Un outil indispensable pour les professionnels de l'aide à domicile</h2>
								<h3>AuXpros au coeur des enjeux du secteur</h3>
								<p>Fort de 30 années d'expérience, nous constatons que la principale difficulté pour les services d'aide à la personne est de proposer à leurs usagers des intervenant(e)s correspondant à leurs besoins</p>
								<p><i>"L'essor du secteur économique des services à la personne est conditionné par la reconnaissance effective d'emplois durables et professionnalisés. Les savoir-faire spécifiques au secteur doivent être valorisés afin de renforcer la motivation des salariés et d'assurer la construction d'une identité professionnelle."</i><br/>Convention collective nationale des services d'aide à la personne</p>
							</div>
						</Grid.Col>
						<Grid.Col sm={6} className='col-image hidden-xs'>
							<img src='/assets/images/auxpro-land-image2.png' />
						</Grid.Col>
					</Grid.Container>
				</section>

				<section className='ap-app-land-section ap-app-news hidden-xs'>
					<Grid.Container>
						<h1 className='ap-title-h1'>
							A LA UNE
						</h1>
						<Grid.Col sm={6}>
							<FacebookPage 
								name='AuXpros' 
								href='https://www.facebook.com/Auxpros/'
								width={500}
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
								width={500}
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
							<Grid.Row>
								<Grid.Col sm={6} smOffset={3} md={7} mdOffset={1} lg={6}>
									<h2>Venez tenter<br/>l'expérience AuXpros !</h2>
									<h3>Inscrivez-vous gratuitement</h3>
									<p>Créez votre profil en quelques minutes et laissez-vous guider jusqu'à votre première mission chez AuXpros.</p>
									<Link className='ap-land-link ap-primary visible-xs visible-sm' href='/auth/register'>
										S'inscrire
									</Link>
									<h3>Et n'hésitez pas à nous rejoinre sur les réseaux sociaux !</h3>
									<Link className='ap-land-link ap-primary hidden-xs hidden-sm' href='/auth/register'>
										S'inscrire
									</Link>
									<div className='ap-social-links'>
										<a title='Twitter' href='https://twitter.com/AuXpros' target='_blank'>
											<img src='/assets/images/social/social-twitter-square.svg' />
										</a>
										<a title='Facebook' href='https://www.facebook.com/Auxpros' target='_blank'>
											<img src='/assets/images/social/social-facebook-square.svg' />
										</a>
										<a title='Linkedin' href='https://www.linkedin.com/company/11210733/' target='_blank'>
											<img src='/assets/images/social/social-linkedin-square.svg' />
										</a>
										<a title='Youtube' href='https://www.youtube.com/channel/UC0E73ybLlgPiLQohO1UGEqA/featured' target='_blank' className='ap-link-youtube'>
											<img src='/assets/images/social/social-youtube.svg' />
										</a>
									</div>
								</Grid.Col>
							</Grid.Row>
						</Grid.Container>
					</div>
				</section>
			</div>
		)
	}

}
export default AppLand
