import React from 'react'

import { Panel, Grid, Button } from 'ap-react-bootstrap'

class PanelFooterConfirm extends React.Component {

	constructor(props) {
		super(props)
	}

	render() {
		return (
			<Panel.Footer>
				<Grid.Row>
					<Grid.Col sm={6}>
						<Button 
							block 
							bsSize='large' 
							bsStyle={this.props.cancelStyle || 'primary'}
							onClick={this.props.onCancel}>
							{this.props.cancelText || 'Annuler'}
						</Button>
					</Grid.Col>
					<br className='visible-xs-block'/>
					<Grid.Col sm={6}>
						<Button 
							block 
							bsSize='large' 
							bsStyle={this.props.submitDisabled ? 'default' : (this.props.submitStyle || 'success')}
							disabled={this.props.submitDisabled}
							onClick={this.props.onSubmit}>
							{this.props.submitText || 'Ok'}
						</Button>
					</Grid.Col>
				</Grid.Row>
			</Panel.Footer>
		)
	}
}
export default PanelFooterConfirm
