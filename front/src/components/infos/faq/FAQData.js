import AppHelper from 'helpers/AppHelper'
import { BaseData, Utils, TextUtils } from 'ap-react-bootstrap'

import HelpfaqHelper from 'helpers/HelpfaqHelper'

class FAQData extends BaseData {

    constructor() {
        super(...arguments)
        
        this.onHelpfaqUpdate = this.onHelpfaqUpdate.bind(this)
    }

    register(obj) {
        super.register(obj)

        this.declareFunction('onLiveSearch')

        this._onHelpfaqUpdate()

		HelpfaqHelper.register('', this.onHelpfaqUpdate)

		HelpfaqHelper.getHelpFaqs()
	}

	unregister() {
		HelpfaqHelper.unregister('', this.onHelpfaqUpdate)
	}


	// Store notifications //
	// --------------------------------------------------------------------------------

	onHelpfaqUpdate() {
		this._onHelpfaqUpdate()
		this.forceUpdate()
	}

	_onHelpfaqUpdate() {
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
		return Utils.map(HelpfaqHelper.getData() || {}).filter(this._filterTopics.bind(this)).sort(this._sortTopics)
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
let FAQObj = new FAQData()
export default FAQObj
