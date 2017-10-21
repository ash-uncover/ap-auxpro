import React from 'react'
import ServiceInterventionFollowData from './ServiceInterventionFollowData'
import './ServiceInterventionFollow.scss'

import { Button, Panel, Form, Grid, List, TextUtils } from 'ap-react-bootstrap'

import AuxiliaryFollowListItem from 'components-lib/AuxiliaryListItem/AuxiliaryFollowListItem'
import Text from 'components-lib/Text/Text'

import CustomerUtils from 'utils-lib/entities/CustomerUtils'
import InterventionUtils from 'utils-lib/entities/InterventionUtils'

class ServiceInterventionFollow extends React.Component {

	constructor(props) {
		super(props)
		this.buildOffers = this._buildOffers.bind(this)
	}

	componentWillMount() {
		ServiceInterventionFollowData.register(this, this.props.params.interventionId)
	}

	componentWillUnmount() {
		ServiceInterventionFollowData.unregister()
	}


	// Rendering functions //
	// --------------------------------------------------------------------------------

	_buildOffers(offer) {
		return (
			<AuxiliaryFollowListItem 
				key={offer.id}
				auxiliaryId={offer.auxiliaryId}
				offerId={offer.id}
				onConfirm={this.onConfirm.bind(this, offer)} />
		)
	}

	render() {
		return (
			<div className='ap-service-intervention-follow'>
				<Button 
					block 
					bsStyle='primary'
					onClick={this.onCancel}>
					Retour
				</Button>
				<br/>
				<Grid.Row>
					<Grid.Col sm={6}>
						<Panel>
							<Panel.Header>
								Infos usager
							</Panel.Header>
							<Panel.Body>
								<p><b>{CustomerUtils.getFullName(this.state.customer)}</b></p>
								<p>{this.state.customer.address}<br/>{CustomerUtils.getShortAddress(this.state.customer)}</p>
							</Panel.Body>
							<Panel.Footer>
							</Panel.Footer>
						</Panel>
					</Grid.Col>
					<Grid.Col sm={6}>
						<Panel>
							<Panel.Header>
								Infos interventions
							</Panel.Header>
							<Panel.Body>
								<Text text={InterventionUtils.getText(this.state.intervention)} />
							</Panel.Body>
							<Panel.Footer>
							</Panel.Footer>
						</Panel>
					</Grid.Col>
				</Grid.Row>
				<Panel> 
					<Panel.Header>
						Suivi MATCHING
					</Panel.Header>
					<Panel.Body>
						Suivez le statut des offres en cours
					</Panel.Body>
					<List.GroupLink>
						{this.state.offers.map(this.buildOffers)}
					</List.GroupLink>
					<Panel.Footer>
					</Panel.Footer>
				</Panel>
			</div>
		)
	}

}
export default ServiceInterventionFollow
