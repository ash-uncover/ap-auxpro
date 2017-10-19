import React from 'react'
import FAQData from './FAQData'
import './FAQ.scss'

import { Panel, SearchBar, Grid } from 'ap-react-bootstrap'

class FAQ extends React.Component {

	constructor(props) {
		super(props)
	}

	componentWillMount() {
		FAQData.register(this)
	}

	componentWillUnmount() {
		FAQData.unregister()
	}

	_buildTopic(topic) {
		return (
			<div key={topic.id}>
				<h3>{topic.title}</h3>
				<div dangerouslySetInnerHTML={{ __html: topic.content }} />
			</div>
		)
	}

	render() { 
		return (
			<Grid.Container className='ap-faq ap-infos'>
				<Panel>
					<Panel.Header>
						Recherche
					</Panel.Header>
					<Panel.Body>
						<SearchBar 
							placeholder='Recherche...'
							onChange={this.onLiveSearch} />
					</Panel.Body>
					<Panel.Footer>
					</Panel.Footer>
				</Panel>

				<Panel>
					<Panel.Header>
						Questions Fréquentes
					</Panel.Header>
					<Panel.Body>
						{this.state.topics.length === 0 ? 
						'Aucun résultat'
					:
						this.state.topics.map(this._buildTopic)
					}
					</Panel.Body>
					<Panel.Footer>
					</Panel.Footer>

				</Panel>
			</Grid.Container>
		)
	}
}
export default FAQ
