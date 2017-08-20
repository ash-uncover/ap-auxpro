import React from 'react'
import ServiceInterventionMatchData from 'components/service/interventions/match/ServiceInterventionMatchData'
import './ServiceInterventionMatch.scss'

/* This class was auto-generated by the JavaScriptWriter */
class ServiceInterventionMatch extends React.Component {

	constructor(props) {
		super(props)
	}

	componentWillMount() {
		ServiceInterventionMatchData.register(this, this.props.params.interventionId)
	}

	componentWillUnmount() {
		ServiceInterventionMatchData.unregister()
	}

	render() {
		return (
			<div className='ap-serviceinterventionmatch'>
				ServiceInterventionMatch - {this.props.params.interventionId}
			</div>
		)
	}

}
export default ServiceInterventionMatch
