package org.ap.auxpro.internal;

import java.time.LocalDate;

import org.ap.common.validators.v2.EValidatorState;
import org.ap.common.validators.v2.ValidationState;
import org.ap.common.validators.v2.ValidatorProvider;
import org.junit.Test;

import junit.framework.TestCase;

public class ValidatorBeforeTodayOrTodayTest {

	/* TEST DATA */
	
	private ValidatorProvider provider = new Validators.BEFORE_TODAY_OR_TODAY();

	/* TEST CASES */
	
	@Test
	public void testV_nullValue() {
		ValidationState state = provider.VALIDATOR().check(null);
		TestCase.assertEquals(EValidatorState.ERROR, state.getState());
		TestCase.assertEquals(Validators.BEFORE_TODAY_OR_TODAY.ERRORS.CANNOT_BE_NULL, state.getMessage());
	}
	@Test
	public void testV_inFuture() {
		ValidationState state = provider.VALIDATOR().check(LocalDate.now().plusDays(1));
		TestCase.assertEquals(EValidatorState.ERROR, state.getState());
		TestCase.assertEquals(Validators.BEFORE_TODAY_OR_TODAY.ERRORS.MAX_DATE_EXCEEDED, state.getMessage());
	}
	@Test
	public void testV_now() {
		ValidationState state = provider.VALIDATOR().check(LocalDate.now());
		TestCase.assertEquals(EValidatorState.SUCCESS, state.getState());
	}

}
