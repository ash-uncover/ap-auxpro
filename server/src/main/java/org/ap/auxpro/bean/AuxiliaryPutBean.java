package org.ap.auxpro.bean;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;
import org.ap.auxpro.storage.auxiliary.AuxiliaryData;
import org.ap.common.time.TimeHelper;
import org.ap.common.validators.EValidatorState;
import org.ap.common.validators.ValidationState;
import org.ap.common.exception.APWebException;
import org.ap.common.exception.APWebError;
import java.util.ArrayList;
import javax.ws.rs.core.Response.Status;
import org.ap.auxpro.storage.auxiliary.AuxiliaryFields;

/* This class was auto-generated by the JavaWriter */
@JsonIgnoreProperties(ignoreUnknown=true)
public class AuxiliaryPutBean {

	public String country;
	public String lastName;
	public String civility;
	public String city;
	public List<Integer> lastUpdateDate;
	public String postalCode;
	public Boolean isTutoSkipped;
	public String description;
	public String socialNumber;
	public Boolean notifyOffersSms;
	public Boolean notifyAuxpros;
	public String birthCountry;
	public List<String> diploma;
	public String id;
	public Double longitude;
	public String address;
	public Double lattitude;
	public Boolean notifyPartners;
	public String birthCity;
	public String avatar;
	public List<Integer> creationDate;
	public List<Integer> birthDate;
	public String firstName;
	public String nationality;
	public String isEntrepreneur;
	public String phone;
	public Boolean notifyOffersMail;

	public AuxiliaryPutBean() {
	}

	public AuxiliaryPutBean(AuxiliaryData data) {
		country = data.getCountry();
		lastName = data.getLastName();
		civility = data.getCivility();
		city = data.getCity();
		lastUpdateDate = TimeHelper.toIntegers(data.getLastUpdateDate());
		postalCode = data.getPostalCode();
		isTutoSkipped = data.getIsTutoSkipped();
		description = data.getDescription();
		socialNumber = data.getSocialNumber();
		notifyOffersSms = data.getNotifyOffersSms();
		notifyAuxpros = data.getNotifyAuxpros();
		birthCountry = data.getBirthCountry();
		diploma = data.getDiploma();
		id = data.getId();
		longitude = data.getLongitude();
		address = data.getAddress();
		lattitude = data.getLattitude();
		notifyPartners = data.getNotifyPartners();
		birthCity = data.getBirthCity();
		avatar = data.getAvatar();
		creationDate = TimeHelper.toIntegers(data.getCreationDate());
		birthDate = TimeHelper.toIntegers(data.getBirthDate());
		firstName = data.getFirstName();
		nationality = data.getNationality();
		isEntrepreneur = data.getIsEntrepreneur();
		phone = data.getPhone();
		notifyOffersMail = data.getNotifyOffersMail();
	}

	public AuxiliaryData toData() {
		AuxiliaryData data = new AuxiliaryData();
		fillData(data);
		return data;
	}

	public void fillData(AuxiliaryData data) {
		data.setCountry(country);
		data.setLastName(lastName);
		data.setCivility(civility);
		data.setCity(city);
		data.setPostalCode(postalCode);
		data.setIsTutoSkipped(isTutoSkipped);
		data.setDescription(description);
		data.setSocialNumber(socialNumber);
		data.setNotifyOffersSms(notifyOffersSms);
		data.setNotifyAuxpros(notifyAuxpros);
		data.setBirthCountry(birthCountry);
		data.setDiploma(diploma);
		data.setLongitude(longitude);
		data.setAddress(address);
		data.setLattitude(lattitude);
		data.setNotifyPartners(notifyPartners);
		data.setBirthCity(birthCity);
		data.setAvatar(avatar);
		data.setBirthDate(TimeHelper.toDate(birthDate));
		data.setFirstName(firstName);
		data.setNationality(nationality);
		data.setIsEntrepreneur(isEntrepreneur);
		data.setPhone(phone);
		data.setNotifyOffersMail(notifyOffersMail);
	}

	public void check() throws APWebException {
		List<APWebError> errors = new ArrayList<APWebError>();
		ValidationState countryState = AuxiliaryFields.COUNTRY.getValidator().VALIDATOR().check(country);
		if (!countryState.getState().equals(EValidatorState.SUCCESS)) {
			errors.add(new APWebError("AP_AUXILIARY_INVALID_FIELDS", "Invalid field 'country'"));
		}
		ValidationState lastNameState = AuxiliaryFields.LAST_NAME.getValidator().VALIDATOR().check(lastName);
		if (!lastNameState.getState().equals(EValidatorState.SUCCESS)) {
			errors.add(new APWebError("AP_AUXILIARY_INVALID_FIELDS", "Invalid field 'lastName'"));
		}
		ValidationState civilityState = AuxiliaryFields.CIVILITY.getValidator().VALIDATOR().check(civility);
		if (!civilityState.getState().equals(EValidatorState.SUCCESS)) {
			errors.add(new APWebError("AP_AUXILIARY_INVALID_FIELDS", "Invalid field 'civility'"));
		}
		ValidationState cityState = AuxiliaryFields.CITY.getValidator().VALIDATOR().check(city);
		if (!cityState.getState().equals(EValidatorState.SUCCESS)) {
			errors.add(new APWebError("AP_AUXILIARY_INVALID_FIELDS", "Invalid field 'city'"));
		}
		ValidationState postalCodeState = AuxiliaryFields.POSTAL_CODE.getValidator().VALIDATOR().check(postalCode);
		if (!postalCodeState.getState().equals(EValidatorState.SUCCESS)) {
			errors.add(new APWebError("AP_AUXILIARY_INVALID_FIELDS", "Invalid field 'postalCode'"));
		}
		ValidationState descriptionState = AuxiliaryFields.DESCRIPTION.getValidator().VALIDATOR().check(description);
		if (!descriptionState.getState().equals(EValidatorState.SUCCESS)) {
			errors.add(new APWebError("AP_AUXILIARY_INVALID_FIELDS", "Invalid field 'description'"));
		}
		ValidationState socialNumberState = AuxiliaryFields.SOCIAL_NUMBER.getValidator().VALIDATOR().check(socialNumber);
		if (!socialNumberState.getState().equals(EValidatorState.SUCCESS)) {
			errors.add(new APWebError("AP_AUXILIARY_INVALID_FIELDS", "Invalid field 'socialNumber'"));
		}
		ValidationState birthCountryState = AuxiliaryFields.BIRTH_COUNTRY.getValidator().VALIDATOR().check(birthCountry);
		if (!birthCountryState.getState().equals(EValidatorState.SUCCESS)) {
			errors.add(new APWebError("AP_AUXILIARY_INVALID_FIELDS", "Invalid field 'birthCountry'"));
		}
		ValidationState diplomaState = AuxiliaryFields.DIPLOMA.getValidator().VALIDATOR().check(diploma);
		if (!diplomaState.getState().equals(EValidatorState.SUCCESS)) {
			errors.add(new APWebError("AP_AUXILIARY_INVALID_FIELDS", "Invalid field 'diploma'"));
		}
		ValidationState addressState = AuxiliaryFields.ADDRESS.getValidator().VALIDATOR().check(address);
		if (!addressState.getState().equals(EValidatorState.SUCCESS)) {
			errors.add(new APWebError("AP_AUXILIARY_INVALID_FIELDS", "Invalid field 'address'"));
		}
		ValidationState birthCityState = AuxiliaryFields.BIRTH_CITY.getValidator().VALIDATOR().check(birthCity);
		if (!birthCityState.getState().equals(EValidatorState.SUCCESS)) {
			errors.add(new APWebError("AP_AUXILIARY_INVALID_FIELDS", "Invalid field 'birthCity'"));
		}
		ValidationState birthDateState = AuxiliaryFields.BIRTH_DATE.getValidator().VALIDATOR().check(birthDate);
		if (!birthDateState.getState().equals(EValidatorState.SUCCESS)) {
			errors.add(new APWebError("AP_AUXILIARY_INVALID_FIELDS", "Invalid field 'birthDate'"));
		}
		ValidationState firstNameState = AuxiliaryFields.FIRST_NAME.getValidator().VALIDATOR().check(firstName);
		if (!firstNameState.getState().equals(EValidatorState.SUCCESS)) {
			errors.add(new APWebError("AP_AUXILIARY_INVALID_FIELDS", "Invalid field 'firstName'"));
		}
		ValidationState nationalityState = AuxiliaryFields.NATIONALITY.getValidator().VALIDATOR().check(nationality);
		if (!nationalityState.getState().equals(EValidatorState.SUCCESS)) {
			errors.add(new APWebError("AP_AUXILIARY_INVALID_FIELDS", "Invalid field 'nationality'"));
		}
		ValidationState isEntrepreneurState = AuxiliaryFields.IS_ENTREPRENEUR.getValidator().VALIDATOR().check(isEntrepreneur);
		if (!isEntrepreneurState.getState().equals(EValidatorState.SUCCESS)) {
			errors.add(new APWebError("AP_AUXILIARY_INVALID_FIELDS", "Invalid field 'isEntrepreneur'"));
		}
		ValidationState phoneState = AuxiliaryFields.PHONE.getValidator().VALIDATOR().check(phone);
		if (!phoneState.getState().equals(EValidatorState.SUCCESS)) {
			errors.add(new APWebError("AP_AUXILIARY_INVALID_FIELDS", "Invalid field 'phone'"));
		}
		if (errors.size() > 0) {
			throw new APWebException("AP_AUXILIARY_INVALID_FIELDS", "Invalid fields within 'auxiliary'", errors, Status.BAD_REQUEST);
		}
	}

}
