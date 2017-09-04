import React from 'react'

class Text extends React.Component {

	constructor(props) {
		super(props)
	}


	// Rendering functions //
	// --------------------------------------------------------------------------------

	buildContent() {
		let result = [];
		if (typeof this.props.text === 'string') {
			return this.props.text
		}
		let l = (this.props.text || []).length
		for (let i = 0; i < l; i++) {
			let t = this.props.text[i]
			if (t) {
				result.push(<div key={i}>{t}</div>)	
			} else {
				result.push(<div key={i}>&nbsp;</div>)
			}
			
		}
		return result
	}

	render() {
		return (
			<div className='ap-text'>
				{this.buildContent()}
			</div>
		)
	}

}
export default Text
