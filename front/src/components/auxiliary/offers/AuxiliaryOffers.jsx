import React from 'react'
import AuxiliaryOffersData from './AuxiliaryOffersData'
import './AuxiliaryOffers.scss'

import { Grid, Panel, Button, ButtonGroup, Utils } from 'ap-react-bootstrap'

import AuxiliaryOfferTile from 'components-lib/AuxiliaryOfferTile/AuxiliaryOfferTile'

import ModalDialog from 'components-lib/Modal/ModalDialog'

import OfferStatusSad from 'utils/constants/OfferStatusSad'
import OfferStatusSadUtils from 'utils-lib/entities/OfferStatusSadUtils'

class AuxiliaryOffers extends React.Component {

	constructor(props) {
		super(props)
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
				{ OfferStatusSadUtils.getNamePlural(key) + ' (' + offers.length + ')' }
			</Button>
		)
	}

	showStatus(status) {
		return !this.state.filterState || this.state.filterState === status
	}

	buildOffers(status) {
		return (this.state.offers[status.key] || []).map(this.buildOffer)
	}

	_buildOffer(offer, index) {
		return (
			<AuxiliaryOfferTile key={offer.id} offerId={offer.id} />
		)
	}

	render() {
		let showPending = this.showStatus(OfferStatusSad.PENDING)
		let showConfirmed = this.showStatus(OfferStatusSad.CONFIRMED)
		let showRejected = this.showStatus(OfferStatusSad.REJECTED)
		let showCanceled = this.showStatus(OfferStatusSad.CANCELED)
		return (
			<div className='ap-auxiliary-offers'>
				<Panel>
					<Panel.Header>
						Mes offres
					</Panel.Header>
					<Panel.Body>
						<Grid.Row>
							<Grid.Col xs={12} className='ap-auxiliary-offers-filter-buttons'>
								<ButtonGroup>
									<Button 
										bsStyle={this.state.filterState ? 'default' : 'primary'}
										onClick={this.onFilterState}>
										{ 'Toutes (' + this.countOffers() + ')' }
									</Button>
									{this.buildStateButton(OfferStatusSad.PENDING)}
									{this.buildStateButton(OfferStatusSad.CONFIRMED)}
									{this.buildStateButton(OfferStatusSad.REJECTED)}
									{this.buildStateButton(OfferStatusSad.CANCELED)}
								</ButtonGroup>
							</Grid.Col>
						</Grid.Row>
						<br/>
						{ showPending ? <h4>Offres en attente</h4> : null }
						{ showPending ? this.buildOffers(OfferStatusSad.PENDING) : null }
						{ showPending ? <Grid.Clearfix /> : null }

						{ showConfirmed ? <h4>Offres confirmées</h4> : null }
						{ showConfirmed ? this.buildOffers(OfferStatusSad.CONFIRMED) : null }
						{ showConfirmed ? <Grid.Clearfix /> : null }

						{ showRejected ? <h4>Offres rejetées</h4> : null }
						{ showRejected ? this.buildOffers(OfferStatusSad.REJECTED) : null }
						{ showRejected ? <Grid.Clearfix /> : null }

						{ showCanceled ? <h4>Offres annulées</h4> : null }
						{ showCanceled ? this.buildOffers(OfferStatusSad.CANCELED) : null }
						{ showCanceled ? <Grid.Clearfix /> : null }
					</Panel.Body>
					<Panel.Footer>
					</Panel.Footer>
				</Panel>

				<ModalDialog 
					title="Supprimer l'offre ?"
					show={this.state.showDeleteOffer}
					onCancel={this.onCancelDelete}
					onConfirm={this.onConfirmDelete}>
					Êtes-vous sûr ?
				</ModalDialog>
			</div>
		)
	}

}
export default AuxiliaryOffers
