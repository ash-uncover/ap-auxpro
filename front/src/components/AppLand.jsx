import React from 'react'
import AppLandData from './AppLandData'
import './AppLand.scss'

import { Grid } from 'ap-react-bootstrap'

import AppLandAdvantages from 'components-lib/AppLand/AppLandAdvantages'
import AppLandAuxpros from 'components-lib/AppLand/AppLandAuxpros'
import AppLandLogos from 'components-lib/AppLand/AppLandLogos'
import AppLandSeek from 'components-lib/AppLand/AppLandSeek'
import AppLandSeparator from 'components-lib/AppLand/AppLandSeparator'
import AppLandSkills from 'components-lib/AppLand/AppLandSkills'
import AppLandSocial from 'components-lib/AppLand/AppLandSocial'
import AppLandUserAux from 'components-lib/AppLand/AppLandUserAux'
import AppLandUserAuxBig from 'components-lib/AppLand/AppLandUserAuxBig'
import AppLandUserSap from 'components-lib/AppLand/AppLandUserSap'
import AppLandUserSapBig from 'components-lib/AppLand/AppLandUserSapBig'

import Link from 'components-lib/Link/Link'

class AppLand extends React.Component {

    constructor(props) {
        super(props)
    }

    componentWillMount() {
        AppLandData.register(this)
    }

    componentWillUnmount() {
        AppLandData.unregister()
    }

    render() {
        return (
            <div className='ap-app-land'>
            
                <AppLandSeek />
                <AppLandAuxpros />

                <div className='visible-xs'>
                    <AppLandSeparator diagonal botColor='alt2' />
                    <AppLandAdvantages />
                    <AppLandSeparator diagonal topColor='alt2' botColor='alt3' />
                    <AppLandUserSap />
                    <AppLandSeparator diagonal topColor='alt3' botColor='alt1' />
                    <AppLandUserAux />
                </div>

                <div className='hidden-xs'>
                    <AppLandUserAuxBig />  
                    <AppLandUserSapBig />  
                    <AppLandSkills />
                    <AppLandAdvantages />
                    <AppLandLogos />
                    <AppLandSocial />
                </div>
            </div>
        )
    }
}

export default AppLand
