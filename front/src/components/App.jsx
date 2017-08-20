import React from 'react'
import AppData from 'components/AppData'
import './App.scss'

/* This class was auto-generated by the JavaScriptWriter */
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
				App
				{this.props.children}
			</div>
		)
	}

}
export default App
