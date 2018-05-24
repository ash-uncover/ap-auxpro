import React from 'react'
import './AppLandSeek.scss'

import Link from 'components-lib/Link/Link'

class AppLandSeek extends React.Component {

    render() {
        return (
            <div className='ap-app-land-section app-land-seek'>
                <div className='ap-app-land-section-content'>
                    <h1 className='title'>
                        Vous cherchez des missions ?
                    </h1>
                    <p className='text'>
                        Recevez directement sur votre compte des offres de missions d'aide à la personne adpatées à vos contraintes personnelles !
                    </p>
                    <div className='buttons'>
                        <Link className='contrast' href='/auth/register/auxiliary'>
                            Je recherche du travail
                        </Link>
                        <Link href='/auth/register/service'>
                            Je recherche un.e intervenant.e
                        </Link>
                    </div>    
                </div>
            </div>
        )            
    }
}

export default AppLandSeek
