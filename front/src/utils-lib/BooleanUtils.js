class BooleanUtils {

	static getBooleans() {
		return [
			{ key: 'true', value: BooleanUtils.formatBoolean(true) },
			{ key: 'false', value: BooleanUtils.formatBoolean() },
		]
	}

	static formatBoolean(value) {
		return value ? 'Oui' : 'Non'
	}

}

export default BooleanUtils