/* ! CAUTION ! Use this class only when you know what you are doing  */
import React from 'react'

import { Button, Panel, Form, Grid, Google } from 'ap-react-bootstrap'

class FormControlBuilder {

	static buildFormGroup(nameProvider, field) { 
        if (field.hidden && field.hidden()) return
		let state = ''
		if (field.validator) {
			state = field.validator.getState(this.state[field.key])
		}
		return (
			<Form.Group key={field.key} state={state}>
				<Form.Label className='col-sm-5 col-md-4'>
					{field.name || (nameProvider ? nameProvider(field.key) : field.key)}
				</Form.Label>
				<Grid.Col sm={7} md={8}>
					{this.buildFormControl(field)}
				</Grid.Col>
			</Form.Group>
		)
	}

	static buildFormControl(field) {
		switch (field.form) {
			case 'input': return (
				<Form.Input 
					value={this.state[field.key]} 
					onChange={this.onChange.bind(this, field.key)} />
				)
			case 'select': return (
				<Form.Select 
					values={field.values}
					value={this.state[field.key]}
					onChange={this.onChange.bind(this, field.key)} />
				)
			case 'selectmulti': return (
				<Form.SelectMulti
					values={field.values}
					value={this.state[field.key]}
					onChange={this.onChange.bind(this, field.key)} />
				)
			case 'address': return (
				<Google.Autocomplete 
					placeholder='Saisir adresse'
					onChange={this.onChange.bind(this, field.key)} 
					options={{ componentRestrictions: { country: 'fr' } }} />
				)
			case 'textarea': return (
				<Form.TextArea
					value={this.state[field.key]} 
					rows={field.rows || 5}
					onChange={this.onChange.bind(this, field.key)} />
				)
			case 'date': return (				
				<Form.Date 
					date={this.state[field.key][2]}
					month={this.state[field.key][1]}
					year={this.state[field.key][0]}
					onChange={this.onChange.bind(this, field.key)} />
				)
			case 'time': return (
				<Form.Time 
					hour={this.state[field.key][0]}
					minute={this.state[field.key][1]}
					minuteValues={[{key: 0, value: '00'}, {key: 15, value: '15'}, {key: 30, value: '30'}, {key: 45, value: '45'}]}
					onChange={this.onChange.bind(this, field.key)} />
				)
			default: return (
				<Form.Static>
					{this.state[field.key]}
				</Form.Static>
			)
		}
	}

}
export default FormControlBuilder
