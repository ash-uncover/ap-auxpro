import React from 'react'
import AuxiliaryPlaningData from './AuxiliaryPlaningData'
import './AuxiliaryPlaning.scss'

import { Grid, Panel, Form, Button, Calendar } from 'ap-react-bootstrap'

class AuxiliaryPlaning extends React.Component {

	constructor(props) {
		super(props)
	}

	componentWillMount() {
		AuxiliaryPlaningData.register(this)
	}

	componentWillUnmount() {
		AuxiliaryPlaningData.unregister()
	}

	render() {
		console.log(this.state)
		return (
			<div className='ap-auxiliary-planing row'>
				<Grid.Col className='hidden-print' sm={2} md={2} lg={3}>
					<Panel>
						<Panel.Header>
							Actions
						</Panel.Header>
						<Panel.Body>
							<Form.Switch text='Voir interventions'/>
							<Form.Switch text='Voir indisponibilités'/>
							<Form horizontal>
								<Form.Group>
									<Form.Label className='col-sm-5 col-md-4'>
										Usager
									</Form.Label>
									<Grid.Col sm={7} md={8}>
										<Form.Select values={[]} />
									</Grid.Col>
								</Form.Group>
								<Form.Group>
									<Form.Label className='col-sm-5 col-md-4'>
										SAD
									</Form.Label>
									<Grid.Col sm={7} md={8}>
										<Form.Select values={[]} />
									</Grid.Col>
								</Form.Group>
								<Form.Group>
									<Form.Label className='col-sm-5 col-md-4'>
										Interventions
									</Form.Label>
									<Grid.Col sm={7} md={8}>
										<Form.Select values={[]} />
									</Grid.Col>
								</Form.Group>
							</Form>
							<Button bsStyle='warning' block>Ajouter une indisponibilité</Button>
							<Button bsStyle='info' block>Imprimer mon planning</Button>
						</Panel.Body>
						<Panel.Footer>
						</Panel.Footer>
					</Panel>
				</Grid.Col>
				<Grid.Col sm={8} md={7} lg={5}>
					<Panel>
						<Panel.Header>
							Planning mensuel
						</Panel.Header>
						<Panel.Body>
							<Calendar 
								specialsInfo={this.state.showMissions ? this.state.missionsPlanned : []}
								specialsSuccess={this.state.showMissions ? this.state.missionsCompleted : []}
								specialsDanger={this.state.showMissions ? this.state.missionsCanceled : []}
								specialsWarning={this.state.showIndisponibilities ? this.state.indisponibilities : []} />
							<Grid.Col className='legend-item' xs={12} sm={6} >
								<div className='legend-color legend-danger'/>Intervention annulée
							</Grid.Col>
							<Grid.Col className='legend-item' xs={12} sm={6} >
								<div className='legend-color legend-info'/>Intervention planifiée
							</Grid.Col>
							<Grid.Col className='legend-item' xs={12} sm={6} >
								<div className='legend-color legend-success'/>Intervention réalisée
							</Grid.Col>
							<Grid.Col className='legend-item' xs={12} sm={6} >
								<div className='legend-color legend-warning'/>Vos indisponibilités
							</Grid.Col>
						</Panel.Body>
						<Panel.Footer>
						</Panel.Footer>
					</Panel>
				</Grid.Col>
				<Grid.Col sm={2} md={3} lg={4}>
					<Panel>
						<Panel.Header>
							Information
						</Panel.Header>
						<Panel.Body>
						</Panel.Body>
						<Panel.Footer>
						</Panel.Footer>
					</Panel>
				</Grid.Col>
			</div>
		)
	}

}
export default AuxiliaryPlaning
