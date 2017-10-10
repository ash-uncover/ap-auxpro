import React from 'react'
import AuxiliaryInfosEditInfosData from './AuxiliaryInfosEditInfosData'
import './AuxiliaryInfosEditInfos.scss'

import { Button, Panel, Form, Grid, Google } from 'ap-react-bootstrap'

import AuxiliaryUtils from 'utils-lib/entities/AuxiliaryUtils'

import ImageUploader from 'components-lib/Image/ImageUploader'

class AuxiliaryInfosEditInfos extends React.Component {

	constructor(props) {
		super(props)
		this.buildFormGroup = this._buildFormGroup.bind(this)
		this.buildFormControl = this._buildFormControl.bind(this)
	}

	componentWillMount() {
		AuxiliaryInfosEditInfosData.register(this)
	}

	componentWillUnmount() {
		AuxiliaryInfosEditInfosData.unregister()
	}


	// Rendering functions //
	// --------------------------------------------------------------------------------

	_buildFormGroup(field) { 
		let state = ''
		if (field.validator) {
			state = field.validator.getState(this.state[field.key])
		}
		return (
			<Form.Group key={field.key} state={state}>
				<Form.Label className='col-sm-5 col-md-4'>
					{field.name || AuxiliaryUtils.getFieldName(field.key)}
				</Form.Label>
				<Grid.Col sm={7} md={8}>
					{this.buildFormControl(field)}
				</Grid.Col>
			</Form.Group>
		)
	}

	_buildFormControl(field) {
		switch (field.form) {
			case 'input': return (
				<Form.Input 
					value={this.state[field.key]} 
					onChange={this.onChangeDirty.bind(this, field.key)} />
				)
			case 'select': return (
				<Form.Select 
					values={field.values}
					value={this.state[field.key]}
					onChange={this.onChangeDirty.bind(this, field.key)} />
				)
			case 'address': return (
				<Google.Autocomplete 
					placeholder='Saisir adresse'
					onChange={this.onChangeAddress} />
				)
			case 'textarea': return (
				<Form.TextArea
					value={this.state[field.key]} 
					rows={5}
					onChange={this.onChangeDirty.bind(this, field.key)} />
				)
			case 'date': return (				
				<Form.Date 
					date={this.state[field.key][2]}
					month={this.state[field.key][1]}
					year={this.state[field.key][0]}
					onChange={this.onChangeDirty.bind(this, field.key)} />
				)
			default: return (
				<Form.Static>
					{this.state[field.key]}
				</Form.Static>
			)
		}
	}

	checkValidity() {
		for (let i = 0 ; i < AuxiliaryInfosEditInfosData.FIELDS.length ; i++) {
			let field = AuxiliaryInfosEditInfosData.FIELDS[i]
			if (field.validator && field.validator.getState(this.state[field.key]) === 'error') {
				return false
			}
		}
		return true
	}

	render() {
		return (
			<div className='ap-auxiliary-infos-edit-infos'>
				{ this.state.profilCompleted ? 
					<Button block bsStyle='primary' onClick={this.onCancel}>Retour</Button>
				:
					<Panel>
						<Panel.Header>
							Statut profil	
						</Panel.Header>
						<Panel.Body className='ap-error'>
							Votre profil est incomplet, veuillez saisir les champs obligatoires ci-dessous
						</Panel.Body>
						<Panel.Footer>	
						</Panel.Footer>
					</Panel>
				}
				{ this.state.profilCompleted ? <br/> : null }
				<Panel>
					<Panel.Header>
						{ this.state.profilCompleted ? 'Modifier mes informations' : 'Saisir mes informations' }
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
				<Button 
					block 
					bsStyle={this.state.dirty && this.state.auxiliaryValid ? 'success' : 'default'}
					disabled={!this.state.dirty || !this.state.auxiliaryValid}
					onClick={this.onSubmit}>
					Enregistrer modifications
				</Button>
				<br/>
			</div>
		)
	}

}
export default AuxiliaryInfosEditInfos
