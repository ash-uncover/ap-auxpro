import React from 'react'
import AuxiliaryOfferTileData from './AuxiliaryOfferTileData'
import './AuxiliaryOfferTile.scss'

import { Panel, Grid, Button, Glyphicon } from 'ap-react-bootstrap'

class AuxiliaryOfferTilePending extends React.Component {

	constructor(props) {
		super(props)
		this.state = {}
		this.buildAction = this._buildAction.bind(this)
	}

	componentWillMount() {
		AuxiliaryOfferTileData.register(this, this.props.offerId)
	}

	componentWillUnmount() {
		AuxiliaryOfferTileData.unregister()
	}

	_buildAction(action) {
		return (
			<Button key={action.key} bsStyle={action.style} onClick={this.props[action.callback]} block>
				<Glyphicon glyph={action.key}/>
				<span className='text'>{action.tooltip}</span>
			</Button>
		)
	}

	render() {
		return (
			<Grid.Col md={6} className='ap-auxiliary-offer-tile ap-auxiliary-offer-tile-pending'>
				<Panel>
					<Panel.Header>
						<p>{this.state.title}</p>
					</Panel.Header>
					<Panel.Body>
						<div className='ap-offer-tile-text'>
							<div className='ap-intile-strong'>
								<b>Proposé par {this.state.serviceName}</b>
							</div>
							<div className='ap-intile-strong'>
								<b>Chez {this.state.customerName}</b>
							</div>
							<p>{this.state.customerAddress}</p>
						</div>
						<div className='ap-offer-tile-actions'>
							{this.state.actions.map(this.buildAction)}
						</div>
					</Panel.Body>
					<Panel.Footer>
					</Panel.Footer>
				</Panel>
			</Grid.Col>
		)
	}

}
export default AuxiliaryOfferTilePending
