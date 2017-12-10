import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import OfferHelper from 'helpers/OfferHelper'

import { BaseData, Utils, MomentHelper } from 'ap-react-bootstrap'

import moment from 'moment'

import OfferStatusAux from 'utils/constants/OfferStatusAux'
import OfferStatusSad from 'utils/constants/OfferStatusSad'

class AuxiliaryOffersData extends BaseData {

	register(obj) {
		super.register(obj)

		this.declareFunction('onFilterState')

		this.declareFunction('onOfferView')
		this.declareFunction('onOfferAccept')
		this.declareFunction('onOfferDecline')
		this.declareFunction('onOfferHide')

		this._onOffersUpdate()

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
				let sadStatus = OfferStatusSad.get(offer.sadStatus)
				let auxStatus = OfferStatusAux.get(offer.auxStatus)
				if (sadStatus === OfferStatusSad.PENDING && auxStatus === OfferStatusAux.ACCEPTED) {
					result[auxStatus.key] = result[auxStatus.key] || []
					result[auxStatus.key].push(offer)
				} else {
					result[sadStatus.key] = result[sadStatus.key] || []
					result[sadStatus.key].push(offer)
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
		AppHelper.setBusy(true).
		then(function() {
			return OfferHelper.putOfferAccept(offer)
		}).
		then(function () {
			return OfferHelper.getOffer(offer.id)
		}).
		then(function () {
			setTimeout(AppHelper.setBusy, 200)
		}).
		catch(function (error) {
			setTimeout(AppHelper.setBusy, 200)
			console.error('Error while accepting offer')
			console.error(error)
		})
	}
	
	onOfferDecline(offer) {
		AppHelper.setBusy(true).
		then(function() {
			return OfferHelper.putOfferDecline({ id: offer.id })
		}).
		then(function () {
			return OfferHelper.getOffer(offer.id)
		}).
		then(function () {
			setTimeout(AppHelper.setBusy, 200)
		}).
		catch(function (error) {
			setTimeout(AppHelper.setBusy, 200)
			console.error('Error while accepting offer')
			console.error(error)
		})
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
