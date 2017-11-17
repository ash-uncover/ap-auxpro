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
						<p>S’inscrire sur AuXpros, c’est profiter d’un outil supplémentaire de recrutement<br/>Auxpros vous permet :<br/></p>
						<ul>
							<li>De synthétiser facilement les demandes de vos usagers pour créer la prestation à domicile dont ils ont besoin</li>
							<li>D’interroger une base de données d’auxiliaires de vie disponibles, qualifiés et compétents pour cette mission</li>
							<li>De diminuer les temps de trajet des intervenants sélectionnés, donc de diminuer vos coûts de déplacement</li>
							<li>De faciliter l’accroissement des heures d’interventions des intervenants de mutualiser entre plusieurs organismes partenaires les ressources humaines. Le temps partiel dès lors n’est plus imposé mais choisi par les intervenants.</li>
							<li>De valoriser l’activité de vos intervenants en les rendant pour partie acteurs de leur organisation de travail. Vous optimisez leur temps d’intervention, en diminuant leurs contraintes et leur fatigue</li>
							<li>De diminuer vos coûts de recrutement, en augmentant votre disponibilité auprès des usagers</li>
						</ul>
					</Panel.Body>
				</Panel>
			</Grid.Container>
		)
	}

}
export default ServicesService
