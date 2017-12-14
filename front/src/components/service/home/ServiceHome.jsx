import React from 'react'
import ServiceHomeData from './ServiceHomeData'
import './ServiceHome.scss'

import { Panel, Grid, TextUtils } from 'ap-react-bootstrap'

class ServiceHome extends React.Component {

	constructor(props) {
		super(props)
        this.state = {}
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
        					{ this.state.premium 
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
        					<strong>{'Votre profil est ' + (this.state.profilCompleted ? 'actif' : 'incomplet') + '.'}</strong>
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
        					<div>
                                <strong><b>{this.state.customersCount}</b></strong>
                                {' ' + TextUtils.pluralize('Usager', this.state.customersCount ) + '.'}
                            </div>
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
        					<div>
                                <strong><b>{this.state.interventionsCount}</b></strong>
                                {' ' + TextUtils.pluralize('Intervention', this.state.interventionsCount) + ' en cours.'}
                            </div>
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
        					<div>
                                <strong><b>{this.state.auxiliariesCount}</b></strong>
                                {' ' + TextUtils.pluralize('Auxiliaire', this.state.auxiliariesCount ) + '.'}
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
export default ServiceHome
