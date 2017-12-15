package org.ap.auxpro.internal;

import java.util.HashMap;
import java.util.Map;
import org.ap.web.internal.APWebException;
import org.ap.web.mail.MailHelper;
import org.ap.auxpro.storage.apauth.ApauthData;
import org.ap.auxpro.storage.apmail.ApmailCollection;
import org.ap.auxpro.storage.apmail.ApmailData;

/* This class was auto-generated by the JavaWriter */
public abstract class MailSenderBase {

	protected static MailHelper HELPER = new MailHelper(
		EConfigProperties.SMTP_HOST.getValue(),
		EConfigProperties.SMTP_PORT.getValue(),
		EConfigProperties.SMTP_USER.getValue(),
		EConfigProperties.SMTP_PASS.getValue(),
		Boolean.valueOf(EConfigProperties.SMTP_USEAUTH.getValue()),
		Boolean.valueOf(EConfigProperties.SMTP_STARTTLS.getValue()));
	public static final String MAIL_AUTH_REGISTER = "mail_auth_register";
	public static final String MAIL_AUTH_CHANGEMAIL = "mail_auth_changemail";
	public static final String MAIL_AUTH_CONFIRMMAIL = "mail_auth_confirmmail";
	public static final String MAIL_AUTH_RECOVER = "mail_auth_recover";

	public void sendTextMail(String sender, String senderName, String to, String subject, String text) throws APWebException {
		HELPER.sendMail(HELPER.prepareTextMail(sender, senderName, to, subject, text));
	}

	public void sendRegistrationMail(ApauthData data) throws APWebException {
		ApmailData mail = ApmailCollection.getById(MAIL_AUTH_REGISTER);
		Map<String, String> keys = prepare(data, data.token);
		sendTextMail(EConfigProperties.SMTP_USER.getValue(), EConfigProperties.SMTP_USERNAME.getValue(), data.email, format(mail.getSubject(), keys), format(mail.getContent(), keys));
	}

	public void sendChangeUsernameMail(ApauthData data) throws APWebException {
		ApmailData mail = ApmailCollection.getById(MAIL_AUTH_CHANGEMAIL);
		Map<String, String> keys = prepare(data, data.token);
		sendTextMail(EConfigProperties.SMTP_USER.getValue(), EConfigProperties.SMTP_USERNAME.getValue(), data.email, format(mail.getSubject(), keys), format(mail.getContent(), keys));
	}

	public void sendConfirmUsernameMail(ApauthData data) throws APWebException {
		ApmailData mail = ApmailCollection.getById(MAIL_AUTH_CONFIRMMAIL);
		Map<String, String> keys = prepare(data, data.token);
		sendTextMail(EConfigProperties.SMTP_USER.getValue(), EConfigProperties.SMTP_USERNAME.getValue(), data.email, format(mail.getSubject(), keys), format(mail.getContent(), keys));
	}

	public void sendPasswordRecoveryMail(ApauthData data) throws APWebException {
		ApmailData mail = ApmailCollection.getById(MAIL_AUTH_RECOVER);
		Map<String, String> keys = prepare(data, data.token);
		sendTextMail(EConfigProperties.SMTP_USER.getValue(), EConfigProperties.SMTP_USERNAME.getValue(), data.email, format(mail.getSubject(), keys), format(mail.getContent(), keys));
	}

	protected Map<String, String> prepare(ApauthData data, String code) {
		Map<String, String> result = new HashMap<String, String>();
		result.put("user", data.username);
		result.put("type", data.type);
		result.put("code", code);
		return result;
	}

	protected static String format(String s, Map<String, String> keys) {
		String result = s;
		for (String key : keys.keySet()) {
			result = result.replaceAll("\\{" + key + "}", keys.get(key));
		}
		return result;
	}

}
