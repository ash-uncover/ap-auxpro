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

	render() {
		return (
			<Panel className='ap-auxiliary-header hidden-xs'>
				<Panel.Body>
					<Col sm={4} md={3} lg={2}>
						<img alt='Ma photo' className='ap-header-img' src={this.state.avatarImage} />
					</Col>
					<Col sm={8} md={9} lg={10}>
						<Form horizontal>
							<Form.Group>
								<Form.Label className='col-sm-2'>Nom</Form.Label>
								<Form.Static className='col-sm-10'>{this.state.name}</Form.Static>
							</Form.Group>
							<Form.Group>
								<Form.Label className='col-sm-2'>Adresse</Form.Label>
								<Form.Static className='col-sm-10'>{this.state.address}</Form.Static>
							</Form.Group>
							<Form.Group>
								<Form.Label className='col-sm-2'>Email</Form.Label>
								<Form.Static className='col-sm-10'>{this.state.email}</Form.Static>
							</Form.Group>
							<Form.Group>
								<Form.Label className='col-sm-2'>Diplome</Form.Label>
								<Form.Static className='col-sm-10'>{this.state.diploma}</Form.Static>
							</Form.Group>
						</Form>
					</Col>
				</Panel.Body>
			</Panel>
		)
	}

}
export default AuxiliaryHeader
