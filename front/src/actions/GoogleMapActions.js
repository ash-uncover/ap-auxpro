import { ActionBase } from 'ap-flux'
import { Utils, GoogleMapService } from 'ap-react-bootstrap'

// GET REVERSE GEOCODE
let GetReverseGeocode = new ActionBase({ name: 'GET_REVERSE_GEOCODE' })
GetReverseGeocode.do = function (args) {
	Utils.checkMembers(args, ['lattitude', 'longitude'])
	let reqParam = {
		lattitude: args.lattitude,
		longitude: args.longitude
	}
	return GoogleMapService.getReverseGeocode(reqParam)
}