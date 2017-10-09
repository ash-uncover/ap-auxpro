import React from 'react'
import './AuxiliaryZone.scss'

import AuxiliaryHelper from 'helpers/AuxiliaryHelper'

import { Grid, Panel } from 'ap-react-bootstrap'

import AuxiliaryUtils from 'utils-lib/entities/AuxiliaryUtils'

class AuxiliaryZoneInfoAuxiliary extends React.Component {

	constructor(props) {
		super(props)
	}

	render() {
		let auxiliary = AuxiliaryHelper.getData(this.props.auxiliaryId)
		return (
			<Panel className='ap-auxiliary-zone-info ap-auxiliary-zone-info-auxiliary'>
				<Panel.Header>
					Mon domicile
				</Panel.Header>
				<Panel.Body>
					<div><b>{AuxiliaryUtils.getFullName(auxiliary)}</b></div>
					<div>{auxiliary.address}</div>
					<div>{auxiliary.postalCode + ' ' + auxiliary.city}</div>
				</Panel.Body>
				<Panel.Footer>
				</Panel.Footer>
			</Panel>
		)
	}
}
export default AuxiliaryZoneInfoAuxiliary