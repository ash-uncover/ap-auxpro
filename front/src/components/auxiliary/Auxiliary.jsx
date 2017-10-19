import React from 'react'
import AuxiliaryData from './AuxiliaryData'
import './Auxiliary.scss'

import { Grid } from 'ap-react-bootstrap'

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
		if (this.state.loaded) {
			return (
				<Grid.Container className='ap-auxiliary'>
					{this.state.showHeader ?
						<AuxiliaryHeader />
					: null }
					{this.props.children}
				</Grid.Container>
			)
		} else {
			return (
				<div className='ap-auxiliary' />
			)
		}
	}

}
export default Auxiliary
