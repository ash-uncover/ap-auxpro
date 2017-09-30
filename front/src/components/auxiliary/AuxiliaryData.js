import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import AuxiliaryHelper from 'helpers/AuxiliaryHelper'
import ServiceHelper from 'helpers/ServiceHelper'

import { BaseData } from 'ap-react-bootstrap'

// Header not be displayed for the following path
let PATHS_NO_HEADER = [
	'/auxiliary/tuto',
	'/auxiliary/infos/edit/account',
	'/auxiliary/infos/edit/perso',
	'/auxiliary/infos/edit/photo',
	'/auxiliary/infos/edit/pro',
	'/auxiliary/infos/edit/questionary'
]

class AuxiliaryData extends BaseData {

	register(obj) {
		super.register(obj)

		this.obj.state = {
			showHeader: false,
			loaded:!! AuxiliaryHelper.getData(AuthHelper.getEntityId())
		}		

		/* TODO > find a way to generate this stuff */
		if (AuthHelper.getType() !== 'auxiliary') {
			AppHelper.navigate('/home')
			return;
		}

		AuxiliaryHelper.getAuxiliary(AuthHelper.getEntityId()).
		then(function () {
			return Promise.all([
				ServiceHelper.getServices()
			])
		}).then(this._onLoad.bind(this))

		AppHelper.register('/path', this, this._onAppStorePathUpdate.bind(this));
	}

	unregister() {
		AppHelper.unregister(this)
	}

	_onAppStorePathUpdate() {
		let showHeader = (PATHS_NO_HEADER.indexOf(AppHelper.getData('/path')) === -1)
		if (showHeader !== this.getState('showHeader')) {
			this.setState({ 
				showHeader: showHeader
			})
		}
	}

	_onLoad() {
		let auxiliary = AuxiliaryHelper.getData(AuthHelper.getEntityId())
		if (auxiliary.isTutoSkipped) {
			AppHelper.navigate('/auxiliary/home')
		} else {
			AppHelper.navigate('/auxiliary/tuto')
		}
		this.setState({ loaded: true })
	}
}
var AuxiliaryObj = new AuxiliaryData()
export default AuxiliaryObj
