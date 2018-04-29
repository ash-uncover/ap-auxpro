import validators from 'utils/validators'
import { STATES } from 'ap-validators'



describe('validators', () => {

	const success = { state: STATES.SUCCESS }
	const error = { state: STATES.ERROR }

	describe('DEFAULT', () => {
		
		const validator = validators.DEFAULT.VALIDATOR

		test('accept null values', () => {
			expect(validator.check()).toEqual(success)
		})
		test('accept object values', () => {
			expect(validator.check({})).toEqual(success)
		})
	})

	describe('PASSWORD', () => {
		
		const validator = validators.PASSWORD.VALIDATOR

		const errorNull = Object.assign({}, error, {
			message: 'CANNOT_BE_NULL'
		})
		const errorMin = Object.assign({}, error, {
			message: 'MIN_LENGTH_EXCEEDED'
		})
		const errorForbid = Object.assign({}, error, {
			message: 'CONTAIN_FORBIDDEN_CHARS'
		})
		const errorLower = Object.assign({}, error, {
			message: 'MUST_CONTAIN_LOWERCASE'
		})
		const errorUpper = Object.assign({}, error, {
			message: 'MUST_CONTAIN_UPPERCASE'
		})
		const errorSpecial = Object.assign({}, error, {
			message: 'MUST_CONTAIN_SPECIAL'
		})

		test('rejects null values', () => {
			expect(validator.check()).toEqual(errorNull)
		})
		test('rejects short values', () => {
			expect(validator.check('Pass1')).toEqual(errorMin)
		})
		test('rejects forbidden chars values', () => {
			expect(validator.check('Password1*')).toEqual(errorForbid)
		})
		test('rejects non lower case values', () => {
			expect(validator.check('PASSWORD1')).toEqual(errorLower)
		})
		test('rejects non upper case values', () => {
			expect(validator.check('password1')).toEqual(errorUpper)
		})
		test('rejects non special values', () => {
			expect(validator.check('Password')).toEqual(errorSpecial)
		})
		test('accept valid values', () => {
			expect(validator.check('Password1')).toEqual(success)
		})
	})
})