import React from 'react'
import ServiceCustomerData from 'components/service/customers/ServiceCustomerData'
import './ServiceCustomer.scss'

/* This class was auto-generated by the JavaScriptWriter */
class ServiceCustomer extends React.Component {

	constructor(props) {
		super(props)
	}

	componentWillMount() {
		ServiceCustomerData.register(this, this.props.params.customerId)
	}

	componentWillUnmount() {
		ServiceCustomerData.unregister()
	}

	render() {
		return (
			<div className='ap-servicecustomer'>
				ServiceCustomer - {this.props.params.customerId}
			</div>
		)
	}

}
export default ServiceCustomer
