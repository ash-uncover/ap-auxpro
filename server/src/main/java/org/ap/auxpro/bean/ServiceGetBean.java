package org.ap.auxpro.bean;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;
import org.ap.auxpro.storage.service.ServiceData;
import org.ap.common.time.TimeHelper;
import org.ap.auxpro.storage.apauth.ApauthData;
import org.ap.common.exception.APWebException;
import org.ap.common.validators.ValidationState;
import org.ap.common.validators.EValidatorState;
import org.ap.common.exception.APWebError;
import java.util.ArrayList;
import javax.ws.rs.core.Response.Status;
import org.ap.auxpro.storage.service.ServiceFields;

/* This class was auto-generated by the JavaWriter */
@JsonIgnoreProperties(ignoreUnknown=true)
public class ServiceGetBean {

	public String country;
	public String address;
	public String city;
	public Double lattitude;
	public List<Integer> lastUpdateDate;
	public String accountType;
	public String postalCode;
	public Boolean isTutoSkipped;
	public Boolean notifyPartners;
	public List<Integer> accountExpiryDate;
	public String avatar;
	public List<Integer> creationDate;
	public String siret;
	public Boolean notifyAuxpros;
	public String phone;
	public String function;
	public Boolean profilCompleted;
	public String id;
	public String socialReason;
	public String email;
	public Double longitude;

	public ServiceGetBean() {
	}

	public ServiceGetBean(ServiceData data, ApauthData dataAuth) {
		country = data.getCountry();
		address = data.getAddress();
		city = data.getCity();
		lattitude = data.getLattitude();
		lastUpdateDate = TimeHelper.toIntegers(data.getLastUpdateDate());
		accountType = data.getAccountType();
		postalCode = data.getPostalCode();
		isTutoSkipped = data.getIsTutoSkipped();
		notifyPartners = data.getNotifyPartners();
		accountExpiryDate = TimeHelper.toIntegers(data.getAccountExpiryDate());
		avatar = data.getAvatar();
		creationDate = TimeHelper.toIntegers(data.getCreationDate());
		siret = data.getSiret();
		notifyAuxpros = data.getNotifyAuxpros();
		phone = data.getPhone();
		function = data.getFunction();
		profilCompleted = data.getProfilCompleted();
		id = data.getId();
		socialReason = data.getSocialReason();
		email = dataAuth.getEmail();
		longitude = data.getLongitude();
	}

	public ServiceData toData() {
		ServiceData data = new ServiceData();
		fillData(data);
		return data;
	}

	public void fillData(ServiceData data) {
		data.setCountry(country);
		data.setAddress(address);
		data.setCity(city);
		data.setLattitude(lattitude);
		data.setAccountType(accountType);
		data.setPostalCode(postalCode);
		data.setIsTutoSkipped(isTutoSkipped);
		data.setNotifyPartners(notifyPartners);
		data.setAccountExpiryDate(TimeHelper.toDate(accountExpiryDate));
		data.setAvatar(avatar);
		data.setSiret(siret);
		data.setNotifyAuxpros(notifyAuxpros);
		data.setPhone(phone);
		data.setFunction(function);
		data.setProfilCompleted(profilCompleted);
		data.setSocialReason(socialReason);
		data.setLongitude(longitude);
	}

	public void check() throws APWebException {
		List<APWebError> errors = new ArrayList<APWebError>();
		ValidationState countryState = ServiceFields.COUNTRY.getValidator().check(country);
		if (!countryState.getState().equals(EValidatorState.SUCCESS)) {
			errors.add(new APWebError("AP_SERVICE_INVALID_FIELDS", "Invalid field 'country'"));
		}
		ValidationState addressState = ServiceFields.ADDRESS.getValidator().check(address);
		if (!addressState.getState().equals(EValidatorState.SUCCESS)) {
			errors.add(new APWebError("AP_SERVICE_INVALID_FIELDS", "Invalid field 'address'"));
		}
		ValidationState cityState = ServiceFields.CITY.getValidator().check(city);
		if (!cityState.getState().equals(EValidatorState.SUCCESS)) {
			errors.add(new APWebError("AP_SERVICE_INVALID_FIELDS", "Invalid field 'city'"));
		}
		ValidationState postalCodeState = ServiceFields.POSTAL_CODE.getValidator().check(postalCode);
		if (!postalCodeState.getState().equals(EValidatorState.SUCCESS)) {
			errors.add(new APWebError("AP_SERVICE_INVALID_FIELDS", "Invalid field 'postalCode'"));
		}
		ValidationState siretState = ServiceFields.SIRET.getValidator().check(siret);
		if (!siretState.getState().equals(EValidatorState.SUCCESS)) {
			errors.add(new APWebError("AP_SERVICE_INVALID_FIELDS", "Invalid field 'siret'"));
		}
		ValidationState phoneState = ServiceFields.PHONE.getValidator().check(phone);
		if (!phoneState.getState().equals(EValidatorState.SUCCESS)) {
			errors.add(new APWebError("AP_SERVICE_INVALID_FIELDS", "Invalid field 'phone'"));
		}
		ValidationState functionState = ServiceFields.FUNCTION.getValidator().check(function);
		if (!functionState.getState().equals(EValidatorState.SUCCESS)) {
			errors.add(new APWebError("AP_SERVICE_INVALID_FIELDS", "Invalid field 'function'"));
		}
		ValidationState socialReasonState = ServiceFields.SOCIAL_REASON.getValidator().check(socialReason);
		if (!socialReasonState.getState().equals(EValidatorState.SUCCESS)) {
			errors.add(new APWebError("AP_SERVICE_INVALID_FIELDS", "Invalid field 'socialReason'"));
		}
		if (errors.size() > 0) {
			throw new APWebException("AP_SERVICE_INVALID_FIELDS", "Invalid fields within 'service'", errors, Status.BAD_REQUEST);
		}
	}

}
