import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import CustomerHelper from 'helpers/CustomerHelper'
import IndisponibilityHelper from 'helpers/IndisponibilityHelper'
import InterventionHelper from 'helpers/InterventionHelper'
import MissionHelper from 'helpers/MissionHelper'
import ServiceHelper from 'helpers/ServiceHelper'

import { BaseData, Utils, MomentHelper, Day } from 'ap-react-bootstrap'

import MissionStatus from 'utils/constants/MissionStatus'
import IndisponibilityRecurencePeriod from 'utils/constants/IndisponibilityRecurencePeriod'

import CustomerUtils from 'utils-lib/entities/CustomerUtils'
import IndisponibilityUtils from 'utils-lib/entities/IndisponibilityUtils'
import IndisponibilityRecurencePeriodUtils from 'utils-lib/entities/IndisponibilityRecurencePeriodUtils'

import moment from 'moment'

class AuxiliaryPlaningData extends BaseData {

	register(obj) {
		super.register(obj)

		this.reduceMission = this._reduceMission.bind(this)
		this.buildMissionHour = this._buildMissionHour.bind(this)		

		this.declareFunction('onToggleMissions')
		this.declareFunction('onToggleIndisponibilities')

		this.declareFunction('onFilterCustomer')
		this.declareFunction('onFilterService')
		this.declareFunction('onFilterStatus')

		this.declareFunction('onCreateIndisponibility')
		this.declareFunction('onEditIndisponibility')
		this.declareFunction('onViewIndisponibility')

		this.declareFunction('onPrintPlaning')

		this.declareFunction('onDaySelect')
		this.declareFunction('onMonthChange')
		
		this.obj.state = {
			selectedDay: MomentHelper.toLocalDate(moment()),
			selectedMonth: MomentHelper.toLocalDate(moment()),
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
		
		this.buildHours()
		this.buildInformation()

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
			let startDate = MomentHelper.fromLocalDate(indisponibility.startDate)
			let endDate = MomentHelper.fromLocalDate(indisponibility.endDate || [1, 1, 1])
			let current = startDate.clone()
			let period = IndisponibilityRecurencePeriod.get(indisponibility.period)
			switch (period) {
			case IndisponibilityRecurencePeriod.HOURS:
				absences.push({
					indisponibilityId: indisponibility.id,
					date: indisponibility.startDate,
					startTime: indisponibility.startTime,
					endTime: indisponibility.endTime
				});
				break;
			case IndisponibilityRecurencePeriod.DAYS:
				current = current.startOf('day')
				while (current.isSameOrBefore(endDate)) {
					absences.push({
						indisponibilityId: indisponibility.id,
						date: MomentHelper.toLocalDate(current),
						startTime: current.clone().startOf('day'),
						endTime: current.clone().endOf('day')
					})
					current.add(1, 'day')
				}
				break;
			case IndisponibilityRecurencePeriod.WEEK1:
			case IndisponibilityRecurencePeriod.WEEK2:
			case IndisponibilityRecurencePeriod.WEEK3:
			case IndisponibilityRecurencePeriod.WEEK4:				
				current = current.startOf('week')
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
					current.add(IndisponibilityRecurencePeriodUtils.getDaysBetween(period.key), 'day')
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

	buildHours() {
		this.obj.state.hoursPlanned = this.getState('missionsPlanned').reduce(this.buildMissionHour, [0, 0])
		this.obj.state.hoursCompleted = this.getState('missionsCompleted').reduce(this.buildMissionHour, [0, 0])
		this.obj.state.hoursCanceled = this.getState('missionsCanceled').reduce(this.buildMissionHour, [0, 0])
		this.obj.state.hoursTotal = [0, 0]
		this._addTimeDurations(this.obj.state.hoursTotal, this.obj.state.hoursPlanned)
		this._addTimeDurations(this.obj.state.hoursTotal, this.obj.state.hoursCompleted)
		this._addTimeDurations(this.obj.state.hoursTotal, this.obj.state.hoursCanceled)
	}

	_buildMissionHour(time, mission) {
		let selectedMonth = this.getState('selectedMonth')
		if (mission.date[0] !== selectedMonth[0] || mission.date[1] !== selectedMonth[1]) {
			return time
		}
		let intervention = InterventionHelper.getData(mission.interventionId)
		let hours = intervention.endTime[0] - intervention.startTime[0]
		let minutes = intervention.endTime[1] - intervention.startTime[1]
		return this._addTimeDurations(time, [hours, minutes])				
	}

	_addTimeDurations(total, add) {
		total[0] += add[0]
		if (add[1] < 0) {
			total[0] -= 1
			total[1] += (60 + add[1])
		} else {
			total[1] += add[1]
		}
		if (total[1] >= 60) {
			total[0] += 1
			total[1] = total[1] % 60
		}
		return total
	}

	buildInformation() {
		this.obj.state.informationIndisponibilities = this.buildInformationIndisponibilities()
		this.obj.state.informationPlanned = this.buildInformationPlanned()
		this.obj.state.informationCompleted = this.buildInformationCompleted()
		this.obj.state.informationCanceled = this.buildInformationCanceled()
	}
	buildInformationIndisponibilities() {
		if (!this.getState('showIndisponibilities')) {
			return []
		}
		let selectedDate = this.getState('selectedDay')
		return this.getState('indisponibilities').reduce(function (indisponibilities, indiponibility) {
			let date = indiponibility.date
			if (date[0] === selectedDate[0] && date[1] === selectedDate[1] && date[2] === selectedDate[2]) {
				indisponibilities.push(indiponibility)
			}
			return indisponibilities
		}, [])
	}
	buildInformationPlanned() {
		return this._buildInformationMission('missionsPlanned')
	}
	buildInformationCompleted() {
		return this._buildInformationMission('missionsCompleted')
	}
	buildInformationCanceled() {
		return this._buildInformationMission('missionsCanceled')
	}
	_buildInformationMission(type) {
		if (!this.getState('showMissions')) {
			return []
		}
		let selectedDate = this.getState('selectedDay')
		return this.getState(type).reduce(function (missions, mission) {
			let date = mission.date
			if (date[0] === selectedDate[0] && date[1] === selectedDate[1] && date[2] === selectedDate[2]) {
				let customer = CustomerHelper.getData(mission.customerId)
				let intervention = InterventionHelper.getData(mission.interventionId)
				missions.push({
					id: mission.id,
					startTime: intervention.startTime,
					endTime: intervention.endTime,
					customer: CustomerUtils.getFullName(customer)
				})
			}
			return missions
		}, [])
	}


	// View callbacks //
	// --------------------------------------------------------------------------------

	onToggleMissions(event, value) {
		this.obj.state.showMissions = value
		this.buildHours()
		this.buildInformation()
		this.forceUpdate()
	}

	onToggleIndisponibilities(event, value) {
		this.obj.state.showIndisponibilities = value
		this.buildHours()
		this.buildInformation()
		this.forceUpdate()
	}

	onFilterCustomer(event, value) {
		this._onFilterUpdate('filterCustomer', value)
	}
	
	onFilterService(event, value) {
		this._onFilterUpdate('filterService', value)
	}
	
	onFilterStatus(event, value) {
		this._onFilterUpdate('filterStatus', value)
	}

	_onFilterUpdate(filter, value, keepHours) {
		this.obj.state[filter] = value
		let missions = this.buildMissions()
		this.obj.state.missionsPlanned = missions.planned
		this.obj.state.missionsCompleted = missions.completed
		this.obj.state.missionsCanceled = missions.canceled
		this.buildInformation()
		this.forceUpdate()
	}

	onDaySelect(value) {
		this.obj.state.selectedDay = value
		this.buildInformation()
		this.forceUpdate()
	}
	onMonthChange(value) {
		this.obj.state.selectedMonth = value
		this.buildHours()
		this.forceUpdate()
	}

	onCreateIndisponibility() {
		AppHelper.navigate('/auxiliary/indisponibilities/new/edit')
	}
	onViewIndisponibility(indisponibilityId) {
		AppHelper.navigate('/auxiliary/indisponibilities/' + indisponibilityId)
	}
	onEditIndisponibility(indisponibilityId) {
		AppHelper.navigate('/auxiliary/indisponibilities/' + indisponibilityId + '/edit')
	}

	onPrintPlaning() {
		window.print()
	}

}
var AuxiliaryPlaningObj = new AuxiliaryPlaningData()
export default AuxiliaryPlaningObj
