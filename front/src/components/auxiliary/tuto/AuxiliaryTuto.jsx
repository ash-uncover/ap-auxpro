import React from 'react'
import AuxiliaryTutoData from 'components/auxiliary/tuto/AuxiliaryTutoData'
import './AuxiliaryTuto.scss'

import { Carousel, Button } from 'ap-react-bootstrap'

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
		let completeDisabled = (this.state.maxIndex < AuxiliaryTutoData.SLIDES.length - 1)
		return (
			<div className='ap-auxiliary-tuto'>
				<Carousel 
					id='ap-auxiliary-tuto-carousel' 
					slides={AuxiliaryTutoData.SLIDES} 
					preventArrowCycling={true} 
					onSlideChange={this.onSlideChange} />
					<br/>
					<div className='ap-auxiliary-tuto-button'>
						<Button 
							onClick={this.onFinishTutorial} 
							bsSize='lg'
							bsStyle={completeDisabled ? 'default' : 'success'}
							disabled={completeDisabled}>
							Terminer le tutorial
						</Button>
					</div>
			</div>
		)
	}

}
export default AuxiliaryTuto
