import React from 'react'
import './AppLandUser.scss'

import { Grid } from 'ap-react-bootstrap'

import Link from 'components-lib/Link/Link'

const colLeftXs = 2
const colRightXs = 10

class AppLandUserAux extends React.Component {

    render() {
        return (
            <div className='ap-app-land-section app-land-user aux'>
                <div className='ap-app-land-section-content'>
                    <h1 className='title'>
                        Pour les intervenant.e.s
                    </h1>
                    <div className='items'>
                        <div className='item'>
                            <div className='item-icon'>
                                <img src='assets/images/land-user/icon_zones.png'/>
                            </div>
                            <div className='item-content'>
                                <h2>
                                    Une addresse
                                </h2>
                                <p>
                                    Indiquez les zones où vous souhaitez travailler
                                </p>
                            </div>
                        </div>
                        <div className='item'>
                            <div className='item-icon'>
                                <img src='assets/images/land-user/icon_planning.png'/>
                            </div>
                            <div className='item-content'>
                                <h2>
                                    Un planning
                                </h2>
                                <p>
                                    Précisez vos indisponibilités sur votre calendrier
                                </p>
                            </div>
                        </div>
                        <div className='item'>
                            <div className='item-icon'>
                                <img src='assets/images/land-user/icon_skills.png'/>
                            </div>
                            <div className='item-content'>
                                <h2>
                                    Des besoins
                                </h2>
                                <p>
                                    Mettez vos diplômes et/ou vos compétences en valeur
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='button'>
                        <Link href='/'>
                            J'ai besoin d'intervenant.e.s
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default AppLandUserAux
