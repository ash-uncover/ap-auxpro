import AuthHelper from 'helpers/AuthHelper'
import AuxiliaryHelper from 'helpers/AuxiliaryHelper'
import ServiceHelper from 'helpers/ServiceHelper'

import { BaseData } from 'ap-react-bootstrap'

class AppHeaderData extends BaseData {

    constructor() {
        super(...arguments)

        this.onAuthChanged = this.onAuthChanged.bind(this)
        this.onAuxiliaryChanged = this.onAuxiliaryChanged.bind(this)
        this.onServiceChanged = this.onServiceChanged.bind(this)
    }

    register(obj) {
        super.register(obj)

        this.onAuthChanged()

		AuthHelper.register('', this.onAuthChanged)
	}

	unregister() {
		AuthHelper.unregister('', this.onAuthChanged)
		AuxiliaryHelper.unregister(AuthHelper.getEntityId(), this.onAuxiliaryChanged)
		ServiceHelper.unregister(AuthHelper.getEntityId(), this.onServiceChanged)
	}

	onAuthChanged() {
		AuxiliaryHelper.unregister(AuthHelper.getEntityId(), this.onAuxiliaryChanged)
        ServiceHelper.unregister(AuthHelper.getEntityId(), this.onServiceChanged)
		if (AuthHelper.getToken()) {
			switch (AuthHelper.getType()) {
			case 'auxiliary':
				this.onAuxiliaryChanged()
				AuxiliaryHelper.register(AuthHelper.getEntityId(), this.onAuxiliaryChanged)
				this.setState({ authType: 'auxiliary' })
				break
			case 'service':
				this.onServiceChanged()
				ServiceHelper.register(AuthHelper.getEntityId(), this.onServiceChanged)
				this.setState({ authType: 'service' })
				break
			default:
				this.setState({ 
					authType: null,
					tutoMode: true,
					profilMode: true
				})
				break
			}	
		} else {
			this.setState({ 
				authType: null,
				tutoMode: true,
				profilMode: true
			})
		}
	}

	onAuxiliaryChanged() {
		let auxiliary = AuxiliaryHelper.getData(AuthHelper.getEntityId())
		if (auxiliary) {
			this.setState({ 
				tutoMode: !auxiliary.isTutoSkipped, 
				profilMode: !auxiliary.profilCompleted
			})
		}
	}

	onServiceChanged() {
		let service = ServiceHelper.getData(AuthHelper.getEntityId())
		if (service) {
			this.setState({ 
				tutoMode: !service.isTutoSkipped,
				profilMode: !service.profilCompleted
			})
		}
	}
}
var AppHeaderObj = new AppHeaderData()
export default AppHeaderObj
