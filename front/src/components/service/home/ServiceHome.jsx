import React from 'react'
import ServiceHomeData from './ServiceHomeData'
import './ServiceHome.scss'

import { Panel, Grid } from 'ap-react-bootstrap'

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
            <Grid.Row className='ap-service-home'>
                <Grid.Col sm={4} md={3}>
        			<Panel>
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
                    </Panel>
                </Grid.Col>
                <Grid.Col sm={4} md={3}>
                    <Panel>
        				<Panel.Header>
        					Statut profil
        				</Panel.Header>
        				<Panel.Body>
        					<strong>{'Votre profil est ' + (ServiceHomeData.complete ? 'actif' : 'incomplet') + '.'}</strong>
        				</Panel.Body>
        				<Panel.Footer>
        				</Panel.Footer>
                    </Panel>
                </Grid.Col>
                <Grid.Clearfix />
                <Grid.Col sm={4} md={3}>
                    <Panel>
        				<Panel.Header>
        					Usagers
        				</Panel.Header>
        				<Panel.Body>
        					<div><strong><b>{ServiceHomeData.customersCount}</b></strong>{ServiceHomeData.textCustomer}</div>
        				</Panel.Body>
        				<Panel.Footer>
        				</Panel.Footer>
                    </Panel>
                </Grid.Col>
                <Grid.Col sm={4} md={3}>
                    <Panel>
        				<Panel.Header>
        					Interventions
        				</Panel.Header>
        				<Panel.Body>
        					<div><strong><b>{ServiceHomeData.interventionsCount}</b></strong>{ServiceHomeData.textIntervention}</div>
        				</Panel.Body>
        				<Panel.Footer>
        				</Panel.Footer>
                    </Panel>
                </Grid.Col>
                <Grid.Col sm={4} md={3}>
                    <Panel>
        				<Panel.Header>
        					Auxiliaires
        				</Panel.Header>
        				<Panel.Body>
        					<div><strong><b>{ServiceHomeData.auxiliariesCount}</b></strong>{ServiceHomeData.textauxiliaries}</div>
        				</Panel.Body>
        				<Panel.Footer>
        				</Panel.Footer>
        			</Panel>
                </Grid.Col>
            </Grid.Row>
		)
	}

}
export default ServiceHome
