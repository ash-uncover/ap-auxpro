package org.ap.auxpro.internal;

import org.ap.common.validators.EValidatorState;
import org.ap.common.validators.ValidationState;
import org.ap.common.validators.ValidatorProvider;
import org.junit.Test;

import junit.framework.TestCase;

public class ValidatorNonEmptyArrayTest {

	/* TEST DATA */
	
	private ValidatorProvider provider = new Validators.NON_EMPTY_ARRAY();

	/* TEST CASES */
	
	@Test
	public void testV_nullValue() {
		ValidationState state = provider.VALIDATOR().check(null);
		TestCase.assertEquals(EValidatorState.ERROR, state.getState());
		TestCase.assertEquals(Validators.NON_EMPTY_ARRAY.ERRORS.CANNOT_BE_NULL, state.getMessage());
	}
	@Test
	public void testV_emptyArray() {
		ValidationState state = provider.VALIDATOR().check(new Object[] {});
		TestCase.assertEquals(EValidatorState.ERROR, state.getState());
		TestCase.assertEquals(Validators.NON_EMPTY_ARRAY.ERRORS.MIN_LENGTH_EXCEEDED, state.getMessage());
	}
	@Test
	public void testV_validValue() {
		ValidationState state = provider.VALIDATOR().check(new Object[] { "a" });
		TestCase.assertEquals(EValidatorState.SUCCESS, state.getState());
	}
}
