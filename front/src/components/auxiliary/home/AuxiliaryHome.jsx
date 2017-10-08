import React from 'react'
import AuxiliaryHomeData from './AuxiliaryHomeData'
import './AuxiliaryHome.scss'

import { Panel } from 'ap-react-bootstrap'

class AuxiliaryHome extends React.Component {

	constructor(props) {
		super(props)
	}

	componentWillMount() {
		AuxiliaryHomeData.register(this)
	}

	componentWillUnmount() {
		AuxiliaryHomeData.unregister()
	}

	render() {  
		return (
			<Panel className='ap-auxiliary-home'>
				<Panel.Header>
					Statut Compte
				</Panel.Header>
				<Panel.Body>
					{ AuxiliaryHomeData.premium 
						? <strong>Compte Premium</strong> 
						: <div className='ap-error'>Accès limité ! Passez votre compte en Premium pour profiter pleinement de nos fonctionnalités</div>
					}
				</Panel.Body>
				<Panel.Footer>
				</Panel.Footer>
				<Panel.Header>
					Statut profil
				</Panel.Header>
				<Panel.Body>
					<strong>{'Votre profil est ' + (AuxiliaryHomeData.complete ? 'actif' : 'incomplet') + '.'}</strong>
				</Panel.Body>
				<Panel.Footer>
				</Panel.Footer>
				<Panel.Header>
					Offres
				</Panel.Header>
				<Panel.Body>
					<div><strong><b>{AuxiliaryHomeData.offersPendingCount}</b></strong>{AuxiliaryHomeData.textPending}</div>
					<div><strong><b>{AuxiliaryHomeData.offersConfirmedCount}</b></strong>{AuxiliaryHomeData.textConfirmed}</div>
					<div><strong><b>{AuxiliaryHomeData.offersRejectedCount}</b></strong>{AuxiliaryHomeData.textRejected}</div>
					<div><strong><b>{AuxiliaryHomeData.offersCanceledCount}</b></strong>{AuxiliaryHomeData.textCanceled}</div>
				</Panel.Body>
				<Panel.Footer>
				</Panel.Footer>
				<Panel.Header>
					Interventions
				</Panel.Header>
				<Panel.Body>
					<div><strong><b>{AuxiliaryHomeData.interventionsCount}</b></strong>{AuxiliaryHomeData.textIntervention}</div>
				</Panel.Body>
				<Panel.Footer>
				</Panel.Footer>
				<Panel.Header>
					Usagers
				</Panel.Header>
				<Panel.Body>
					<div><strong><b>{AuxiliaryHomeData.customersCount}</b></strong>{AuxiliaryHomeData.textCustomer}</div>
				</Panel.Body>
				<Panel.Footer>
				</Panel.Footer>
			</Panel>
		)
	}
}
export default AuxiliaryHome
