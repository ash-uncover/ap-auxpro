import React from 'react'
import PresentationData from 'components/infos/presentation/PresentationData'
import './Presentation.scss'

/* This class was auto-generated by the JavaScriptWriter */
class Presentation extends React.Component {

	constructor(props) {
		super(props)
	}

	componentWillMount() {
		PresentationData.register(this)
	}

	componentWillUnmount() {
		PresentationData.unregister()
	}

	render() {
		return (
			<div className='ap-presentation'>
				Presentation
			</div>
		)
	}

}
export default Presentation
