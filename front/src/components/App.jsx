import React from 'react'
import PropTypes from 'prop-types'

import AppData from './AppData'
import './App.scss'

import AppHelper from 'helpers/AppHelper'
import I18NHelper from 'helpers/I18NHelper'

import AppBusy from 'components-lib/AppBusy/AppBusy'
import AppHeader from 'components-lib/AppHeader/AppHeader'
import AppFooter from 'components-lib/AppFooter/AppFooter'

class App extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			preload: ap.preload,
			loaded: I18NHelper.isLoaded(),
			busy: !!AppHelper.getData('/app/busy'),
			authType: null
		}
	}

	componentWillMount() {
		AppData.register(this)
	}

	componentWillUnmount() {
		AppData.unregister()
	}

	render() {
		if (this.state.loaded) {
			return (
				<div className='ap-app'>
					<AppHeader />
					<div className='ap-app-main-content'>
						{this.props.children}
					</div>
					<AppFooter />
					{this.state.busy ?
						<AppBusy />
					: null }
				</div>
			)
		}
		return (
			<div className='ap-app'>
				<AppBusy />
			</div>
		)

	}
}
App.contextTypes = {
	router: PropTypes.object
}
export default App
