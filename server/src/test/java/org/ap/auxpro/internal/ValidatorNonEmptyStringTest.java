package org.ap.auxpro.internal;

import org.ap.common.validators.v2.EValidatorState;
import org.ap.common.validators.v2.ValidationState;
import org.ap.common.validators.v2.ValidatorProvider;
import org.junit.Test;

import junit.framework.TestCase;

public class ValidatorNonEmptyStringTest {

	/* TEST DATA */
	
	private ValidatorProvider provider = new Validators.NON_EMPTY_STRING();

	/* TEST CASES */
	
	@Test
	public void testV_nullValue() {
		ValidationState state = provider.VALIDATOR().check(null);
		TestCase.assertEquals(EValidatorState.ERROR, state.getState());
		TestCase.assertEquals(Validators.NON_EMPTY_STRING.ERRORS.CANNOT_BE_NULL, state.getMessage());
	}
	@Test
	public void testV_amptyString() {
		ValidationState state = provider.VALIDATOR().check("");
		TestCase.assertEquals(EValidatorState.ERROR, state.getState());
		TestCase.assertEquals(Validators.NON_EMPTY_STRING.ERRORS.MIN_LENGTH_EXCEEDED, state.getMessage());
	}
	@Test
	public void testV_validValue() {
		ValidationState state = provider.VALIDATOR().check("a");
		TestCase.assertEquals(EValidatorState.SUCCESS, state.getState());
	}
}
