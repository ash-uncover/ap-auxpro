import AuxiliaryStatus from 'utils/constants/AuxiliaryStatus'

class AuxiliaryStatusUtils {

	static getName(status) {
		switch (status) {
			case AuxiliaryStatus.AUTO:
			case AuxiliaryStatus.AUTO.key: return 'Auto entrepreneur'
			case AuxiliaryStatus.SALARY:
			case AuxiliaryStatus.SALARY.key: return 'Salarié'
			case AuxiliaryStatus.BOTH:
			case AuxiliaryStatus.BOTH.key: return 'Salarié & auto entrepreneur'
		}
		return ''
	}

	static getValues() {
		return AuxiliaryStatus.VALUES.map(function (value) {
			return {
				key: value.key,
				value: AuxiliaryStatusUtils.getName(value)
			}
		})
	}

}
export default AuxiliaryStatusUtils