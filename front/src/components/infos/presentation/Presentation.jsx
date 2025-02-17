import React from 'react'
import PresentationData from './PresentationData'
import './Presentation.scss'
import { Panel, Grid } from 'ap-react-bootstrap'

class Presentation extends React.Component {

	constructor(props) {
		super(props)
	}

	componentWillMount() {
		PresentationData.register(this)
	}

	componentWillUnmount() {
		PresentationData.unregister()
	}

	render() {
		return (
			<Grid.Container>
				<Panel className='ap-presentation'>
					<Panel.Header>
						<h2>Qui sommes-nous ?</h2>
					</Panel.Header>
					<Panel.Body>
						<p><b>AuXpros</b> est une plateforme de mise en relation d’organismes d’aides à la personne et d’auxiliaires de vie, née des expériences accumulées et des réflexions constatées d’un dirigeant d’un service d’aide à la personne et d’un contrôleur de gestion.</p>
						<br/>
						<p><b>AuXpros</b> a pour objet de répondre aux attentes importantes des intervenant(e)s et de ceux qui les missionnent chez l’usager.</p>
						<br/>
						<p><b>Des besoins :</b></p>
						<p>Les auxiliaires de vie recherchent des missions sur un périmètre d’interventions réduit et un planning optimiser</p>
						<p>Les Services d’aides à la personne recherchent des intervenant(e)s qui répondent en compétences et en disponibilités aux demandes et aux besoins de leurs usagers.</p>
						<br/>
						<p><b>Nos réponses :</b></p>
						<p>Permettre cette mise en relation grâce à « un matching » qui tient compte à la fois des demandes, des besoins des usagers et des compétences, de la disponibilité des intervenant(e)s ainsi que de leurs zones géographiques d’interventions souhaitées.</p>
						<p>Enfin un outil disponible propre à sécuriser et à soutenir le souhait bien compréhensible de vouloir rester chez soi.</p>	
					</Panel.Body>
				</Panel>
			</Grid.Container>
		)
	}
}
export default Presentation
