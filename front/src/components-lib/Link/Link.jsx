import React from 'react'
import './Link.scss'

import AppHelper from 'helpers/AppHelper'

class Link extends React.Component {

	constructor(props) {
		super(props)

		this.onClick = this._onClick.bind(this)
	}

	_onClick(event) {
		event.preventDefault()
		AppHelper.navigate(this.props.link)
	}

	render() {
		return (
			<a className='ap-link' action='push' href={this.props.link} onClick={this.onClick}>{this.props.children}</a>
		)
	}

}
export default Link
