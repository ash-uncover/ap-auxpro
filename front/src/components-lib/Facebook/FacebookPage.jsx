import React from 'react'
import PropTypes from 'prop-types'
import './ap-facebook.scss'

import { BaseComponent } from 'ap-react-bootstrap'

class FacebookPage extends BaseComponent {

	constructor(props) {
		super(props)
		// Base classes
		this.baseClasses = [ 'fb-page', 'ap-facebook-page' ]
		this.facebookLoaded = this._facebookLoaded.bind(this)
		// Sub properties
		this.facebookProps = {}
		// Component properties
		this.propsInfos = {
			required : {
				href: { rename: 'data-href', store: this.facebookProps },
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
					defaultValue: 500,
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

	_facebookLoaded() {
        try {
            FB && FB.XFBML && FB.XFBML.parse()
        } catch (error) {
            
        }
		
	}

	componentDidMount() {
		if (ap.facebookalreadyseen) {
			this.facebookLoaded()
		}
		ap.facebookalreadyseen = true;
     	let parentWidth = this.refs.container.getBoundingClientRect().width
     	if (parentWidth < this.facebookProps['data-width']) {
     		this.facebookProps['data-width'] = parentWidth
     	}
	}

	render() {
		this.buildProps('FacebookPage')
		return (
			<div className={this.className} {...this.facebookProps} ref='container'>
				<blockquote 
					cite={this.facebookProps['data-href']}
					className='fb-xfbml-parse-ignore'>
					<a href={this.facebookProps['data-href']} target='_top'>
						{this.facebookProps.name}
					</a>
				</blockquote>
			</div>
		)
	}
}
FacebookPage.propTypes = {
	name: PropTypes.string.isRequired,
	href: PropTypes.string.isRequired
}
export default FacebookPage
