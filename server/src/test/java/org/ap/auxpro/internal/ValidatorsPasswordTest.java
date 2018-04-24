package org.ap.auxpro.internal;

import org.ap.common.validators.EValidatorState;
import org.ap.common.validators.ValidationState;
import org.ap.common.validators.ValidatorProvider;
import org.junit.Test;

import junit.framework.TestCase;

public class ValidatorsPasswordTest {

	/* TEST DATA */
	
	private ValidatorProvider provider = new Validators.PASSWORD();
	
	/* TEST CASES */
	
	@Test
	public void testV_nullValue() {
		ValidationState state = provider.VALIDATOR().check(null);
		TestCase.assertEquals(EValidatorState.ERROR, state.getState());
		TestCase.assertEquals(Validators.PASSWORD.ERRORS.CANNOT_BE_NULL, state.getMessage());
	}
	@Test
	public void testV_tooShort() {
		ValidationState state = provider.VALIDATOR().check("passwor");
		TestCase.assertEquals(EValidatorState.ERROR, state.getState());
		TestCase.assertEquals(Validators.PASSWORD.ERRORS.MIN_LENGTH_EXCEEDED, state.getMessage());
	}
	@Test
	public void testV_forbiddenChars() {
		ValidationState state = provider.VALIDATOR().check("Pàssword1");
		TestCase.assertEquals(EValidatorState.ERROR, state.getState());
		TestCase.assertEquals(Validators.PASSWORD.ERRORS.CONTAIN_FORBIDDEN_CHARS, state.getMessage());
	}
	@Test
	public void testV_noUpperCase() {
		ValidationState state = provider.VALIDATOR().check("password1");
		TestCase.assertEquals(EValidatorState.ERROR, state.getState());
		TestCase.assertEquals(Validators.PASSWORD.ERRORS.MUST_CONTAIN_UPPERCASE, state.getMessage());
	}
	@Test
	public void testV_noLowerCase() {
		ValidationState state = provider.VALIDATOR().check("PASSWORD1");
		TestCase.assertEquals(EValidatorState.ERROR, state.getState());
		TestCase.assertEquals(Validators.PASSWORD.ERRORS.MUST_CONTAIN_LOWERCASE, state.getMessage());
	}
	@Test
	public void testV_noSpecialChars() {
		ValidationState state = provider.VALIDATOR().check("Password");
		TestCase.assertEquals(EValidatorState.ERROR, state.getState());
		TestCase.assertEquals(Validators.PASSWORD.ERRORS.MUST_CONTAIN_SPECIAL, state.getMessage());
	}
	@Test
	public void testV_validValue() {
		ValidationState state = provider.VALIDATOR().check("Password1");
		TestCase.assertEquals(EValidatorState.SUCCESS, state.getState());
	}
	@Test
	public void testV_validValueUnderscore() {
		ValidationState state = provider.VALIDATOR().check("Password_");
		TestCase.assertEquals(EValidatorState.SUCCESS, state.getState());
	}
}
