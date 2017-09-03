import React from 'react'
import ServiceInfosEditPasswordData from './ServiceInfosEditPasswordData'
import './ServiceInfosEditPassword.scss'

import AccountEditPasswordBase from 'components-lib/AccountEditPassword/AccountEditPasswordBase'

class ServiceInfosEditPassword extends React.Component {

	constructor(props) {
		super(props)
	}

	componentWillMount() {
		ServiceInfosEditPasswordData.register(this)
	}

	componentWillUnmount() {
		ServiceInfosEditPasswordData.unregister()
	}

	render() {
		return (<AccountEditPasswordBase />)
	}
}
export default ServiceInfosEditPassword
