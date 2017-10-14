import React from 'react'
import './AuxiliaryListItem.scss'

import AppHelper from 'helpers/AppHelper'
import AuxiliaryHelper from 'helpers/AuxiliaryHelper'

import { BaseComponent, Grid, Glyphicon, List, RaterStar, Button } from 'ap-react-bootstrap'

import Image from 'components-lib/Image/Image'

import AuxiliaryUtils from 'utils-lib/entities/AuxiliaryUtils'

class AuxiliaryMatchListItem extends BaseComponent {

	constructor(props) {
		super(props)
		this.onShowAuxliaryDetails = this._onShowAuxliaryDetails.bind(this)
		// Base classes
		this.baseClasses = [ 'ap-auxiliary-list-item', 'ap-auxiliary-list-item-match' ]
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
		let auxiliary = AuxiliaryHelper.getData(this.props.auxiliaryId)
		this.state = {
			avatar: auxiliary.avatar,
			name: AuxiliaryUtils.getFullName(auxiliary),
			address: AuxiliaryUtils.getAddress(auxiliary)
		}
	}

	componentDidMount() {
		$(function () {
			$('.ap-auxiliary-match-item [data-toggle="tooltip"]').tooltip()
		})
	}


	// View Callbacks //
	// --------------------------------------------------------------------------------

	_onShowAuxliaryDetails() {
		AppHelper.navigate('/service/auxiliaries/' + this.props.auxiliaryId)
	}

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