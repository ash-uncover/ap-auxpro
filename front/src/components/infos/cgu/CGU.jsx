import React from 'react'
import CGUData from './CGUData'
import './CGU.scss'
import { Panel, Grid } from 'ap-react-bootstrap'

class CGU extends React.Component {

	constructor(props) {
		super(props)
	}

	componentWillMount() {
		CGUData.register(this)
	}

	componentWillUnmount() {
		CGUData.unregister()
	}

	render() { return (
		<Grid.Container>
			<Panel className='ap-cgu'>
				<Panel.Header>
					<h2>Conditions Générales d’Utilisation (CGU) du site internet Auxpros en date du 31/10/2016.</h2>
				</Panel.Header>
				<Panel.Body>
					<ol type='1'>
						<h3><li>Object</li></h3>
							<p>Les présentes conditions générales d’utilisation (ci-après les « CGU ») ont pour objet de définir les modalités et conditions d’utilisation des services proposés sur le site Auxpros (ci-après les «services »), ainsi que les droits et obligations dans ce cadre.</p>
							<p>Le site internet www.auxpros.com (ci-après « Le Site ») a notamment pour objet de permettre à des établissements du domaine des services de soutien à domicile, d’aide à la personne,, (ci-après les « SAD ») de recruter des auxiliaires de vie (ci-après « les Auxiliaires ») pour réaliser des missions ponctuelles ou récurrentes (ci-après « les Missions ») chez les personnes (ci-après « les Usagers »)</p>
							<p>Les SAD et les Auxiliaires sont ci-après désignés ensemble les « Utilisateurs »</p>
							<p>Les présentes CGU sont accessibles à tout moment sur le Site. Elles peuvent être complétées, les cas échéant par des conditions d’utilisation particulières à certains services. En cas de contradictions particulières avec les CGU, les conditions particulières prévalent.</p>
						
						<h3><li>Exploitant du Site internet</li></h3>
							<p>Le site internet est exploité par la société Auxpros SAS, société immatriculée au RCS de PARIS dont le siège social est situé au 46 rue Guersant 75017 PARIS (ci-après « Auxpros »)</p>
							<p>Auxpros peut etre contacté aux coordonnées suivantes :</p>
							<p>Adresse : 46 rue guersant 75017 PARIS</p>
							<p>Email :.contact@auxpros.info</p>
						
						<h3><li>Accès au site internet et aux Services</li></h3>
							<p>Les services sont réservés à un usage purement professionnel et sont accessibles sous réserve des restrictions pouvant être prévues pour le Site internet :</p>
							<ul>
								<li>à toute personne physique majeure disposant de la pleine capacité juridique pour s’engager au titre des présentes CGU</li>
								<li>à toute personne morale agissant par l’intermédiaire d’une personne physique disposant de la capacité juridique pour contracter au nom et pour le compte de la personne morale.</li>
							</ul>
						
						<h3><li>Acceptation des CGU</li></h3>
							<p>L’acceptation des GCU se fait en cliquant sur la touche prévue à cet effet sur le site internet lors de la première connexion de l’Utilisateur. Cette acceptation ne peut être que pleine et entière. Toute adhésion sous réserve est considérée comme nulle et non avenue. L’Utilisateur qui n’accepte pas d’être lié par les présentes CGU ne peut pas utiliser les Services.</p>
						
						<h3><li>Inscription sur le Site Internet</li></h3>
							<ol type='a'>
								<h4><li>Inscription de l’Auxiliaire</li></h4>
									<p>Afin d’utiliser les services l’Auxiliaire doit effectuer une demande d’inscription sur le site www.auxpros.com. Il doit notamment indiquer à cette occasion :</p>
									<ul>
										<li>Ses nom et prénom,</li>
										<li>Son adresse mail,</li>
										<li>Son numéro de téléphone portable</li>
									</ul>
									<p>Auxpros se réserve la possibilité de consulter et de vérifier l’authenticité des diplômes renseignés dans le profil. En cas de documents falsifiés, Auxpros se réserve le droit d’exclure le compte de l’auxiliaire.</p>
									<p>Auxpros créera ensuite un compte d’Utilisateur (ci-après « Mon Compte ») au nom de l’Auxiliaire et lui enverra par email ses identifiants de connexion au Site internet.</p>
									<p>L’Auxiliaire devra alors se connecter sur le Site et accepter les CGU lors de sa première connexion afin que son inscription soit définitive.</p>
								
								<h4><li>Inscription des SAD</li></h4>
									<p>Afin d’utiliser les Services, le SAD doit effectuer une demande d’inscription sur le site internet www.auxpros.com. Il doit notamment saisir à cette occasion :</p>
									<ul>
										<li>Le nom du SAD,</li>
										<li>L’adresse email de ce dernier,</li>
										<li>Le numéro de SIRET</li>
									</ul>
									<p>Auxpros se réserve le droit de demander toute information supplémentaire au SAD, que celui-ci devra fournir sans délai.</p>
									<p>Auxpros créera ensuite un Compte au nom du SAD et lui enverra par email ses identifiants de connexion au Site internet.</p>
									<p>Le SAD devra alors se connecter sur le Site et accepter les CGU lors de sa première connexion afin que son inscription soit définitive.</p>
								
								<h4><li>Dispositions communes</li></h4>
									<p>Auxpros se réserve le droit de demander des renseignements complémentaires aux Utilisateurs</p>
									<p>L’Utilisateur garantit que tous les documents et informations qu’il fournit à l’occasion de son inscription sont exacts, authentiques, valides, sincères et ne sont entachés d’aucun caractère trompeur.</p>
									<p>Il s’engage à mettre à jour les informations dans son Compte en cas de modifications afin qu’elles correspondent toujours aux critères susvisés.</p>
									<p>L’Utilisateur est informé et accepte que les informations saisies aux fins de création ou de mise à jour de son Compte vaillent preuves de son identité. Les informations saisies par l’Utilisateur l’engagent dès leur validation.</p>
									<p>L’Utilisateur peut accéder à tout moment à son Compte après s’être identifié à l’aide de son identifiant de connexion ainsi que de son mot de passe.</p>
									<p>L’Utilisateur s’engage à utiliser personnellement les Services et à ne permettre à aucun tiers de les utiliser à sa place ou pour son compte, sauf à en supporter l’entière responsabilité.</p>
									<p>Il est pareillement responsable du maintien de la confidentialité de son identifiant et de son mot de passe qui est recommandé de personnaliser après sa première connexion. Il doit immédiatement contacter Auxpros aux coordonnées mentionnés à l’article 2 des présentes s’il remarque que son Compte a été utilisé à son insu. Il reconnait à Auxpros le droit de prendre toutes mesures appropriées en pareil cas.</p>
							</ol>

						<h3><li>Description des services</li></h3>
							<p>Le site internet propose des  « Services » de mise en relation entre Auxiliaires et SAD. Ses services sont fournis sous une forme et selon des fonctionnalités et des moyens techniques qu’Auxpros jugent les plus appropriés. Ils se déroulent selon les étapes ci-après.</p>
							<ol type='a'>
								<h4><li>Profil de l’Auxiliaire</li></h4>
									<p>L’Auxiliaire dispose d’une page de profil sur le Site internet (ci-après le « Profil »), dans laquelle apparaissent les informations qu’elle a fournies lors de son inscription.</p>
									<p>Elle peut y modifier ses informations à tout moment et, notamment ajouter de nouveaux 1diplômes obtenus depuis son inscription.</p>
								
								<h4><li>Annonce de Mission par le SAD</li></h4>
									<p>Les Services permettent aux entreprises de SAD ayant besoin de faire réaliser une mission par une Auxiliaire de diffuser une offre à cette fin sur le Site Internet (ci-après une « Offre »)</p>
									<p>Le SAD indique dans l’Offre les informations relatives à la Mission qu’il propose dont notamment :</p>
									<ul>
										<li>La date</li>
										<li>La plage horaire</li>
										<li>Le lieu de Mission</li>
										<li>L’usager concerné</li>
									</ul>
								
								<h4><li>Diffusion de l’Offre à travers le Site Internet</li></h4>
									<p>Une fois l’Offre créée, elle est automatiquement envoyée à travers le Site Internet aux Auxiliaires susceptibles d’y correspondre, en fonction des critères de l’Offre et des critères renseignés par les Auxiliaires dans leur Profil (compétences, disponibilités horaires/géographiques, etc…)</p>
									<p>Parmi les Auxiliaires, celles intéressées par l’Offre peuvent y postuler à travers le Site Internet.</p>
									<p>Le SAD reçoit en retour les candidatures des Auxiliaires, par tous les moyens proposés sur le Site Internet. Il peut consulter le Profil de chaque Auxiliaire ayant postulée à son Offre.</p>
									<p>Lors de la sélection, les coordonnées de l’Auxiliaire sont adressées au SAD par Auxpros selon tous les moyens utiles.</p>
									<p>Les Auxiliaires sont ainsi informées que la mise en œuvre des Services nécessite la transmission de leurs données personnelles aux SAD et donnent expressément leur consentement à cette communication.</p>
									<p>Il appartient alors au SAD de contacter l’Auxiliaire et de lui confirmer son embauche pour la Mission. Charge au SAD de réaliser toutes les formalités afférentes à cette embauche, Auxpros n’intervenant pas dans la relation de travail entre l’Auxiliaire et le SAD. Ce dernier est expressément renvoyé sur ce point aux article xx.X et xx.X.</p>
								
								<h4><li>Annulation d’une mission</li></h4>
									<p>Le SAD qui a diffusé une Offre peut la modifier ou la retirer à tout moment.</p>
							</ol>

						<h3><li>Obligations de l’Utilisateur</li></h3>
							<p>Sans préjudice des autres obligations prévues aux présentes, l’Utilisateur s’engage à respecter les obligations qui suivent.</p>
								<ol type='a'>
									<li>
										<p>L’Utilisateur s’engage, dans son usage des Services, à respecter les lois et règlements en vigueur et à ne pas porter atteinte aux droits de tiers ou à l’ordre public.</p>
										<p>Il est seul responsable du bon accomplissement des formalités notamment administratives, fiscales et/ou sociales et des paiements de cotisation, taxe ou impôts de toutes natures qui lui incombent, le cas échéant, en relation avec son utilisation des Services.</p>
										<p>Le SAD est notamment seul responsable :</p>
										<ul>
											<li>De la signature d’un contrat de travail avec l’Auxiliaire</li>
											<li>Du respect de la législation sociale en matière du droit du travail et des conventions collectives applicables. Du paiement des salaires de l’Auxiliaire pour la/les Mission(s)</li>
											<li>Du paiement de toutes les cotisations sociales afférentes.</li>
											<li>Des relations avec les clients du SAD</li>
										</ul>
										<p>Il lui appartient également de vérifier, préalablement à la signature du contrat de travail, que l’identité de l’Auxiliaire correspond bien au Compte indiqué sur le Site Internet et qu’elle a le droit de travailler en France.</p>
										<p>Réciproquement, il appartient à l’Auxiliaire de vérifier l’existence du SAD et et les informations qui lui ont été fournies dans l’Offre.</p>
										<p>La responsabilité d’Auxpros ne pourra en aucun cas être engagée à ce titre.</p>
									</li>					
									<li>
										<p>L’Utilisateur reconnait avoir pris connaissances sur le Site Internet des caractéristiques et contraintes, notamment techniques, de l’ensemble des Services. Il est seul responsable de l’utilisation des Services.</p>
										<p>L’Utilisateur est seul responsable des relations qu’il pourrait nouer avec d’autres Utilisateurs et des informations qu’il leur communiquerait dans le cadre des Services. Il lui appartient d’agir avec la prudence et le discernement appropriés dans ses relations et communications. L’Utilisateur s’engage en outre, dans ses échanges avec les autres Utilisateurs, à respecter les règles usuelles de politesse et de courtoisie.</p>
									</li>
									<li>
										<p>L’Utilisateur s’engage à faire un usage strictement personnel des services et des informations. Il s’interdit en conséquence de céder, concéder ou transférer tout ou partie de ses droits ou obligations au titre des présentes à des tiers, de quelque manière que ce soit.</p>
									</li>
									<li>
										<p>L’Utilisateur s’engage à fournir à Auxpros toutes les informations nécessaires à la bonne exécution des Services. Plus généralement, l’Utilisateur s’engage à coopérer activement avec Auxpros en vue de la bonne exécution des présentes CGU.</p>
									</li>
									<li>
										<p>L’Utilisateur est informé et accepte que la mise en œuvre des Services nécessite qu’il soit connecté à internet et que la qualité des Services dépend directement de cette connexion, dont il est le seul responsable.</p>
									</li>
									<li>
										<p>L’Utilisateur est le seul responsable des contenus de toutes natures (rédactionnels, graphiques, audiovisuels ou autres, ce qui comprends l’image éventuellement choisie par l’Utilisateur pour s’identifier sur le Site Internet) qu’il diffuse dans le cadres des Services (ci-après désignés : les « Contenus »).</p>
										<p>Il garantit à Auxpros qu’il dispose de tous les droits et autorisations nécessaires à la diffusion de ces Contenus.</p>
										<p>Il s’engage à ce que les dits contenus soient licites, ne portent pas atteinte à l’ordre public, aux bonnes mœurs ou aux droits de tiers, n’enfreignent aucune disposition législative ou règlementaire et plus généralement, ne soient aucunement susceptibles de mettre en jeu la responsabilité civile ou pénale d’Auxpros.</p>
										<p>L’Utilisateur s’interdit ainsi de diffuser notamment et sans que cette liste soit exhaustive :</p>
										<ul>
											<li>Des Contenus pornographiques, obscènes, indécents, choquants ou inadaptés à un public familial, diffamatoires, injurieux, violents, racistes, xénophobes ou révisionnistes,</li>
											<li>Des Contenus contrefaisants</li>
											<li>Des Contenus attentatoires à l’image d’un tiers</li>
											<li>Des Contenus mensongers, trompeurs ou proposant ou promouvant des activités, illicites, frauduleuses ou trompeuses,</li>
											<li>Des Contenus nuisibles aux systèmes informatiques de tiers (tels que virus, vers, chevaux de Troie, Ransomware, etc…)</li>
											<li>Et plus généralement des Contenus susceptibles de porter atteinte aux droits de tiers ou d’être préjudiciables à des tiers, de quelque manière et sous quelque forme que ce soit.</li>
										</ul>
									</li>
									<li>
										<p>Les Utilisateurs autorisent expressément Auxpros à faire usage de leur image de Profil, aux fins de promotion du Site Internet, par tout moyen et sur tout support, pour le monde entier, pour la durée de l’inscription de l’Utilisateur sur le Site Internet. Cette autorisation est consentie à titre gratuit.</p>
									</li>
									<li>
										<p>Les Auxiliaires sont seules responsables de la bonne exécution des Missions pour lesquelles elles sont sélectionnées à travers le Site Internet, qu’elles s’engagent à exécuter avec soin et diligence.</p>
									</li>
									<li>
										<p>Les SAD s’engagent à garder strictement confidentielles les données à caractère personnel dont ils seront destinataires dans le cadre des Services et à prendre toutes les mesures nécessaires pour assurer la sécurité et la confidentialité de ces données.</p>
										<p>Ils s’interdisent de réutiliser tout ou partie de ces données sous quelque forme que ce soit et de les détourner de leur finalité à savoir la réalisation des Missions correspondant à leurs Offres.</p>
										<p>Les SAD s’interdisent ainsi notamment d’utiliser ces données à des fins de prospection ou de sollicitation commerciale.</p>
									</li>
									<li>
										<p>L’Utilisateur reconnait que les Services lui offrent une solution supplémentaire mais non alternative des moyens qu’il utilise déjà par ailleurs pour atteindre le même objectif et que cette solution ne saurait se substituer à ces autres moyens.</p>
									</li>
									<li>
										<p>L’Utilisateur doit prendre les mesures nécessaires pour sauvegarder par ses propres moyens les informations de son Compte (et notamment de son Profil s’agissant d’une Auxiliaire) qu’il juge nécessaires, dont aucune copie ne lui sera fournie.</p>
									</li>
								</ol>

						<h3><li>Garantie de l’Utilisateur</li></h3>
							<p>L’Utilisateur garantit Auxpros contre toutes plaintes, réclamations, actions et/ou revendications quelconques qu’Auxpros pourrait subir du fait de la violation, par l’Utilisateur de l’une quelconque de ses obligations ou garanties aux termes des présentes conditions générales.</p>
							<p>Il s’engage à indemniser Auxpros de tout préjudice qu’elle subirait et à lui payer tous les frais, charges et/ou condamnations qu’elle pourrait avoir à supporter de ce fait.</p>

						<h3><li>Comportements prohibés</li></h3>
							<ol type='a'>
								<li>
									<p>Il est strictement interdit d’utiliser les Services aux fins suivantes :</p>
									<ul>
										<li>L’exercice d’activités illégales, frauduleuses ou portant atteinte aux droits ou à la sécurité des tiers</li>
										<li>L’intrusion dans le système informatique d’un tiers ou toute activité de nature à nuire, contrôler, interférer ou intercepter tout ou partie du système informatique d’un tiers, en violer l’intégrité ou la sécurité</li>
										<li>L’envoi d’emails non sollicités et/ou de prospection ou sollicitation commerciale, les manipulations destinées à améliorer le référencement d’un site tiers</li>
										<li>L’aide ou l’incitation, sous quelque forme et de quelque manière que ce soit, à un ou plusieurs des actes et activités décrites ci-dessus</li>
										<li>Et plus généralement toute pratique détournant les Services à des fins autres que celles pour lesquelles ils ont été conçus.</li>
									</ul>
								</li>
								<li>
									<p>Il est strictement interdit aux Utilisateurs de copier et /ou de détourner à leurs fins ou à celles de tiers le concept, les technologies ou tout autre élément du Site Internet.</p>
								</li>
								<li>
									<p>Sont également strictement interdits :</p>
									<ul>
										<li>Tous comportement de nature à interrompre, suspendre, ralentir ou empêcher la continuité des Services</li>
										<li>Toutes intrusions ou tentatives d’intrusions dans les systèmes d’Auxpros</li>
										<li>Tous détournements des ressources systèmes du Site Internet</li>
										<li>Toute action de nature à imposer une charge disproportionnée sur les infrastructures de cette dernière</li>
										<li>Toutes atteintes aux mesures de sécurité et d’authentification du Site Internet</li>
										<li>Tous actes de nature à porter atteinte aux droits et intérêts financiers, commerciaux ou moraux d’Auxpros ou des Utilisateurs du Site Internet</li>
										<li>Tout manquement aux présentes CGU</li>
									</ul>
								</li>
								<li>
									<p>Il est strictement interdit de monnayer, vendre ou concéder tout ou partie de l’accès aux Services ou au Site Internet, ainsi qu’aux informations qui y sont hébergées et/ou partagées.</p>
								</li>
							</ol>

						<h3><li>Sanctions des manquements</li></h3>
							<p>En cas de manquement à l’une des quelconques dispositions des présentes CGU ou plus généralement, d’infraction aux lois et règlement en vigueur par un Utilisateur, Auxpros se réserve le droit de prendre toute mesure appropriée notamment de :</p>
							<ul>
								<li>Suspendre ou résilier l’accès aux Services de l’Utilisateur, auteur du manquement ou de l’infraction, ou y ayant participé</li>
								<li>Supprimer tout Contenu mis en ligne sur le Site Internet</li>
								<li>Publier sur le Site Internet tout message d’information qu’Auxpros jugera utile</li>
								<li>Avertir toute autorité concernée</li>
								<li>Engager toute action judiciaire</li>
								<li>Tous actes de nature à porter atteinte aux droits et intérêts financiers, commerciaux ou moraux d’Auxpros ou des Utilisateurs du Site Internet</li>
								<li>Tout manquement aux présentes CGU</li>
							</ul>
							<p></p>
							<p></p>

						<h3><li>Responsabilité et garantie d’Auxpros</li></h3>
							<ol type='a'>
								<li>
									<p>Auxpros s’engage à fournir les Services avec diligence et selon les règles de l’art, étant précisé qu’il pèse sur elle une obligation de moyens, à l’exclusion de toute obligation de résultat, ce que les Utilisateurs reconnaissent et acceptent expressément.</p>
									<p>Auxpros intervient exclusivement aux fins de fournitures des Services décrits aux présentes conditions générales. Auxpros n’est notamment pas, sans que cette liste soit exhaustive, un cabinet de recrutement, une société de travail temporaire, un conseil en management de transition ou un conseil en ressources humaines. Auxpros intervient en qualité d’intermédiaire exerçant une activité de placement, en ce qu’elle met à la disposition des Utilisateurs des outils et moyens techniques leur permettant d’entrer en relation par l’intermédiaire du Site Internet aux fins de réalisation de Missions. La responsabilité d’Auxpros se limite à la fourniture de ces moyens, tels que décrits aux présentes et à la mise en relation des Utilisateurs.</p>
									<p>Auxpros n’est ainsi nullement responsable du contenu des Profils des Auxiliaires mis en ligne sur le Site Internet, de leur mise à jour, de leur pertinence ou de leur adéquation aux besoins et/ou attentes des SAD. De manière générale, elle ne garantit en aucun cas que les informations fournies par les Utilisateurs sont exactes.</p>
									<p>Auxpros n’est aucunement responsable des échanges ou des relations entre les Auxiliaires et les SAD, qui ont lieu en dehors du Site Internet et des Services. De manière générale, Auxpros agit en son nom personnel et ne passe aucun acte juridique au nom et pour le compte des Utilisateurs, qui contractent directement entre eux.</p>
									<p>Auxpros n’est pas partie aux éventuels contrats qui seraient conclus entre les Utilisateurs et ne saurait en aucun cas voir sa responsabilité engagée au titre des difficultés pouvant intervenir lors de la conclusion ou de l’exécution de ces contrats, ni être partie à quelques litiges que ce soit entre les Utilisateurs concernant notamment l’exécution d’une Mission ou toutes autres garanties, déclarations ou obligations quelconques auxquelles les Utilisateurs seraient tenus.</p>
								</li>
								<li>
									<p>Auxpros ne vérifie pas les compétences et/ou qualifications des Auxiliaires.</p>
								</li>
								<li>
									<p>Auxpros décline toute responsabilité en cas de perte éventuelle des informations accessibles dans le Compte de l’Utilisateur, celui-ci devant en sauvegarder une copie et ne pouvant prétendre à aucun dédommagement à ce titre.</p>
								</li>
								<li>
									<p>L’Utilisateur est expressément informé et accepte que le Site Internet soit susceptible de comporter des bugs ou erreurs et soit soumis à de régulières modifications.</p>
									<p>Auxpros ne garantit ainsi pas aux Utilisateurs :</p>
									<ul>
										<li>Que les Services, soumis à une recherche constante pour en améliorer notamment la performance et le progrès, seront totalement exempts d’erreurs, de vices ou défauts.</li>
										<li>Que les Services, étant standard et nullement proposés à la seule intention d’un Utilisateur donné en fonction de ses propres contraintes personnelles, répondront spécifiquement à ses besoins et attentes.</li>
									</ul>
									<p>A ce titre, Auxpros ne saurait être tenue responsable si le SAD ne trouvait pas d’Auxiliaire pour réaliser la Mission qu’il propose.</p>
									<p>Auxpros ne garantit pas non plus aux Auxiliaires qu’elles trouveront des Missions à réaliser et/ou qu’ils seront sélectionnées pour en réaliser</p>
								</li>
								<li>
									<p>Auxpros s’engage à procéder régulièrement à des contrôles afin de vérifier le fonctionnement et l’accessibilité du Site Internet. A ce titre Auxpros se réserve la faculté d’interrompre momentanément l’accès au Site internet pour des raisons de maintenance. De même, Auxpros ne saurait être tenu responsable des difficultés ou impossibilités momentanées d’accès au Site internet qui auraient pour origine des circonstances qui lui sont extérieures, la force majeure ou encore qui seraient dues à des perturbations des réseaux de télécommunication.</p>
								</li>
								<li>
									<p>En tout état de cause, la responsabilité susceptible d’être encourue par Auxpros au titre des présentes est expressément limitée aux seuls dommages directs avérés subis par l’utilisateur.</p>
								</li>
							</ol>

						<h3><li>Propriété intellectuelle</li></h3>
							<p>Les systèmes, logiciels, structures, infrastructures, bases de données et contenus de toute nature (textes, images, visuels, musiques, logos, marques, base de données, etc… exploités par Auxpros au sein du Site Internet sont protégés par tous droits de propriété intellectuelle et les droits des producteurs de bases de données en vigueur et appartiennent à Auxpros. tout désassemblages, décompilations, décryptages, extractions, réutilisations, copies et plus généralement, tout actes de reproduction, représentation, diffusion et utilisation de l’un quelconque de ces éléments, en tout ou partie, sans l’autorisation écrite d’Auxpros sont strictement interdits et pourront faire l’objet de poursuites judiciaires.</p>

						<h3><li>Données à caractère personnel</li></h3>
							<p>Auxpros pratique une politique de protection des données personnelles dont les caractéristiques sont explicitées dans le document intitulé « Charte de confidentialité », dont l’utilisateur est expressément invité à prendre connaissance sur le site aux utilisateurs tous messages publicitaires ou promotionnels sous une forme et dans des conditions dont Auxpros sera le seul juge.</p>

						<h3><li>Liens et sites tiers</li></h3>
							<p>Auxpros ne pourra en aucun cas être tenue pour responsable de la disponibilité technique de sites internet ou d’applications mobiles exploités par des tiers (y compris ses éventuels partenaires) auxquels l’utilisateur accéderait par l’intermédiaire du Site Internet.</p>
							<p>Auxpros n’endosse aucune responsabilité au titre des contenus, publicités, produits et/ou services disponibles sur de tels sites et applications mobiles tiers dont il est rappelé qu’ils sont régis par leurs propres conditions d’utilisation.</p>
							<p>Auxpros n’est pas non plus responsable des transactions intervenues entre l’utilisateur et un quelconque annonceur, professionnel ou commerçant (y compris ses éventuels partenaires) vers lequel l’utilisateur serait orienté par l’intermédiaire du Site Internet et ne saurait en aucun cas être partie à quelques litiges éventuels que ce soit avec ces tiers concernant notamment la livraison de produits et/ou de services, des garanties, déclarations et autres obligations quelconques auxquelles ces tiers sont tenus.</p>

						<h3><li>Durée des Services, désinscription, fin des Services</li></h3>
							<ol type='a'>
								<h4><li>Durée des services</li></h4>
									<p>Les Services sont souscrits pour une durée indéterminée.</p>
								
								<h4><li>Désinscription de l’utilisateur</li></h4>
									<p>L’utilisateur peut se désinscrire des Services à tout moment, en adressant une demande à cet effet à Auxpros par email, aux coordonnées mentionnées à l’article 2. La désinscription est effective dans un délai de 7 jours. L’utilisation n’a alors plus accès à son Compte dans l’application.</p>
								
								<h4><li>Fin des services à l’initiative d’Auxpros</li></h4>
									<p>Sans préjudice des dispositions de l’article 11, Auxpros se réserve le droit de modifier ou d’arrêter de proposer tout ou partie des Services à tout moment, à sa libre discrétion. Les utilisateurs seront informés de ces modifications et/ou arrêts par tout moyen utile.</p>
							</ol>

						<h3><li>Modifications</li></h3>
							<p>Auxpros se réserve la faculté de modifier à tout moment les présentes CGU. L’utilisateur sera informé de ces modifications par tous moyens utiles. L’utilisateur qui n’accepte pas les CGU modifiées doit se désinscrire des Services postérieurement à l’entrée en vigueur des CGU modifiées. Sans cela il est réputé accepter ces modifications.</p>

						<h3><li>Loi applicable et juridiction</li></h3>
							<p>Les présentes CGU sont régies par la loi française. En cas de contestation sur la validité, l’interprétation et/ou l’exécution des présentes CGU, les parties conviennent que les tribunaux de Paris seront les seuls compétents, sauf règles de procédure impératives contraires.</p>

						<h3><li>Entrée en vigueur</li></h3>
							<p>Les présentes CGU sont entrées en vigueur le 18/11/2016</p>

						<h3><li>Dispositions finales</li></h3>
							<p>Auxpros et l’ensemble des Utilisateurs du Site Internet s’engagent à exécuter de bonne foi les dispositions prévues par les présentes CGU.</p>
					</ol>
				</Panel.Body>
			</Panel>
		</Grid.Container>
	)}

}
export default CGU
