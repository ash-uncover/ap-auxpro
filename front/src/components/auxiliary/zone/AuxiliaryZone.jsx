import React from 'react'
import AuxiliaryZoneData from './AuxiliaryZoneData'
import './AuxiliaryZone.scss'

/* This class was auto-generated by the JavaScriptWriter */
class AuxiliaryZone extends React.Component {

	constructor(props) {
		super(props)
	}

	componentWillMount() {
		AuxiliaryZoneData.register(this)
	}

	componentWillUnmount() {
		AuxiliaryZoneData.unregister()
	}

	render() {
		return (
			<div className='ap-auxiliaryzone'>
				AuxiliaryZone
			</div>
		)
	}

}
export default AuxiliaryZone
