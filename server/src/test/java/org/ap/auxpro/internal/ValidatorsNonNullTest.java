package org.ap.auxpro.internal;

import org.ap.common.validators.v2.EValidatorState;
import org.ap.common.validators.v2.ValidationState;
import org.junit.Test;

import junit.framework.TestCase;

public class ValidatorsNonNullTest {

	/* TEST CASES */
	
	@Test
	public void testV_nullValue() {
		ValidationState state = Validators.NON_NULL.VALIDATOR.check(null);
		TestCase.assertEquals(EValidatorState.ERROR, state.getState());
		TestCase.assertEquals(Validators.NON_NULL.ERRORS.CANNOT_BE_NULL, state.getMessage());
	}
	@Test
	public void testV_validValue() {
		ValidationState state = Validators.NON_NULL.VALIDATOR.check("");
		TestCase.assertEquals(EValidatorState.SUCCESS, state.getState());
	}
}
