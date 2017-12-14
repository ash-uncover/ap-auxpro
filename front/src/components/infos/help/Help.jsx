import React from 'react'
import HelpData from './HelpData'
import './Help.scss'

import { Panel, SearchBar, Grid } from 'ap-react-bootstrap'

class Help extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			topics: []
		}
	}

	componentWillMount() {
		HelpData.register(this)
	}

	componentWillUnmount() {
		HelpData.unregister()
	}


	// Rendering functions //
	// --------------------------------------------------------------------------------

	_buildTopic(topic) {
		return (
			<div key={topic.id}>
				<h3>{topic.title}</h3>
				<div dangerouslySetInnerHTML={{__html: topic.content}} />
			</div>
		)
	}

	render() { 
		return (
			<Grid.Container className='ap-help ap-infos'>
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
						Glossaire
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
export default Help
