package org.ap.auxpro.internal;

import org.ap.common.validators.EValidatorState;
import org.ap.common.validators.ValidationState;
import org.ap.common.validators.ValidatorProvider;
import org.junit.Test;

import junit.framework.TestCase;

public class ValidatorPhoneTest {

	/* TEST DATA */
	
	private ValidatorProvider provider = new Validators.PHONE();

	/* TEST CASES */
	
	@Test
	public void testV_nullValue() {
		ValidationState state = provider.VALIDATOR().check(null);
		TestCase.assertEquals(EValidatorState.ERROR, state.getState());
		TestCase.assertEquals(Validators.PHONE.ERRORS.CANNOT_BE_NULL, state.getMessage());
	}
	@Test
	public void testV_tooLong() {
		ValidationState state = provider.VALIDATOR().check("01234567890");
		TestCase.assertEquals(EValidatorState.ERROR, state.getState());
		TestCase.assertEquals(Validators.PHONE.ERRORS.MAX_LENGTH_EXCEEDED, state.getMessage());
	}
	@Test
	public void testV_tooShort() {
		ValidationState state = provider.VALIDATOR().check("012345678");
		TestCase.assertEquals(EValidatorState.ERROR, state.getState());
		TestCase.assertEquals(Validators.PHONE.ERRORS.INVALID_PHONE, state.getMessage());
	}
	@Test
	public void testV_invalidChars() {
		ValidationState state = provider.VALIDATOR().check("0123456az");
		TestCase.assertEquals(EValidatorState.ERROR, state.getState());
		TestCase.assertEquals(Validators.PHONE.ERRORS.INVALID_PHONE, state.getMessage());
	}
	@Test
	public void testV_startWithNonZero() {
		ValidationState state = provider.VALIDATOR().check("1234567890");
		TestCase.assertEquals(EValidatorState.ERROR, state.getState());
		TestCase.assertEquals(Validators.PHONE.ERRORS.INVALID_PHONE, state.getMessage());
	}
	@Test
	public void testV_validValue() {
		ValidationState state = provider.VALIDATOR().check("0123456789");
		TestCase.assertEquals(EValidatorState.SUCCESS, state.getState());
	}
}
