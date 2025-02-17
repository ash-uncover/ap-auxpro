import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'

import { BaseData } from 'ap-react-bootstrap'

class AppHomeData extends BaseData {

	register(obj) {
		super.register(obj)

		this.obj.onLogon = AppHelper.navigate.bind(AppHelper, '/auth/login')
		this.obj.onRegisterAux = AppHelper.navigate.bind(AppHelper, '/auth/register/auxiliary')
		this.obj.onRegisterSad = AppHelper.navigate.bind(AppHelper, '/auth/register/service')
		this.obj.onNavDGE = this.onNavDGE.bind(this)

        this.onAuthChanged()
        AuthHelper.register('', this.onAuthChanged)
	}

	unregister() {
        AuthHelper.unregister('', this.onAuthChanged)
	}

    onAuthChanged() {
        if (AuthHelper.getType() === 'auxiliary') {
            AppHelper.navigate('/auxiliary/home')
        } else if (AuthHelper.getType() === 'service') {
            AppHelper.navigate('/service')
        }
    }

	onNavDGE() {
 		window.open('http://www.entreprises.gouv.fr/services-a-la-personne/annuaire-des-organismes-services-a-la-personne', '_blank').focus()
	}

}
var AppHomeObj = new AppHomeData()
export default AppHomeObj
