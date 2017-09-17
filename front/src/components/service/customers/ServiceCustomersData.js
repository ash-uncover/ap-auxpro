import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import CustomerHelper from 'helpers/CustomerHelper'

import { BaseData, Utils, TextUtils } from 'ap-react-bootstrap'

import CustomerUtils from 'utils-lib/entities/CustomerUtils'

class ServiceCustomersData extends BaseData {

	register(obj) {
		super.register(obj)
		
		this.filterCustomers = this._filterCustomers.bind(this)

		this.declareFunction('onSearch')

		this.declareFunction('onCreate')

		this.declareFunction('onView')
		this.declareFunction('onEdit')

		this.declareFunction('onDelete')
		this.declareFunction('onCancelDelete')
		this.declareFunction('onConfirmDelete')
		
		this.obj.state = {
			customers: Utils.map(CustomerHelper.getData()),
			search: ''
		}

		CustomerHelper.register('', this, this.onCustomersUpdate.bind(this))
	}

	unregister() {
		CustomerHelper.unregister(this)
	}


	// Store notification //
	// --------------------------------------------------------------------------------

	onCustomersUpdate() {
		this.setState({ customers: Utils.map(CustomerHelper.getData()) })
	}


	// View callbacks //
	// --------------------------------------------------------------------------------

	onCreate(value) {
		AppHelper.navigate('/service/customers/new/edit')
	}
	onSearch(value) {
		this.setState({ 
			search: value,
			customers: Utils.map(CustomerHelper.getData()).filter(this._filterCustomers.bind(this, TextUtils.easenSearch(value)))
		})
	}
	onView(customer) {
		AppHelper.navigate('/service/customers/' + customer.id)
	}
	onEdit(customer) {
		AppHelper.navigate('/service/customers/' + customer.id + '/edit')
	}

	onDelete(customer) {
		this.customer = customer
		this.setState({ showDeleteCustomer: true })
	}
	onCancelDelete() {
		this.customer = null
		this.setState({ showDeleteCustomer: false })
	}
	onConfirmDelete() {
		CustomerHelper.deleteCustomer(this.customer.id).
		then(function () {
			CustomerHelper.getServiceCustomers(AuthHelper.getEntityId())
			this.customer = null
			this.setState({ showDeleteCustomer: false })
		}.bind(this)).
		catch(function (error) {
			console.error('Error while deleting customer')
			console.error(error)
		})	
	}


	// Internal methods //
	// --------------------------------------------------------------------------------

	_filterCustomers(value, customer) {
		if (value) {
			let easenName = TextUtils.easenSearch(CustomerUtils.getName(customer))
			return easenName.indexOf(value) !== -1
		}
		return true
	}
}
var ServiceCustomersObj = new ServiceCustomersData()
export default ServiceCustomersObj
