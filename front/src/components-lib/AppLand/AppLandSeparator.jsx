import React from 'react'
import PropTypes from 'prop-types'
import './AppLandSeparator.scss'

import { Grid } from 'ap-react-bootstrap'

class AppLandSeparator extends React.Component {

    get className() {
        let result = 'app-land-separator'
        result += ` top-${this.props.topColor}`
        result += ` bot-${this.props.botColor}`
        return result
    }

    render() {
        return (
            <div className={this.className} />
        )
    }
}

AppLandSeparator.propTypes = {
    topColor: PropTypes.string,
    botColor: PropTypes.string
}

AppLandSeparator.defaultProps = {
    topColor: 'main',
    botColor: 'main'
}

export default AppLandSeparator
