import React from 'react'
import './AppLandUser.scss'

import { Grid } from 'ap-react-bootstrap'

import Link from 'components-lib/Link/Link'

const colLeftXs = 2
const colRightXs = 10

class AppLandUserSap extends React.Component {

    render() {
        return (
            <div className='ap-app-land-section app-land-user sap'>
                <div className='ap-app-land-section-content'>
                    <h1 className='title'>
                        Pour les SAP
                    </h1>
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
                        <Link href='/auth/register/service'>
                            Lancer le matching
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default AppLandUserSap
