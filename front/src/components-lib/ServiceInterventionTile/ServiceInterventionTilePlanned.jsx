import React from 'react'
import './ServiceInterventionTile.scss'

import { Panel, Grid, Button, Glyphicon } from 'ap-react-bootstrap'

class ServiceInterventionTilePlanned extends React.Component {

	constructor(props) {
		super(props)
	}

	render() {
		return (
			<Grid.Col sm={6} md={4} lg={3} className='ap-service-intervention-tile ap-intervention-planned'>
				<Panel>
					<Panel.Header>
						<p>Intervention planifiée</p>						
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
export default ServiceInterventionTilePlanned
