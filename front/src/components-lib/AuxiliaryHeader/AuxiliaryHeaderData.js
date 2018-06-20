import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import AuxiliaryHelper from 'helpers/AuxiliaryHelper'
import ImageHelper from 'helpers/ImageHelper'

import AuxiliaryUtils from 'utils-lib/entities/AuxiliaryUtils'
import StringUtils from 'utils-lib/StringUtils'

import { BaseData } from 'ap-react-bootstrap'

class AuxiliaryHeaderData extends BaseData {

    constructor() {
        super(...arguments)
        
        this.onAuxiliaryUpdate = this._onAuxiliaryUpdate.bind(this)
    }

    register(obj) {
        super.register(obj)
        
        this._onAuxiliaryUpdate()

		AuxiliaryHelper.register(AuthHelper.getEntityId(), this.onAuxiliaryUpdate)
	}

	unregister() {
		AuxiliaryHelper.unregister(AuthHelper.getEntityId(), this.onAuxiliaryUpdate)
	}

	_onAuxiliaryUpdate() {
		let auxiliary = AuxiliaryHelper.getData(AuthHelper.getEntityId())
		if (auxiliary) {
			this.setState({ 
				avatar: auxiliary.avatar,
				name: StringUtils.valueOrMissing(AuxiliaryUtils.getFullName(auxiliary)),
				address: StringUtils.valueOrMissing(AuxiliaryUtils.getAddress(auxiliary)),
				email: AuthHelper.getEmail(),
				phone: StringUtils.valueOrMissing(auxiliary.phone)
			})
		}
	}
}
var AuxiliaryHeaderObj = new AuxiliaryHeaderData()
export default AuxiliaryHeaderObj
