package org.ap.auxpro.bean;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;
import org.ap.auxpro.storage.auxiliary.AuxiliaryData;
import org.ap.common.time.TimeHelper;
import org.ap.auxpro.storage.apauth.ApauthData;
import org.ap.common.web.exception.APWebException;
import org.ap.common.validators.ValidationState;
import org.ap.common.validators.EValidatorState;
import org.ap.common.web.exception.APWebError;
import java.util.ArrayList;
import javax.ws.rs.core.Response.Status;
import org.ap.auxpro.storage.auxiliary.AuxiliaryFields;

/* This class was auto-generated by the JavaWriter */
@JsonIgnoreProperties(ignoreUnknown=true)
public class AuxiliaryGetBean {

	public String country;
	public String lastName;
	public String civility;
	public String city;
	public List<Integer> lastUpdateDate;
	public String postalCode;
	public Boolean isTutoSkipped;
	public String description;
	public String socialNumber;
	public List<Integer> accountExpiryDate;
	public Integer profilProgression;
	public Integer skillShopping;
	public Boolean notifyOffersSms;
	public Boolean notifyAuxpros;
	public String birthCountry;
	public Boolean profilCompleted;
	public Integer skillDoityourself;
	public List<String> diploma;
	public String id;
	public String email;
	public Double longitude;
	public Integer skillNursing;
	public String address;
	public Double lattitude;
	public String accountType;
	public Boolean notifyPartners;
	public String birthCity;
	public String avatar;
	public Boolean areSkillSet;
	public List<Integer> creationDate;
	public List<Integer> birthDate;
	public Integer skillChildhood;
	public Integer skillCompagny;
	public String firstName;
	public List<Integer> skillAnswers;
	public String nationality;
	public String isEntrepreneur;
	public String phone;
	public Integer skillAdministrative;
	public Integer skillHousework;
	public Boolean notifyOffersMail;

	public AuxiliaryGetBean() {
	}

	public AuxiliaryGetBean(AuxiliaryData data, ApauthData dataAuth) {
		country = data.getCountry();
		lastName = data.getLastName();
		civility = data.getCivility();
		city = data.getCity();
		lastUpdateDate = TimeHelper.toIntegers(data.getLastUpdateDate());
		postalCode = data.getPostalCode();
		isTutoSkipped = data.getIsTutoSkipped();
		description = data.getDescription();
		socialNumber = data.getSocialNumber();
		accountExpiryDate = TimeHelper.toIntegers(data.getAccountExpiryDate());
		profilProgression = data.getProfilProgression();
		skillShopping = data.getSkillShopping();
		notifyOffersSms = data.getNotifyOffersSms();
		notifyAuxpros = data.getNotifyAuxpros();
		birthCountry = data.getBirthCountry();
		profilCompleted = data.getProfilCompleted();
		skillDoityourself = data.getSkillDoityourself();
		diploma = data.getDiploma();
		id = data.getId();
		email = dataAuth.getEmail();
		longitude = data.getLongitude();
		skillNursing = data.getSkillNursing();
		address = data.getAddress();
		lattitude = data.getLattitude();
		accountType = data.getAccountType();
		notifyPartners = data.getNotifyPartners();
		birthCity = data.getBirthCity();
		avatar = data.getAvatar();
		areSkillSet = data.getAreSkillSet();
		creationDate = TimeHelper.toIntegers(data.getCreationDate());
		birthDate = TimeHelper.toIntegers(data.getBirthDate());
		skillChildhood = data.getSkillChildhood();
		skillCompagny = data.getSkillCompagny();
		firstName = data.getFirstName();
		skillAnswers = data.getSkillAnswers();
		nationality = data.getNationality();
		isEntrepreneur = data.getIsEntrepreneur();
		phone = data.getPhone();
		skillAdministrative = data.getSkillAdministrative();
		skillHousework = data.getSkillHousework();
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
		data.setAccountExpiryDate(TimeHelper.toDate(accountExpiryDate));
		data.setProfilProgression(profilProgression);
		data.setSkillShopping(skillShopping);
		data.setNotifyOffersSms(notifyOffersSms);
		data.setNotifyAuxpros(notifyAuxpros);
		data.setBirthCountry(birthCountry);
		data.setProfilCompleted(profilCompleted);
		data.setSkillDoityourself(skillDoityourself);
		data.setDiploma(diploma);
		data.setLongitude(longitude);
		data.setSkillNursing(skillNursing);
		data.setAddress(address);
		data.setLattitude(lattitude);
		data.setAccountType(accountType);
		data.setNotifyPartners(notifyPartners);
		data.setBirthCity(birthCity);
		data.setAvatar(avatar);
		data.setAreSkillSet(areSkillSet);
		data.setBirthDate(TimeHelper.toDate(birthDate));
		data.setSkillChildhood(skillChildhood);
		data.setSkillCompagny(skillCompagny);
		data.setFirstName(firstName);
		data.setSkillAnswers(skillAnswers);
		data.setNationality(nationality);
		data.setIsEntrepreneur(isEntrepreneur);
		data.setPhone(phone);
		data.setSkillAdministrative(skillAdministrative);
		data.setSkillHousework(skillHousework);
		data.setNotifyOffersMail(notifyOffersMail);
	}

	public void check() throws APWebException {
		List<APWebError> errors = new ArrayList<APWebError>();
		ValidationState countryState = AuxiliaryFields.COUNTRY.getValidator().check(country);
		if (!countryState.getState().equals(EValidatorState.SUCCESS)) {
			errors.add(new APWebError("AP_AUXILIARY_INVALID_FIELDS", "Invalid field 'country'"));
		}
		ValidationState lastNameState = AuxiliaryFields.LAST_NAME.getValidator().check(lastName);
		if (!lastNameState.getState().equals(EValidatorState.SUCCESS)) {
			errors.add(new APWebError("AP_AUXILIARY_INVALID_FIELDS", "Invalid field 'lastName'"));
		}
		ValidationState civilityState = AuxiliaryFields.CIVILITY.getValidator().check(civility);
		if (!civilityState.getState().equals(EValidatorState.SUCCESS)) {
			errors.add(new APWebError("AP_AUXILIARY_INVALID_FIELDS", "Invalid field 'civility'"));
		}
		ValidationState cityState = AuxiliaryFields.CITY.getValidator().check(city);
		if (!cityState.getState().equals(EValidatorState.SUCCESS)) {
			errors.add(new APWebError("AP_AUXILIARY_INVALID_FIELDS", "Invalid field 'city'"));
		}
		ValidationState postalCodeState = AuxiliaryFields.POSTAL_CODE.getValidator().check(postalCode);
		if (!postalCodeState.getState().equals(EValidatorState.SUCCESS)) {
			errors.add(new APWebError("AP_AUXILIARY_INVALID_FIELDS", "Invalid field 'postalCode'"));
		}
		ValidationState descriptionState = AuxiliaryFields.DESCRIPTION.getValidator().check(description);
		if (!descriptionState.getState().equals(EValidatorState.SUCCESS)) {
			errors.add(new APWebError("AP_AUXILIARY_INVALID_FIELDS", "Invalid field 'description'"));
		}
		ValidationState socialNumberState = AuxiliaryFields.SOCIAL_NUMBER.getValidator().check(socialNumber);
		if (!socialNumberState.getState().equals(EValidatorState.SUCCESS)) {
			errors.add(new APWebError("AP_AUXILIARY_INVALID_FIELDS", "Invalid field 'socialNumber'"));
		}
		ValidationState birthCountryState = AuxiliaryFields.BIRTH_COUNTRY.getValidator().check(birthCountry);
		if (!birthCountryState.getState().equals(EValidatorState.SUCCESS)) {
			errors.add(new APWebError("AP_AUXILIARY_INVALID_FIELDS", "Invalid field 'birthCountry'"));
		}
		ValidationState diplomaState = AuxiliaryFields.DIPLOMA.getValidator().check(diploma);
		if (!diplomaState.getState().equals(EValidatorState.SUCCESS)) {
			errors.add(new APWebError("AP_AUXILIARY_INVALID_FIELDS", "Invalid field 'diploma'"));
		}
		ValidationState addressState = AuxiliaryFields.ADDRESS.getValidator().check(address);
		if (!addressState.getState().equals(EValidatorState.SUCCESS)) {
			errors.add(new APWebError("AP_AUXILIARY_INVALID_FIELDS", "Invalid field 'address'"));
		}
		ValidationState birthCityState = AuxiliaryFields.BIRTH_CITY.getValidator().check(birthCity);
		if (!birthCityState.getState().equals(EValidatorState.SUCCESS)) {
			errors.add(new APWebError("AP_AUXILIARY_INVALID_FIELDS", "Invalid field 'birthCity'"));
		}
		ValidationState birthDateState = AuxiliaryFields.BIRTH_DATE.getValidator().check(birthDate);
		if (!birthDateState.getState().equals(EValidatorState.SUCCESS)) {
			errors.add(new APWebError("AP_AUXILIARY_INVALID_FIELDS", "Invalid field 'birthDate'"));
		}
		ValidationState firstNameState = AuxiliaryFields.FIRST_NAME.getValidator().check(firstName);
		if (!firstNameState.getState().equals(EValidatorState.SUCCESS)) {
			errors.add(new APWebError("AP_AUXILIARY_INVALID_FIELDS", "Invalid field 'firstName'"));
		}
		ValidationState nationalityState = AuxiliaryFields.NATIONALITY.getValidator().check(nationality);
		if (!nationalityState.getState().equals(EValidatorState.SUCCESS)) {
			errors.add(new APWebError("AP_AUXILIARY_INVALID_FIELDS", "Invalid field 'nationality'"));
		}
		ValidationState isEntrepreneurState = AuxiliaryFields.IS_ENTREPRENEUR.getValidator().check(isEntrepreneur);
		if (!isEntrepreneurState.getState().equals(EValidatorState.SUCCESS)) {
			errors.add(new APWebError("AP_AUXILIARY_INVALID_FIELDS", "Invalid field 'isEntrepreneur'"));
		}
		ValidationState phoneState = AuxiliaryFields.PHONE.getValidator().check(phone);
		if (!phoneState.getState().equals(EValidatorState.SUCCESS)) {
			errors.add(new APWebError("AP_AUXILIARY_INVALID_FIELDS", "Invalid field 'phone'"));
		}
		if (errors.size() > 0) {
			throw new APWebException("AP_AUXILIARY_INVALID_FIELDS", "Invalid fields within 'auxiliary'", errors, Status.BAD_REQUEST);
		}
	}

}
