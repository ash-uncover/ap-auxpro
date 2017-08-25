import React from 'react'
import AuxiliaryHeaderData from 'components-lib/AuxiliaryHeader/AuxiliaryHeaderData'
import './AuxiliaryHeader.scss'

import { Col, Panel, Form } from 'ap-react-bootstrap'

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

	_buildFromGroup(label, value) { return (
		<Form.Group>
			<Form.Label className='col-sm-2'>{label}</Form.Label>
			<Form.Static className='col-sm-10'>{value}</Form.Static>
		</Form.Group>
	)}

	render() {
		return (
			<Panel className='ap-auxiliary-header hidden-xs'>
				<Panel.Body>
					<Col sm={4} md={3} lg={2}>
						<img alt='Ma photo' className='ap-header-img' src={this.state.avatarImage} />
					</Col>
					<Col sm={8} md={9} lg={10}>
						<Form horizontal>
							{this._buildFromGroup('Nom', this.state.name)}
							{this._buildFromGroup('Adresse', this.state.address)}
							{this._buildFromGroup('Email', this.state.email)}
							{this._buildFromGroup('Diplome', this.state.diploma)}
						</Form>
					</Col>
				</Panel.Body>
			</Panel>
		)
	}

}
export default AuxiliaryHeader
