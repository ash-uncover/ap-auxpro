import React from 'react'
import AuxiliaryOfferData from './AuxiliaryOfferData'
import './AuxiliaryOffer.scss'

import { Button, Panel, Form, Grid } from 'ap-react-bootstrap'

class AuxiliaryOffer extends React.Component {

	constructor(props) {
		super(props)
		this.state = {}
	}

	componentWillMount() {
		AuxiliaryOfferData.register(this, this.props.params.offerId)
	}

	componentWillUnmount() {
		AuxiliaryOfferData.unregister()
	}

	buildText(text) {
		return text.map(function(line, index) {
			return (
				<div key={index}>{line}</div>
			)
		})
	}

	render() {
		return (
			<div className='ap-auxiliary-offer'>
				<Button block bsStyle='primary' onClick={this.onCancel}>Retour</Button>
				<br/>
				<Grid.Row>
					<Grid.Col sm={6}>
						<Panel>
							<Panel.Header>
								Proposé par {this.state.serviceName}
							</Panel.Header>
							<Panel.Body>
								<div><b>Adresse</b></div>
								<div>{this.state.serviceAddress1}</div>
								<div>{this.state.serviceAddress2}</div>
								<div><b>Email</b></div>
								<div>{this.state.serviceEmail}</div>
								<div><b>Téléphone</b></div>
								<div>{this.state.servicePhone}</div>
							</Panel.Body>
							<Panel.Footer>
							</Panel.Footer>
						</Panel>
					</Grid.Col>
					<Grid.Col sm={6}>
						<Panel>
							<Panel.Header>
								Détails de la mission
							</Panel.Header>
							<Panel.Body>
                                <div>{this.state.missionType}</div>
                                <br/>
								<div><b>{this.state.customerName}</b></div>
								<div>{this.state.customerAddress}</div>
								<br/>
								{this.buildText(this.state.interventionText)}
							</Panel.Body>
							<Panel.Footer>
							</Panel.Footer>
						</Panel>
					</Grid.Col>
				</Grid.Row>
			</div>
		)
	}

}
export default AuxiliaryOffer
