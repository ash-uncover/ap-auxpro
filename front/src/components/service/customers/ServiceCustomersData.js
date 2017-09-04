import AppHelper from 'helpers/AppHelper'
import CustomerHelper from 'helpers/CustomerHelper'

import { BaseData, Utils, TextUtils } from 'ap-react-bootstrap'

import CustomerUtils from 'utils-lib/entities/CustomerUtils'

class ServiceCustomersData extends BaseData {

	register(obj) {
		super.register(obj)
		
		this.filterCustomers = this._filterCustomers.bind(this)

		this.obj.onSearch = this.onSearch.bind(this)

		this.obj.onCreate = this.onCreate.bind(this)

		this.obj.onView = this.onView.bind(this)
		this.obj.onEdit = this.onEdit.bind(this)
		this.obj.onDelete = this.onDelete.bind(this)
		
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
		console.log('delete customer ' + customer.id)
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
