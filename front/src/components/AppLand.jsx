import React from 'react'
import AppLandData from './AppLandData'
import './AppLand.scss'

import { Grid } from 'ap-react-bootstrap'

import AppLandAdvantages from 'components-lib/AppLand/AppLandAdvantages'
import AppLandAuxpros from 'components-lib/AppLand/AppLandAuxpros'
import AppLandSeek from 'components-lib/AppLand/AppLandSeek'
import AppLandSeparator from 'components-lib/AppLand/AppLandSeparator'
import AppLandSkills from 'components-lib/AppLand/AppLandSkills'
import AppLandSocial from 'components-lib/AppLand/AppLandSocial'
import AppLandUserAux from 'components-lib/AppLand/AppLandUserAux'
import AppLandUserAuxBig from 'components-lib/AppLand/AppLandUserAuxBig'
import AppLandUserSap from 'components-lib/AppLand/AppLandUserSap'
import AppLandUserSapBig from 'components-lib/AppLand/AppLandUserSapBig'

import Link from 'components-lib/Link/Link'

function onFbInit(e) {
    console.log('facebook loding')
    FB.XFBML.parse()
}

class AppLand extends React.Component {

    constructor(props) {
        super(props)

        this.waitForFB = this._waitForFB.bind(this)
    }

    componentWillMount() {
        AppLandData.register(this)
    }

    componentDidMount() {
        //document.addEventListener('fb_init', onFbInit);
        this.waitForFB()
    }

    _waitForFB() {
        if (FB) {
            onFbInit()
        } else {
            setTimeout(this.waitForFB, 500)
        }   
    }

    componentWillUnmount() {
        //document.removeEventListener('fb_init', onFbInit);
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
                    <AppLandSocial />
                </div>
            </div>
        )
    }
}
/*

            <Grid.Container >

                    <Grid.Row className='visible-xs'>
                        
                        
                        
                        
                        <AppLandSeparator diagonal topColor='alt2' botColor='alt3' />
                        
                        <AppLandSeparator diagonal topColor='alt3' botColor='alt1'/>
                        <AppLandUserAux xs={12} />
                    </Grid.Row>

                    <Grid.Row className='hidden-xs'>
                        <AppLandSeek xs={12} />
                        <AppLandAuxpros xs={12} />
                        <AppLandUserAux xs={12} />
                        <AppLandUserSap xs={12} />
                        
                        <AppLandAdvantages xs={12} />                        
                    </Grid.Row>

                </Grid.Container>
*/

export default AppLand
