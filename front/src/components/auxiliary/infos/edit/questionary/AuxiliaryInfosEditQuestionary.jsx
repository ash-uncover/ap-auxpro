import React from 'react'
import AuxiliaryInfosEditQuestionaryData from './AuxiliaryInfosEditQuestionaryData'
import './AuxiliaryInfosEditQuestionary.scss'

import { Button, Panel, Form } from 'ap-react-bootstrap'

import Questions from 'utils-lib/constants/Questions'

class AuxiliaryInfosEditQuestionary extends React.Component {

	constructor(props) {
		super(props)

		this.state = {}
	}

	componentWillMount() {
		AuxiliaryInfosEditQuestionaryData.register(this)
	}

	componentWillUnmount() {
		AuxiliaryInfosEditQuestionaryData.unregister()
	}


	// Rendering functions //
	// --------------------------------------------------------------------------------

	_buildQuestions() {
		return Questions.QUESTIONS.map(function (question, index) {
			return (
				<div key={index}>
					<h4>{question.title}</h4>
					<Form.Group >
						<Form.Label>{question.text}</Form.Label><br/>
						{this._buildAnswers(index, question.answers)}
					</Form.Group>
					<br/>
				</div>
			);
		}.bind(this));
	}

	_buildAnswers(qIndex, answers) {
		return answers.map(function (answer, index) {
			let key = qIndex + '-' + index
			return (
				<Form.Radio
					key={key}
					name={qIndex}
					value={key}
					className={index === this.state.skillAnswers[qIndex] ? 'selected' : ''}
					checked={index === this.state.skillAnswers[qIndex]}
					onChange={this.onChange.bind(this, qIndex, index)}>
					{answer}
				</Form.Radio>
			);
		}.bind(this));
	}

	render() {
		return (
			<div className='ap-auxiliary-infos-edit-questionary'>
				<Button block bsStyle='primary' onClick={this.onCancel}>Retour au profil</Button>
				<br/>
				<Panel>
					<Panel.Header>
						Mon questionnaire
					</Panel.Header>
					<Panel.Body>
						{this._buildQuestions()}
					</Panel.Body>
					<Panel.Footer>
					</Panel.Footer>
				</Panel>
				<Button 
					block 
					bsStyle={this.state.dirty ? 'success' : 'default'}
					disabled={!this.state.dirty}
					onClick={this.onSubmit}>
					Enregistrer questionnaire
				</Button>
				<br/>
			</div>
		)
	}

}
export default AuxiliaryInfosEditQuestionary
