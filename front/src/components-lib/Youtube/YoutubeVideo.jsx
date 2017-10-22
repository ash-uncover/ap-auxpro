import React from 'react'
import './ap-youtube.scss'

import { BaseComponent } from 'ap-react-bootstrap'

let RATIOS = {
	'16:10': { w: 16 , h: 10 },
	'16:9': { w: 16 , h: 9 },
	'4:3': { w: 4 , h: 3 }
}

class YoutubeVideo extends BaseComponent {

	constructor(props) {
		super(props)

		this.onResize = this._onResize.bind(this)
		// Base classes
		this.baseClasses = [ 'ap-youtube-video' ]
		// Sub properties
		this.customProps = { }
		this.youtubeProps = { }
		// Component properties
		this.propsInfos = {
			required : {
				src: { 
					store: this.youtubeProps 
				}
			},
			optionnal : {
				ratio: { 
					defaultValue: '16:9', 
					store: this.customProps 
				},
				height: {
					defaultValue: '100%',
					store: this.youtubeProps
				},
				width: {
					defaultValue: '100%',
					store: this.youtubeProps
				}
			}
		}
	}

	componentDidMount() {
		window.addEventListener('resize', this.onResize)
		this.onResize()
	}

	componentWillMount() {
		window.removeEventListener('resize', this.onResize)
	}

	_onResize() {
		let clientWidth = this.iframe.getBoundingClientRect().width
		let ratio = RATIOS[this.customProps.ratio] || RATIOS['16:9']
		let newHeight = clientWidth * ratio.h / ratio.w
		this.iframe.style.height = newHeight + 'px'
	}

	render() {
		this.buildProps('YoutubeVideo')
		return (
			<iframe 
				className={this.className} 
				ref={(c) => this.iframe = c}
				{...this.youtubeProps} />
		)
	}

}
export default YoutubeVideo
