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

import InterventionUtils from 'utils-lib/entities/InterventionUtils'
import IndisponibilityUtils from 'utils-lib/entities/IndisponibilityUtils'
import RecurencePeriodUtils from 'utils-lib/entities/RecurencePeriodUtils'

import moment from 'moment'

class AuxiliaryPlaningData extends BaseData {

	register(obj) {
		super.register(obj)

		this.reduceMission = this._reduceMission.bind(this)

		this.declareFunction('onCreateIndisponibility')
		
		let missions = this.buildMissions()
		this.obj.state = {
			filterCustomer: '__ALL__',
			filterService: '__ALL__',
			filterStatus: '__ALL__',
			showIndisponibilities: true,
			showMissions: true,
			indisponibilities: this.buildIndisponibilities(),
			missionsPlanned: missions.planned,
			missionsCompleted: missions.completed,
			missionsCanceled: missions.canceled
		}

		IndisponibilityHelper.register('', this, this.onIndisponibilitiesUpdate.bind(this))
	}

	unregister() {
		IndisponibilityHelper.unregister(this)
	}


	// Store data management //
	// --------------------------------------------------------------------------------

	onIndisponibilitiesUpdate() {

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

	onCreateIndisponibility() {

	}

}
var AuxiliaryPlaningObj = new AuxiliaryPlaningData()
export default AuxiliaryPlaningObj
