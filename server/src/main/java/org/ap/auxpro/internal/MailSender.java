package org.ap.auxpro.internal;

import java.util.HashMap;
import java.util.Map;

import org.ap.auxpro.storage.apauth.ApauthData;
import org.ap.auxpro.storage.apmail.ApmailCollection;
import org.ap.auxpro.storage.apmail.ApmailData;
import org.ap.common.exception.APWebException;
import org.ap.common.util.Encoder;

/* This class was auto-generated by the JavaWriter */
public class MailSender extends MailSenderBase {
	
	/* STATIC */
	
	public static final String MAIL_OFFER_SEND = "mail_offer_send";
	public static final String MAIL_OFFER_ACCEPTED = "mail_offer_accepted";

	private static MailSender _instance = new MailSender(); 
	public static MailSender getInstance() {
		return _instance;
	}
	
	/* CONSTRUCTOR */
	
	private MailSender() {}
	
	/* METHODS */
	
	@Override
	public void sendRegistrationMail(ApauthData data) throws APWebException {
		ApmailData mail = ApmailCollection.getById(MAIL_AUTH_REGISTER);
		Map<String, String> keys = prepare(data, data.token);
		addUrlKey(keys, data, "/auth/register/confirm/");
		sendTextMail(EConfigProperties.SMTP_USER.getValue(), EConfigProperties.SMTP_USERNAME.getValue(), data.email, format(mail.getSubject(), keys), format(mail.getContent(), keys));
	}
	
	@Override
	public void sendPasswordRecoveryMail(ApauthData data) throws APWebException {
		ApmailData mail = ApmailCollection.getById(MAIL_AUTH_RECOVER);
		Map<String, String> keys = prepare(data, data.token);
		addUrlKey(keys, data, "/auth/recover/confirm/");
		sendTextMail(EConfigProperties.SMTP_USER.getValue(), EConfigProperties.SMTP_USERNAME.getValue(), data.email, format(mail.getSubject(), keys), format(mail.getContent(), keys));
	}
	
	public void sendAuxiliaryOffer(String email, String firstName) throws APWebException {
		ApmailData mail = ApmailCollection.getById(MAIL_OFFER_SEND);
		Map<String, String> keys = new HashMap<String, String>();
		keys.put("user", firstName);
		sendTextMail(EConfigProperties.SMTP_USER.getValue(), EConfigProperties.SMTP_USERNAME.getValue(), email, format(mail.getSubject(), keys), format(mail.getContent(), keys));
	}
	
	public void sendServiceOffer(String email) throws APWebException {
		ApmailData mail = ApmailCollection.getById(MAIL_OFFER_ACCEPTED);
		Map<String, String> keys = new HashMap<String, String>();
		sendTextMail(EConfigProperties.SMTP_USER.getValue(), EConfigProperties.SMTP_USERNAME.getValue(), email, format(mail.getSubject(), keys), format(mail.getContent(), keys));
	}
	
	public void addUrlKey(Map<String, String> keys, ApauthData data, String url) {
		String dataLink = "{\"email\":\"" + data.email + "\",\"token\":\"" + data.token + "\"}";
		String dataUrl = Encoder.encode(dataLink);
		String baseUrl = EConfigProperties.FRONT_URL.getValue();
		keys.put("url", baseUrl + url + dataUrl);
	}
}
