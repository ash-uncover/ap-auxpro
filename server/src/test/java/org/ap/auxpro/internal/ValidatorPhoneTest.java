package org.ap.auxpro.internal;

import org.ap.common.validators.v2.EValidatorState;
import org.ap.common.validators.v2.ValidationState;
import org.junit.Test;

import junit.framework.TestCase;

public class ValidatorPhoneTest {
	
	/* TEST CASES */
	
	@Test
	public void testV_nullValue() {
		ValidationState state = Validators.PHONE.VALIDATOR.check(null);
		TestCase.assertEquals(EValidatorState.ERROR, state.getState());
		TestCase.assertEquals(Validators.PHONE.ERRORS.CANNOT_BE_NULL, state.getMessage());
	}
	@Test
	public void testV_tooLong() {
		ValidationState state = Validators.PHONE.VALIDATOR.check("01234567890");
		TestCase.assertEquals(EValidatorState.ERROR, state.getState());
		TestCase.assertEquals(Validators.PHONE.ERRORS.MAX_LENGTH_EXCEEDED, state.getMessage());
	}
	@Test
	public void testV_tooShort() {
		ValidationState state = Validators.PHONE.VALIDATOR.check("012345678");
		TestCase.assertEquals(EValidatorState.ERROR, state.getState());
		TestCase.assertEquals(Validators.PHONE.ERRORS.INVALID_PHONE, state.getMessage());
	}
	@Test
	public void testV_invalidChars() {
		ValidationState state = Validators.PHONE.VALIDATOR.check("0123456az");
		TestCase.assertEquals(EValidatorState.ERROR, state.getState());
		TestCase.assertEquals(Validators.PHONE.ERRORS.INVALID_PHONE, state.getMessage());
	}
	@Test
	public void testV_startWithNonZero() {
		ValidationState state = Validators.PHONE.VALIDATOR.check("1234567890");
		TestCase.assertEquals(EValidatorState.ERROR, state.getState());
		TestCase.assertEquals(Validators.PHONE.ERRORS.INVALID_PHONE, state.getMessage());
	}
	@Test
	public void testV_validValue() {
		ValidationState state = Validators.PHONE.VALIDATOR.check("0123456789");
		TestCase.assertEquals(EValidatorState.SUCCESS, state.getState());
	}
}
