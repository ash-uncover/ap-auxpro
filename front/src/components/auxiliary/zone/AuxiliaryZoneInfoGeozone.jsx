import React from 'react'
import './AuxiliaryZone.scss'

import GeozoneHelper from 'helpers/GeozoneHelper'

import { Grid, Panel, Button, Glyphicon } from 'ap-react-bootstrap'

import GeozoneType from 'utils/constants/GeozoneType'

class AuxiliaryZoneInfoGeozone extends React.Component {

	constructor(props) {
		super(props)
	}

	render() {
		let geozone = GeozoneHelper.getData(this.props.geozoneId)
		return (
			<Panel className='ap-auxiliary-zone-info ap-auxiliary-zone-info-geozone'>
				<Panel.Header>
					<p>Zone d'intervention</p>
					<Button bsSize='xs' onClick={this.props.onEdit} tooltip='Editer zone'>
						<Glyphicon glyph='pencil' />
					</Button>
					<Button bsSize='xs' onClick={this.props.onDelete} tooltip='Supprimer zone'>
						<Glyphicon glyph='remove' />
					</Button>
				</Panel.Header>
				{ geozone.type === GeozoneType.AREA.key ? 
					<Panel.Body>
						<div><b>Par proximité</b></div>
						<div>{geozone.address}</div>
						<div>{geozone.postalCode + ' ' + geozone.city}</div>
						<div><b>distance :</b> {geozone.radius}m</div>
					</Panel.Body>
				:
					<Panel.Body>
						<div><b>Par ville</b></div>
						<div>{geozone.postalCode + ' ' + geozone.city}</div>
					</Panel.Body>
				}
				
				<Panel.Footer>
				</Panel.Footer>
			</Panel>
		)
	}
}
export default AuxiliaryZoneInfoGeozone