import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import ServiceHelper from 'helpers/ServiceHelper'
import CustomerHelper from 'helpers/CustomerHelper'
import InterventionHelper from 'helpers/InterventionHelper'
import AuxiliaryHelper from 'helpers/AuxiliaryHelper'

import { BaseData, Utils } from 'ap-react-bootstrap'

import AccountType from 'utils/constants/AccountType'
import ServiceUtils from 'utils-lib/entities/ServiceUtils'

class ServiceHomeData extends BaseData {

	register(obj) {
		super.register(obj)
		
		let service = ServiceHelper.getData(AuthHelper.getEntityId())

		let customersCount = Utils.map(CustomerHelper.getData()).length
		let interventionsCount = Utils.map(InterventionHelper.getData()).length
		let auxiliariesCount = Utils.map(AuxiliaryHelper.getData()).length

		this.obj.state = {
			premium: (service.accountType || '') === AccountType.PREMIUM.key,
			profilCompleted: service.profilCompleted,
			customersCount: customersCount,
			interventionsCount: interventionsCount,
			auxiliariesCount: auxiliariesCount
		}
	}
}
let ServiceHomeObj = new ServiceHomeData()
export default ServiceHomeObj
