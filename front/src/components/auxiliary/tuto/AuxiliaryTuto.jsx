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
		console.log(this.state)
		return (
			<div className='ap-auxiliary-tuto'>
				<Carousel 
					id='ap-auxiliary-tuto-carousel' 
					slides={AuxiliaryTutoData.SLIDES} 
					preventArrowCycling={true} 
					onSlideChange={this.onSlideChange} />
				{this.state.maxIndex === AuxiliaryTutoData.SLIDES.length - 1 ?
					<div>
						<Button onClick={this.onFinishTutorial}>
							J'ai compris
						</Button>
					</div>
				: null }
			</div>
		)
	}

}
export default AuxiliaryTuto
