import React from 'react'
import './ServiceCustomerTile.scss'

import { Panel, Grid, Button, Glyphicon } from 'ap-react-bootstrap'

class ServiceCustomerTile extends React.Component {

	constructor(props) {
		super(props)
	}

	render() {
		return (
			<Grid.Col sm={6} md={4} lg={3} className='ap-service-customer-tile'>
				<Panel>
					<Panel.Header>
						<p>Usager</p>
						<Button 
							bsSize='xs' 
							onClick={this.props.onView}
							tooltip='Voir détail usager'>
							<Glyphicon glyph='user'/>
						</Button>
						<Button 
							bsSize='xs' 
							onClick={this.props.onEdit}
							tooltip='Editer détail usager'>
							<Glyphicon glyph='pencil'/>
						</Button>
						<Button 
							bsSize='xs' 
							onClick={this.props.onDelete}
							tooltip='Supprimer usager'>
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
export default ServiceCustomerTile
