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
		
		this.obj.state = {
			filterState: null
		}

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
		offer.auxStatus = OfferStatusAux.ACCEPTED.key
		offer.auxStatusChanged = MomentHelper.toLocalDate(moment())
		this._updateOffer(offer)
	}
	
	onOfferDecline(offer) {
		offer.hideToAux = true
		offer.auxStatus = OfferStatusAux.DECLINED.key
		offer.auxStatusChanged = MomentHelper.toLocalDate(moment())
		this._updateOffer(offer)
	}

	onOfferHide(offer) {
		offer.hideToAux = true
		this._updateOffer(offer)
	}

	onFilterState(state) {
		this.setState({ filterState: state })
	}


	// Internal methods //
	// --------------------------------------------------------------------------------

	_updateOffer(offer) {
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
			offer.auxStatus = OfferAuxStatus.PENDING.key
			console.error('Error while updating offer')
			console.error(error)
		})
	}
}
let AuxiliaryOffersObj = new AuxiliaryOffersData()
export default AuxiliaryOffersObj
