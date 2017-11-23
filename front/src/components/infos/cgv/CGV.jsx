import React from 'react'
import CGVData from './CGVData'
import './CGV.scss'
import { Panel, Grid } from 'ap-react-bootstrap'


/* This class was auto-generated by the JavaScriptWriter */
class CGV extends React.Component {

	constructor(props) {
		super(props)
	}

	componentWillMount() {
		CGVData.register(this)
	}

	componentWillUnmount() {
		CGVData.unregister()
	}

	render() {
		return (
			<Grid.Container>
				<Panel className='ap-cgv'>
					<Panel.Header>
						<h2>Conditions Générales de Vente de site internet AuXpros</h2>
					</Panel.Header>
					<Panel.Body>
						<ol type='1'>
							<h3><li>Mentions légales</li></h3>
								<p>Le site : www.auxpros.fr est édité et exploité par la société AUXPROS</p>
								<p>N° Siret : 82821173000019</p>
								<p>Auxpros est une SAS (Société par Actions Simplifiées).</p>
								<p>Société immatriculée au RCS de PARIS</p>
								<p>son siège social est situé au 46 rue Guersant 75017 PARIS (ci-après « Auxpros »)</p>
								<p>Email : contact@auxpros.info</p>
								<p>Tel 0682849494</p>
								<p>Ce site a été déclaré auprès de la Commission Nationale de l’Informatique et des Libertés (CNIL) la société Auxpros s’engage à respecter strictement les dispositions de la loi n° 78-17 du 6 janvier 1978 modifiée dite  « Informatique et Libertés ».</p>

								<h4>Hébergement</h4>
									<p>Ce site est hébergé par la société OVH</p>

								<h4>Domaine</h4>
									<p>Le nom de domaine est géré par la société OVH :</p>
									<p>SAS au capital de 10 069 020 € </p>
									<p>RCS Lille Métropole 424 761 419 00045</p>
									<p>Code NAF 6201Z</p>
									<p>N° TVA : FR 22 424 761 419</p>
									<p>Siège social : 2 rue Kellermann - 59100 Roubaix - France.</p>

								<h4>Champ d’application</h4>
									<p>Les présentes conditions générales de vente s’appliquent à toutes les transactions conclues par le biais du site de la société Auxpros.</p>
									<p>Est considéré comme « client » toute personne physique ou morale réalisant auprès de la société Auxpros une inscription validée via notre plateforme de paiement sécurisée, ou par chèque ou en numéraire.</p>
									<p>La société Auxpros se réserve la possibilité d’adapter ou de modifier à tout moment les présentes conditions générales de vente. En cas de modification, il sera appliqué à chaque inscription les conditions générales de vente en vigueur au jour de l’inscription.</p>

							<h3><li>Objet</li></h3>
								<p>Les présentes conditions générales d’utilisation (ci-après les « CGV ») ont pour objet de définir les modalités et conditions d’utilisation de ventes services proposés sur le site Auxpros (ci-après le « site »), ainsi que les droits et obligations dans ce cadre.</p>

							<h3><li>Conditions de ventes</li></h3>
								<p>L’inscription des « Utilisateurs » sur le « Site » donne accès à l’ensemble des « Services » tels que décrit dans les Conditions Générales d’Utilisation.</p>
							<h3><li>Prix des services</li></h3>
								
								<h4>Pour les « Auxiliaires »</h4>
									<p>Pour devenir membre d’AuXpros les auxiliaires doivent s’acquitter d’un droit d’entrée de dix euros (10€). Toutefois toute auxiliaire qui rejoindra notre plateforme avant le 31 décembre 2017 deviendra membre AuXpros gracieusement.</p>
								
								<h4>Pour les « SAAD »</h4>
									<p>L’abonnement annuel est de 300€ HT, soit 25€ mensuel. Toutefois tous les SAAD pourront profiter gracieusement de nos services jusqu’au 31 décembre 2017</p>
									<p>L’« Utilisateur » dispose d’un délai de 14 jours calendaires  pour profiter de son droit de rétractation et annuler son inscription. Les sommes versées sont alors restituées dans un délai de 30 jours fin de mois suivant la date de réception du courrier en recommandé avec accusé de réception.</p>

							<h3><li>Condition de règlement</li></h3>
								<p>Le client peut choisir de régler ses factures grâce aux modes de paiement ci-dessous. Il peut changer de mode de paiement en cours de contrat, et en informé la société Auxpros par tout moyen :</p>
								<ul>
									<li>Par chèque : envoyé à l'adresse d’Auxpros indiquée à l’article 1 des présentes Conditions Générales de ventes</li>
									<li>Par virement bancaire : à l’ordre d’Auxpros dont les coordonnées bancaires figurent sur le Bon de Commande. Le virement devra être accompagné des références de commande. Lorsque que ce mode de règlement est choisi</li>
									<li>Par carte bancaire : CB ou VISA, en saisissant les coordonnées et la date d’expiration de sa carte bancaire. Les données sont cryptées lors de leur transmission selon le protocole SSL (Secure Socket Layer) qui garantit la circulation en toute sécurité de ces informations. Les pages dans lesquelles l’Utilisateur est invité à donner le numéro de sa carte sont simplement hébergées par le Site qui ne saurait être responsable en cas de détournement des informations saisies en ligne par l’Utilisateur.</li>
									<li>Par prélèvement SEPA : paiement par prélèvement SEPA au nom d’Auxpros sur la base d’une autorisation préalable donnée par l’Utilisateur, matérialisée par un mandat, accompagnée d’un RIB et adressée à Auxpros. Ce mandat est caractérisé par une « Référence Unique de Mandat » (RUM). Il vous appartient de communiquer, lors de toute conclusion d’un abonnement par prélèvement automatique et de signature d’un mandat, des informations exactes et complètes et d’informer dans les meilleurs délais Auxpros de toute modification desdites informations survenues au cours du contrat à l’adresse susmentionnée. Toute révocation du mandat de prélèvement SEPA entrainera la résiliation du contrat d’abonnement. quel que soit le type d’Abonnement souscrit, seul l’Utilisateur est responsable du paiement par carte bancaire du service proposé.</li>
								</ul>
								<p>Auxpros n’est pas responsable des problèmes de paiement liés au dysfonctionnement du service de commerce électronique.</p>

							<h3><li>Pénalités de retard</li></h3>
								<p>Conformément aux dispositions légales et réglementaires, à défaut de règlement à l’échéance prévue, des pénalités de retard d'un montant égal au dernier taux appliqué par la Banque Centrale Européenne majoré de 10 points seront appliquées sur le montant TTC de la somme restant due, sans qu’aucune mise en demeure ne soit nécessaire. Le taux applicable pendant le premier semestre de l’année concernée est le taux en vigueur au 1er janvier de l’année en question et celui applicable pour le second semestre de l’année concernée est le taux en vigueur au 1er juillet de l’année en question. En outre, une indemnité forfaitaire de 40 € pour frais de recouvrement pourra être réclamée.</p>
						</ol>
					</Panel.Body>
				</Panel>
			</Grid.Container>
		)
	}
}
export default CGV
