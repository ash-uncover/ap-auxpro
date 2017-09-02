import SocFunction from 'utils/constants/SocFunction'

class SocFunctionUtils {

	static getName(func) {
		switch (func) {
			case SocFunction.MAND.key: return 'Mandataire'
			case SocFunction.PREST.key: return 'Prestataire'
			case SocFunction.BOTH.key: return 'Prestataire & Mandataire'
		}
		return ''
	}
}
export default SocFunctionUtils 