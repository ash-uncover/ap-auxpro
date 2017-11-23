import React from 'react'
import ServicesServiceData from './ServicesServiceData'
import './ServicesService.scss'

import { Panel, Grid } from 'ap-react-bootstrap'

class ServicesService extends React.Component {

	constructor(props) {
		super(props)
	}

	componentWillMount() {
		ServicesServiceData.register(this)
	}

	componentWillUnmount() {
		ServicesServiceData.unregister()
	}

	render() {
		return (
			<Grid.Container className='ap-services-service'>
				<Panel>
					<Panel.Header>
						<h2>Nos services pour les services d'aide à la personne</h2>
					</Panel.Header>
					<Panel.Body>
						<p>S’inscrire sur AuXpros, c’est profiter d’un outil supplémentaire de recrutement<br/>AuXpros vous permet :<br/></p>
						<ul>
							<li>De synthétiser <b>facilement</b> les demandes de vos usagers pour créer la prestation dont ils ont besoin</li>
							<li>D’interroger une base de données d'intervenant(e)s <b>disponibles</b>, qualifié(e)s et compétent(e)s pour cette mission</li>
							<li>De diminuer les temps de trajet des intervenant(e)s sélectionné(e)s, donc <b>d'abaisser vos coûts de déplacement</b></li>
							<li>De mutualiser entre plusieurs organismes partenaires les ressources humaines. <b>Le temps partiel dès lors n’est plus imposé mais choisi par les intervenant(e)s.</b></li>
							<li>De valoriser l’activité de vos intervenant(e)s en les rendant pour partie acteurs/actrices de leur organisation de travail. <b>Vous optimisez leur temps d’intervention</b>, en diminuant leurs contraintes et leur fatigue</li>
							<li>De <b>diminuer vos charges et le temps consacré au recrutement</b>, et accroître sensiblement votre disponibilité à la recherche de nouveaux prospects</li>
						</ul>
					</Panel.Body>
				</Panel>
			</Grid.Container>
		)
	}

}
export default ServicesService
