import React from 'react'
import ConfidentialData from './ConfidentialData'
import './Confidential.scss'
import { Panel, Grid } from 'ap-react-bootstrap'

class Confidential extends React.Component {

	constructor(props) {
		super(props)
	}

	componentWillMount() {
		ConfidentialData.register(this)
	}

	componentWillUnmount() {
		ConfidentialData.unregister()
	}

	render() {
		return (
			<Grid.Container>
				<Panel className='ap-confidential'>
					<Panel.Header>
						<h2>Confidentialité</h2>
					</Panel.Header>
					<Panel.Body>				
						<ol type='1'>
							<h3><li>Collecte de l’information</li></h3>
							<p>Lorsque vous vous inscrivez sur AUXPROS, nous recueillons des informations. Ces informations recueillies incluent votre nom, adresse e-mail, numéro de téléphone, adresse. Les infos demandées de votre DNR sont incomplètes (7 chiffres) et permettent de vérifier la cohérence de vos données recueillies.</p>
							<p>En outre, nous recevons et enregistrons automatiquement des informations à partir de votre ordinateur et navigateur, y compris votre adresse IP, vos logiciels et votre matériel, et la page que vous demandez.</p>

							<h3><li>Utilisation des informations</li></h3>
							<p>Toute les informations que nous recueillons auprès de vous peuvent être utilisées pour :</p>
							<ul>
								<li>Personnaliser votre expérience et répondre à vos besoins individuels</li>
								<li>Fournir un contenu publicitaire personnalisé</li>
								<li>Améliorer notre site Web</li>
								<li>Améliorer le service client et vos besoins de prise en charge</li>
								<li>Vous contacter par e-mail </li>
							</ul>

							<h3><li>Confidentialité du commerce en ligne</li></h3>
							<p>Nous sommes les seuls propriétaires des informations recueillies sur AUXPROS. Vos informations personnelles ne seront ni vendues, ni échangées, ni transférées, ou données à une autre société pour n’importe quelle raison, sans votre consentement, en dehors de ce qui est nécessaire pour répondre à une demande de matching lors d’une offre d’intervention.</p>

							<h3><li>Divulgation à des tiers</li></h3>
							<p>Nous ne vendons, n’échangeons et ne transférons pas vos informations personnelles identifiables à des tiers. Cela ne comprend pas les tierces parties de confiance qui nous aident à exploiter notre site Web ou à mener nos affaires, tant que ces parties conviennent de garder ces informations confidentielles.</p>
							<p>Nous pensons qu’il est nécessaire de partager des informations afin d’enquêter, de prévenir ou de prendre des mesures concernant des activités illégales, fraudes présumées, situations impliquant des menaces potentielles à la sécurité physique de toute personne, violations de nos conditions d’utilisation, ou quand la loi nous y contraint.</p>
							<p>Les informations non-privées, cependant, peuvent être fournies à d’autres parties pour le marketing, la publicité, ou d’autres utilisations.</p>

							<h3><li>Protection des informations</li></h3>
							<p>Nous mettons en œuvre une variété de mesures de sécurité pour préserver la sécurité de vos informations personnelles. Nous utilisons un cryptage SSL pour protéger les informations sensibles transmises en ligne. Nous protégeons également vos informations hors ligne. Seuls les employés qui ont besoin d’effectuer un travail spécifique (par exemple, la facturation ou le service à la clientèle) ont accès aux informations personnelles identifiables. Les ordinateurs et serveurs utilisés pour stocker des informations personnelles identifiables sont conservés dans un environnement sécurisé.</p>
							<p>Est-ce que nous utilisons des cookies ?</p>
							<p>Oui. Nos cookies améliorent l’accès à notre site et identifient les visiteurs réguliers. En outre, nos cookies améliorent l’expérience d’utilisateur grâce au suivi et au ciblage de ses intérêts. Cependant, cette utilisation des cookies n’est en aucune façon liée à des informations personnelles identifiables sur notre site. </p>

							<h3><li>Se désabonner</li></h3>
							<p>Nous utilisons l’adresse e-mail que vous fournissez pour vous envoyer des informations et des offres, des nouvelles d’AUXPROS de façon occasionnelle, des informations sur des produits liés, etc. Si à n’importe quel moment vous souhaitez vous désinscrire et ne plus recevoir d’e-mails, des instructions de désabonnement détaillées sont incluses en bas de chaque e-mail.</p>
							<p>Conformément à la loi n°78-17 du 6 janvier 1978 (dite loi informatique et libertés), le Site fait l’objet d’une déclaration auprès de la Commission Nationale de l’Informatique et des Libertés sous la référence xxxxxxx.</p>
							<p>Tout utilisateur dispose d’un droit d’accès aux données le concernant auprès de l’Éditeur (voir CGV) en vue le cas échéant de faire valoir toute demande de rectification, d’opposition ou de suppression.</p>

							<h3><li>Cookies</li></h3>
							<p>Ce site peut faire appel à des régies de publicité tierces, telles que Google AdSense, pour assurer la diffusion d’annonces sur son média. Ces entreprises peuvent utiliser les données relatives à votre navigation sur le site Web ou d’autres sites (à l’exception de votre nom, adresse postale, adresse e-mail ou numéro de téléphone) afin de vous proposer des annonces de produits ou services adaptées à vos centres d’intérêt. Pour en savoir plus sur cette pratique ou sur la possibilité d’interdire l’utilisation de ces données par ces entreprises, cliquez ici.</p>

							<h3><li>Modification des conditions</li></h3>
							<p>L’éditeur se réserve le droit de modifier ou de façon plus générale, d’actualiser les présentes conditions générales à tout moment et sans préavis. C’est pourquoi nous vous invitons à les consulter régulièrement.</p>
							
							<br/>
							<br/>
							<h4>En utilisant notre site, vous consentez à notre politique de confidentialité.</h4>

						</ol>
					</Panel.Body>
				</Panel>
			</Grid.Container>
		)
	}
}
export default Confidential
