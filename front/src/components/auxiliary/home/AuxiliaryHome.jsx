import React from 'react'
import AuxiliaryHomeData from './AuxiliaryHomeData'
import './AuxiliaryHome.scss'

import { Panel } from 'ap-react-bootstrap'

class AuxiliaryHome extends React.Component {

	constructor(props) {
		super(props)
	}

	componentWillMount() {
		AuxiliaryHomeData.register(this)
	}

	componentWillUnmount() {
		AuxiliaryHomeData.unregister()
	}

	render() {  
		return (
			<Panel className='ap-auxiliary-home'>
				<Panel.Header>
					Auxiliary Home Header
				</Panel.Header>
				<Panel.Body>
					Auxiliary Home Body
				</Panel.Body>
				<Panel.Footer>
					Auxiliary Home Footer
				</Panel.Footer>
			</Panel>
		)
	}
}
export default AuxiliaryHome
