import React from 'react'
import './ap-Tweeter.scss'

import { BaseComponent } from 'ap-react-bootstrap'

class TweeterPage extends BaseComponent {

	constructor(props) {
		super(props)
		// Base classes
		this.baseClasses = [ 'twitter-timeline', 'ap-tweeter-timeline' ]
		// Sub properties
		this.tweeterProps = {}
		// Component properties
		this.propsInfos = {
			required : {
				href: { 
					rename: 'href', 
					store: this.tweeterProps 
				},
				name: { 
					rename: 'children', 
					store: this.tweeterProps 
				}
			},
			optionnal : {
				lang: { 
					rename: 'data-lang', 
					store: this.tweeterProps 
				},
				theme: { 
					defaultValue: 'light',
					rename: 'data-theme', 
					store: this.tweeterProps 
				},
				width: { 
					rename: 'data-width', 
					store: this.facebookProps 
				},
				height: { 
					rename: 'data-height', 
					store: this.facebookProps 
				}
			}
		}
	}

	componentDidMount() {
		twttr.widgets.load()
	}

	render() {
		this.buildProps('TweeterPage')
		return (
			<a className={this.className} {...this.tweeterProps}
				className="twitter-timeline" 
				data-lang="fr" 
				data-width="300" 
				data-height="500" 
				data-theme="light" 
				href="https://twitter.com/AuXpros?ref_src=twsrc%5Etfw">
				Tweets by AuXpros
			</a>
		)
	}

}
export default TweeterPage
