import { Dispatcher, StoreBase } from 'ap-flux'

var I18NStore = new StoreBase ({ name: 'I18N_STORE', content: { 
	loaded: false,
	translations: {} 
}})
let DEFAULT_APP_CONTENT = {}

I18NStore.load_i18n = function(result, param) {
	I18NStore._content.translations = result
	I18NStore._content.loaded = true
	I18NStore.notify('/translations')
	I18NStore.notify('/loaded')
}

Dispatcher.register('LOAD_I18N', I18NStore.load_i18n)
