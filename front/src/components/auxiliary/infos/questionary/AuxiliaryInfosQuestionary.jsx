import React from 'react'
import AuxiliaryInfosQuestionaryData from './AuxiliaryInfosQuestionaryData'
import './AuxiliaryInfosQuestionary.scss'

import { Button, Panel, Form } from 'ap-react-bootstrap'

import Questions from 'utils-lib/constants/Questions'

class AuxiliaryInfosQuestionary extends React.Component {

	constructor(props) {
		super(props)
		this.state = {}
		this.buildQuestions = this._buildQuestions.bind(this)
	}

	componentWillMount() {
		AuxiliaryInfosQuestionaryData.register(this)
	}

	componentWillUnmount() {
		AuxiliaryInfosQuestionaryData.unregister()
	}

	_buildQuestions(skillAnswers) {
		return Questions.QUESTIONS.map(function (question, index) {
			return (
				<div key={index}>
					<h4>{question.title}</h4>
					<Form.Group >
						<Form.Label>{question.text}</Form.Label>
						<br/>
						{this._buildAnswers(skillAnswers, index, question.answers)}
					</Form.Group>
					<br/>
				</div>
			);
		}.bind(this))
	}

	_buildAnswers(skillAnswers, qIndex, answers) {
		return answers.map(function (answer, index) {
			let key = qIndex + '-' + index			
			return (
				<Form.Radio disabled
					key={key}
					name={qIndex}
					value={key}
					className={index === skillAnswers[qIndex] ? 'selected' : ''}
					checked={index === skillAnswers[qIndex]} >
					{answer}
				</Form.Radio>
			)
		}.bind(this));
	}

	render() {
		return (
			<div className='ap-auxiliary-infos-questionary'>
				<Button block bsStyle='primary' onClick={this.onCancel}>Retour au profil</Button>
				<br/>
				<Panel>
					<Panel.Header>
						Mon questionnaire
					</Panel.Header>
					<Panel.Body>
						{this.buildQuestions(this.state.skillAnswers)}
					</Panel.Body>
					<Panel.Footer>

					</Panel.Footer>
				</Panel>
			</div>
		)
	}

}
export default AuxiliaryInfosQuestionary
