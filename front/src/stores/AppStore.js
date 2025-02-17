import { Dispatcher, StoreBase } from 'ap-flux'

var AppStore = new StoreBase ({ name: 'APP_STORE', content: {} })
let DEFAULT_APP_CONTENT = { path: '/' }

AppStore.setBusy = function(busy) {
  AppStore.busy = busy
  AppStore.notify()
}

AppStore.onLogout = function(result, param) {
  AppStore._content.app = DEFAULT_APP_CONTENT
  AppStore.notify('/app')
}

AppStore.navigate = function(result, param) {
  AppStore._content.path = result
  AppStore.notify('/path')
}

AppStore.navigate_back = function(result, param) {
  AppStore._content.path = '___BACK___'
  AppStore.notify('/path')
}

AppStore.set_app_display = function(result, param) {
  let path = '/app' + result.path
  AppStore.setData(path, result.value)
  AppStore.notify(path + result.path)
}

AppStore.put = function(result, param) {
  AppStore.setData(result.path, result.value)
  AppStore.notify(result.path)
}

Dispatcher.register('LOGOUT', AppStore.onLogout)
Dispatcher.register('NAVIGATE', AppStore.navigate)
Dispatcher.register('NAVIGATE_BACK', AppStore.navigate_back)
Dispatcher.register('SET_APP_DISPLAY', AppStore.set_app_display)
Dispatcher.register('PUT', AppStore.put)
