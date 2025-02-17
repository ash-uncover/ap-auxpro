/* ****************************************************************************************
 * DB-APMAIL
 */
db.apmail.insert({
    "id":"mail_offer_send",
    "subject":"Nouvelle offre sur AuXpros.fr",
    "content":"Bonjour {user},\n\nVous avez reçu une nouvelle offre de prestation sur AuXpros.fr\nConnectez vous sur www.auxpros.fr pour la visualiser.\n\n*Ceci est un message généré automatiqument, merci de ne pas répondre.*"
})
db.apmail.insert({
    "id":"mail_offer_accepted",
    "subject":"Offre acceptée sur AuXpros.fr",
    "content":"Bonjour,\n\nUne de vos offres a été acceptée sur AuXpros.fr\nConnectez vous sur www.auxpros.fr pour visualiser le statut de vos offres.\n\n*Ceci est un message généré automatiqument, merci de ne pas répondre.*"
})


/* ****************************************************************************************
 * DB-PROMOTIONCODE
 */
db.promotioncode.insert({
    "id":"AUXPROS-2017",
    "name":"AUXPROS-2017",
    "validityDate": new Date("2017-12-31"),
})
db.promotioncode.insert({
    "id":"AUXPROS-2018",
    "name":"AUXPROS-2018",
    "validityDate": new Date("2018-12-31"),
})


/* ****************************************************************************************
 * DB-HELPTOPIC
 */
db.helptopic.insert({
    "id":"help001",
    "creationDate":new Date("2017-02-02"),
    "lastUpdateDate":new Date("2017-02-02"),
    "title":"Acceptée (offres)",
    "content":"<p>L’offre du SAP a été envoyé et accepté par l’auxiliaire.</p>"
})
db.helptopic.insert({
    "id":"help002",
    "creationDate":new Date("2017-02-02"),
    "lastUpdateDate":new Date("2017-02-02"),
    "title":"Attente (offres en)",
    "content":"<p>offre envoyée par un SAP qui peut être soit 'nouvelle', 'accepté' ou 'décliné'.</p>"
})
db.helptopic.insert({
    "id":"help003",
    "creationDate":new Date("2017-02-02"),
    "lastUpdateDate":new Date("2017-02-02"),
    "title":"Annuaire (des services à la personne)",
    "content":"<p>Ce lien est destiné tout particulièrement aux <b>Usagers</b> qui se retrouveraient sur la plate-forme pour trouver un organisme d’aide à la personne. Cet annuaire est celui mis à la disposition des particuliers par la <b>DGE</b>.</p>"
})
db.helptopic.insert({
    "id":"help004",
    "creationDate":new Date("2017-02-02"),
    "lastUpdateDate":new Date("2017-02-02"),
    "title":"Annulée (offre)",
    "content":"<p>Offre reçue par l'auxiliaire qui a été annulée par le SAP. Ceci inclut l'annulation d'intervention (mission) en cours.</p>"
})
db.helptopic.insert({
    "id":"help005",
    "creationDate":new Date("2017-02-02"),
    "lastUpdateDate":new Date("2017-02-02"),
    "title":"AUX",
    "content":"<p>Auxiliaire de vie</p>"
})
db.helptopic.insert({
    "id":"help006",
    "creationDate":new Date("2017-02-02"),
    "lastUpdateDate":new Date("2017-02-02"),
    "title":"CGU",
    "content":"<p>Condition Générale d’Utilisation</p>"
})
db.helptopic.insert({
    "id":"help007",
    "creationDate":new Date("2017-02-02"),
    "lastUpdateDate":new Date("2017-02-02"),
    "title":"CGV",
    "content":"<p>Condition Générale de Vente.</p>"
})
db.helptopic.insert({
    "id":"help008",
    "creationDate":new Date("2017-02-02"),
    "lastUpdateDate":new Date("2017-02-02"),
    "title":"",
    "content":"<p></p>"
})
db.helptopic.insert({
    "id":"help009",
    "creationDate":new Date("2017-02-02"),
    "lastUpdateDate":new Date("2017-02-02"),
    "title":"Compte",
    "content":"<p>la création d’un compte vous donne accès à la plate-forme AuXpros. Pour pouvoir obtenir un <b>matching</b> entre vos <b>prestations</b> et les auxiliaires (pour les SAP) ou vous voir proposer des <b>offres</b> pour les auxiliaires, il faut obtenir un compte <b>premium</b>. Pour cela vous devez remplir intégralement tous les champs obligatoires.</p><p>Il est important de se rappeler ou de noter si l’on a peur de l’oublier l’adresse mail qui vous sert d’<b>identifiant</b> de compte.</p>"
})
db.helptopic.insert({
    "id":"help010",
    "creationDate":new Date("2017-02-02"),
    "lastUpdateDate":new Date("2017-02-02"),
    "title":"Confirmées (offres)",
    "content":"<p>offre acceptée par l'auxiliaire et confirmée par le SAP. Offre confirmée = intervention</p>"
})
db.helptopic.insert({
    "id":"help011",
    "creationDate":new Date("2017-02-02"),
    "lastUpdateDate":new Date("2017-02-02"),
    "title":"Connecter (se)",
    "content":"<p>Vous avez déjà un compte, cliquez sur ce bouton pour consulter renseigner vos identifiants et mot de passe et avoir accès à votre <b>compte</b>.</p>"
})
db.helptopic.insert({
    "id":"help012",
    "creationDate":new Date("2017-02-02"),
    "lastUpdateDate":new Date("2017-02-02"),
    "title":"Contactez (nous)",
    "content":"<p>Cette rubrique vous permet de contacter notre service technique si vous rencontrez des difficultés ou nous faire part de vos remarques.</p>"
})
db.helptopic.insert({
    "id":"help013",
    "creationDate":new Date("2017-02-02"),
    "lastUpdateDate":new Date("2017-02-02"),
    "title":"Créer un compte auxiliaire",
    "content":"<p>Pour créer votre compte, cliquez sur la page d’accueil “AuXpros” . Cliquez ensuite sur “créer un compte Auxiliaire de vie”. remplissez les champs suivants :</p><ul><li>Adresse électronique</li><li>Mot de passe</li><li>Confirmation Mot de passe</li><li>Recopiez le mot ***** : Ce champ est important car il nous permet de reconnaître s’il s’agit ou non d’une inscription douteuse.</li></ul><p>Consultez ensuite votre boite  mail, vous y trouverez un message d’AuXpros pour confirmer votre inscription sur notre plate-forme:</p><p>“Bonjour,<br/>Vous avez demandé l'ouverture d'un compte auxiliaire sur AuXpros.fr.<br/>Afin de pouvoir utiliser nos services vous *DEVEZ* valider votre inscription en cliquant sur le lien suivant”</p><p>Cliquez sur le lien afin de valider votre inscription. Cliquez ensuite sur “connexion”, renseignez votre adresse mail et votre mot de passe.</p><p>Si vous éprouvez des difficultés à créer votre compte, cliquez sur “ nous contacter”, Expliquez nous votre difficulté et nous vous répondrons rapidement soit par mail, soit par téléphone si vous nous laissez votre numéro.</p><p>Pour finaliser la création de votre compte vous devez compléter la totalité de votre profil en passant par les menus de modification.</p>"
})
db.helptopic.insert({
    "id":"help014",
    "creationDate":new Date("2017-02-02"),
    "lastUpdateDate":new Date("2017-02-02"),
    "title":"Créer un compte SAP",
    "content":"<p>La création d’un compte SAP contient les mêmes étapes que la création d’un compte Auxiliaire (voir <b>Créer un compte auxiliaire</b>).</p>"
})
db.helptopic.insert({
    "id":"help015",
    "creationDate":new Date("2017-02-02"),
    "lastUpdateDate":new Date("2017-02-02"),
    "title":"DGE",
    "content":"<p>Direction générale des entreprises</p>"
})
db.helptopic.insert({
    "id":"help016",
    "creationDate":new Date("2017-02-02"),
    "lastUpdateDate":new Date("2017-02-02"),
    "title":"Déconnexion",
    "content":"<p>Cela vous permet de cesser votre activité actuelle sur le site AuXpros. Veillez à bien enregistrer vos <b>identifiants</b> et <b>mot de passe</b>.</p>"
})
db.helptopic.insert({
    "id":"help017",
    "creationDate":new Date("2017-02-02"),
    "lastUpdateDate":new Date("2017-02-02"),
    "title":"Diplôme",
    "content":"<p>Pour mettre en ligne votre Diplôme.</p><ul><li>1ère possibilité:Connectez vous à Auxpros  avec votre smartphone ou votre tablette. cliquez sur l’onglet “profil” puis sur “modifier mes informations personnelles”, puis “modifier mon diplôme”, cliquez sur “choisir un fichier” Faites une photo et suivez les instructions de votre appareil. puis cliquez sur envoyer le fichier, puis sur ok Ne pas oublier d’enregistrer avant de quitter la page.</li><li>2ème Possibilité: choisissez la photo parmi vos fichiers image d’ordinateur, une fois sélectionné, cliquez sur envoyer le fichier, puis sur ok. Ne pas oublier d’enregistrer avant de quitter la page.</li></ul></p>"
})
db.helptopic.insert({
    "id":"help018",
    "creationDate":new Date("2017-02-02"),
    "lastUpdateDate":new Date("2017-02-02"),
    "title":"Facebook",
    "content":"<p>Si vous souhaitez nous faire part de votre avis ou échanger avec la communauté ‘AuXpros’, voici le lien de notre page Facebook. Cliquez en bas à gauche sur l’icône facebook</p>"
})
db.helptopic.insert({
    "id":"help019",
    "creationDate":new Date("2017-02-02"),
    "lastUpdateDate":new Date("2017-02-02"),
    "title":"FAQ",
    "content":"<p>Foire Aux Questions</p>"
})
db.helptopic.insert({
    "id":"help020",
    "creationDate":new Date("2017-02-02"),
    "lastUpdateDate":new Date("2017-02-02"),
    "title":"Filtre",
    "content":"<p>les filtres vous permettent de préciser votre recherche</p>"
})
db.helptopic.insert({
    "id":"help021",
    "creationDate":new Date("2017-02-02"),
    "lastUpdateDate":new Date("2017-02-02"),
    "title":"Identifiant",
    "content":"<p>Il est important de noter l’adresse mail avec laquelle vous vous identifiez. En cas d’oubli ou de perte d’identifiant vous devrez à nouveau recréer votre <b>compte</b></p>"
})
db.helptopic.insert({
    "id":"help022",
    "creationDate":new Date("2017-02-02"),
    "lastUpdateDate":new Date("2017-02-02"),
    "title":"Imprimer mon planning",
    "content":"<p>Si vous souhaitez voir vos heures de travail sur support papier vous pouvez “imprimer votre planning” . Dans l’onglet planning cliquez sur “imprimer mon planning”.</p>"
})
db.helptopic.insert({
    "id":"help023",
    "creationDate":new Date("2017-02-02"),
    "lastUpdateDate":new Date("2017-02-02"),
    "title":"Indisponibilité",
    "content":"<p>Période horaire ou journalière pendant laquelle vous n'êtes pas en mesure de travailler.</p><p>Pour ajouter: cliquez sur “ajouter une indisponibilité” une indisponibilité: indiquer la périodicité (Une seule date/ hebdomadaire/  Une semaine sur deux / une semaine sur trois / une semaine sur quatre), vos dates d’indisponibilités (jours / mois / année) ainsi que le nombre d’heure. Pour valider vos indisponibilités, n’oubliez pas de cliquez sur “enregistrer modifications”.</p><p>Pour Modifier ou supprimer: une indisponibilité faites un clic gauche sur le jour pour ouvrir une fenêtre à droite, ensuite supprimé (X) ou modifié (le crayon) comme vous le désirez</p>"
})
db.helptopic.insert({
    "id":"help024",
    "creationDate":new Date("2017-02-02"),
    "lastUpdateDate":new Date("2017-02-02"),
    "title":"Intervention",
    "content":"<p>Une intervention est une offre de prestation attribuée et validée par le SAP à une auxiliaire de vie pour prendre en charge un Usager, elle devient formelle après la signature du contrat de travail.</p>"
})
db.helptopic.insert({
    "id":"help025",
    "creationDate":new Date("2017-02-02"),
    "lastUpdateDate":new Date("2017-02-02"),
    "title":"Profil (Auxiliaire)",
    "content":"<p>Pour avoir accès aux données de votre compte, cliquez sur “profil”. Cette rubrique se décompose en 4 sous-parties :</p><ul><li>“Mes informations personnelles” : vos coordonnées personnelles</li><li>“mes informations professionnelles”: vos compétences, vos plus, vos diplomes</li><li>“Ma photo” : cette sous-partie vous permet d’ajouter une photo</li><li>“Mon compte Auxpros” : Vous pouvez effectuer plusieurs modifications dans cette sous-partie (Modifier votre adresse électronique / modifier votre mot de passe / souscrire un abonnement AUXPROS => Ceci vous permettra d’accéder au système de matching).</li></ul></p>"
})
db.helptopic.insert({
    "id":"help026",
    "creationDate":new Date("2017-02-02"),
    "lastUpdateDate":new Date("2017-02-02"),
    "title":"Profil (SAP)",
    "content":"<p>Pour avoir accès aux données de votre Service d’aide à domicile, cliquez sur “Informations”. Cette rubrique se décompose en 3 sous-parties :</p><ul><li>“Mon profil” : cette sous-partie concerne le profil de votre entreprise (raison sociale/ fonctionnement / numéro de SIRET / Adresse)</li><li>“Ma photo” : cette sous-partie vous permet d’ajouter une photo ou votre logo sur votre compte Auxpros.</li><li>“Mon compte Auxpros” : Vous pouvez effectuer plusieurs modifications dans cette sous-partie (Modifier votre adresse électronique / modifier votre mot de passe / souscrire un abonnement AUXPROS => Ceci vous permettra d’accéder au système de matching).</li></ul></p>"
})
db.helptopic.insert({
    "id":"help027",
    "creationDate":new Date("2017-02-02"),
    "lastUpdateDate":new Date("2017-02-02"),
    "title":"Matching",
    "content":"<p>Action qui permet de trouver les auxiliaires qui correspondent le mieux à la demande de l’Usager (entre un SAP et un(e) AUX).</p><p>Pour matcher, cliquez sur l’éclair, une liste d’auxiliaires candidat est proposée. vous cliquez sur un ou plusieurs de ces candidats. une fois vos candidats sélectionnés appuyez sur “envoyer” de manière à ce qu’ils reçoivent votre offre.</p><p>ATTENTION !! votre compte (SAP ou AUX) doit être enregistré en tant que “compte premium” pour permettre cette action de “matching”.</p>"
})
db.helptopic.insert({
    "id":"help028",
    "creationDate":new Date("2017-02-02"),
    "lastUpdateDate":new Date("2017-02-02"),
    "title":"Matching en cours",
    "content":"<p>La demande de service a bien été envoyé, mais les auxiliaires n’ont pas encore répondu à la demande.</p>"
})
 db.helptopic.insert({
    "id":"help029",
    "creationDate":new Date("2017-02-02"),
    "lastUpdateDate":new Date("2017-02-02"),
    "title":"Modifier (Zone)",
    "content":"<p>Pour modifier une zone, placez vous sur l'icône (verte) de la zone que vous voulez modifier, faite un clic gauche, une fenêtre s’ouvre à droite de votre écran pour que vous puissiez modifier</p>"
})
db.helptopic.insert({
    "id":"help030",
    "creationDate":new Date("2017-02-02"),
    "lastUpdateDate":new Date("2017-02-02"),
    "title":"Modifier (Compte)",
    "content":"<p>Dans cette rubrique vous pourrez modifier plusieurs éléments : (Votre adresse mail, votre mot de passe, votre abonnement AuXpros et vos paramètres de notification).</p>"
})
db.helptopic.insert({
    "id":"help031",
    "creationDate":new Date("2017-02-02"),
    "lastUpdateDate":new Date("2017-02-02"),
    "title":"Mot de passe",
    "content":"<p>le mot de passe vous permet de sécuriser votre compte et d’être la seule personne avec la plate forme AuXpros à pouvoir y accéder. Si vous le perdez vous pouvez en refaire la demande en cliquant sur “mot de passe oublié”, puis “changer de mot de passe”. Un mail est envoyé sur votre adresse de messagerie comprenant un lien. Cliquez dessus et vous serez redirigé sur AuXpros, cliquez sur la page et remplissez les champs pour remettre un mot de passe et enregistrez.</p>"
})
db.helptopic.insert({
    "id":"help032",
    "creationDate":new Date("2017-02-02"),
    "lastUpdateDate":new Date("2017-02-02"),
    "title":"Notification",
    "content":"<p>Les paramètres de notification vous permettent de recevoir des offres en temps réel, par mail ou par sms. Faites attention d’avoir une connexion suffisamment élevé de manière à pouvoir recevoir ces alertes.</p>"
})
db.helptopic.insert({
    "id":"help033",
    "creationDate":new Date("2017-02-02"),
    "lastUpdateDate":new Date("2017-02-02"),
    "title":"Offres",
    "content":"<p>Lorsqu’un SAP souhaite collaborer avec un(e) auxiliaire de vie, une offre de <b>prestation</b> (sur la <b>map</b>) est envoyée sur le profil de l’auxiliaire, lorsque l’offre est attribuée et validée par le <b>SAP</b>, elle devient <b>intervention</b>.</p><p>L’Auxiliaire pour consulter ses offres clique  sur l’onglet “Offres”.</p><p>Il existe 5 statuts d’offres : Toutes; <b>Attente (offre en)</b>; <b>Confirmées (offres)</b>; <b>Rejetées (offres)</b>.</p>"
})
db.helptopic.insert({
    "id":"help034",
    "creationDate":new Date("2017-02-02"),
    "lastUpdateDate":new Date("2017-02-02"),
    "title":"Photo AUX",
    "content":"<p>Pour mettre sa photo en ligne.</p><p>Connectez vous à Auxpros  avec votre smartphone ou votre tablette. Allez sur l’onglet profil puis modifier ma photo. Cliquez sur “choisir un fichier”. Faites un selfie et suivez les instructions de votre appareil. Cliquez sur envoyer, puis sur OK. Ne pas oublier d’enregistrer avant de quitter la page.</p>"
})
db.helptopic.insert({
    "id":"help035",
    "creationDate":new Date("2017-02-02"),
    "lastUpdateDate":new Date("2017-02-02"),
    "title":"Photo SAP",
    "content":"<p>“Ma photo” : cette sous-partie vous permet d’ajouter une photo, une image ou un logo principal sur votre compte AuXpros. Pour mettre le fichier en ligne.</p><p>parmi vos fichiers image d’ordinateur, une fois sélectionné, cliquez sur envoyer le fichier, puis sur ok. Ne pas oublier d’enregistrer avant de quitter la page.</p>"
})
db.helptopic.insert({
    "id":"help036",
    "creationDate":new Date("2017-02-02"),
    "lastUpdateDate":new Date("2017-02-02"),
    "title":"Planning",
    "content":"<p>Il permet de visualiser vos <b>indisponibilités</b> (en orange), vos interventions planifiées (en bleu) et vos interventions <b>réalisées</b> (en vert). Pour mettre à jour au mieux votre planning.</p>"
})
db.helptopic.insert({
    "id":"help037",
    "creationDate":new Date("2017-02-02"),
    "lastUpdateDate":new Date("2017-02-02"),
    "title":"Prémium",
    "content":"<p>Statut d’un compte parfaitement renseigné qui permet d'accéder à l’ensemble des services  d’AuXpros</p>"
})
db.helptopic.insert({
    "id":"help038",
    "creationDate":new Date("2017-02-02"),
    "lastUpdateDate":new Date("2017-02-02"),
    "title":"Prestations",
    "content":"<p>Lorsque vous avez créé un <b>Usager</b>, vous avez renseigné ses besoins, pour pouvoir lui attribuer un(e) auxiliaire de vie, pour lancer le matching avec des auxiliaires de vie vous devez créer une prestation. Cliquez sur la rubrique <b>“interventions”</b> puis cliquez sur “Saisir une <b>prestation</b>”.</p><p>Cliquez sur “saisir une nouvelle intervention”. Veillez à bien renseigner tous les différents champs. Choisissez un <b>Usager</b>, une périodicité, une date de début et de fin, et le créneaux horaire. S’il y a plusieurs créneaux horaires dans la même journée, vous devez créer une autre prestation.</p><p>Une prestation attribuée et validée devient une <b>intervention</b></p>"
})
db.helptopic.insert({
    "id":"help039",
    "creationDate":new Date("2017-02-02"),
    "lastUpdateDate":new Date("2017-02-02"),
    "title":"Questionnaire",
    "content":"<p>Le questionnaire détermine vos compétences (entretien maison, aide petite enfance, courses & aides au repas, nursing, dame de compagnie & promenades, aide administrative, petit bricolage). Un seul choix est possible par question et vous devez répondre à toutes les questions pour pouvoir valider vos compétences.</p><p>une fois le questionnaire rempli et enregistré vous ne pouvez plus le modifier sans en faire la demande à AuXpros dans “contactez-nous”</p>"
})
db.helptopic.insert({
    "id":"help040",
    "creationDate":new Date("2017-02-02"),
    "lastUpdateDate":new Date("2017-02-02"),
    "title":"Rechercher un soutien à domicile",
    "content":"<p>Pour rechercher un soutien à domicile, vous pouvez cliquez sur le lien de la DGE (Direction Générale des Entreprises)</p>"
})
db.helptopic.insert({
    "id":"help041",
    "creationDate":new Date("2017-02-02"),
    "lastUpdateDate":new Date("2017-02-02"),
    "title":"Rejetées (offres)",
    "content":"<p>Offre acceptée par l'auxiliaire mais rejetée par le SAP car une autre auxiliaire a été retenue.</p>"
})
db.helptopic.insert({
    "id":"help042",
    "creationDate":new Date("2017-02-02"),
    "lastUpdateDate":new Date("2017-02-02"),
    "title":"SAP",
    "content":"<p>Service d’Aide à Domicile</p>"
})
db.helptopic.insert({
    "id":"help043",
    "creationDate":new Date("2017-02-02"),
    "lastUpdateDate":new Date("2017-02-02"),
    "title":"Se connecter",
    "content":"<p>Pour accéder à votre compte et aux fonctionnalités de la plateforme AuXpros, Veillez à bien renseigner les champs suivants ( Adresse électronique , mot de passe), une fois ces champs renseignés cliquez sur ‘connexion’ pour avoir accès à votre profil.</p>"
})
db.helptopic.insert({
    "id":"help044",
    "creationDate":new Date("2017-02-02"),
    "lastUpdateDate":new Date("2017-02-02"),
    "title":"Soutien (à domicile)",
    "content":"<p>Il s’agit du lien de la DGE et plus particulièrement celui de son annuaire des organismes d’aides à la personne. Ce lien est plus spécialement destiné aux <b>Usagers</b>, qui se connecteraient à la plate-forme à la recherche d’un service d’Aide à la personne.</p>"
})
db.helptopic.insert({
    "id":"help045",
    "creationDate":new Date("2017-02-02"),
    "lastUpdateDate":new Date("2017-02-02"),
    "title":"Supprimer",
    "content":"<p>Lorsque vous voulez supprimer un élément que vous avez créé, vous devez en général, cliquez sur l’élément ( zone, prestations, utilisateur, offre) cliquez sur la croix </p>"
})
db.helptopic.insert({
    "id":"help046",
    "creationDate":new Date("2017-02-02"),
    "lastUpdateDate":new Date("2017-02-02"),
    "title":"Téléchargement",
    "content":"<p>Pour mettre en ligne votre diplôme ou sa photo reportez vous aux rubriques photo ou diplôme.</p>"
})
db.helptopic.insert({
    "id":"help047",
    "creationDate":new Date("2017-02-02"),
    "lastUpdateDate":new Date("2017-02-02"),
    "title":"Usagers",
    "content":"<p>La rubrique Usagers vous permet de rechercher ou de saisir un nouvel usager (l’usager correspond à des clients de SAP).</p><p>Pour créer un usager, cliquez sur “saisir un nouvel usager”,Vous devez ensuite saisir l’ensemble des champs de la page pour vous permettre de créer ensuite une <b>prestation</b> qui puisse <b>matcher</b>.</p>"
})
db.helptopic.insert({
    "id":"help048",
    "creationDate":new Date("2017-02-02"),
    "lastUpdateDate":new Date("2017-02-02"),
    "title":"Zone",
    "content":"<p>Cet onglet vous permet d’accéder à une map (carte) sur laquelle vous allez pouvoir renseigner les endroits où vous désirez travailler.</p><p>Pour pouvoir recevoir des offres, vous devez définir une zone au moins et trois au plus.</p><p>Pour créer une zone, cliquez sur “ajouter une zone”, ceci vous permet de “saisir une zone d’intervention”. Deux choix s’offrent à vous: en cliquant sur le bouton “type” vous pouvez choisir votre zone par la ville ou arrondissement (code postal) ou saisir une adresse et définir ensuite un périmètre d’action (en mètres) autour de cette adresse. Le périmètre d’action est défini par un cercle rouge.</p><ul><li>Si vous désirez modifier vos souhaits de zone d’interventions, vous pouvez supprimer votre zone en cliquant sur la zone en question, cliquez ensuite sur la croix pour supprimer la zone.</li><li>A l’aide des filtres mis à votre disposition vous pouvez améliorer la lisibilité de vos recherches</li></ul>"
})
db.helptopic.insert({
    "id":"help49",
    "creationDate":new Date("2017-02-02"),
    "lastUpdateDate":new Date("2017-02-02"),
    "title":"Expirée (offres)",
    "content":"<p>L’offre du SAP a expirée et n'est plus valide.</p>"
})
db.helptopic.insert({
    "id":"help50",
    "creationDate":new Date("2017-02-02"),
    "lastUpdateDate":new Date("2017-02-02"),
    "title":"Déclinée (offres)",
    "content":"<p>L’offre du SAP a été envoyée et déclinée par l'auxiliaire.</p>"
})


/* ****************************************************************************************
 * DB-HELPFAQ
 */
db.helpfaq.insert({
    "id":"faq00",
    "creationDate":new Date("2017-02-02"),
    "lastUpdateDate":new Date("2017-02-02"),
    "title":"La complémentaire santé",
    "content":"<p>les <b>travailleurs à temps partiel</b> : si le contrat est d’une durée inférieure à un an ou si la cotisation de la complémentaire santé excède 10% de la rémunération brute, le salarié est éligible à une dispense. Dans les faits, pour les <b>travailleurs multi-employeurs</b>, l’acceptation de la couverture d’un des employeurs permet la dispense pour les autres.</p><p>A noter, également, que le salarié peut renoncer à la complémentaire santé de son entreprise si cette dernière a été mise en place par une décision unilatérale de l’employeur alors qu’il était déjà employé de cette entreprise (renonciation avec une participation financière du salarié).</p>"
})
db.helpfaq.insert({
    "id":"faq01",
    "creationDate":new Date("2017-02-02"),
    "lastUpdateDate":new Date("2017-02-02"),
    "title":"Le salarié multi employeur",
    "content":"<h4>Définition :</h4><p>Le salarié multi-employeur est un salarié qui est employé dans plusieurs entreprises à la fois.</p><p>Ce salarié peut cumuler plusieurs contrats de travail à temps partiel, ou un contrat à temps plein avec un contrat à temps partiel, ou encore être embauché par un groupement d’employeurs.</p><p>Dans ce cas, l’ensemble des règles relatives à l’exercice d’une activité salarié s’appliquent mais doivent être adaptées.</p><p>Par ailleurs, il faut souligner qu’un salarié peut parfaitement cumuler des activités salariées et non salariées étant précisé que la limitation de la durée du travail ne s’applique dans ce cas qu’à l’activité salariée et non au cumul des deux activités. Toutefois, des interdictions de cumul d’emplois peuvent être prévues par des dispositions conventionnelles ; c’est notamment l’objet des clauses d’exclusivité.</p><h4>Respect des durées maximales du travail :</h4><p>Le salarié qui cumule plusieurs emplois doit respecter les règles relatives à la durée maximale du travail sauf quand le cumul résulte des cas suivants :</p><ul><li>Cumul avec des travaux d’ordre scientifique, littéraire ou artistique et concours apportés aux œuvres d’intérêt général, notamment d’enseignement, d’éducation ou de bienfaisance ;</li><li>Cumul avec des travaux ménagers de peu d’importance effectués chez des particuliers pour leurs besoins personnels ;</li><li>Cumul avec des travaux d’extrême urgence dont l’exécution immédiate est nécessaire pour prévenir des accidents imminents ou organiser des mesures de sauvetage ;</li><li>Cumul avec des travaux effectués pour son propre compte ou à titre gratuit sous forme d’une entraide bénévole.</li></ul><p>En dehors de ces hypothèses, les durées maximales d’emploi sont :</p><ul><li>10 heures par jour (avec 11 heures de repos continu entre deux journées),</li><li>44 heures de moyenne sur 12 semaines (48 heures sur une seule semaine),</li><li>6 jours par semaine calendaire.</li></ul><p>En cas de dépassement, l’employeur, comme le salarié, peuvent être sanctionnés d’une amende pénale de 4e ou 5e catégorie.</p><p>C’est la raison pour laquelle l’employeur qui embauche un salarié déjà titulaire d’un contrat de travail à temps partiel ou à temps plein doit impérativement veiller à s’informer sur les durées exactes de travail de son salarié.</p><p>En pratique, un salarié ayant un contrat à 20 heures, ne pourra s’engager à plus de 24 heures pour un emploi régulier et chaque employeur devra veiller à ne pas lui demander d’effectuer, sur une semaine, plus de 4 heures de travail au-delà de l’horaire normal de manière à ce que le salarié ne dépasse pas les 48 heures de travail par semaine sur une semaine isolée.</p><p><i>Non-respect des durées maximales du travail</i></p><p>En cas de cumul d’emplois entraînant un dépassement de la durée maximale du travail, le salarié doit régulariser sa situation en choisissant entre ses deux emplois.</p><p>L’inertie du salarié à régulariser sa situation autorise l’employeur à engager une procédure de licenciement pour faute grave.</p><p><i>Clause de non concurrence et d’exclusivité</i></p><p>Il ne faut pas confondre clause de non concurrence et clause d’exclusivité.</p><p>Les contrats de travail des salariés à temps partagé peuvent parfaitement prévoir une clause de non concurrence. Mais même si le contrat de travail ne prévoit pas de clause de non concurrence, il faut souligner que le cumul de contrats de travail ne peut pas permettre au salarié de faire concurrence à un de ses employeurs. Un tel comportement constitue en effet un manquement à l’obligation de loyauté du salarié que l’employeur peut sanctionner sans avoir besoin d’arguer de la violation d’une des clauses expresses du contrat de travail.</p><p>En revanche, l’insertion d’une clause d’exclusivité permet simplement d’exiger du salarié qu’il ne s’engage pas dans un autre emploi (salarié ou non salarié).</p><p>Étant donné qu’elle a pour but de limiter le principe de la liberté du travail, l’insertion d’une clause d’exclusivité est, d’une part, interdite dans les contrats de travail à temps partiel, et, d’autre part, dans les contrats de travail à temps complet, la clause d’exclusivité doit, pour être valable, être jugée légitime (Cass. Soc : 25 janvier 2004), c’est-à-dire :</p><ul><li>Être indispensable à la protection des intérêts légitimes de l’entreprise,</li><li>Être justifiée par la nature de la tâche à accomplir,</li><li>Être proportionnée au but recherché.</li></ul><p>En pratique, rares sont les sociétés et les employés remplissant ces trois conditions.</p><p><i>Conséquence sur les heures supplémentaires</i></p><p>Le régime des heures supplémentaires n’est pas applicable au salarié qui cumule plusieurs emplois à temps partiel.</p><p>Le titulaire de plusieurs contrats à temps partiel ne peut comptabiliser que des heures complémentaires. Toutefois, le régime des heures supplémentaires peut trouver à s’appliquer pour un salarié cumulant un contrat de travail à temps plein et un contrat de travail à temps partiel.</p><h4>Autres conséquences</h4><p><b>Congés payés</b></p><p>L’ordre des départs en congés fixé par l’employeur doit notamment tenir compte de l’activité du salarié chez un ou plusieurs autres employeurs.</p><p><b>Congés spéciaux</b></p><p>Le salarié qui prend un congé parental d’éducation ne peut pendant ce congé exercer une nouvelle activité.</p><p>En revanche s’il est déjà titulaire de deux contrats de travail à temps partiel, il peut prendre un congé parental chez l’un de ses employeurs tout en continuant de travailler chez l’autre.</p><p><b>Calcul des cotisations</b></p><p>Le salarié à employeurs multiples dont la rémunération globale dépasse le plafond peut se voir appliquer une répartition du plafond entre ses différents employeurs.</p><p><a target=\"_blank\" href=\"https://www.urssaf.fr/portail/home/employeur/calculer-les-cotisations/la-base-de-calcul/lassiette-maximale/employeurs-multiples.html\">https://www.urssaf.fr/portail/home/employeur/calculer-les-cotisations/la-base-de-calcul/lassiette-maximale/employeurs-multiples.html</a></p><p><b>Examens médicaux</b></p><p>La visite médicale annuelle effectuée sous la responsabilité du principal employeur vaut pour les autres. S’agissant du temps et des frais de transport nécessités par les examens médicaux obligatoires, ils sont pris en charge par les employeurs du salarié à temps partagé proportionnellement à la rémunération versée par chacun d’entre eux.</p><p><b>Représentation du personnel</b></p><p>Le salarié qui cumule plusieurs emplois salariés peut être électeur dans plusieurs entreprises mais n’est éligible que dans l’une d’elles. En conséquence, il lui appartient de choisir dans laquelle il souhaite se porter candidat.</p>"
})
db.helpfaq.insert({
    "id":"faq02",
    "creationDate":new Date("2017-02-02"),
    "lastUpdateDate":new Date("2017-02-02"),
    "title":"Compétences diplôme Auxiliaire de vie",
    "content":"<table class='table table-hover ap-static-table'><thead><tr><th>Diplôme</th><th>Entretien<br/>Maison</th><th>Aide<br/>petite enfance</th><th>Courses<br/>aide au repas</th><th>Nursing</th><th>Dame de<br/>compagnie</th><th>Aide<br/>administrative</th><th>Petit<br/>bricolage</th></tr></thead><tbody><tr><td>DEAF<br/>(Diplôme d'Etat d'Auxiliaire Familial)</td><td><span class='glyphicon glyphicon-ok' /></td><td><span class='glyphicon glyphicon-ok' /></td><td></td><td></td><td><span class='glyphicon glyphicon-ok' /></td><td><span class='glyphicon glyphicon-ok' /></td><td></td></tr><tr><td>ADVF<br/>(Assistant De Vie aux Familles)</td><td><span class='glyphicon glyphicon-ok' /></td><td><span class='glyphicon glyphicon-ok' /></td><td><span class='glyphicon glyphicon-ok' /></td><td></td><td><span class='glyphicon glyphicon-ok' /></td><td><span class='glyphicon glyphicon-ok' /></td><td><span class='glyphicon glyphicon-ok' /></td></tr><tr><td>AAPAPD<br/>(Agent d'accompagnement auprès des personnes âgées et des personnes dépendantes)</td><td><span class='glyphicon glyphicon-ok' /></td><td></td><td><span class='glyphicon glyphicon-ok' /></td><td><span class='glyphicon glyphicon-ok' /></td><td><span class='glyphicon glyphicon-ok' /></td><td><span class='glyphicon glyphicon-ok' /></td><td><span class='glyphicon glyphicon-ok' /></td></tr><tr><td>Auxiliaire de gérontologie</td><td></td><td></td><td><span class='glyphicon glyphicon-ok' /></td><td></td><td><span class='glyphicon glyphicon-ok' /></td><td><span class='glyphicon glyphicon-ok' /></td><td></td></tr><tr><td>Assistant(e) technique en miliieu familial et collectif</td><td><span class='glyphicon glyphicon-ok' /></td><td><span class='glyphicon glyphicon-ok' /></td><td><span class='glyphicon glyphicon-ok' /></td><td></td><td><span class='glyphicon glyphicon-ok' /></td><td></td><td></td></tr><tr><td>Titre pro Agent(e) de propreté de d'hygiène</td><td><span class='glyphicon glyphicon-ok' /></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td>Assistant(e) de vie dépendance</td><td><span class='glyphicon glyphicon-ok' /></td><td><span class='glyphicon glyphicon-ok' /></td><td><span class='glyphicon glyphicon-ok' /></td><td><span class='glyphicon glyphicon-ok' /></td><td><span class='glyphicon glyphicon-ok' /></td><td><span class='glyphicon glyphicon-ok' /></td><td><span class='glyphicon glyphicon-ok' /></td></tr><tr><td>Assistant(e) maternel(le) / Garde d'enfants</td><td></td><td><span class='glyphicon glyphicon-ok' /></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td>Employé familial</td><td><span class='glyphicon glyphicon-ok' /></td><td><span class='glyphicon glyphicon-ok' /></td><td><span class='glyphicon glyphicon-ok' /></td><td></td><td></td><td><span class='glyphicon glyphicon-ok' /></td><td><span class='glyphicon glyphicon-ok' /></td></tr><tr><td>Auxiliaire paramédical</td><td></td><td><span class='glyphicon glyphicon-ok' /></td><td><span class='glyphicon glyphicon-ok' /></td><td><span class='glyphicon glyphicon-ok' /></td><td><span class='glyphicon glyphicon-ok' /></td><td></td><td></td></tr><tr><td>DEAMP<br/>(Diplôme d'Etat Aide médico-psychologique)</td><td></td><td><span class='glyphicon glyphicon-ok' /></td><td><span class='glyphicon glyphicon-ok' /></td><td><span class='glyphicon glyphicon-ok' /></td><td><span class='glyphicon glyphicon-ok' /></td><td></td><td></td></tr><tr><td>Mention complémentaire Aide a Domicile</td><td><span class='glyphicon glyphicon-ok' /></td><td><span class='glyphicon glyphicon-ok' /></td><td><span class='glyphicon glyphicon-ok' /></td><td></td><td><span class='glyphicon glyphicon-ok' /></td><td><span class='glyphicon glyphicon-ok' /></td><td></td></tr><tr><td>Surveillant(e) - visiteur(e) de nuit en secteur social et médico-social</td><td><span class='glyphicon glyphicon-ok' /></td><td></td><td><span class='glyphicon glyphicon-ok' /></td><td><span class='glyphicon glyphicon-ok' /></td><td></td><td></td><td></td></tr><tr><td>DEAVS<br/>(Diplôme d'Etat d'Auxiliaire de Vie Sociale)</td><td><span class='glyphicon glyphicon-ok' /></td><td><span class='glyphicon glyphicon-ok' /></td><td><span class='glyphicon glyphicon-ok' /></td><td><span class='glyphicon glyphicon-ok' /></td><td><span class='glyphicon glyphicon-ok' /></td><td><span class='glyphicon glyphicon-ok' /></td><td><span class='glyphicon glyphicon-ok' /></td></tr><tr><td>BEP Accompagnements, soins et services à la personne</td><td><span class='glyphicon glyphicon-ok' /></td><td><span class='glyphicon glyphicon-ok' /></td><td><span class='glyphicon glyphicon-ok' /></td><td><span class='glyphicon glyphicon-ok' /></td><td><span class='glyphicon glyphicon-ok' /></td><td><span class='glyphicon glyphicon-ok' /></td><td></td></tr><tr><td>DEAES<br/>(Diplôme d'Etat d'Accompagnant Educatif et Social)</td><td><span class='glyphicon glyphicon-ok' /></td><td><span class='glyphicon glyphicon-ok' /></td><td><span class='glyphicon glyphicon-ok' /></td><td><span class='glyphicon glyphicon-ok' /></td><td><span class='glyphicon glyphicon-ok' /></td><td><span class='glyphicon glyphicon-ok' /></td><td></td></tr></tbody></table>"
})
db.helpfaq.insert({
    "id":"faq03",
    "creationDate":new Date("2017-02-02"),
    "lastUpdateDate":new Date("2017-02-02"),
    "title":"Abréviation diplôme Auxiliaire de vie",
    "content":"<table class='table table-hover'><thead><tr><th>Abréviation du diplôme</th><th>Intitulé du diplôme</th></tr></thead><tbody><tr><td>DEAF</td><td>DEAF<br/>(Diplôme d'Etat d'Auxiliaire Familial)</td></tr><tr><td>ADVF</td><td>ADVF<br/>(Assistant De Vie aux Familles)</td></tr><tr><td>AAPAPD</td><td>AAPAPD<br/>(Agent d'accompagnement auprès des personnes âgées et des personnes dépendantes)</td></tr><tr><td>DEAMP</td><td>DEAMP<br/>(Diplôme d'Etat Aide médico-psychologique)</td></tr><tr><td>DEAVS</td><td>DEAVS<br/>(Diplôme d'Etat d'Auxiliaire de Vie Sociale)</td></tr><tr><td>DEAES</td><td>DEAES<br/>(Diplôme d'Etat d'Accompagnant Educatif et Social)</td></tr></tbody></table>"
})
db.helpfaq.insert({
    "id":"faq04",
    "creationDate":new Date("2017-02-02"),
    "lastUpdateDate":new Date("2017-02-02"),
    "title":"Formations prises en charge",
    "content":"<table class='table table-hover ap-static-table'><thead><tr><th>Intitulé du diplôme</th><th>Abréviation<br/>du diplôme</th><th>Formation<br/>payante</th><th>Formation<br/>gratuite</th></tr></thead><tbody><tr><td>DEAF<br/>(Diplôme d'Etat d'Auxiliaire Familial)</td><td>DEAF</td><td><span class='glyphicon glyphicon-ok' /></td><td><span class='glyphicon glyphicon-ok' /></td></tr><tr><td>ADVF<br/>(Assistant De Vie aux Familles)</td><td>ADVF</td><td><span class='glyphicon glyphicon-ok' /></td><td><span class='glyphicon glyphicon-ok' /></td></tr><tr><td>AAPAPD<br/>(Agent d'accompagnement auprès des personnes âgées et des personnes dépendantes)</td><td>AAPAPD</td><td><span class='glyphicon glyphicon-ok' /></td><td><span class='glyphicon glyphicon-ok' /></td></tr><tr><td>Auxiliaire de gérontologie</td><td></td><td><span class='glyphicon glyphicon-ok' /></td><td><span class='glyphicon glyphicon-ok' /></td></tr><tr><td>Assistant(e) technique en miliieu familial et collectif</td><td></td><td><span class='glyphicon glyphicon-ok' /></td><td><span class='glyphicon glyphicon-ok' /></td></tr><tr><td>Titre pro Agent(e) de propreté de d'hygiène</td><td></td><td></td><td><span class='glyphicon glyphicon-ok' /></td></tr><tr><td>Assistant(e) de vie dépendance</td><td></td><td></td><td><span class='glyphicon glyphicon-ok' /></td></tr><tr><td>Assistant(e) maternel(le) / Garde d'enfants</td><td></td><td><span class='glyphicon glyphicon-ok' /></td><td><span class='glyphicon glyphicon-ok' /></td></tr><tr><td>Employé familial</td><td></td><td></td><td><span class='glyphicon glyphicon-ok' /></td></tr><tr><td>Auxiliaire paramédical</td><td></td><td><span class='glyphicon glyphicon-ok' /></td><td><span class='glyphicon glyphicon-ok' /></td></tr><tr><td>DEAMP<br/>(Diplôme d'Etat Aide médico-psychologique)</td><td>DEAMP</td><td><span class='glyphicon glyphicon-ok' /></td><td><span class='glyphicon glyphicon-ok' /></td></tr><tr><td>Mention complémentaire Aide a Domicile</td><td></td><td></td><td><span class='glyphicon glyphicon-ok' /></td></tr><tr><td>Surveillant(e) - visiteur(e) de nuit en secteur social et médico-social</td><td></td><td><span class='glyphicon glyphicon-ok' /></td><td><span class='glyphicon glyphicon-ok' /></td></tr><tr><td>DEAVS<br/>(Diplôme d'Etat d'Auxiliaire de Vie Sociale)</td><td>DEAVS</td><td><span class='glyphicon glyphicon-ok' /></td><td><span class='glyphicon glyphicon-ok' /></td></tr><tr><td>BEP Accompagnements, soins et services à la personne</td><td></td><td><span class='glyphicon glyphicon-ok' /></td><td><span class='glyphicon glyphicon-ok' /></td></tr><tr><td>DEAES<br/>(Diplôme d'Etat d'Accompagnant Educatif et Social)</td><td>DEAES</td><td><span class='glyphicon glyphicon-ok' /></td><td><span class='glyphicon glyphicon-ok' /></td></tr></tbody></table>"
})