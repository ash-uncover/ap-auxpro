package org.ap.auxpro.internal;

import org.ap.common.validators.EValidatorState;
import org.ap.common.validators.IValidator;
import org.ap.common.validators.ValidationState;
import org.junit.Test;

import junit.framework.TestCase;

public class ValidatorNonEmptyArrayTest {

	/* TEST DATA */
	
	private IValidator validator = Validators.NON_EMPTY_ARRAY.VALIDATOR;

	/* TEST CASES */
	
	@Test
	public void testV_nullValue() {
		ValidationState state = validator.check(null);
		TestCase.assertEquals(EValidatorState.ERROR, state.getState());
		TestCase.assertEquals(Validators.NON_EMPTY_ARRAY.ERRORS.CANNOT_BE_NULL, state.getMessage());
	}
	@Test
	public void testV_emptyArray() {
		ValidationState state = validator.check(new Object[] {});
		TestCase.assertEquals(EValidatorState.ERROR, state.getState());
		TestCase.assertEquals(Validators.NON_EMPTY_ARRAY.ERRORS.MIN_LENGTH_EXCEEDED, state.getMessage());
	}
	@Test
	public void testV_validValue() {
		ValidationState state = validator.check(new Object[] { "a" });
		TestCase.assertEquals(EValidatorState.SUCCESS, state.getState());
	}
}
