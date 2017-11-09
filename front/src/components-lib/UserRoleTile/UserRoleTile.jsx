import React from 'react'
import './UserRoleTile.scss'
import Link from 'components-lib/Link/Link'

class UserRoleTile extends React.Component {

	constructor(props) {
		super(props)
	}


	// Rendering functions //
	// --------------------------------------------------------------------------------

	render() {
		return (
			<Link className='user-role-tile' href={this.props.href}>
				<div className='user-role-tile-img'>
					<img src={this.props.image}/>
				</div>
				<div className='user-role-tile-text'>
					<h4>{this.props.title}</h4>
					<div className='user-role-tile-separator'/>
					<p>{this.props.text}</p>
				</div>				
			</Link>
		)
	}
}

export default UserRoleTile
