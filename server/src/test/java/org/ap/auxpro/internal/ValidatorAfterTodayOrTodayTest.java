package org.ap.auxpro.internal;

import java.time.LocalDate;

import org.ap.common.validators.EValidatorState;
import org.ap.common.validators.IValidator;
import org.ap.common.validators.ValidationState;
import org.junit.Test;

import junit.framework.TestCase;

public class ValidatorAfterTodayOrTodayTest {

	/* TEST DATA */
	
	private IValidator validator = Validators.AFTER_TODAY_OR_TODAY.VALIDATOR;

	/* TEST CASES */
	
	@Test
	public void testV_nullValue() {
		ValidationState state = validator.check(null);
		TestCase.assertEquals(EValidatorState.ERROR, state.getState());
		TestCase.assertEquals(Validators.AFTER_TODAY_OR_TODAY.ERRORS.CANNOT_BE_NULL, state.getMessage());
	}
	@Test
	public void testV_inPast() {
		ValidationState state = validator.check(LocalDate.now().minusDays(1));
		TestCase.assertEquals(EValidatorState.ERROR, state.getState());
		TestCase.assertEquals(Validators.AFTER_TODAY_OR_TODAY.ERRORS.MIN_DATE_EXCEEDED, state.getMessage());
	}
	@Test
	public void testV_now() {
		ValidationState state = validator.check(LocalDate.now());
		TestCase.assertEquals(EValidatorState.SUCCESS, state.getState());
	}
}
