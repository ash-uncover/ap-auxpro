import React from 'react'
import AuxiliaryPlaningData from 'components/auxiliary/planing/AuxiliaryPlaningData'
import './AuxiliaryPlaning.scss'

/* This class was auto-generated by the JavaScriptWriter */
class AuxiliaryPlaning extends React.Component {

	constructor(props) {
		super(props)
	}

	componentWillMount() {
		AuxiliaryPlaningData.register(this)
	}

	componentWillUnmount() {
		AuxiliaryPlaningData.unregister()
	}

	render() {
		return (
			<div className='ap-auxiliaryplaning'>
				AuxiliaryPlaning
			</div>
		)
	}

}
export default AuxiliaryPlaning
