import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import ErrorHelper from 'helpers/ErrorHelper'

import { BaseData } from 'ap-react-bootstrap'

class LoginData extends BaseData {

    register(obj) {
        super.register(obj)

        this.onLogon = this.onLogon.bind(this)
        this.onLogonError = this.onLogonError.bind(this)

        AuthHelper.register('', this.onLogon)
        ErrorHelper.register('GET_AUTH', this.onLogonError)

        this.obj.onCancel = this.onCancel.bind(this)
        this.obj.onSubmit = this.onSubmit.bind(this)

        this.obj.onChangeNoError = this.onChangeNoError.bind(this)
    }

    unregister() {
        AuthHelper.unregister('', this.onLogon)
        ErrorHelper.unregister('GET_AUTH', this.onLogonError)
    }

    onChangeNoError() {
        this.onChange(...arguments)
        this.setState({
            errorJustHappened: false,
            errorMessage: ''
        })
    }

    onCancel() {
        AppHelper.navigate('/home')
    }

    onSubmit() {
        AppHelper.setBusy(true).
        then(function() {
            return AuthHelper.getAuth({
                username: this.getState('username'), 
                password: this.getState('password')
            })
        }.bind(this)).
        then(function () {
            setTimeout(AppHelper.setBusy, 200)
        }).
        catch(function (error) {
            setTimeout(AppHelper.setBusy, 200)
            console.error('Logon error')
            console.error(error)
        })
    }

    onLogon() {
        if (AuthHelper.getToken()) {
            switch (AuthHelper.getType()) {
            case 'auxiliary':
            case 'service':
                AppHelper.navigate('/home')
                break
            default:
                AppHelper.navigate('/')
                console.error("type d'utilisateur non supporté")
                break
            }   
        } else {
            console.error('Utilisateur non connecté')
            AppHelper.navigate('/')
        }
    }

    onLogonError() {
        let errorData = ErrorHelper.getData('GET_AUTH')
        let error = !!errorData
        let errorMessage = ''
        let password = this.getState('password')
        if (error) {
            errorMessage = 'Echec de connexion'
            password = ''
            if (errorData.status === 401) {
                errorMessage = 'Utilisateur ou mot de passe invalide'
            }
        }
        this.setState({
            errorLastTry: error,
            errorJustHappened: error,
            errorMessage: errorMessage,
            password: password
        })
    }

}
var LoginObj = new LoginData()
export default LoginObj
