import React from 'react'
import './AppLandSocial.scss'

import FacebookPage from 'components-lib/Facebook/FacebookPage'
import TwitterTimeline from 'components-lib/Twitter/TwitterTimeline'

class AppLandAdvantages extends React.Component {

    buildFacebook(size) {
        const w = size === 'sm' ? 500 : ( size === 'md' ? 400 : 500)
        const h = size === 'sm' ? 450 : ( size === 'md' ? 600 : 700)
        return (
            <div className={'feed-' + size}>
                <FacebookPage 
                    name='AuXpros' 
                    href='https://www.facebook.com/Auxpros/'
                    width={w}
                    height={h}
                    tabs='timeline'
                    smallHeader={true}
                    adaptContainerWidth={true}
                    hideCover={true}
                    showFacepile={false} />
            </div>
        )
    }

    buildTwitter(size) {
        const w = size === 'sm' ? 500 : ( size === 'md' ? 400 : 500)
        const h = size === 'sm' ? 445 : ( size === 'md' ? 600 : 700)
        return (
            <div className={'feed-' + size}>
                <TwitterTimeline
                    lang='fr'
                    width={w}
                    height={h}
                    theme='light'
                    href='https://twitter.com/AuXpros?ref_src=twsrc%5Etfw'
                    name='Tweets by AuXpros' />
            </div>
        )
    }

    render() {
        return (
            <div className='ap-app-land-section app-land-social hidden-sm'>
                <div className='ap-app-land-section-content'>
                    <h1 className='title'>
                        A la une
                    </h1>
                    <div className='visible-md'>
                        <div className='feeds-md'>
                            {this.buildFacebook('md')}
                            {this.buildTwitter('md')}
                        </div>
                    </div>
                    <div className='visible-lg'>
                        <div className='feeds-lg'>
                            {this.buildFacebook('lg')}
                            {this.buildTwitter('lg')}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AppLandAdvantages
