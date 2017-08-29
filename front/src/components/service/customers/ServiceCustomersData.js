import AppHelper from 'helpers/AppHelper'
import CustomerHelper from 'helpers/CustomerHelper'

import { BaseData, Utils } from 'ap-react-bootstrap'

class ServiceCustomersData extends BaseData {

	register(obj) {
		super.register(obj)
		
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

	onCustomersUpdate() {
		this.setState({ customers: Utils.map(CustomerHelper.getData()) })
	}

	onCreate(value) {
		AppHelper.navigate('/service/customers/new/edit')
	}

	onSearch(value) {
		this.setState({ search: value })
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
}
var ServiceCustomersObj = new ServiceCustomersData()
export default ServiceCustomersObj
