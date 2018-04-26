package org.ap.auxpro.internal;

import org.ap.common.validators.EValidatorState;
import org.ap.common.validators.IValidator;
import org.ap.common.validators.ValidationState;
import org.junit.Test;

import junit.framework.TestCase;

public class ValidatorPhoneTest {

	/* TEST DATA */
	
	private IValidator validator = Validators.PHONE.VALIDATOR;

	/* TEST CASES */
	
	@Test
	public void testV_nullValue() {
		ValidationState state = validator.check(null);
		TestCase.assertEquals(EValidatorState.ERROR, state.getState());
		TestCase.assertEquals(Validators.PHONE.ERRORS.CANNOT_BE_NULL, state.getMessage());
	}
	@Test
	public void testV_tooLong() {
		ValidationState state = validator.check("01234567890");
		TestCase.assertEquals(EValidatorState.ERROR, state.getState());
		TestCase.assertEquals(Validators.PHONE.ERRORS.MAX_LENGTH_EXCEEDED, state.getMessage());
	}
	@Test
	public void testV_tooShort() {
		ValidationState state = validator.check("012345678");
		TestCase.assertEquals(EValidatorState.ERROR, state.getState());
		TestCase.assertEquals(Validators.PHONE.ERRORS.INVALID_PHONE, state.getMessage());
	}
	@Test
	public void testV_invalidChars() {
		ValidationState state = validator.check("0123456az");
		TestCase.assertEquals(EValidatorState.ERROR, state.getState());
		TestCase.assertEquals(Validators.PHONE.ERRORS.INVALID_PHONE, state.getMessage());
	}
	@Test
	public void testV_startWithNonZero() {
		ValidationState state = validator.check("1234567890");
		TestCase.assertEquals(EValidatorState.ERROR, state.getState());
		TestCase.assertEquals(Validators.PHONE.ERRORS.INVALID_PHONE, state.getMessage());
	}
	@Test
	public void testV_validValue() {
		ValidationState state = validator.check("0123456789");
		TestCase.assertEquals(EValidatorState.SUCCESS, state.getState());
	}
}
