import React from 'react'
import './SkillTile.scss'

import { Panel, RaterStar, Grid } from 'ap-react-bootstrap'

class SkillTile extends React.Component {

	constructor(props) {
		super(props)
	}

	render() {
		return (
			<Grid.Col 
				className='ap-skill-tile' 
				xs={this.props.xs || 6} 
				sm={this.props.sm || this.props.xs || 4} 
				md={this.props.md || this.props.sm || this.props.xs || 3}
				lg={this.props.lg || this.props.md || this.props.sm || this.props.xs || 3}>
				<Panel>
					<Panel.Body>
						<p>{this.props.title}</p>
						<RaterStar 
							value={this.props.value} 
							starMax={this.props.onChange ? 5 : undefined} 
							onChange={this.props.onChange} />
					</Panel.Body>
				</Panel>
			</Grid.Col>
		)
	}

}
export default SkillTile
