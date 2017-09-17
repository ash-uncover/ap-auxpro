import React from 'react'
import './Modal.scss'

import { BaseComponent, Panel, Button } from 'ap-react-bootstrap'

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
		// Component properties
		this.propsInfos = {
			required : {
				title: {},
				children: {},
				onConfirm: {}
			},
			optionnal : {
				show: { defaultValue: false },
				cancelLabel: { defaultValue: 'Annuler', store: this.dialogProps },
				confirmLabel: { defaultValue: 'OK', store: this.dialogProps },
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
						<Button
							bsStyle='primary'
							onClick={this.onCancel}>
							{this.dialogProps.cancelLabel}
						</Button>
						<Button
							bsStyle='primary'
							onClick={this.onConfirm}>
							{this.dialogProps.confirmLabel}
						</Button>
					</Panel.Footer>
				</Panel>
			</Modal>
		)
	}

}
export default ModalDialog
