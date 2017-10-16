import React from 'react'
import './ap-twitter.scss'

import { BaseComponent } from 'ap-react-bootstrap'

class TwitterTimeline extends BaseComponent {

	constructor(props) {
		super(props)
		// Base classes
		this.baseClasses = [ 'ap-twitter-timeline' ]
		// Sub properties
		this.twitterProps = {
			className: 'twitter-timeline'
		}
		// Component properties
		this.propsInfos = {
			required : {
				href: { 
					rename: 'href', 
					store: this.twitterProps 
				},
				name: { 
					rename: 'children', 
					store: this.twitterProps 
				}
			},
			optionnal : {
				lang: { 
					rename: 'data-lang', 
					store: this.twitterProps 
				},
				theme: { 
					defaultValue: 'light',
					rename: 'data-theme', 
					store: this.twitterProps 
				},
				width: { 
					rename: 'data-width', 
					store: this.twitterProps 
				},
				height: { 
					rename: 'data-height', 
					store: this.twitterProps 
				}
			}
		}
	}

	componentDidMount() {
		twttr.widgets.load()
	}

	render() {
		this.buildProps('TwitterTimeline')
		return (
			<div className={this.className}>
				<a className={this.className} {...this.twitterProps} />
			</div>
		)
	}

}
export default TwitterTimeline
