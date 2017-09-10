import React from 'react'
import AuxiliaryMatchListItemData from './AuxiliaryMatchListItemData'
import './AuxiliaryMatchListItem.scss'

import { BaseComponent, Grid, Glyphicon, List, RaterStar, Button } from 'ap-react-bootstrap'

import Image from 'components-lib/Image/Image'

class AuxiliaryMatchListItem extends BaseComponent {

	constructor(props) {
		super(props)
		// Base classes
		this.baseClasses = [ 'ap-auxiliary-match-item' ]
		// Sub components properties
		this.ListGroupItemLinkProps = {
			onClick: this._onClick.bind(this)
		}
		// Component properties
		this.propsInfos = {
			required : {
				auxiliaryId: {},
				geoScore: {},
				timeScore: {},
				skillScore: {}
			},
			optionnal : {
				active: { defaultValue: false, store: this.ListGroupItemLinkProps },
				onClick: {}
			}
		}
	}

	componentWillMount() {
		AuxiliaryMatchListItemData.register(this, this.props.auxiliaryId)
	}

	componentWillUnmount() {
		AuxiliaryMatchListItemData.unregister()
	}



	// View Callbacks //
	// --------------------------------------------------------------------------------

	_onClick(event) {
		event.preventDefault()
		console.log('clicked')
		if (this.props.onClick) {
			this.props.onClick()
		}
	}
	
	onAuxiliaryDetails() {
		console.log('show aux details ' + this.props.id)
	}


	// Rendering functions //
	// --------------------------------------------------------------------------------

	render() { 
		this.buildProps('AuxiliaryMatchListItem')
		return (
			<List.ItemLink className={this.className} {...this.ListGroupItemLinkProps} >
				<Grid.Row>
					<Grid.Col xs={3} sm={2} md={1}>
						<Image alt='<Ma photo>' id={this.state.avatar} className={this.state.avatar ? '' : 'ap-no-image'}/>
					</Grid.Col>
					<Grid.Col xs={9} sm={4} sm={4}>	
						<h5><strong>{this.state.name}</strong></h5>
						<p>{this.state.address}</p>
					</Grid.Col>
					<Grid.Col xs={4} sm={2}>
						<h5>Score geographique</h5>
						<RaterStar value={this.props.geoScore/20} />
					</Grid.Col>
					<Grid.Col xs={4} sm={2}>
						<h5>Score disponibilité</h5>
						<RaterStar value={this.props.timeScore/20} />
					</Grid.Col>
					<Grid.Col xs={4} sm={2}>
						<h5>Score compétences</h5>
						<RaterStar value={this.props.skillScore/20} />
					</Grid.Col>
				</Grid.Row>
			</List.ItemLink>
		)
	}
}

export default AuxiliaryMatchListItem