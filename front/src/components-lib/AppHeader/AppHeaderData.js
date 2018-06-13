import AuthHelper from 'helpers/AuthHelper'
import AuxiliaryHelper from 'helpers/AuxiliaryHelper'
import ServiceHelper from 'helpers/ServiceHelper'

import { BaseData } from 'ap-react-bootstrap'

class AppHeaderData extends BaseData {

	register(obj) {
		super.register(obj)

		this._onAuthChanged()

        this.onAuthChanged = this._onAuthChanged.bind(this)
        this.onAuxiliaryChanged = this._onAuxiliaryChanged.bind(this)
        this.onServiceChanged = this._onServiceChanged.bind(this)

		AuthHelper.register('', this.onAuthChanged)
	}

	unregister() {
		AuthHelper.unregister('', this.onAuthChanged)
		AuxiliaryHelper.unregister(AuthHelper.getEntityId(), this.onAuxiliaryChanged)
		ServiceHelper.unregister(AuthHelper.getEntityId(), this.onServiceChanged)
	}

	_onAuthChanged() {
		AuxiliaryHelper.unregister(this)
		ServiceHelper.unregister(this)
		if (AuthHelper.getToken()) {
			switch (AuthHelper.getType()) {
			case 'auxiliary':
				this._onAuxiliaryChanged()
				AuxiliaryHelper.register(AuthHelper.getEntityId(), this.onAuxiliaryChanged)
				this.setState({ authType: 'auxiliary' })
				break
			case 'service':
				this._onServiceChanged()
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

	_onAuxiliaryChanged() {
		let auxiliary = AuxiliaryHelper.getData(AuthHelper.getEntityId())
		if (auxiliary) {
			this.setState({ 
				tutoMode: !auxiliary.isTutoSkipped, 
				profilMode: !auxiliary.profilCompleted
			})
		}
	}

	_onServiceChanged() {
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
