import React from 'react'
import ServiceTutoData from './ServiceTutoData'
import './ServiceTuto.scss'

import { Button, Grid } from 'ap-react-bootstrap'
import Carousel from 'components-lib/Carousel/Carousel'

const IMAGES = [
	'/assets/images/tutoservices1.JPG',
	'/assets/images/tutoservices2.JPG',
	'/assets/images/tutoservices3.JPG',
	'/assets/images/tutoservices4.JPG',
	'/assets/images/tutoservices5.JPG',
	'/assets/images/tutoservices6.JPG'
]

class ServiceTuto extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			endReached: false
		}

		this.buildImage = this.buildImage.bind(this)
        this.onSlideChanged = this.onSlideChanged.bind(this)
	}

	// Component lifecycle //
    // --------------------------------------------------------------------------------

	componentWillMount() {
		ServiceTutoData.register(this)
	}

	componentWillUnmount() {
		ServiceTutoData.unregister()
	}

    // View callbacks //
    // --------------------------------------------------------------------------------

    onSlideChanged(index) {
        if (index === IMAGES.length - 1) {
            this.setState({ endReached: true })
        }
    }

    // Rendering functions //
    // --------------------------------------------------------------------------------

    buildImage(src, index) {
    	return (
    		<img className='ap-service-tuto-image' key={index} src={src} />
    	)
    }

	render() {
		return (
			<Grid.Row className='ap-service-tuto'>
                <Grid.Col
                    sm={10}
                    smOffset={1}
                    md={8}
                    mdOffset={2}>
                    <div className='container-carousel'>
                        <Carousel 
                            showSlideButtons={true}
                            onSlideChanged={this.onSlideChanged}>
                            {IMAGES.map(this.buildImage)}
                        </Carousel>
                    </div>
                    
                    <Button 
                        className='ap-service-tuto-btn'
                        bsStyle={ this.state.endReached ? 'success' : 'default' } 
                        block
                        disabled={!this.state.endReached}
                        onClick={this.onFinishTutorial}>
                        { this.state.endReached ? 'Terminer le tutoriel' : 'Veuillez compléter le tutoriel' }
                    </Button>
                </Grid.Col>
            </Grid.Row>
		)
	}
}
export default ServiceTuto