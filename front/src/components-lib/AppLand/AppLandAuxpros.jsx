import React from 'react'
import './AppLandAuxpros.scss'

import { Grid } from 'ap-react-bootstrap'

import Link from 'components-lib/Link/Link'

class AppLandAuxpros extends React.Component {

    render() {
        return (
            <div className='ap-app-land-section app-land-auxpros'>
                <div className='ap-app-land-section-content'>
                    <h2 className='title'>
                        AuXpros qu'est ce que c'est ?
                    </h2>
                    <p className='text'>
                        AuXpros est une plateforme de mise en relation entre professionnels des services à la personne
                    </p>
                    <div className='icons'>
                        <div className='icon'>
                            <img src='assets/images/land-auxpros/icon_localisation.png' />
                            <p>Je travaille où je veux</p>
                        </div>
                        <div className='icon'>
                            <img src='assets/images/land-auxpros/icon_temps.png' />
                            <p>Je travaille quand je veux</p>
                        </div>
                        <div className='icon'>
                            <img src='assets/images/land-auxpros/icon_mission.png' />
                            <p>Je choisis mes missions</p>
                        </div>
                    </div>
                    <div className='hidden-xs buttons'>
                        <Link href='/auth/register/auxiliary'>
                            Je veux recevoir des offres
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default AppLandAuxpros
