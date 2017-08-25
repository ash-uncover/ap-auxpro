import React from 'react'
import AuxiliaryHeaderData from 'components-lib/AuxiliaryHeader/AuxiliaryHeaderData'
import './AuxiliaryHeader.scss'

import { Col, Panel } from 'ap-react-bootstrap'

class AuxiliaryHeader extends React.Component {

	constructor(props) {
		super(props)
	}

	componentWillMount() {
		AuxiliaryHeaderData.register(this)
	}

	componentWillUnmount() {
		AuxiliaryHeaderData.unregister()
	}

	render() {
		return (
			<Panel className='ap-auxiliary-header hidden-xs' header=' ' footer=' ' >
				<Col sm={4}>
					ma photo
				</Col>
				<Col sm={8}>
					Mes infos
				</Col>
			</Panel>
		)
	}

}
export default AuxiliaryHeader
