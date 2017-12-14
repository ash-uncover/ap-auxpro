import React from 'react'
import AuxiliaryOffersData from './AuxiliaryOffersData'
import './AuxiliaryOffers.scss'

import { Grid, Panel, Button, ButtonGroup, Utils } from 'ap-react-bootstrap'

import AuxiliaryOfferTile from 'components-lib/AuxiliaryOfferTile/AuxiliaryOfferTile'

import ModalDialog from 'components-lib/Modal/ModalDialog'

import OfferStatusAux from 'utils/constants/OfferStatusAux'
import OfferStatusSad from 'utils/constants/OfferStatusSad'
import OfferStatus from 'utils-lib/constants/OfferStatus'

import OfferStatusAuxUtils from 'utils-lib/entities/OfferStatusAuxUtils'
import OfferStatusSadUtils from 'utils-lib/entities/OfferStatusSadUtils'
import OfferStatusUtils from 'utils-lib/entities/OfferStatusUtils'

class AuxiliaryOffers extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			filterState: null
		}
		this.buildOffer = this._buildOffer.bind(this)
		
	}

	componentWillMount() {
		AuxiliaryOffersData.register(this)
	}

	componentWillUnmount() {
		AuxiliaryOffersData.unregister()
	}


	// Rendering functions //
	// --------------------------------------------------------------------------------

	countOffers() {
		return Utils.reduce(this.state.offers, function (result, status) {
			return result + status.length
		}, 0)
	}

	buildStateButton(status) {
		let key = status.key
		let offers = this.state.offers[key] || []
		return (
			<Button 
				bsStyle={this.state.filterState === status ? 'primary' : 'default'}
				onClick={this.onFilterState.bind(this, status)}>
				{ OfferStatusUtils.getNamePlural(status) + ' (' + offers.length + ')' }
			</Button>
		)
	}

	buildOffers() {
		let offers = this.state.offers[this.state.filterState.key]
		if (offers &&  offers.length) {
			return offers.map(this.buildOffer)
		} else {
			return 'Aucune mission correspondante'
		}
	}

	_buildOffer(offer, index) {
		return (
			<AuxiliaryOfferTile 
				key={offer.id} 
				offerId={offer.id}
				onView={this.onOfferView.bind(this, offer)}
				onAccept={this.onOfferAccept.bind(this, offer)}
				onDecline={this.onOfferDecline.bind(this, offer)}
				onHide={this.onOfferHide.bind(this, offer)} />
		)
	}

	render() {
		return (
			<div className='ap-auxiliary-offers'>
				<Panel>
					<Panel.Header>
						Mes missions
					</Panel.Header>
					<Panel.Body>
						<Grid.Row>
							<Grid.Col xs={12} className='ap-auxiliary-offers-filter-buttons'>
								<ButtonGroup>
									{this.buildStateButton(OfferStatus.RECEIVED)}
									{this.buildStateButton(OfferStatus.WAITING)}
									{this.buildStateButton(OfferStatus.PLANNED)}
								</ButtonGroup>
							</Grid.Col>
						</Grid.Row>
						<br/>
						{this.buildOffers()}
					</Panel.Body>
					<Panel.Footer>
					</Panel.Footer>
				</Panel>
				<ModalDialog 
					title="Refuser l'offre de mission ?"
					show={this.state.showDecline}
					onCancel={this.onCancelDecline}
					confirmStyle='danger'
					onConfirm={this.onConfirmDecline}>
					Êtes-vous sûr ?
					<br/>
					Votre refus sera communiqué au SAP et vous ne serez plus notifié pour cette offre de mission.
				</ModalDialog>
				<ModalDialog 
					title="Accepter l'offre de mission ?"
					show={this.state.showAccept}
					onCancel={this.onCancelAccept}
					confirmStyle='success'
					onConfirm={this.onConfirmAccept}>
					Êtes-vous sûr ?
					<br/>
					En acceptant l'offre de mission
				</ModalDialog>
			</div>
		)
	}

}
export default AuxiliaryOffers
