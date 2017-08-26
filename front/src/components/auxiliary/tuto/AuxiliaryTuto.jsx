import React from 'react'
import AuxiliaryTutoData from 'components/auxiliary/tuto/AuxiliaryTutoData'
import './AuxiliaryTuto.scss'

class AuxiliaryTuto extends React.Component {

	constructor(props) {
		super(props)
	}

	componentWillMount() {
		AuxiliaryTutoData.register(this)
	}

	componentWillUnmount() {
		AuxiliaryTutoData.unregister()
	}

	render() {
		return (
			<div className='ap-auxiliary-tuto'>
				AuxiliaryTuto
			</div>
		)
	}

}
export default AuxiliaryTuto
