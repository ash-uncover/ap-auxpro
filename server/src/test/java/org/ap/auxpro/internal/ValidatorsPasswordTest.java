package org.ap.auxpro.internal;

import org.ap.common.validators.EValidatorState;
import org.ap.common.validators.IValidator;
import org.ap.common.validators.ValidationState;
import org.junit.Test;

import junit.framework.TestCase;

public class ValidatorsPasswordTest {

	/* TEST DATA */
	
	private IValidator validator = Validators.PASSWORD.VALIDATOR;
	
	/* TEST CASES */
	
	@Test
	public void testV_nullValue() {
		ValidationState state = validator.check(null);
		TestCase.assertEquals(EValidatorState.ERROR, state.getState());
		TestCase.assertEquals(Validators.PASSWORD.ERRORS.CANNOT_BE_NULL, state.getMessage());
	}
	@Test
	public void testV_tooShort() {
		ValidationState state = validator.check("passwor");
		TestCase.assertEquals(EValidatorState.ERROR, state.getState());
		TestCase.assertEquals(Validators.PASSWORD.ERRORS.MIN_LENGTH_EXCEEDED, state.getMessage());
	}
	@Test
	public void testV_forbiddenChars() {
		ValidationState state = validator.check("Pàssword1");
		TestCase.assertEquals(EValidatorState.ERROR, state.getState());
		TestCase.assertEquals(Validators.PASSWORD.ERRORS.CONTAIN_FORBIDDEN_CHARS, state.getMessage());
	}
	@Test
	public void testV_noUpperCase() {
		ValidationState state = validator.check("password1");
		TestCase.assertEquals(EValidatorState.ERROR, state.getState());
		TestCase.assertEquals(Validators.PASSWORD.ERRORS.MUST_CONTAIN_UPPERCASE, state.getMessage());
	}
	@Test
	public void testV_noLowerCase() {
		ValidationState state = validator.check("PASSWORD1");
		TestCase.assertEquals(EValidatorState.ERROR, state.getState());
		TestCase.assertEquals(Validators.PASSWORD.ERRORS.MUST_CONTAIN_LOWERCASE, state.getMessage());
	}
	@Test
	public void testV_noSpecialChars() {
		ValidationState state = validator.check("Password");
		TestCase.assertEquals(EValidatorState.ERROR, state.getState());
		TestCase.assertEquals(Validators.PASSWORD.ERRORS.MUST_CONTAIN_SPECIAL, state.getMessage());
	}
	@Test
	public void testV_validValue() {
		ValidationState state = validator.check("Password1");
		TestCase.assertEquals(EValidatorState.SUCCESS, state.getState());
	}
	@Test
	public void testV_validValueUnderscore() {
		ValidationState state = validator.check("Password_");
		TestCase.assertEquals(EValidatorState.SUCCESS, state.getState());
	}
}
