import React from 'react'
import ServiceCustomersData from './ServiceCustomersData'
import './ServiceCustomers.scss'

import { Panel, Form, Grid, Button, Glyphicon, SearchBar, TextUtils } from 'ap-react-bootstrap'
import ServiceCustomerTile from 'components-lib/ServiceCustomerTile/ServiceCustomerTile'

import StringUtils from 'utils-lib/StringUtils'
import CustomerUtils from 'utils-lib/entities/CustomerUtils'

class ServiceCustomers extends React.Component {

	constructor(props) {
		super(props)

		this.filterCustomers = this._filterCustomers.bind(this)
		this.buildCustomer = this._buildCustomer.bind(this)
	}

	componentWillMount() {
		ServiceCustomersData.register(this)
	}

	componentWillUnmount() {
		ServiceCustomersData.unregister()
	}

	buildCustomerNumberLabel() {
		let l = this.state.customers.length
		if (l === 0) {
			return ''
		} else {
			return l + ' ' + TextUtils.pluralize('usager', l) + ' ' + TextUtils.pluralize('correspondant', l)
		}
	}

	buildCustomers() {
		return this.state.customers.map(this.buildCustomer)
	}

	_filterCustomers(customer) {
		if (this.state.search) {
			let easenName = TextUtils.easenSearch(CustomerUtils.getName(customer))
			let easenSearch = TextUtils.easenSearch(this.state.search)
			return easenName.indexOf(easenSearch) !== -1
		}
		return true
	}

	_buildCustomer(customer, index) {
		return (
			<ServiceCustomerTile 
				key={customer.id}
				onView={this.onView.bind(this, customer)}
				onEdit={this.onEdit.bind(this, customer)}
				onDelete={this.onDelete.bind(this, customer)}>
				<div><b>{StringUtils.valueOrMissing(CustomerUtils.getFullName(customer))}</b></div>
			</ServiceCustomerTile>
		)
	}

	render() {
		return (
			<div className='ap-service-customers'>
				<Button 
					block 
					bsSize='lg'
					bsStyle='primary'
					onClick={this.onCreate}>
					Saisir un nouvel usager
				</Button>
				<br/>
				<Panel>
					<Panel.Header>
						Rechercher usagers
					</Panel.Header>
					<Panel.Body>
						<SearchBar 
							placeholder="Veuillez saisir le nom d'un usager" 
							onChange={this.onSearch} />
					</Panel.Body>
					<Panel.Footer>
						{this.buildCustomerNumberLabel()}
					</Panel.Footer>
				</Panel>
				<Grid.Row>
					{this.buildCustomers()}
				</Grid.Row>
			</div>
		)
	}

}
export default ServiceCustomers