import React from 'react'
import './AppLandLogos.scss'

const getLogoPath = (logo) => {
    return `assets/images/logos/${logo}.jpg`
}

class AppLandLogos extends React.Component {

    constructor() {
        super(...arguments)

        this.state = { 
            error: true,
            logos: []
        }

        this.onLoad = this.onLoad.bind(this)
        this.onError = this.onError.bind(this)

        $.ajax({
            url: '/assets/images/logos/logos.json',
            dataType: 'json',
            success: this.onLoad,
            error: this.onError
        })

    }

    onLoad(response) {
        this.setState({
            error: false,
            logos: response
        })
    }
    onError() {
        this.setState({ 
            error: true,
            logos: []
        })
    }

    /* RENDERING */

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
                    {this.state.logos.map(this.buildLogo)}
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
