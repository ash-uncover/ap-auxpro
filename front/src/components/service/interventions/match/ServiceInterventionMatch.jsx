import React from 'react'
import ServiceInterventionMatchData from './ServiceInterventionMatchData'
import './ServiceInterventionMatch.scss'

import { Button, Panel, Form, Grid, List, TextUtils } from 'ap-react-bootstrap'

import AuxiliaryMatchListItem from 'components-lib/AuxiliaryListItem/AuxiliaryMatchListItem'
import Text from 'components-lib/Text/Text'

import CustomerUtils from 'utils-lib/entities/CustomerUtils'
import InterventionUtils from 'utils-lib/entities/InterventionUtils'

class ServiceInterventionMatch extends React.Component {

	constructor(props) {
		super(props)
		this.state = {}
		this.buildMatches = this._buildMatches.bind(this)
	}

	componentWillMount() {
		ServiceInterventionMatchData.register(this, this.props.params.interventionId)
	}

	componentWillUnmount() {
		ServiceInterventionMatchData.unregister()
	}


	// Rendering functions //
	// --------------------------------------------------------------------------------

	_buildMatches(match) {
		let active = this.state.selected.indexOf(match.auxiliaryId) !== -1
		return (
			<AuxiliaryMatchListItem 
				key={match.auxiliaryId}
				auxiliaryId={match.auxiliaryId}
				geoScore={match.geoScore}
				timeScore={match.timeScore}
				skillScore={match.skillScore}
				active={active}
				onClick={this.onClick.bind(this, match.auxiliaryId)} />
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
								Infos usager
							</Panel.Header>
							<Panel.Body>
								<p><b>{CustomerUtils.getFullName(this.state.customer)}</b></p>
								<p>{this.state.customer.address}<br/>{CustomerUtils.getShortAddress(this.state.customer)}</p>
							</Panel.Body>
							<Panel.Footer>
							</Panel.Footer>
						</Panel>
					</Grid.Col>
					<Grid.Col sm={6}>
						<Panel>
							<Panel.Header>
								Infos interventions
							</Panel.Header>
							<Panel.Body>
								<Text text={InterventionUtils.getText(this.state.intervention)} />
							</Panel.Body>
							<Panel.Footer>
							</Panel.Footer>
						</Panel>
					</Grid.Col>
				</Grid.Row>
				<Panel> 
					<Panel.Header>
						Résultats matching
					</Panel.Header>
					<Panel.Body>
						{this.state.matches.length === 0 ?
							"Aucune auxiliaire ne correspond à vos critères de recherche."
						:
							"Sélectionnez des auxiliaires de vie pour leur proposer une offre d'intervention."
						}
					</Panel.Body>
					<List.GroupLink>
						{this.state.matches.map(this.buildMatches)}
					</List.GroupLink>
					<Panel.Footer>
					</Panel.Footer>
				</Panel>
				<Button 
					block 
					bsStyle={!this.state.selected.length ? 'default' : 'success'}
					disabled={!this.state.selected.length}
					onClick={this.onSubmit}>
					Envoyer {TextUtils.pluralize('offre', this.state.selected.length)}{ this.state.selected.length ? ' (' + this.state.selected.length + ')' : null }
				</Button>
				<br/>
			</div>
		)
	}

}
export default ServiceInterventionMatch
