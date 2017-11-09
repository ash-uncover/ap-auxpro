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
						<p>Nos services sont :</p>
						<br/>
						<p><b>AuXpros</b> permet aux <b>Auxiliaires de vie</b> qui recherchent du travail ou qui désirent un complément à leurs activités d’être sollicitées en fonction de leurs compétences, de leurs disponibilités, et de la zone d’intervention géographique souhaitée, de se voir proposer par des organismes de services d’aides à la personne des missions correspondantes.</p>
						<br/>
						<p><b>AuXpros</b> permet aux <b>Organismes de services d’aides à la personne</b> de connaitre sur une simple consultation les possibilités de réponse aux demandes d’aides faites par un Usager. Et de solliciter les intervenants de proximité potentiellement disponibles qui leurs paraissent réunir les meilleures aptitudes pour satisfaire les besoins.</p>
						<br/>
						<p><b>AuXpros</b> permet aux <b>Usagers</b> de connaître tous les organismes d’aides à la personnes existants et de sélectionner parmi toutes les offres de services celles qui lui conviendront le mieux</p>
					</Panel.Body>
				</Panel>
			</Grid.Container>
		)
	}

}
export default ServicesService
