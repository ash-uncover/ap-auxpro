import React from 'react'
import AuxiliaryRedirectData from './AuxiliaryRedirectData'
import './AuxiliaryRedirect.scss'

class AuxiliaryRedirect extends React.Component {

	constructor(props) {
		super(props)
	}

	componentWillMount() {
		AuxiliaryRedirectData.register(this)
	}

	componentWillUnmount() {
		AuxiliaryRedirectData.unregister()
	}

	render() {
		return (
			<div className='ap-auxiliary-redirect' />
		)
	}

}
export default AuxiliaryRedirect
