import React from 'react'
import './AppLandUser.scss'

import { Grid } from 'ap-react-bootstrap'

import Link from 'components-lib/Link/Link'

const colLeftXs = 2
const colRightXs = 10

class AppLandUserSapBig extends React.Component {

    render() {
        return (
            <div className='ap-app-land-section app-land-user sap'>
                <div className='ap-app-land-section-right'>
                    <div className='ap-app-land-section-content'>
                        <div className='title-big'>
                            Pour les<br/>SAP
                        </div>
                    </div>
                </div>
                <div className='ap-app-land-section-left'>
                    <div className='ap-app-land-section-content'>
                        <div className='items'>
                            <div className='item'>
                                <div className='item-icon'>
                                    <img src='assets/images/land-user/icon_usager.png'/>
                                </div>
                                <div className='item-content'>
                                    <h2>
                                        Un.e usager.ère
                                    </h2>
                                    <p>
                                        Indiquez ses besoins
                                    </p>
                                </div>
                            </div>
                            <div className='item'>
                                <div className='item-icon'>
                                    <img src='assets/images/land-user/icon_planning.png'/>
                                </div>
                                <div className='item-content'>
                                    <h2>
                                        Une mission
                                    </h2>
                                    <p>
                                        Définissez en fonction de ces besoins une intervention
                                    </p>
                                </div>
                            </div>
                            <div className='item'>
                                <div className='item-icon'>
                                    <img src='assets/images/land-user/icon_intervenant.png'/>
                                </div>
                                <div className='item-content'>
                                    <h2>
                                        Un.e intervenant.e
                                    </h2>
                                    <p>
                                        Recherchez l'intervenant.e adapté.e
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='button'>
                            <Link href='/'>
                                Lancer le matching
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AppLandUserSapBig
