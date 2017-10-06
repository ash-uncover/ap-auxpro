import React from 'react'
import AuxiliaryPlaningData from './AuxiliaryPlaningData'
import './AuxiliaryPlaning.scss'

import { Grid, Panel, Form, Button, Calendar, MomentHelper } from 'ap-react-bootstrap'

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

	displayHours(hours) {
		return hours[0] + 'h' + (hours[1] < 10 ? '0' : '') + hours[1]
	}

	render() {
		return (
			<div className='ap-auxiliary-planing row'>
				<Grid.Col className='hidden-print' sm={2} md={2} lg={3}>
					<Panel>
						<Panel.Header>
							Actions
						</Panel.Header>
						<Panel.Body>
							<Form.Switch 
								text='Voir interventions' 
								value={this.state.showMissions}
								onChange={this.onChange.bind(this, 'showMissions')} />
							<Form.Switch 
								text='Voir indisponibilités' 
								value={this.state.showIndisponibilities}
								onChange={this.onChange.bind(this, 'showIndisponibilities')}/>
							<Form horizontal>
								<Form.Group>
									<Form.Label className='col-sm-5 col-md-4'>
										Usager
									</Form.Label>
									<Grid.Col sm={7} md={8}>
										<Form.Select 
											values={this.state.customers}
											value={this.state.filterCustomer}
											onChange={this.onFilterCustomer} />
									</Grid.Col>
								</Form.Group>
								<Form.Group>
									<Form.Label className='col-sm-5 col-md-4'>
										SAD
									</Form.Label>
									<Grid.Col sm={7} md={8}>
										<Form.Select 
											values={this.state.services}
											value={this.state.filterService}
											onChange={this.onFilterService} />
									</Grid.Col>
								</Form.Group>
								<Form.Group>
									<Form.Label className='col-sm-5 col-md-4'>
										Interventions
									</Form.Label>
									<Grid.Col sm={7} md={8}>
										<Form.Select 
											values={this.state.statuses}
											value={this.state.filterStatus}
											onChange={this.onFilterStatus} />
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
								specialsWarning={this.state.showIndisponibilities ? this.state.indisponibilities : []}
								onDaySelect={this.onDaySelect}
								onMonthChange={this.onMonthChange}
								onYearChange={this.onMonthChange} />
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
							Interventions {MomentHelper.fromLocalDate(this.state.selectedMonth).format('MMMM YYYY')}
						</Panel.Header>
						<Panel.Body>
							<table>
								<tbody>
									<tr>
										<td>Planifiées:</td>
										<td><b>{this.displayHours(this.state.hoursPlanned)}</b></td>
									</tr>
									<tr>
										<td>Réalisées:</td>
										<td><b>{this.displayHours(this.state.hoursCompleted)}</b></td>
									</tr>
									<tr>
										<td>Annulées:</td>
										<td><b>{this.displayHours(this.state.hoursCanceled)}</b></td>
									</tr>
									<tr>
										<td>Total:</td>
										<td><b>{this.displayHours(this.state.hoursTotal)}</b></td>
									</tr>
								</tbody>
							</table>
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
