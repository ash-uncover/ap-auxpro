import React from 'react'
import './AppLandAdvantages.scss'

import { Grid } from 'ap-react-bootstrap'

import Link from 'components-lib/Link/Link'

class AppLandAdvantages extends React.Component {

    render() {
        return (
            <div className='ap-app-land-section app-land-advantages'>
                <div className='ap-app-land-section-content'>
                    <h1 className='title'>
                        Découvrez les avantages d'AuXpros
                    </h1>
                    <div className='images'>
                        <div className='image'>
                            <Link href='/infos/services/auxiliary'>
                                <img className='aux' src='assets/images/land-avantages/button_aux1.png' />
                                <p>Pour les intervenant.e.s</p>
                            </Link>
                        </div>
                        <div className='image'>
                            <Link href='/infos/services/service'>
                                <img className='sap' src='assets/images/land-avantages/button_sap1.png' />
                                <p>Pour les services à la personne</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AppLandAdvantages
