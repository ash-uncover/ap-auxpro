import React from 'react'
import './Gauge.scss'

import { BaseComponent } from 'ap-react-bootstrap'

let THRESHOLD = [
{ valueMin: 80, valueMax: 100, color: '#5CB85C' },
{ valueMin: 50, valueMax: 80, color: '#F0AD4E' },
{ valueMin: 0, valueMax: 50, color: '#D9534F' }
]

class Gauge extends BaseComponent {

	constructor(props) {
		super(props)
		//
		this.drawChart = this._drawChart.bind(this)
		// Base classes
		this.baseClasses = [ 'ap-chart-gauge' ]
		//
		this.gaugeProps = {}
		// Component properties
		this.propsInfos = {
			required : {
				value: { store: this.gaugeProps }
			},
			optionnal : {
				valueMax: { defaultValue: 100, store: this.gaugeProps },
				unit: { defaultValue: '%', store: this.gaugeProps }
			}
		}
	}

	componentDidMount () {
		this.drawChart()		
		window.addEventListener('resize', this.drawChart)
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.drawChart)
	}

	componentDidUpdate () {
		this.drawChart()
	}

	getValue() {
		return this.gaugeProps.value ? (Math.max(Math.min(this.gaugeProps.valueMax, this.gaugeProps.value), 0)) : 0
	}

	_drawChart() {
		let value = this.getValue()
		let color = THRESHOLD[0].color
		for (let i = 1; i < THRESHOLD.length; i++) {
			let t = THRESHOLD[i]
			if (value < t.valueMax && value >= t.valueMin) {
				color = t.color
			}
		}
		let w = this.gaugeContainer.getBoundingClientRect().width
		this.gaugeBackground.style.background = color
		this.gaugeBackground.style['border-width'] = (w / 40) + 'px'
		this.gaugeContainer.style.height = w + 'px'
		this.gaugeValue.style.height = (100 - value) + '%'
		this.gaugeTextContainer.style.top = '-' + (100 - value) + '%'
		this.gaugeText.style.fontSize = (w / 4) + 'px'
	}

	render() {
		this.buildProps('Gauge')
		return (
			<div ref={ (c) => this.gaugeContainer = c }  className={this.className}>
				<div ref={ (c) => this.gaugeBackground = c } className='ap-gauge-background'>
					<div ref={ (c) => this.gaugeValue = c } className='ap-gauge-value'/>
						<div ref={ (c) => this.gaugeTextContainer = c } className='ap-gauge-text-container'>
						<span ref={ (c) => this.gaugeText = c } className='ap-gauge-text'>
						<strong>{this.getValue()}</strong>%
						</span>
					</div>
				</div>
			</div>
		)
	}

}
export default Gauge
