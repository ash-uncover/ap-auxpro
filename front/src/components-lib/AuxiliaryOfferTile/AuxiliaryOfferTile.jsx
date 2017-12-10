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
			<Button key={action.key} bsSize='xs' onClick={this.props[action.callback]} tooltip={action.tooltip}>
				<Glyphicon glyph={action.key}/>
			</Button>
		)
	}

	render() {
		return (
			<Grid.Col sm={6} md={4} lg={3} className='ap-auxiliary-offer-tile ap-auxiliary-offer-tile-pending'>
				<Panel>
					<Panel.Header>
						<p>{this.state.title}</p>
						{this.state.actions.map(this.buildAction)}
					</Panel.Header>
					<Panel.Body>
						<div className='ap-intile-strong'>
							<b>Proposé par {this.state.serviceName}</b>
						</div>
						<div className='ap-intile-strong'>
							<b>Chez {this.state.customerName}</b>
						</div>
						<p>{this.state.customerAddress}</p>
					</Panel.Body>
					<Panel.Footer>
					</Panel.Footer>
				</Panel>
			</Grid.Col>
		)
	}

}
export default AuxiliaryOfferTilePending
