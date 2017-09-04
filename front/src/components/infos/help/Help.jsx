import React from 'react'
import HelpData from 'components/infos/help/HelpData'
import './Help.scss'

import { Panel, SearchBar } from 'ap-react-bootstrap'

class Help extends React.Component {

	constructor(props) {
		super(props)
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
			<div className='ap-help ap-infos'>
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
			</div>
		)
	}
}
export default Help
