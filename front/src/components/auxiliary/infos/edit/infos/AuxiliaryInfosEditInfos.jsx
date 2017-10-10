import React from 'react'
import AuxiliaryInfosEditInfosData from './AuxiliaryInfosEditInfosData'
import './AuxiliaryInfosEditInfos.scss'

import { Button, Panel, Form, Grid } from 'ap-react-bootstrap'
import FormHelper from 'components-lib/FormHelper'

import AuxiliaryUtils from 'utils-lib/entities/AuxiliaryUtils'

import ImageUploader from 'components-lib/Image/ImageUploader'

class AuxiliaryInfosEditInfos extends React.Component {

	constructor(props) {
		super(props)
		
		this.buildFormGroup = FormHelper.buildFormGroup.bind(this, AuxiliaryUtils.getFieldName)
		this.buildFormControl = FormHelper.buildFormControl.bind(this)
	}

	componentWillMount() {
		AuxiliaryInfosEditInfosData.register(this)
	}

	componentWillUnmount() {
		AuxiliaryInfosEditInfosData.unregister()
	}


	// Rendering functions //
	// --------------------------------------------------------------------------------

	render() {
		return (
			<div className='ap-auxiliary-infos-edit-infos'>
				<Button block bsStyle='primary' onClick={this.onCancel}>Retour</Button>
				<br/>
				<Panel>
					<Panel.Header>
						Modifier mes informations
					</Panel.Header>
					<Panel.Body>
						<Form horizontal className='row'>
							<h4 className='col-xs-12'>Mes informations personnelles</h4>
							<Grid.Col xs={12} className='ap-auxiliary-infos-avatar-container'>
								<ImageUploader 
									id='avatarFile'
									className={this.state.avatar ? '' : 'ap-no-image'}
									src={this.state.avatarSrc}
									onChange={this.onChangeAvatar} />
							</Grid.Col>
							<br/>
							<br/>
							<Grid.Col sm={6} lg={5} lgOffset={1}>
								{AuxiliaryInfosEditInfosData.FIELDS_FORM1.map(this.buildFormGroup)}
							</Grid.Col>
							<Grid.Col sm={6} lg={5}>
								{AuxiliaryInfosEditInfosData.FIELDS_FORM2.map(this.buildFormGroup)}
							</Grid.Col>
							<h4 className='col-xs-12'>Mes informations professionnelles</h4>
							<br/>
							<Grid.Col xs={12} sm={10} smOffset={1} md={8} mdOffset={2}>
								{AuxiliaryInfosEditInfosData.FIELDS_FORM3.map(this.buildFormGroup)}
							</Grid.Col>
							<br/>
							<Grid.Col xs={12} className='ap-auxiliary-infos-diploma-container'>
								<ImageUploader
									id='diplomaFile'
									className={this.state.diplomaImage ? '' : 'ap-no-image'}
									src={this.state.diplomaImageSrc}
									onChange={this.onChangeDiploma} />
							</Grid.Col>
						</Form>
					</Panel.Body>
					<Panel.Footer>
					</Panel.Footer>
				</Panel>
				{ this.state.errorJustHappened ? 
					<Panel>
						<Panel.Body className='ap-error'>
							<div>Une erreur est survenue</div>
							<div>Veuillez vérifier les valeurs saisies</div>
						</Panel.Body>
					</Panel>
				: null }
				<Button 
					block 
					bsStyle={this.state.errorJustHappened ? 'danger' : this.state.dirty ? 'success' : 'default'}
					disabled={this.state.errorJustHappened || !this.state.dirty}
					onClick={this.onSubmit}>
					{this.state.errorJustHappened ? 'Erreur' : 'Enregistrer modifications' }
				</Button>
				<br/>
			</div>
		)
	}

}
export default AuxiliaryInfosEditInfos
