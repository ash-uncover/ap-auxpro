import React from 'react'
import './AppLandLogos.scss'

const LOGOS = [
    {
        src: 'logo_adjacent_services',
        link: ''
    }, {
        src: 'logo_cap92',
        link: 'http://cap-92.fr/'
    }, {
        src: 'logo_adpi',
        link: 'https://www.adpiformation.fr/'
    }
]

const getLogoPath = (logo) => {
    return `assets/images/logos/${logo}.jpg`
}

class AppLandLogos extends React.Component {

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
        return (
            <div className='ap-app-land-section app-land-logos'>
                <div className='ap-app-land-section-content'>
                    <h1 className='title'>ILS NOUS FONT CONFIANCE</h1>
                    {LOGOS.map(this.buildLogo)}
                </div>
            </div>
        )
    }
}

export default AppLandLogos
