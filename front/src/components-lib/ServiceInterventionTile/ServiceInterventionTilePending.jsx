import React from 'react'
import './ServiceInterventionTile.scss'

import { Panel, Grid, Button, Glyphicon } from 'ap-react-bootstrap'

class ServiceInterventionTilePending extends React.Component {

	constructor(props) {
		super(props)
	}

	render() {
		return (
			<Grid.Col sm={6} md={4} lg={3} className='ap-service-intervention-tile ap-intervention-pending'>
				<Panel>
					<Panel.Header>
						<p>Demande de prestation</p>						
						<Button bsSize='xs' onClick={this.props.onEdit}>
							<Glyphicon glyph='pencil'/>
						</Button>
						<Button bsSize='xs' onClick={this.props.onMatch}>
							<Glyphicon glyph='flash'/>
						</Button>
						<Button bsSize='xs' onClick={this.props.onDelete}>
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
export default ServiceInterventionTilePending
