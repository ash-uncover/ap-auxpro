import React from 'react'
import ServiceHomeData from './ServiceHomeData'
import './ServiceHome.scss'

import { Panel } from 'ap-react-bootstrap'

class ServiceHome extends React.Component {

	constructor(props) {
		super(props)
	}

	componentWillMount() {
		ServiceHomeData.register(this)
	}

	componentWillUnmount() {
		ServiceHomeData.unregister()
	}

	render() {
		return (
			<Panel className='ap-service-home'>
				<Panel.Header>
					Statut Compte
				</Panel.Header>
				<Panel.Body>
					{ ServiceHomeData.premium 
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
					<strong>{'Votre profil est ' + (ServiceHomeData.complete ? 'actif' : 'incomplet') + '.'}</strong>
				</Panel.Body>
				<Panel.Footer>
				</Panel.Footer>
				<Panel.Header>
					Usagers
				</Panel.Header>
				<Panel.Body>
					<div><strong><b>{ServiceHomeData.customersCount}</b></strong>{ServiceHomeData.textCustomer}</div>
				</Panel.Body>
				<Panel.Footer>
				</Panel.Footer>
				<Panel.Header>
					Interventions
				</Panel.Header>
				<Panel.Body>
					<div><strong><b>{ServiceHomeData.interventionsCount}</b></strong>{ServiceHomeData.textIntervention}</div>
				</Panel.Body>
				<Panel.Footer>
				</Panel.Footer>
				<Panel.Header>
					Auxiliaires
				</Panel.Header>
				<Panel.Body>
					<div><strong><b>{ServiceHomeData.auxiliariesCount}</b></strong>{ServiceHomeData.textauxiliaries}</div>
				</Panel.Body>
				<Panel.Footer>
				</Panel.Footer>
			</Panel>
		)
	}

}
export default ServiceHome
