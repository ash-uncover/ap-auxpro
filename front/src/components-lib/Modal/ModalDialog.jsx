import React from 'react'
import './Modal.scss'

import { BaseComponent, Panel, Button, Grid } from 'ap-react-bootstrap'

import Modal from './Modal.jsx'

class ModalDialog extends BaseComponent {

	constructor(props) {
		super(props)
		this.onCancel = this._onCancel.bind(this)
		this.onConfirm = this._onConfirm.bind(this)
		// Base classes
		this.baseClasses = [ 'ap-modal-dialog' ]
		this.state = {
			hide: !props.show
		}
		//
		this.dialogProps = {}
		this.cancelProps = {}
		this.confirmProps = {}
		// Component properties
		this.propsInfos = {
			required : {
				title: {},
				children: {},
				onConfirm: {}
			},
			optionnal : {
				show: { defaultValue: false },
				cancelStyle: { defaultValue: 'primary', rename: 'bsStyle', store: this.cancelProps },
				cancelLabel: { defaultValue: 'Annuler', rename: 'children', store: this.cancelProps },
				confirmStyle: { defaultValue: 'primary', rename: 'bsStyle', store: this.confirmProps },
				confirmLabel: { defaultValue: 'OK', rename: 'children', store: this.confirmProps },
				onCancel: {}
			}
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ hide: !nextProps.show })
	}

	_onCancel() {
		this.setState({ hide: true })
		if (this.props.onCancel) {
			this.props.onCancel()
		}
	}

	_onConfirm() {
		this.setState({ hide: true })
		if (this.props.onConfirm) {
			this.props.onConfirm()
		}
	}

	render() {
		this.buildProps('ModalDialog')
		if (this.state.hide) {
			return <div className={this.className}/>
		}
		return (
			<Modal className={this.className} show={!this.state.hide}>
				<Panel>
					<Panel.Header>
						{this.props.title}
					</Panel.Header>
					<Panel.Body>
						{this.props.children}
					</Panel.Body>
					<Panel.Footer>
						<Grid.Row>
							<Grid.Col xs={6}>
								<Button
									block
									{...this.cancelProps}
									onClick={this.onCancel} />
							</Grid.Col>
							<Grid.Col xs={6}>
								<Button
									block
									{...this.confirmProps}
									onClick={this.onConfirm} />
							</Grid.Col>
						</Grid.Row>
					</Panel.Footer>
				</Panel>
			</Modal>
		)
	}

}
export default ModalDialog
