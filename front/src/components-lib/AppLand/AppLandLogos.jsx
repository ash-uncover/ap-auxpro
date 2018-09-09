import React from 'react'
import './AppLandLogos.scss'

import Carousel from 'components-lib/Carousel/Carousel'

const LOGO_DIR = 'assets/data/logos/'

const ITEMS_PER_SLIDE = 2

const getLogoPath = (logo) => {
    return `${LOGO_DIR}${logo}`
}

class AppLandLogos extends React.Component {

    constructor() {
        super(...arguments)

        this.state = { 
            previousIndex: 0,
            currentIndex: 0,
            error: true,
            logos: []
        }

        this.buildLogo = this.buildLogo.bind(this)
        this.buildLogos = this.buildLogos.bind(this)

        this.onLoad = this.onLoad.bind(this)
        this.onError = this.onError.bind(this)

        $.ajax({
            url: `${LOGO_DIR}logos.json`,
            dataType: 'json',
            success: this.onLoad,
            error: this.onError
        })

    }

    onLoad(response) {
        this.setState({
            error: false,
            logos: response.reduce((result, item, index) => {
                if (index % ITEMS_PER_SLIDE === 0) {
                    result.push([ item ])
                } else {
                    result[result.length - 1].push(item)
                }
                return result
            }, [])
        })
    }
    onError() {
        this.setState({ 
            error: true,
            logos: []
        })
    }

    /* RENDERING */

    buildLogos(logos, index) {
        return (
            <div key={index} className='app-land-logo-group' >
                {logos.map(this.buildLogo)}
            </div>
        )
    }

    buildLogo(logo, index) {
        if (logo.link) {
            return (
                <a 
                    key={index}
                    className='app-land-logo' 
                    href={logo.link || '#'} 
                    target='_blank' >
                    <img src={getLogoPath(logo.src)} />
                </a>
            )    
        }
        return (
            <span
                key={index}
                className='app-land-logo' >
                <img src={getLogoPath(logo.src)} />
            </span>
        )
    }

    render() {
        if (this.state.error) {
            return null
        }
        return (
            <div className='ap-app-land-section app-land-logos'>
                <div className='ap-app-land-section-content'>
                    <h1 className='title'>ILS NOUS FONT CONFIANCE</h1>
                    <Carousel slideInterval={2500} showButtons={true}>
                        {this.state.logos.map(this.buildLogos)}
                    </Carousel>
                </div>
            </div>
        )
    }
}

AppLandLogos.propTypes = {
}

AppLandLogos.defaultProps = {
}

export default AppLandLogos
