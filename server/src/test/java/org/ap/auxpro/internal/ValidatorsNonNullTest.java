package org.ap.auxpro.internal;

import org.ap.common.validators.v2.EValidatorState;
import org.ap.common.validators.v2.ValidationState;
import org.ap.common.validators.v2.ValidatorProvider;
import org.junit.Test;

import junit.framework.TestCase;

public class ValidatorsNonNullTest {

	/* TEST DATA */
	
	private ValidatorProvider provider = new Validators.NON_NULL();

	/* TEST CASES */
	
	@Test
	public void testV_nullValue() {
		ValidationState state = provider.VALIDATOR().check(null);
		TestCase.assertEquals(EValidatorState.ERROR, state.getState());
		TestCase.assertEquals(Validators.NON_NULL.ERRORS.CANNOT_BE_NULL, state.getMessage());
	}
	@Test
	public void testV_validValue() {
		ValidationState state = provider.VALIDATOR().check("");
		TestCase.assertEquals(EValidatorState.SUCCESS, state.getState());
	}
}
