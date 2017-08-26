import React from 'react'
import './AppBusy.scss'
import { BusyCircles } from 'ap-react-bootstrap'

class AppBusy extends React.Component {

	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div className='ap-app-busy'>
				<div className='ap-app-busy-background' />
				<BusyCircles />
			</div>
		)
	}

}
export default AppBusy
