import React from 'react'
import ServiceInfosEditEmailData from './ServiceInfosEditEmailData'
import './ServiceInfosEditEmail.scss'

import AccountEditEmailBase from 'components-lib/AccountEditEmail/AccountEditEmailBase'

class ServiceInfosEditEmail extends React.Component {

	constructor(props) {
		super(props)
	}

	componentWillMount() {
		ServiceInfosEditEmailData.register(this)
	}

	componentWillUnmount() {
		ServiceInfosEditEmailData.unregister()
	}

	render() {
		return (
			<AccountEditEmailBase />
		)
	}

}
export default ServiceInfosEditEmail
