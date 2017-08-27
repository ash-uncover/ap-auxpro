import React from 'react'
import './SkillTile.scss'

import { Panel, RaterStar, Grid } from 'ap-react-bootstrap'

class SkillTile extends React.Component {

	constructor(props) {
		super(props)
	}

	render() {
		return (
			<Grid.Col className='ap-skill-tile' xs={6} sm={4} md={3}>
				<Panel>
					<Panel.Body>
						<p>{this.props.title}</p>
						<RaterStar value={this.props.value} />
					</Panel.Body>
				</Panel>
			</Grid.Col>
		)
	}

}
export default SkillTile
