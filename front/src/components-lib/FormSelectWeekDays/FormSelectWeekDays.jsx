import React from 'react'
import './FormSelectWeekDays.scss'

import { Form, Day } from 'ap-react-bootstrap'

import DayUtils from 'utils-lib/entities/DayUtils'

class FormSelectWeekDays extends React.Component {

	constructor(props) {
		super(props)
		this.buildDaySwitch = this._buildDaySwitch.bind(this)
	}

	onChange(value, event) {
		let current = this.props.values || []
		let result = current
		let index = current.indexOf(value)
		if (index === -1 && event.target.checked) {
			if (this.props.onChange) {
				result = current.concat([ value ])
			}
		} else if (index !== -1 && !event.target.checked) {
			if (this.props.onChange) {
				result.splice(index, 1)
			}
		}
		this.props.onChange(event, result.sort(this._sortDays))
	}

	_sortDays(d1, d2) {
		return (Day.get(d1).index - Day.get(d2).index)
	}

	_buildDaySwitch(day) {
		return (
			<Form.Switch 
				key={day.key}
				text={DayUtils.getName(day.key)}
				value={(this.props.values && this.props.values.indexOf(day.key) !== - 1) || false}
				onChange={this.onChange.bind(this, day.key)} />
		)
	}

	render() {
		return (
			<div className='ap-select-week-days'>
				{Day.VALUES.map(this.buildDaySwitch)}
			</div>
		)
	}

}
export default FormSelectWeekDays
