package org.ap.auxpro.internal;

import org.ap.common.validators.EValidatorState;
import org.ap.common.validators.IValidator;
import org.ap.common.validators.ValidationState;
import org.junit.Test;

import junit.framework.TestCase;

public class ValidatorEmailTest {

	/* TEST DATA */
	
	private IValidator validator = Validators.EMAIL.VALIDATOR;

	/* TEST CASES */
	
	@Test
	public void testV_nullValue() {
		ValidationState state = validator.check(null);
		TestCase.assertEquals(EValidatorState.ERROR, state.getState());
		TestCase.assertEquals(Validators.EMAIL.ERRORS.CANNOT_BE_NULL, state.getMessage());
	}
	@Test
	public void testV_noArrobace() {
		ValidationState state = validator.check("kikogmail.com");
		TestCase.assertEquals(EValidatorState.ERROR, state.getState());
		TestCase.assertEquals(Validators.EMAIL.ERRORS.INVALID_EMAIL, state.getMessage());
	}
	@Test
	public void testV_validValue() {
		ValidationState state = validator.check("kiko@gmail.com");
		TestCase.assertEquals(EValidatorState.SUCCESS, state.getState());
	}
}
