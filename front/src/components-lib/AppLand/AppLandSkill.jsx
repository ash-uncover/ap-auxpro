import React from 'react'
import PropTypes from 'prop-types'

import './AppLandSkills.scss'

class AppLandSkilln extends React.Component {

    render() {
        return (
            <div className='app-land-skill'>
                <img src={this.props.src} />
                <p>
                    {this.props.text}
                </p>
            </div>
        )
    }
}

AppLandSkilln.propTypes = {
    src: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
}

export default AppLandSkilln
