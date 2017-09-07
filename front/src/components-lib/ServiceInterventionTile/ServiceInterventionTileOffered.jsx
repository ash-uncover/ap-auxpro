import React from 'react'
import './ServiceInterventionTile.scss'

import { Panel, Grid, Button, Glyphicon } from 'ap-react-bootstrap'

class ServiceInterventionTileOffered extends React.Component {

	constructor(props) {
		super(props)
	}

	render() {
		return (
			<Grid.Col sm={6} md={4} className='ap-service-intervention-tile ap-intervention-pending'>
				<Panel>
					<Panel.Header>
						<p>MATCHING</p>						
						<Button bsSize='xs' onClick={this.props.onFollow}>
							<Glyphicon glyph='cloud-upload'/>
						</Button>
						<Button bsSize='xs' onClick={this.props.onCancel}>
							<Glyphicon glyph='remove'/>
						</Button>
					</Panel.Header>
					<Panel.Body>
						{this.props.children}
					</Panel.Body>
					<Panel.Footer>
					</Panel.Footer>
				</Panel>
			</Grid.Col>
		)
	}

}
export default ServiceInterventionTileOffered
