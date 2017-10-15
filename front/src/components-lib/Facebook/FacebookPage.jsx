import React from 'react'
import './ap-facebook.scss'

import { BaseComponent } from 'ap-react-bootstrap'

class FacebookPage extends BaseComponent {

	constructor(props) {
		super(props)
		// Base classes
		this.baseClasses = [ 'fb-page', 'ap-facebook-page' ]
		// Sub properties
		this.facebookProps = {}
		// Component properties
		this.propsInfos = {
			required : {
				link: { rename: 'data-href', store: this.facebookProps },
				name: { store: this.facebookProps },
			},
			optionnal : {
				tabs: { 
					defaultValue: 'timeline', 
					rename: 'data-tabs', 
					store: this.facebookProps 
				},
				smallHeader: { 
					defaultValue: true, 
					rename: 'data-small-header', 
					store: this.facebookProps 
				},
				adaptContainerWidth: { 
					defaultValue: true, 
					rename: 'data-adapt-container-width', 
					store: this.facebookProps 
				},
				hideCover: { 
					defaultValue: true, 
					rename: 'data-hide-cover', 
					store: this.facebookProps 
				},
				showFacepile: { 
					defaultValue: 'false',
					rename: 'data-show-facepile', 
					store: this.facebookProps 
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

	render() {
		this.buildProps('FacebookPage')
		return (
			<div className={this.className} {...this.facebookProps}>
				<blockquote 
					cite={this.facebookProps['data-href']}
					className='fb-xfbml-parse-ignore'>
					<a href={this.facebookProps['data-href']}>
						{this.facebookProps.name}
					</a>
				</blockquote>
			</div>
		)
	}

}
export default FacebookPage
