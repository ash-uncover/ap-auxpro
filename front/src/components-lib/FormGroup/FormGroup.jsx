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
            	{this.props.label && (
	                <Form.Label className={this.props.horizontal ? 'col-sm-5 col-md-4' : ''}>
	                    {this.props.label}
	                </Form.Label>
	            )}
                {this.props.horizontal ? (
	                <Grid.Col sm={7} md={8}>
	                    {this.props.children}
	                </Grid.Col>
	            ) : (
	            	this.props.children
	        	)}
            </Form.Group>
        )
    }
}

FormGroup.propTypes = {
    state: PropTypes.string,
    label: PropTypes.string,
    horizontal: PropTypes.bool,
    children: PropTypes.any.isRequired
}

FormGroup.defaultProps = {
    state: 'default',
    horizontal: false
}

export default FormGroup
