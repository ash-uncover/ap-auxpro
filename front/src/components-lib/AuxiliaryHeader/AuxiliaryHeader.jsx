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
			<Panel className='ap-auxiliary-header hidden-xs'>
				<Panel.Body>
					<Col sm={4}>
						<img alt='Ma photo' className='ap-header-img' src={this.state.avatar} />
					</Col>
					<Col sm={8}>
						Mes infos
					</Col>
				</Panel.Body>
			</Panel>
		)
	}

}
export default AuxiliaryHeader
