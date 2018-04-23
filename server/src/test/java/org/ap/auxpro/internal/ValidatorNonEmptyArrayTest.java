package org.ap.auxpro.internal;

import org.ap.common.validators.v2.EValidatorState;
import org.ap.common.validators.v2.ValidationState;
import org.junit.Test;

import junit.framework.TestCase;

public class ValidatorNonEmptyArrayTest {
	
	/* TEST CASES */
	
	@Test
	public void testV_nullValue() {
		ValidationState state = Validators.NON_EMPTY_ARRAY.VALIDATOR.check(null);
		TestCase.assertEquals(EValidatorState.ERROR, state.getState());
		TestCase.assertEquals(Validators.NON_EMPTY_ARRAY.ERRORS.CANNOT_BE_NULL, state.getMessage());
	}
	@Test
	public void testV_emptyArray() {
		ValidationState state = Validators.NON_EMPTY_ARRAY.VALIDATOR.check(new Object[] {});
		TestCase.assertEquals(EValidatorState.ERROR, state.getState());
		TestCase.assertEquals(Validators.NON_EMPTY_ARRAY.ERRORS.MIN_LENGTH_EXCEEDED, state.getMessage());
	}
	@Test
	public void testV_validValue() {
		ValidationState state = Validators.NON_EMPTY_ARRAY.VALIDATOR.check(new Object[] { "a" });
		TestCase.assertEquals(EValidatorState.SUCCESS, state.getState());
	}
}
