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
		this.ListGroupItemLinkProps = {}
		// Component properties
		this.propsInfos = {
			required : {
				auxiliaryId: {},
				geoScore: {},
				timeScore: {},
				skillScore: {}
			},
			optionnal : {
				active: {},
				onClick: {}
			}
		}
	}

	componentWillMount() {
		AuxiliaryMatchListItemData.register(this, this.props.auxiliaryId)
	}

	componentDidMount() {
		$(function () {
			$('.ap-auxiliary-match-item [data-toggle="tooltip"]').tooltip()
		})
	}


	componentWillUnmount() {
		AuxiliaryMatchListItemData.unregister()
	}



	// View Callbacks //
	// --------------------------------------------------------------------------------

	_onClick(event) {
		event.preventDefault()
		if (this.props.onClick) {
			this.props.onClick()
		}
	}
	

	// Rendering functions //
	// --------------------------------------------------------------------------------

	render() { 
		this.buildProps('AuxiliaryMatchListItem')
		return (
			<div className={this.className} onClick={this.props.onClick}>
				<List.ItemLink active={this.props.active} >
					<Grid.Row>
						<Grid.Col xs={3} sm={2} md={1}>
							<Image alt='<Ma photo>' id={this.state.avatar} className={this.state.avatar ? '' : 'ap-no-image'}/>
						</Grid.Col>
						<Grid.Col xs={9} sm={4} sm={4}>	
							<h5>
								<strong>{this.state.name}</strong> 
								<Button bsSize='xs' tooltip='Voir fiche auxiliaire' onClick={this.onShowAuxliaryDetails}>
									<Glyphicon glyph='user' />
								</Button>
							</h5>
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
			</div>
		)
	}
}

export default AuxiliaryMatchListItem