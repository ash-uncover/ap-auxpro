import React from 'react'
import AuxiliaryData from 'components/auxiliary/AuxiliaryData'
import './Auxiliary.scss'

import AuxiliaryHeader from 'components-lib/AuxiliaryHeader/AuxiliaryHeader'

class Auxiliary extends React.Component {

	constructor(props) {
		super(props)
	}

	componentWillMount() {
		AuxiliaryData.register(this)
	}

	componentWillUnmount() {
		AuxiliaryData.unregister()
	}

	render() {
		return (
			<div className='ap-auxiliary'>
				<AuxiliaryHeader />
				{this.props.children}
			</div>
		)
	}

}
export default Auxiliary
