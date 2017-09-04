import AppHelper from 'helpers/AppHelper'
import { BaseData, Utils, TextUtils } from 'ap-react-bootstrap'

import HelptopicHelper from 'helpers/HelptopicHelper'

class HelpData extends BaseData {

	register(obj) {
		super.register(obj)

		this.declareFunction('onLiveSearch')

		this.obj.state = {
			topics: []
		}

		this._onHelptopicUpdate()

		HelptopicHelper.register('', this, this.onHelptopicUpdate.bind(this))

		HelptopicHelper.getHelpTopics()
	}

	unregister() {
		HelptopicHelper.unregister(this)
	}


	// Store notifications //
	// --------------------------------------------------------------------------------

	onHelptopicUpdate() {
		this._onHelptopicUpdate()
		this.forceUpdate()
	}

	_onHelptopicUpdate() {
		this.obj.state.topics = this.buildTopics()
	}


	// View callbacks //
	// --------------------------------------------------------------------------------

	onLiveSearch(value) {
		this.obj.state.query = value
		this.obj.state.topics = this.buildTopics()
		this.forceUpdate()
	}


	// Internal methods //
	// --------------------------------------------------------------------------------

	buildTopics() {
		return Utils.map(HelptopicHelper.getData() || {}).filter(this._filterTopics.bind(this)).sort(this._sortTopics)
	}

	_filterTopics(topic) {
		if (this.getState('query')) {
			return TextUtils.easenSearch(topic.title).indexOf(TextUtils.easenSearch(this.getState('query'))) !== -1
		} else {
			return true;
		}
	}
	_sortTopics(topic1, topic2) {
		return topic1.title.localeCompare(topic2.title)
	}
}
let HelpObj = new HelpData()
export default HelpObj
