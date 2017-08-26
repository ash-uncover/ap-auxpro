import AuthHelper from 'helpers/AuthHelper'

import { BaseData } from 'ap-react-bootstrap'

class AppHeaderData extends BaseData {

	register(obj) {
		super.register(obj)

		this.obj.state = {
			authType: null
		}

		AuthHelper.register('', this, this._onAuthChanged.bind(this))
	}

	unregister() {
		AuthHelper.unregister(this)
	}

	_onAuthChanged() {
		if (AuthHelper.getToken()) {
			switch (AuthHelper.getType()) {
			case 'auxiliary':
			case 'service':
				this.setState({ authType: AuthHelper.getType() })
				break
			default:
				this.setState({ authType: null })
				break
			}	
		} else {
			this.setState({ authType: null })
		}
	}
}
var AppHeaderObj = new AppHeaderData()
export default AppHeaderObj
