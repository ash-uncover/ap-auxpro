import React from 'react'
import './SkillTile.scss'

import { Panel, Grid, Button, Glyphicon } from 'ap-react-bootstrap'

class SkillTileAdd extends React.Component {

	constructor(props) {
		super(props)
	}

	render() {
		return (
			<Grid.Col className='ap-skill-tile-add' xs={6} sm={4} md={3}>
				<Panel>
					<div className='panel-body ap-panel-body ap-skill-tile-add-glyph' onClick={this.props.onClick}>
						<Glyphicon glyph='plus' />
					</div>
				</Panel>
			</Grid.Col>
		)
	}

}
export default SkillTileAdd
