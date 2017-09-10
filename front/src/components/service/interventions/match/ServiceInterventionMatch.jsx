import React from 'react'
import ServiceInterventionMatchData from './ServiceInterventionMatchData'
import './ServiceInterventionMatch.scss'

import { Button, Panel, Form, Grid, List } from 'ap-react-bootstrap'

import AuxiliaryMatchListItem from 'components-lib/AuxiliaryMatchListItem/AuxiliaryMatchListItem'

class ServiceInterventionMatch extends React.Component {

	constructor(props) {
		super(props)
	}

	componentWillMount() {
		ServiceInterventionMatchData.register(this, this.props.params.interventionId)
	}

	componentWillUnmount() {
		ServiceInterventionMatchData.unregister()
	}


	// Rendering functions //
	// --------------------------------------------------------------------------------

	buildMatches(match) {
		console.log(match)
		return (
			<AuxiliaryMatchListItem 
				key={match.auxiliaryId}
				auxiliaryId={match.auxiliaryId}
				geoScore={match.geoScore}
				timeScore={match.timeScore}
				skillScore={match.skillScore} />
		)
	}

	render() {
		return (
			<div className='ap-service-intervention-match'>
				<Button 
					block 
					bsStyle='primary'
					onClick={this.onCancel}>
					Retour
				</Button>
				<br/>
				<Grid.Row>
					<Grid.Col sm={6}>
						<Panel>
							<Panel.Header>
							</Panel.Header>
							<Panel.Body>
								Infos usager
							</Panel.Body>
							<Panel.Footer>
							</Panel.Footer>
						</Panel>
					</Grid.Col>
					<Grid.Col sm={6}>
						<Panel>
							<Panel.Header>
							</Panel.Header>
							<Panel.Body>
								Infos interventions
							</Panel.Body>
							<Panel.Footer>
							</Panel.Footer>
						</Panel>
					</Grid.Col>
				</Grid.Row>
				<Panel> 
					<Panel.Header>
						Nouvelle demande de prestation
					</Panel.Header>
					<Panel.Body>
						Sélectionnez des auxiliaires de vie
					</Panel.Body>
					<List.GroupLink>
						{this.state.matches.map(this.buildMatches)}
					</List.GroupLink>
					<Panel.Footer>
					</Panel.Footer>
				</Panel>
				<Button 
					block 
					bsStyle={!this.state.offersSelected ? 'default' : 'success'}
					disabled={!this.state.offersSelected}
					onClick={this.onSubmit}>
					Envoyer offres{ this.state.offersSelected ? ' (' + this.state.offersSelected + ')' : null }
				</Button>
				<br/>
			</div>
		)
	}

}
export default ServiceInterventionMatch
