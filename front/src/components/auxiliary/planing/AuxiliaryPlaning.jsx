import React from 'react'
import AuxiliaryPlaningData from './AuxiliaryPlaningData'
import './AuxiliaryPlaning.scss'

import { Grid, Panel, Form, Button, Calendar, MomentHelper, Glyphicon } from 'ap-react-bootstrap'

class AuxiliaryPlaning extends React.Component {

	constructor(props) {
		super(props)
		this.state = {}
		this.buildIndisponibility = this._buildIndisponibility.bind(this)
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

	_buildIndisponibility(indisponibility) {
		return (
			<li className='ap-planing-indisponibility' key={indisponibility.indisponibilityId}>
				De {MomentHelper.localTimeToHumanTime(indisponibility.startTime)} à {MomentHelper.localTimeToHumanTime(indisponibility.endTime)}
				<Button bsSize='xs' onClick={this.onEditIndisponibility.bind(this, indisponibility.indisponibilityId)} tooltip='Voir indisponibilité'>
					<Glyphicon glyph='search' />
				</Button>
			</li>
		)
	}

	buildMission(mission) {
		return (
			<li key={mission.id}>
				Chez {mission.customer}
				<br/>
				De {MomentHelper.localTimeToHumanTime(mission.startTime)} à {MomentHelper.localTimeToHumanTime(mission.endTime)}			
			</li>
		)
	}

	render() {
		return (
			<div className='ap-auxiliary-planing row'>
				<Grid.Col sm={12} mdPush={3} md={6}>
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
							<Grid.Col className='legend-item hidden-print' xs={12} sm={6} >
								<div className='legend-color legend-danger'/>Intervention annulée
							</Grid.Col>
							<Grid.Col className='legend-item hidden-print' xs={12} sm={6} >
								<div className='legend-color legend-info'/>Intervention planifiée
							</Grid.Col>
							<Grid.Col className='legend-item hidden-print' xs={12} sm={6} >
								<div className='legend-color legend-success'/>Intervention réalisée
							</Grid.Col>
							<Grid.Col className='legend-item hidden-print' xs={12} sm={6} >
								<div className='legend-color legend-warning'/>Vos indisponibilités
							</Grid.Col>
						</Panel.Body>
						<Panel.Footer>
						</Panel.Footer>
					</Panel>
				</Grid.Col>
				<Grid.Col className='hidden-print' sm={6} mdPull={6} md={3}>
					<Panel>
						<Panel.Header>
							Actions
						</Panel.Header>
						<Panel.Body>
							<Form.Switch 
								text='Voir interventions' 
								value={this.state.showMissions}
								onChange={this.onToggleMissions} />
							<Form.Switch 
								text='Voir indisponibilités' 
								value={this.state.showIndisponibilities}
								onChange={this.onToggleIndisponibilities}/>
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
							<Button 
								bsStyle='warning' 
								onClick={this.onCreateIndisponibility}
								block>
								Ajouter une indisponibilité
							</Button>
							<Button 
								bsStyle='info' 								
								onClick={this.onPrintPlaning}
								block>
								Imprimer mon planning
							</Button>
						</Panel.Body>
						<Panel.Footer>
						</Panel.Footer>
					</Panel>
				</Grid.Col>
				<Grid.Col sm={6} md={3}>
					<Panel className='hidden-print'>
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
					<Panel>
						<Panel.Header>
							Informations {MomentHelper.localDateToHumanDate(this.state.selectedDay)}
						</Panel.Header>
						<Panel.Body>
							{ !this.state.informationIndisponibilities.length &&
							  !this.state.informationPlanned.length	&&
							  !this.state.informationCompleted.length &&
							  !this.state.informationCanceled.length ?
								'Aucune information'
							: null }
							{ this.state.informationIndisponibilities.length ? 
								<b>Indisponibilités</b>
							: null }
							{ this.state.informationIndisponibilities.length ? 
								<ul>
									{this.state.informationIndisponibilities.map(this.buildIndisponibility)}
								</ul>
							: null }

							{ this.state.informationPlanned.length ? 
								<b>Interventions planifiées</b>
							: null }
							{ this.state.informationPlanned.length ? 
								<ul>
									{this.state.informationPlanned.map(this.buildMission)}
								</ul>
							: null }

							{ this.state.informationCanceled.length ? 
								<b>Interventions annulées</b>
							: null }
							{ this.state.informationCanceled.length ? 
								<ul>
									{this.state.informationCanceled.map(this.buildMission)}
								</ul>
							: null }

							{ this.state.informationCompleted.length ? 
								<b>Interventions réalisées</b>
							: null }
							{ this.state.informationCompleted.length ? 
								<ul>
									{this.state.informationCompleted.map(this.buildMission)}
								</ul>
							: null }
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
