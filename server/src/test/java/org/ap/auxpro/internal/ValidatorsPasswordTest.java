package org.ap.auxpro.internal;

import org.ap.common.validators.v2.EValidatorState;
import org.ap.common.validators.v2.ValidationState;
import org.junit.Test;

import junit.framework.TestCase;

public class ValidatorsPasswordTest {

	/* TEST CASES */
	
	@Test
	public void testV_nullValue() {
		ValidationState state = Validators.PASSWORD.VALIDATOR.check(null);
		TestCase.assertEquals(EValidatorState.ERROR, state.getState());
		TestCase.assertEquals(Validators.PASSWORD.ERRORS.CANNOT_BE_NULL, state.getMessage());
	}
	@Test
	public void testV_tooShort() {
		ValidationState state = Validators.PASSWORD.VALIDATOR.check("passwor");
		TestCase.assertEquals(EValidatorState.ERROR, state.getState());
		TestCase.assertEquals(Validators.PASSWORD.ERRORS.MIN_LENGTH_EXCEEDED, state.getMessage());
	}
	@Test
	public void testV_forbiddenChars() {
		ValidationState state = Validators.PASSWORD.VALIDATOR.check("Pàssword1");
		TestCase.assertEquals(EValidatorState.ERROR, state.getState());
		TestCase.assertEquals(Validators.PASSWORD.ERRORS.CONTAIN_FORBIDDEN_CHARS, state.getMessage());
	}
	@Test
	public void testV_noUpperCase() {
		ValidationState state = Validators.PASSWORD.VALIDATOR.check("password1");
		TestCase.assertEquals(EValidatorState.ERROR, state.getState());
		TestCase.assertEquals(Validators.PASSWORD.ERRORS.MUST_CONTAIN_UPPERCASE, state.getMessage());
	}
	@Test
	public void testV_noLowerCase() {
		ValidationState state = Validators.PASSWORD.VALIDATOR.check("PASSWORD1");
		TestCase.assertEquals(EValidatorState.ERROR, state.getState());
		TestCase.assertEquals(Validators.PASSWORD.ERRORS.MUST_CONTAIN_LOWERCASE, state.getMessage());
	}
	@Test
	public void testV_noSpecialChars() {
		ValidationState state = Validators.PASSWORD.VALIDATOR.check("Password");
		TestCase.assertEquals(EValidatorState.ERROR, state.getState());
		TestCase.assertEquals(Validators.PASSWORD.ERRORS.MUST_CONTAIN_SPECIAL, state.getMessage());
	}
	@Test
	public void testV_validValue() {
		ValidationState state = Validators.PASSWORD.VALIDATOR.check("Password1");
		TestCase.assertEquals(EValidatorState.SUCCESS, state.getState());
	}
	@Test
	public void testV_validValueUnderscore() {
		ValidationState state = Validators.PASSWORD.VALIDATOR.check("Password_");
		TestCase.assertEquals(EValidatorState.SUCCESS, state.getState());
	}
}
