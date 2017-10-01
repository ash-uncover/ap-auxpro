import React from 'react'
import AuxiliaryInfosEditEmailData from './AuxiliaryInfosEditEmailData'
import './AuxiliaryInfosEditEmail.scss'

import AccountEditEmailBase from 'components-lib/AccountEditEmail/AccountEditEmailBase'

class AuxiliaryInfosEditEmail extends React.Component {

	constructor(props) {
		super(props)
	}

	componentWillMount() {
		AuxiliaryInfosEditEmailData.register(this)
	}

	componentWillUnmount() {
		AuxiliaryInfosEditEmailData.unregister()
	}

	render() {
		return (
			<AccountEditEmailBase />
		)
	}

}
export default AuxiliaryInfosEditEmail
