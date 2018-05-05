import React from 'react'
import './AppLandSocial.scss'

import FacebookPage from 'components-lib/Facebook/FacebookPage'
import TwitterTimeline from 'components-lib/Twitter/TwitterTimeline'

class AppLandAdvantages extends React.Component {

    render() {
        return (
            <div className='ap-app-land-section app-land-social'>
                <div className='ap-app-land-section-content'>
                    <h1 className='title'>
                        A la une
                    </h1>
                    <div className='feeds'>
                        <div className='feed'>
                            <FacebookPage 
                                name='AuXpros' 
                                href='https://www.facebook.com/Auxpros/'
                                width={500}
                                height={850}
                                tabs='timeline'
                                smallHeader={true}
                                adaptContainerWidth={true}
                                hideCover={true}
                                showFacepile={false} />
                        </div>
                        <div className='feed'>
                            <TwitterTimeline
                                lang='fr'
                                width={500}
                                height={845}
                                theme='light'
                                href='https://twitter.com/AuXpros?ref_src=twsrc%5Etfw'
                                name='Tweets by AuXpros' />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AppLandAdvantages
