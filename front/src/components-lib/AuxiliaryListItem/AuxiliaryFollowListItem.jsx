import React from 'react'
import './AuxiliaryListItem.scss'

import AppHelper from 'helpers/AppHelper'
import AuxiliaryHelper from 'helpers/AuxiliaryHelper'
import OfferHelper from 'helpers/OfferHelper'

import { BaseComponent, Grid, Glyphicon, List, RaterStar, Button } from 'ap-react-bootstrap'

import Image from 'components-lib/Image/Image'

import OfferStatusAux from 'utils/constants/OfferStatusAux'

import AuxiliaryUtils from 'utils-lib/entities/AuxiliaryUtils'
import OfferStatusAuxUtils from 'utils-lib/entities/OfferStatusAuxUtils'

class AuxiliaryFollowListItem extends BaseComponent {

	constructor(props) {
		super(props)
		this.onShowAuxliaryDetails = this._onShowAuxliaryDetails.bind(this)
		this.state = {}
		// Base classes
		this.baseClasses = [ 'ap-auxiliary-list-item', 'ap-auxiliary-list-item-follow' ]
		// Component properties
		this.propsInfos = {
			required : {
				offerId: {},
				onConfirm: {}
			},
			optionnal : {
			}
		}
	}

	componentWillMount() {
		let offer = OfferHelper.getData(this.props.offerId)
		this.auxiliaryId = offer.auxiliaryId
		let auxiliary = AuxiliaryHelper.getData(offer.auxiliaryId)
		this.state.avatar = auxiliary.avatar
		this.state.name = AuxiliaryUtils.getFullName(auxiliary)
		this.state.address = AuxiliaryUtils.getAddress(auxiliary)
		this.state.status = OfferStatusAux.get(offer.auxStatus)
	}


	// View callbacks //
	// --------------------------------------------------------------------------------

	_onShowAuxliaryDetails() {
		AppHelper.navigate('/service/auxiliaries/' + this.auxiliaryId)
	}


	// Rendering functions //
	// --------------------------------------------------------------------------------

	render() { 
		this.buildProps('AuxiliaryFollowListItem')
		return (
			<List.Item className={this.className}>
				<Grid.Row>
					<Grid.Col xs={3} sm={2} md={1}>
						<Image alt='<Ma photo>' id={this.state.avatar} className={this.state.avatar ? '' : 'ap-no-image'}/>
					</Grid.Col>
					<Grid.Col xs={9} sm={4} md={5}>	
						<h5>
							<strong>{this.state.name}</strong> 
							<Button bsSize='xs' tooltip='Voir fiche auxiliaire' onClick={this.onShowAuxliaryDetails}>
								<Glyphicon glyph='user' />
							</Button>
						</h5>
						<p>{this.state.address}</p>
					</Grid.Col>
					<Grid.Col xs={6} sm={3}>
						<h5>Statut offre</h5>
						{OfferStatusAuxUtils.getName(this.state.status.key)}
					</Grid.Col>
					<Grid.Col xs={6} sm={3}>
						<br/>
						{this.state.status === OfferStatusAux.ACCEPTED ? 
							<Button
								block
								bsStyle='success'
								onClick={this.props.onConfirm}>
								Confirmer
							</Button>
						: null }
					</Grid.Col>
				</Grid.Row>
			</List.Item>
		)
	}
}

export default AuxiliaryFollowListItem
