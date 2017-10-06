import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import CustomerHelper from 'helpers/CustomerHelper'
import IndisponibilityHelper from 'helpers/IndisponibilityHelper'
import InterventionHelper from 'helpers/InterventionHelper'
import MissionHelper from 'helpers/MissionHelper'
import ServiceHelper from 'helpers/ServiceHelper'

import { BaseData, Utils, MomentHelper, Day } from 'ap-react-bootstrap'

import MissionStatus from 'utils/constants/MissionStatus'
import RecurencePeriod from 'utils/constants/RecurencePeriod'

import CustomerUtils from 'utils-lib/entities/CustomerUtils'
import InterventionUtils from 'utils-lib/entities/InterventionUtils'
import IndisponibilityUtils from 'utils-lib/entities/IndisponibilityUtils'
import RecurencePeriodUtils from 'utils-lib/entities/RecurencePeriodUtils'

import moment from 'moment'

class AuxiliaryPlaningData extends BaseData {

	register(obj) {
		super.register(obj)

		this.reduceMission = this._reduceMission.bind(this)

		this.declareFunction('onFilterCustomer')
		this.declareFunction('onFilterService')
		this.declareFunction('onFilterStatus')

		this.declareFunction('onCreateIndisponibility')
		this.declareFunction('onDeleteIndisponibility')
		this.declareFunction('onCancelDeleteIndisponibility')
		this.declareFunction('onConfirmDeleteIndisponibility')

		this.declareFunction('onPrintPlaning')
		
		this.obj.state = {
			showIndisponibilities: true,
			showMissions: true,
			filterCustomer: '__ALL__',
			filterService: '__ALL__',
			filterStatus: '__ALL__',
			customers: this.buildCustomers(),
			services: this.buildServices(),
			statuses: [
				{ key: '__ALL__', value: 'Toutes' },
				{ key: 'COMPLETED', value: 'Réalisées' },
				{ key: 'PENDING', value: 'Planifiées' },
				{ key: 'CANCELED', value: 'Annulées' }
			]
		}
		this.obj.state.indisponibilities = this.buildIndisponibilities()
		let missions = this.buildMissions()
		this.obj.state.missionsPlanned = missions.planned
		this.obj.state.missionsCompleted = missions.completed
		this.obj.state.missionsCanceled = missions.canceled

		IndisponibilityHelper.register('', this, this.onIndisponibilitiesUpdate.bind(this))
	}

	unregister() {
		IndisponibilityHelper.unregister(this)
	}


	// Store data management //
	// --------------------------------------------------------------------------------

	onIndisponibilitiesUpdate() {

	}

	buildCustomers() {
		let customerIds = Utils.reduce(InterventionHelper.getData(), this.getCustomers, [])
		let customers = customerIds.map(this.buildCustomer)
		customers.unshift({
			key: '__ALL__',
			value: 'Tous'
		})
		return customers
	}

	getCustomers(customers, intervention) {
		if (customers.indexOf(intervention.customerId) === -1) {
			customers.push(intervention.customerId)
		}
		return customers
	}

	buildCustomer(customerId) {
		return {
			key: customerId,
			value: CustomerUtils.getFullName(CustomerHelper.getData(customerId))
		}
	}

	buildServices() {
		let serviceIds = Utils.reduce(InterventionHelper.getData(), this.getServices, [])
		let services = serviceIds.map(this.buildService)
		services.unshift({
			key: '__ALL__',
			value: 'Tous'
		})
		return services
	}
	getServices(services, intervention) {
		if (services.indexOf(intervention.serviceId) === -1) {
			services.push(intervention.serviceId)
		}
		return services
	}
	buildService(serviceId) {
		return {
			key: serviceId,
			value: ServiceHelper.getData(serviceId).socialReason
		}
	}

	buildIndisponibilities() {
		return Utils.reduce(IndisponibilityHelper.getData(), function (absences, indisponibility) {
			let period = RecurencePeriod.get(indisponibility.period)
			switch (period) {
			case RecurencePeriod.ONE:
				absences.push({
					indisponibilityId: indisponibility.id,
					date: indisponibility.startDate,
					startTime: indisponibility.startTime,
					endTime: indisponibility.endTime
				});
				break;
			case RecurencePeriod.P1W:
			case RecurencePeriod.P2W:
			case RecurencePeriod.P3W:
			case RecurencePeriod.P4W:
				let startDate = MomentHelper.fromLocalDate(indisponibility.startDate)
				let endDate = MomentHelper.fromLocalDate(indisponibility.endDate)
				let current = startDate.clone().startOf('week')
				while (current.isSameOrBefore(endDate)) {
					for (let d = 0; d < indisponibility.days.length; d++) {
						let day = Day[indisponibility.days[d]]
						let date = current.clone().add(day.index, 'day')
						if (date.isSameOrAfter(startDate) && date.isSameOrBefore(endDate)) {
							absences.push({
								indisponibilityId: indisponibility.id,
								date: MomentHelper.toLocalDate(date),
								startTime: indisponibility.startTime,
								endTime: indisponibility.endTime
							})
						}
					}
					current.add(RecurencePeriodUtils.getDaysBetween(period.key), 'day')
				}
				break
			}
			return absences
		}, [])
	}

	buildMissions() {
		return Utils.reduce(MissionHelper.getData(), this.reduceMission, {
			planned: [], 
			completed: [], 
			canceled: []
		})
	}

	_reduceMission(missions, mission) {
		// Check if mission is filtered
		if (this.getState('filterCustomer') !== '__ALL__' && mission.customerId !== this.getState('filterCustomer')) {
			return missions
		}
		if (this.getState('filterService') !== '__ALL__' && mission.serviceId !== this.getState('filterService')) {
			return missions
		}
		if (this.getState('filterStatus') !== '__ALL__') {
			let missionDate = MomentHelper.fromLocalDate(mission.date)
			let currentDate = moment().startOf('day')
			console.log(this.getState('filterStatus'))
			switch (this.getState('filterStatus')) {
				case 'PENDING':
					if (missionDate.isBefore(currentDate)){
						return missions
					}
					break
				case 'COMPLETED':
					if (missionDate.isSameOrAfter(currentDate)) {
						return missions
					}
					break
				default:
					if (mission.sadStatus !== this.getState('filterStatus')) {
						return missions
					}
					break
			}
		}
		// Put mission in the correct array
		let sadStatus = MissionStatus.get(mission.sadStatus)
		if (sadStatus === MissionStatus.CANCELED) {
			missions.canceled.push(mission)
		} else if (sadStatus === MissionStatus.PENDING) {
			let isFuture = MomentHelper.fromLocalDate(mission.date).isSameOrAfter(moment().startOf('day'))
			if (isFuture) {
				missions.planned.push(mission)
			} else {
				missions.completed.push(mission)
			}
		} else {
			missions.completed.push(mission)
		}
		return missions
	}


	// View callbacks //
	// --------------------------------------------------------------------------------

	onFilterCustomer(event, value) {
		this._onFilterUpdate('filterCustomer', value)
	}
	
	onFilterService(event, value) {
		this._onFilterUpdate('filterService', value)
	}
	
	onFilterStatus(event, value) {
		this._onFilterUpdate('filterStatus', value)
	}

	_onFilterUpdate(filter, value) {
		this.obj.state[filter] = value
		let missions = this.buildMissions()
		this.obj.state.missionsPlanned = missions.planned
		this.obj.state.missionsCompleted = missions.completed
		this.obj.state.missionsCanceled = missions.canceled
		this.forceUpdate()
	}

	onCreateIndisponibility() {

	}

	onDeleteIndisponibility() {

	}
	onCancelDeleteIndisponibility() {

	}
	onConfirmDeleteIndisponibility() {

	}

	onPrintPlaning() {

	}

}
var AuxiliaryPlaningObj = new AuxiliaryPlaningData()
export default AuxiliaryPlaningObj
