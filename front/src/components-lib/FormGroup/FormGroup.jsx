import React from 'react'
import PropTypes from 'prop-types'

import { Form, Grid } from 'ap-react-bootstrap'

import './FormGroup.scss'

class FormGroup extends React.Component {

    constructor() {
        super(...arguments)
    }

    /* VIEW CALLBACKS */

    /* RENDERING */

    render() {
        return (
            <Form.Group state={this.props.state}>
                <Form.Label className='col-sm-5 col-md-4'>
                    {this.props.label}
                </Form.Label>
                <Grid.Col sm={7} md={8}>
                    {this.props.children}
                </Grid.Col>
            </Form.Group>
        )
    }
}

FormGroup.propTypes = {
    state: PropTypes.string,
    label: PropTypes.string.isRequired,
    children: PropTypes.any.isRequired
}

FormGroup.defaultProps = {
    state: 'default'
}

export default FormGroup
