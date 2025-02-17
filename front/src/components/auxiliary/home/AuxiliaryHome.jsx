import React from 'react'
import AuxiliaryHomeData from './AuxiliaryHomeData'
import './AuxiliaryHome.scss'

import { Panel, Grid, TextUtils } from 'ap-react-bootstrap'

import OfferStatusSad from 'utils/constants/OfferStatusSad'

import OfferStatusSadUtils from 'utils-lib/entities/OfferStatusSadUtils'

class AuxiliaryHome extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			premium: false,
			profilCompleted: false,
			offersPendingCount: 0,
			offersConfirmedCount: 0,
			offersRejectedCount: 0,
			offersCanceledCount: 0,
			customersCount: 0,
			interventionsCount: 0,
			missionsCount: 0
		}
	}

	componentWillMount() {
		AuxiliaryHomeData.register(this)
	}

	componentWillUnmount() {
		AuxiliaryHomeData.unregister()
	}

	buildOfferCount(status) {
		let count = this.state['offers' + status + 'Count']
		return (
			<div>
				J'ai <strong><b>{count}</b></strong>
				{' ' + TextUtils.capitalize(OfferStatusSadUtils.getNameOfferPlural(OfferStatusSad[status.toUpperCase()].key, count)) + '.'}
			</div>
		)
	}

	render() {
		return (
			<Grid.Row className='ap-auxiliary-home'>
				<Grid.Col sm={6} md={4}>
					<Panel>
						<Panel.Header>
							Statut Compte
						</Panel.Header>
						<Panel.Body>
							{ this.state.premium 
								? <strong>Compte Premium</strong> 
								: <div className='ap-error'>Accès limité ! Passez votre compte en Premium pour profiter pleinement de nos fonctionnalités</div>
							}
						</Panel.Body>
						<Panel.Footer>
						</Panel.Footer>
					</Panel>
				</Grid.Col>
				<Grid.Col sm={6} md={4}>
					<Panel>
						<Panel.Header>
							Statut profil
						</Panel.Header>
						<Panel.Body>
							<strong>{'Votre profil est ' + (this.state.profilCompleted ? 'complet' : 'incomplet') + '.'}</strong>
						</Panel.Body>
						<Panel.Footer>
						</Panel.Footer>
					</Panel>
				</Grid.Col>
				<Grid.Clearfix />
				<Grid.Col sm={6} md={4}>
					<Panel>
						<Panel.Header>
							Offres
						</Panel.Header>
						<Panel.Body>
							{this.buildOfferCount('Pending')}
							{this.buildOfferCount('Confirmed')}
							{this.buildOfferCount('Rejected')}
							{this.buildOfferCount('Canceled')}
						</Panel.Body>
						<Panel.Footer>
						</Panel.Footer>
					</Panel>
				</Grid.Col>
				<Grid.Col sm={6} md={4}>
					<Panel>
						<Panel.Header>
							Interventions
						</Panel.Header>
						<Panel.Body>
							<div>
								J'ai <strong><b>{this.state.interventionsCount}</b></strong>
								{' ' + TextUtils.pluralize('mission', this.state.interventionsCount) + ' actuellement ' + TextUtils.pluralize('planifiée', this.state.interventionsCount) + '.'}
							</div>
						</Panel.Body>
						<Panel.Footer>
						</Panel.Footer>
					</Panel>
				</Grid.Col>
				<Grid.Col sm={6} md={4}>
					<Panel>
						<Panel.Header>
							Usagers
						</Panel.Header>
						<Panel.Body>
							<div>
								J'interviens chez <strong><b>{this.state.customersCount}</b></strong>
								{' ' + TextUtils.pluralize('usager', this.state.customersCount) + '.'}
							</div>
						</Panel.Body>
						<Panel.Footer>
						</Panel.Footer>
					</Panel>
				</Grid.Col>
			</Grid.Row>
		)
	}
}
export default AuxiliaryHome
