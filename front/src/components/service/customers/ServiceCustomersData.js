import AppHelper from 'helpers/AppHelper'
import CustomerHelper from 'helpers/CustomerHelper'

import { BaseData, Utils } from 'ap-react-bootstrap'

class ServiceCustomersData extends BaseData {

	register(obj) {
		super.register(obj)
		
		CustomerHelper.register('', this, this.onCustomersUpdate.bind(this))

		this.obj.onSearch = this.onSearch.bind(this)

		this.obj.onView = this.onView.bind(this)
		this.obj.onEdit = this.onEdit.bind(this)
		this.obj.onDelete = this.onDelete.bind(this)
		
		this.obj.state = {
			customers: Utils.map(CustomerHelper.getData()),
			search: ''
		}
	}

	unregister() {
		CustomerHelper.unregister()
	}

	onCustomersUpdate() {
		
	}

	onSearch(value) {
		this.setState({ search: value })
	}

	onView(customer) {
		console.log('view customer ' + customer.id)
	}

	onEdit(customer) {
		console.log('edit customer ' + customer.id)
	}

	onDelete(customer) {
		console.log('delete customer ' + customer.id)
	}
}
var ServiceCustomersObj = new ServiceCustomersData()
export default ServiceCustomersObj
