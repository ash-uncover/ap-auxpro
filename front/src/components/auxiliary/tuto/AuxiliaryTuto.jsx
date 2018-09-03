import React from 'react'
import AuxiliaryTutoData from './AuxiliaryTutoData'
import './AuxiliaryTuto.scss'

import { Button, Grid } from 'ap-react-bootstrap'
import Carousel from 'components-lib/Carousel/Carousel'

const IMAGES = [
	'/assets/images/tutoaux1.JPG',
	'/assets/images/tutoaux2.JPG',
	'/assets/images/tutoaux3.JPG',
	'/assets/images/tutoaux4.JPG',
	'/assets/images/tutoaux5.JPG',
	'/assets/images/tutoaux6.JPG'
]

class AuxiliaryTuto extends React.Component {

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
		AuxiliaryTutoData.register(this)
	}

	componentWillUnmount() {
		AuxiliaryTutoData.unregister()
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
    		<img className='ap-auxiliary-tuto-image' key={index} src={src} />
    	)
    }

	render() {
		return (
			<Grid.Row className='ap-auxiliary-tuto'>
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
                        className='ap-auxiliary-tuto-btn'
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
export default AuxiliaryTuto