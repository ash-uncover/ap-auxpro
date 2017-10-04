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

class AuxiliaryPlaningData extends BaseData {

	register(obj) {
		super.register(obj)

		this.filterMission = this._filterMission.bind(this)

		this.declareFunction('onCreateIndisponibility')
		
		this.obj.state = {
			filterCustomer: '__ALL__',
			filterService: '__ALL__',
			filterStatus: '__ALL__',
			showIndisponibilities: true,
			showInterventions: true,
			indisponibilities: this.buildIndisponibilities(),
			missions: this.buildMissions()
		}
	}

	unregister() {
	}


	// Store data management //
	// --------------------------------------------------------------------------------

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
		return Utils.filter(MissionHelper.getData(), this.filterMission)
	}

	_filterMission(mission) {
		return true
	}


	// View callbacks //
	// --------------------------------------------------------------------------------

	onCreateIndisponibility() {

	}

}
var AuxiliaryPlaningObj = new AuxiliaryPlaningData()
export default AuxiliaryPlaningObj
