import React from 'react'
import FAQData from 'components/infos/faq/FAQData'
import './FAQ.scss'

/* This class was auto-generated by the JavaScriptWriter */
class FAQ extends React.Component {

	constructor(props) {
		super(props)
	}

	componentWillMount() {
		FAQData.register(this)
	}

	componentWillUnmount() {
		FAQData.unregister()
	}

	render() {
		return (
			<div className='ap-faq'>
				FAQ
			</div>
		)
	}

}
export default FAQ
