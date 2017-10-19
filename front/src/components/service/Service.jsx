import React from 'react'
import ServiceData from './ServiceData'
import './Service.scss'

import { Grid } from 'ap-react-bootstrap'

import ServiceHeader from 'components-lib/ServiceHeader/ServiceHeader'

class Service extends React.Component {

	constructor(props) {
		super(props)
	}

	componentWillMount() {
		ServiceData.register(this)
	}

	componentWillUnmount() {
		ServiceData.unregister()
	}

	render() {
		if (this.state.loaded) {
			return (
				<Grid.Container className='ap-service'>
					{this.state.showHeader ?
						<ServiceHeader />
					: null }
					{this.props.children}
				</Grid.Container>
			)
		} else {
			return (
				<div className='ap-service' />
			)
		}
	}

}
export default Service
