import React from 'react'
import AppData from 'components/AppData'
import './App.scss'

import AppHelper from 'helpers/AppHelper'

import { Grid } from 'ap-react-bootstrap'

import AppBusy from 'components-lib/AppBusy/AppBusy'
import AppHeader from 'components-lib/AppHeader/AppHeader'
import AppFooter from 'components-lib/AppFooter/AppFooter'

class App extends React.Component {

	constructor(props) {
		super(props)
	}

	componentWillMount() {
		AppData.register(this)
	}

	componentWillUnmount() {
		AppData.unregister()
	}

	render() {
		return (
			<div className='ap-app'>
				<AppHeader />
				<Grid.Container className='ap-app-main-content'>
					{this.props.children}
				</Grid.Container>
				<AppFooter />
				{this.state.busy ?
					<AppBusy />
				: '' }
			</div>
		)
	}
}
App.contextTypes = {
	router: React.PropTypes.object
}
export default App
