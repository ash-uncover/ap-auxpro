import AppHelper from 'helpers/AppHelper'
import { BaseData } from 'ap-react-bootstrap'

/* This class was auto-generated by the JavaScriptWriter */
class AppLogoData extends BaseData {

	register(obj) {
		super.register(obj)

		this.obj.onClick = AppHelper.navigate.bind(AppHelper, '/home')
		
		this.obj.state = {}
	}

	unregister() {
	}

}
var AppLogoObj = new AppLogoData()
export default AppLogoObj
