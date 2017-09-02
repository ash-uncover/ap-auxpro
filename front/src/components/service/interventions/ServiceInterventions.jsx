import React from 'react'
import ServiceInterventionsData from 'components/service/interventions/ServiceInterventionsData'
import './ServiceInterventions.scss'

import { Panel, Form, Grid, Button, Glyphicon, SearchBar, TextUtils } from 'ap-react-bootstrap'

class ServiceInterventions extends React.Component {

	constructor(props) {
		super(props)
	}

	componentWillMount() {
		ServiceInterventionsData.register(this)
	}

	componentWillUnmount() {
		ServiceInterventionsData.unregister()
	}

	render() {
		return (
			<div className='ap-service-interventions'>
				<Button 
					block 
					bsSize='lg'
					bsStyle='primary'
					onClick={this.onCreate}>
					Saisir nouvelle prestation
				</Button>
				<br/>
				<Panel>
					<Panel.Header>
						Demandes de prestation
					</Panel.Header>
					<Panel.Body>
						<Grid.Row>
							{this.buildPrestations()}
						</Grid.Row>
					</Panel.Body>
					<Panel.Footer>
						{this.buildPrestationsNumberLabel()}
					</Panel.Footer>
				</Panel>
				<Panel>
					<Panel.Header>
						Matching en cours
					</Panel.Header>
					<Panel.Body>
						<Grid.Row>
							{this.buildMatchings()}
						</Grid.Row>
					</Panel.Body>
					<Panel.Footer>
						{this.buildMatchingsNumberLabel()}
					</Panel.Footer>
				</Panel>
				<Panel>
					<Panel.Header>
						Interventions en cours
					</Panel.Header>
					<Panel.Body>
						<Grid.Row>
							{this.buildInterventions()}
						</Grid.Row>
					</Panel.Body>
					<Panel.Footer>
						{this.buildInterventionsNumberLabel()}
					</Panel.Footer>
				</Panel>
			</div>
		)
	}

}
export default ServiceInterventions
