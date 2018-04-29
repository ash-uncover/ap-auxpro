/* ! CAUTION ! Use this class only when you know what you are doing  */
import React from 'react'

import { Form, Grid, Google } from 'ap-react-bootstrap'
import FormGroup from 'components-lib/FormGroup/FormGroup'
import FormSelectWeekDays from 'components-lib/FormSelectWeekDays/FormSelectWeekDays'

class FormGroupBuilder {

    static buildFormGroup(id, field, horizontal) { 
        if ((field.hidden === true) || (field.hidden && field.hidden())) return

        return (
            <FormGroup 
                key={field.key} 
                label={field.name}
                horizontal={!!horizontal}
                state={this.state[field.key + 'State']}>
                {FormGroupBuilder.buildFormControl.call(this, id, field)}
            </FormGroup>
        )
    }

    static onValueChanged(id, event, value) {
        const hasValue = !(typeof value === 'undefined') && value !== null
        return this.onChange(id, hasValue ? value : event)
    }

    static buildFormControl(id, field) {
        const onChange = FormGroupBuilder.onValueChanged.bind(this, id)
        switch (field.form) {
            case 'input': return (
                <Form.Input 
                    className={'ap-form-' + field.key}
                    value={this.state[field.key]} 
                    onChange={onChange} />
                )
            case 'select': return (
                <Form.Select 
                    className={'ap-form-' + field.key}
                    values={field.values}
                    value={this.state[field.key]}
                    onChange={onChange} />
                )
            case 'selectmulti': return (
                <Form.SelectMulti
                    className={'ap-form-' + field.key}
                    values={field.values}
                    value={this.state[field.key]}
                    onChange={onChange} />
                )
            case 'address': return (
                <Google.Autocomplete 
                    className={'ap-form-' + field.key}
                    placeholder='Saisir adresse'
                    options={{ componentRestrictions: { country: 'fr' } }}
                    onChange={onChange} />
                )
            case 'textarea': return (
                <Form.TextArea
                    className={'ap-form-' + field.key}
                    value={this.state[field.key]} 
                    rows={field.rows || 5}
                    onChange={onChange} />
                )
            case 'date': return (               
                <Form.Date 
                    className={'ap-form-' + field.key}
                    date={this.state[field.key][2]}
                    month={this.state[field.key][1]}
                    year={this.state[field.key][0]}
                    onChange={onChange} />
                )
            case 'time': return (
                <Form.Time 
                    className={'ap-form-' + field.key}
                    hour={this.state[field.key][0]}
                    minute={this.state[field.key][1]}
                    minuteValues={[{key: 0, value: '00'}, {key: 15, value: '15'}, {key: 30, value: '30'}, {key: 45, value: '45'}]}
                    onChange={onChange} />
                )
            case 'days': return (
                <FormSelectWeekDays 
                    className={'ap-form-' + field.key}
                    values={this.state[field.key]} 
                    onChange={onChange} />
                )
            default: return (
                <Form.Static className={'ap-form-' + field.key}>
                    {this.state[field.key]}
                </Form.Static>
            )
        }
    }

}
export default FormGroupBuilder
