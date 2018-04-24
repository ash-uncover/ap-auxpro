package org.ap.auxpro.internal;

import java.time.LocalDate;

import org.ap.common.validators.EValidatorState;
import org.ap.common.validators.ValidationState;
import org.ap.common.validators.ValidatorProvider;
import org.junit.Test;

import junit.framework.TestCase;

public class ValidatorBeforeTodayTest {

	/* TEST DATA */
	
	private ValidatorProvider provider = new Validators.BEFORE_TODAY();

	/* TEST CASES */
	
	@Test
	public void testV_nullValue() {
		ValidationState state = provider.VALIDATOR().check(null);
		TestCase.assertEquals(EValidatorState.ERROR, state.getState());
		TestCase.assertEquals(Validators.BEFORE_TODAY.ERRORS.CANNOT_BE_NULL, state.getMessage());
	}
	@Test
	public void testV_now() {
		ValidationState state = provider.VALIDATOR().check(LocalDate.now());
		TestCase.assertEquals(EValidatorState.ERROR, state.getState());
		TestCase.assertEquals(Validators.BEFORE_TODAY.ERRORS.MAX_DATE_EXCEEDED, state.getMessage());
	}
	@Test
	public void testV_inPast() {
		ValidationState state = provider.VALIDATOR().check(LocalDate.now().minusDays(1));
		TestCase.assertEquals(EValidatorState.SUCCESS, state.getState());
	}

}
