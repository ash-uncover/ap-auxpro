import React from 'react'
import ServiceAuxiliaryData from './ServiceAuxiliaryData'
import './ServiceAuxiliary.scss'

import { Button } from 'ap-react-bootstrap'

class ServiceAuxiliary extends React.Component {

	constructor(props) {
		super(props)
	}

	componentWillMount() {
		ServiceAuxiliaryData.register(this, this.props.params.auxiliaryId)
	}

	componentWillUnmount() {
		ServiceAuxiliaryData.unregister()
	}

	render() {
		return (
			<div className='ap-service-auxiliary'>
				<Button 
					block 
					bsStyle='primary'
					onClick={this.onCancel}>
					Retour
					</Button>
				<br/>
				ServiceAuxiliary - {this.props.params.auxiliaryId}
			</div>
		)
	}

}
export default ServiceAuxiliary
