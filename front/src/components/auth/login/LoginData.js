import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import ErrorHelper from 'helpers/ErrorHelper'

import { BaseData } from 'ap-react-bootstrap'

class LoginData extends BaseData {

    constructor() {
        super(...arguments)

        this.onPostAuthError = this.onPostAuthError.bind(this)
    }

    register(obj) {
        super.register(obj)

        ErrorHelper.register('POST_AUTH', this.onPostAuthError)

        this.obj.onCancel = this.onCancel.bind(this)
        this.obj.onSubmit = this.onSubmit.bind(this)
        
        this.obj.onChangeNoError = this.onChangeNoError.bind(this)
    }

    unregister() {
        ErrorHelper.unregister('POST_AUTH', this.onPostAuthError)
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
        AppHelper.setBusy(true)
            .then(() => {
                return AuthHelper.postAuth({
                    username: this.getState('username'), 
                    password: this.getState('password')
                })
            })
            .then(() => {
                return AuthHelper.getAuth()
            })
            .then(() => {
                AppHelper.navigate('/home')
                setTimeout(AppHelper.setBusy, 200)
            })
            .catch((error) => {
                setTimeout(AppHelper.setBusy, 200)
                console.error('Logon error')
                console.error(error)
            })
    }

    onPostAuthError() {
        const errorData = ErrorHelper.getData('POST_AUTH')
        const error = Boolean(errorData)
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
const LoginObj = new LoginData()
export default LoginObj
