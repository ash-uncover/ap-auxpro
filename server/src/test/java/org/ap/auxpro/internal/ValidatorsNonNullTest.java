package org.ap.auxpro.internal;

import org.ap.common.validators.EValidatorState;
import org.ap.common.validators.IValidator;
import org.ap.common.validators.ValidationState;
import org.junit.Test;

import junit.framework.TestCase;

public class ValidatorsNonNullTest {

	/* TEST DATA */
	
	private IValidator validator = Validators.NON_NULL.VALIDATOR;

	/* TEST CASES */
	
	@Test
	public void testV_nullValue() {
		ValidationState state = validator.check(null);
		TestCase.assertEquals(EValidatorState.ERROR, state.getState());
		TestCase.assertEquals(Validators.NON_NULL.ERRORS.CANNOT_BE_NULL, state.getMessage());
	}
	@Test
	public void testV_validValue() {
		ValidationState state = validator.check("");
		TestCase.assertEquals(EValidatorState.SUCCESS, state.getState());
	}
}
