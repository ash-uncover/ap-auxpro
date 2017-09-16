import React from 'react'
import AuxiliaryFollowListItemData from './AuxiliaryFollowListItemData'
import './AuxiliaryListItem.scss'

import { BaseComponent, Grid, Glyphicon, List, RaterStar, Button } from 'ap-react-bootstrap'

import Image from 'components-lib/Image/Image'

import OfferStatusAux from 'utils/constants/OfferStatusAux'
import OfferStatusAuxUtils from 'utils-lib/entities/OfferStatusAuxUtils'

class AuxiliaryFollowListItem extends BaseComponent {

	constructor(props) {
		super(props)
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
		AuxiliaryFollowListItemData.register(this, this.props.offerId)
	}

	componentWillUnmount() {
		AuxiliaryFollowListItemData.unregister()
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
