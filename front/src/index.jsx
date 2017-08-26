
// Globally import the bootstrap css
import 'bootstrap/dist/css/bootstrap.css'
// React modules
import React from 'react'
import { render } from 'react-dom'
// Import Actions
import AppActions from 'actions/AppActions'
import Actions from 'actions/Actions'
// Import Stores
import AppStore from 'stores/AppStore'
import ErrorStore from 'stores/ErrorStore'
import RestStore from 'stores/RestStore'
// Import Boot
import boot from 'boot'
// Our root component handling routing in the application
import Routes from 'components/Routes'
import { AppRouter } from 'ap-react-bootstrap'

function _onUpdate() {
	window.scrollTo(0, 0)
	let element = document.getElementsByClassName('ap-auxpro')[0]
	if (element) {
		element.scrollTop = 0
	}
}

render((<AppRouter routes={Routes} onUpdate={_onUpdate} />), document.getElementById('app'))
