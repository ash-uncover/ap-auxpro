import React from 'react'
import AuxiliaryInfosEditPasswordData from './AuxiliaryInfosEditPasswordData'
import './AuxiliaryInfosEditPassword.scss'

import AccountEditPasswordBase from 'components-lib/AccountEditPassword/AccountEditPasswordBase'

class AuxiliaryInfosEditPassword extends React.Component {

	constructor(props) {
		super(props)
	}

	componentWillMount() {
		AuxiliaryInfosEditPasswordData.register(this)
	}

	componentWillUnmount() {
		AuxiliaryInfosEditPasswordData.unregister()
	}

	render() {
		return (<AccountEditPasswordBase />)
	}
}
export default AuxiliaryInfosEditPassword
