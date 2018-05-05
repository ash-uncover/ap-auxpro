import React from 'react'
import './AppLandSkills.scss'

import { Grid } from 'ap-react-bootstrap'

import AppLandSkill from 'components-lib/AppLand/AppLandSkill'

class AppLandSkills extends React.Component {

    render() {
        return (
            <div className='ap-app-land-section app-land-skills'>
                <div className='ap-app-land-section-content'>
                    <div className='skills-row'>
                        <AppLandSkill
                            src='assets/images/land/icon_skill_compagny.png'
                            text='Dame de compagnie'/>
                        <AppLandSkill
                            src='assets/images/land/icon_skill_nursing.png'
                            text='Nursing'/>
                        <AppLandSkill
                            src='assets/images/land/icon_skill_childhood.png'
                            text='Aide petite enfance'/>
                        <AppLandSkill
                            src='assets/images/land/icon_skill_housework.png'
                            text='Entretien maison'/>
                    </div>
                    <div className='skills-row'>
                        <span></span>
                        <AppLandSkill
                            src='assets/images/land/icon_skill_administrative.png'
                            text='Aide admnistrative et soutien digital'/>
                        <AppLandSkill
                            src='assets/images/land/icon_skill_shopping.png'
                            text='Course et aide aux repas'/>
                        <AppLandSkill
                            src='assets/images/land/icon_skill_doityourself.png'
                            text='Petit bricolage'/>
                        <span></span>
                    </div>
                </div>
            </div>
        )
    }
}

export default AppLandSkills
