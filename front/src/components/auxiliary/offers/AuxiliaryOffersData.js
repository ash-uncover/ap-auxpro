import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import OfferHelper from 'helpers/OfferHelper'

import { BaseData, Utils, MomentHelper } from 'ap-react-bootstrap'

import moment from 'moment'

import OfferStatusAux from 'utils/constants/OfferStatusAux'
import OfferStatusSad from 'utils/constants/OfferStatusSad'

import OfferStatus from 'utils-lib/constants/OfferStatus'
import OfferUtils from 'utils-lib/entities/OfferUtils'

class AuxiliaryOffersData extends BaseData {

	constructor() {
		super(...arguments)
	}

	register(obj) {
		super.register(obj)

		this.declareFunction('onFilterState')

		this.declareFunction('onOfferView')
		this.declareFunction('onOfferHide')
		
		this.declareFunction('onOfferAccept')
		this.declareFunction('onCancelAccept')
		this.declareFunction('onConfirmAccept')

		this.declareFunction('onOfferDecline')
		this.declareFunction('onCancelDecline')
		this.declareFunction('onConfirmDecline')

		this._onOffersUpdate()

		this.setState({
			filterState: OfferStatus.RECEIVED
		})

		OfferHelper.register('', this, this.onOffersUpdate.bind(this))
	}

	unregister() {
		OfferHelper.unregister(this)
	}


	// Store notification //
	// --------------------------------------------------------------------------------

	onOffersUpdate() {
		this._onOffersUpdate()
		this.forceUpdate()
	}

	_onOffersUpdate() {
		let offers = Utils.reduce(OfferHelper.getData(), function (result, offer) {
			if (!offer.hideToAux) {
				let status = OfferUtils.getStatus(offer)
				if (status) {
					result[status.key] = result[status.key] || []
					result[status.key].push(offer)
				}
			}
			return result
			
		}, {})
		this.obj.state.offers = offers
	}


	// View callbacks //
	// --------------------------------------------------------------------------------

	onOfferView(offer) {
		AppHelper.navigate('/auxiliary/offers/' + offer.id)
	}

	onOfferAccept(offer) {
		this.setState({
			showAccept: true,
			offer: offer
		})
	}
	onCancelAccept(offer) {
		this.setState({
			showAccept: false,
			offer: null
		})
	}
	onConfirmAccept() {
		let offer = this.getState('offer')
		AppHelper.setBusy(true).
		then(function() {
			return OfferHelper.putOfferAccept(offer)
		}).
		then(function () {
			return OfferHelper.getOffer(offer.id)
		}).
		then(function () {
			setTimeout(AppHelper.setBusy, 200)
			this.setState({
				showAccept: false,
				offer: null
			})
		}.bind(this)).
		catch(function (error) {
			setTimeout(AppHelper.setBusy, 200)
			this.setState({
				showAccept: false,
				offer: null
			})
			console.error('Error while accepting offer')
			console.error(error)
		}.bind(this))
	}


	onOfferDecline(offer) {
		this.setState({
			showDecline: true,
			offer: offer
		})
	}
	onCancelDecline(offer) {
		this.setState({
			showDecline: false,
			offer: null
		})
	}
	onConfirmDecline() {
		let offer = this.getState('offer')
		AppHelper.setBusy(true).
		then(function() {
			return OfferHelper.putOfferDecline({ id: offer.id })
		}).
		then(function () {
			return OfferHelper.getOffer(offer.id)
		}).
		then(function () {
			this.setState({
				showDecline: false,
				offer: null
			})
			setTimeout(AppHelper.setBusy, 200)
		}.bind(this)).
		catch(function (error) {
			setTimeout(AppHelper.setBusy, 200)
			this.setState({
				showDecline: false,
				offer: null
			})
			console.error('Error while accepting offer')
			console.error(error)
		}.bind(this))
	}
	


	onOfferHide(offer) {
		offer.hideToAux = true
		AppHelper.setBusy(true).
		then(function() {
			return OfferHelper.putOffer(offer)
		}).
		then(function () {
			return OfferHelper.getOffer(offer.id)
		}).
		then(function () {
			setTimeout(AppHelper.setBusy, 200)
		}).
		catch(function (error) {
			setTimeout(AppHelper.setBusy, 200)
			console.error('Error while deleting offer')
			console.error(error)
		})
	}

	onFilterState(state) {
		this.setState({ filterState: state })
	}
}
let AuxiliaryOffersObj = new AuxiliaryOffersData()
export default AuxiliaryOffersObj
