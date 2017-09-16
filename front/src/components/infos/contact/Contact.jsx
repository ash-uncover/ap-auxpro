import React from 'react'
import ContactData from './ContactData'
import './Contact.scss'
import { Panel } from 'ap-react-bootstrap'


/* This class was auto-generated by the JavaScriptWriter */
class Contact extends React.Component {

	constructor(props) {
		super(props)
	}

	componentWillMount() {
		ContactData.register(this)
	}

	componentWillUnmount() {
		ContactData.unregister()
	}

	render() {
		return (
			<Panel className='ap-contact'>
				<Panel.Header>
					<h2>Contact</h2>
				</Panel.Header>
				<Panel.Body>
					<a href='mailto:contact@auxpros.fr' target='_top'>contact@auxpros.fr</a>				
				</Panel.Body>
			</Panel>
		)
	}

}
export default Contact
