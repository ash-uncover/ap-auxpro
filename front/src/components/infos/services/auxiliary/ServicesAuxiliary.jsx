import React from 'react'
import ServicesAuxiliaryData from './ServicesAuxiliaryData'
import './ServicesAuxiliary.scss'

import { Panel, Grid } from 'ap-react-bootstrap'

class ServicesAuxiliary extends React.Component {

	constructor(props) {
		super(props)
	}

	componentWillMount() {
		ServicesAuxiliaryData.register(this)
	}

	componentWillUnmount() {
		ServicesAuxiliaryData.unregister()
	}

	render() {
		return (
			<Grid.Container className='ap-services-auxiliary'>
				<Panel className='ap-services'>
					<Panel.Header>
						<h2>Nos services pour les intervenant(e)s à domicile</h2>
					</Panel.Header>
					<Panel.Body>
						<p>S’inscrire sur AuXpros, c’est recevoir et choisir des offres de travail.<br/>Auxpros vous permet :<br/></p>
						<ul>
							<li>De préciser votre <b>planning</b> de travail selon vos disponibilités et votre organisation familiale</li>
							<li>De <b>définir vos zones d’activité</b> pour réduire vos trajets, d’optimiser votre temps d’interventions à domicile et d’améliorer sensiblement vos conditions de travail</li>
							<li>D’indiquer clairement au SAAD et plus généralement aux services d’aide à la personne qui recrutent des auxiliaires de vie et des intervenant(e)s pour les particuliers, vos plus, vos qualités spécifiques et vos <b>compétences</b></li>
							<li>De profiter d’un <b>statut salarial</b> avec ses avantages conventionnels</li>
							<li>D’accéder à la <b>formation professionnelle</b>, d’emprunter des passerelles entre les différents métiers des services à la personne, et d’envisager une évolution de votre carrière</li>
						</ul>
					</Panel.Body>
				</Panel>
			</Grid.Container>
		)
	}

}
export default ServicesAuxiliary
