import React from 'react'
import './ap-links.scss'

import AppHelper from 'helpers/AppHelper'

import { BaseComponent } from 'ap-react-bootstrap'

class Link extends BaseComponent {

	constructor(props) {
		super(props)
		this.onClick = this._onClick.bind(this)
		// Base classes
		this.baseClasses = [ 'ap-link' ]
		//
		this.linkProps = {
			action: 'push',
			onClick: this.onClick
		}
		// Component properties
		this.propsInfos = {
			required : {
				href: { store: this.linkProps },
				children: {}
			},
			optionnal : {
			}
		}
	}

	_onClick(event) {
		event.preventDefault()
		AppHelper.navigate(this.props.href)
	}

	render() {
		this.buildProps('Link')
		return (
			<a className={this.className} {...this.linkProps}>
				{this.props.children}
			</a>
		)
	}

}
export default Link
