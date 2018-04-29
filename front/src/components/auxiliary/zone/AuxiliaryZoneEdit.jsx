import React from 'react'
import AuxiliaryZoneEditData from './AuxiliaryZoneEditData'
import './AuxiliaryZone.scss'

import { Grid, Panel, Button, Form } from 'ap-react-bootstrap'

import FormGroupBuilder from 'components-lib/FormGroup/FormGroupBuilder'

import GeozoneType from 'utils/constants/GeozoneType'

class AuxiliaryZoneEdit extends React.Component {

	constructor() {
		super(...arguments)
		
		this.state = {}
		
		this.buildFormGroup = FormGroupBuilder.buildFormGroup.bind(this)
	}


    // Component lifecycle //
    // --------------------------------------------------------------------------------

	componentWillMount() {
		AuxiliaryZoneEditData.register(this, this.props.geozoneId)
	}

	componentWillUnmount() {
		AuxiliaryZoneEditData.unregister()
	}


    // Rendering functions //
    // --------------------------------------------------------------------------------

	render() {
		let submitDisabled = !this.state.dirty || this.state.errorShow || this.state.warningShow
		return (
			<Panel className='ap-auxiliary-zone-edit'>
				<Panel.Header>
					{ this.state.mode === AuxiliaryZoneEditData.MODES.CREATE ? "Créer zone d'intervention" : "Modifier zone d'intervention" }
				</Panel.Header>
				<Panel.Body>
					<Form horizontal onSubmit={event => event.preventDefault()}>
						{ this.state.type === GeozoneType.AREA.key ? 
							Object.keys(AuxiliaryZoneEditData.FIELDS_FORM1).map((key) => (
                                this.buildFormGroup(key, AuxiliaryZoneEditData.FIELDS_FORM1[key], true)
                            ))
						: 
							Object.keys(AuxiliaryZoneEditData.FIELDS_FORM2).map((key) => (
                                this.buildFormGroup(key, AuxiliaryZoneEditData.FIELDS_FORM2[key], true)
                            ))
						}
					</Form>
					<Button
						block
						bsStyle='primary'
						onClick={this.onCancel}>
						Annuler
					</Button>
					<Button
						block
						disabled={submitDisabled}
						bsStyle={submitDisabled ? 'default' : 'success'}
						onClick={this.onSubmit}>
						{ this.state.mode === AuxiliaryZoneEditData.MODES.CREATE ? 'Créer zone' : 'Enregistrer modifications' }
					</Button>
				</Panel.Body>
				<Panel.Footer>
				</Panel.Footer>
			</Panel>
		)
	}
}
export default AuxiliaryZoneEdit