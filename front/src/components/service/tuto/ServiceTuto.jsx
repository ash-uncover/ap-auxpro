import React from 'react'
import ServiceTutoData from './ServiceTutoData'
import './ServiceTuto.scss'

import { Carousel, Button } from 'ap-react-bootstrap'

class ServiceTuto extends React.Component {

	constructor(props) {
		super(props)
	}

	componentWillMount() {
		ServiceTutoData.register(this)
	}

	componentWillUnmount() {
		ServiceTutoData.unregister()
	}

	render() {
		let completeDisabled = (this.state.maxIndex < ServiceTutoData.SLIDES.length - 1)
		return (
			<div className='ap-service-tuto'>
				<Carousel 
					id='ap-service-tuto-carousel' 
					slides={ServiceTutoData.SLIDES} 
					preventArrowCycling={true} 
					onSlideChange={this.onSlideChange} />
					<br/>
					<div className='ap-service-tuto-button'>
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
export default ServiceTuto
