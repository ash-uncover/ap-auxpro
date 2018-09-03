import React from 'react'

import './_carousel.scss'

class CarouselImage extends React.Component {
    
    constructor(props) {
        super()

        this.buildImage = this.buildImage.bind(this)
    }

    // View callbacks //
    // --------------------------------------------------------------------------------

   
    // Rendering functions //
    // --------------------------------------------------------------------------------

    buildImage(image, index) {
        return (
            <div 
                className='carousel-image-item'
                key={index}
                style={{ background: 'red', height: '100px' }}>
            </div>
        )
    }

    render() {
        return (
            <div className={'carousel-image'}>
                {this.props.images.map(this.buildImage)}
            </div>
        )
    }
}

export default CarouselImage