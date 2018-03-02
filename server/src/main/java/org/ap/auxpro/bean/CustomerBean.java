package org.ap.auxpro.bean;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;
import org.ap.auxpro.storage.customer.CustomerData;
import org.ap.common.time.TimeHelper;
import org.ap.common.exception.APWebException;
import org.ap.common.exception.APWebError;
import java.util.ArrayList;
import javax.ws.rs.core.Response.Status;
import org.ap.auxpro.storage.customer.CustomerFields;

/* This class was auto-generated by the JavaWriter */
@JsonIgnoreProperties(ignoreUnknown=true)
public class CustomerBean {

	public String serviceId;
	public String lastName;
	public String country;
	public String civility;
	public String address;
	public Integer skillNursing;
	public String city;
	public Double lattitude;
	public List<Integer> lastUpdateDate;
	public String postalCode;
	public List<Integer> creationDate;
	public List<Integer> birthDate;
	public Integer skillChildhood;
	public Integer skillCompagny;
	public Integer skillShopping;
	public String firstName;
	public String nationality;
	public String phone;
	public Integer skillAdministrative;
	public Integer skillHousework;
	public Integer skillDoityourself;
	public String id;
	public String email;
	public Double longitude;

	public CustomerBean() {
	}

	public CustomerBean(CustomerData data) {
		serviceId = data.getServiceId();
		lastName = data.getLastName();
		country = data.getCountry();
		civility = data.getCivility();
		address = data.getAddress();
		skillNursing = data.getSkillNursing();
		city = data.getCity();
		lattitude = data.getLattitude();
		lastUpdateDate = TimeHelper.toIntegers(data.getLastUpdateDate());
		postalCode = data.getPostalCode();
		creationDate = TimeHelper.toIntegers(data.getCreationDate());
		birthDate = TimeHelper.toIntegers(data.getBirthDate());
		skillChildhood = data.getSkillChildhood();
		skillCompagny = data.getSkillCompagny();
		skillShopping = data.getSkillShopping();
		firstName = data.getFirstName();
		nationality = data.getNationality();
		phone = data.getPhone();
		skillAdministrative = data.getSkillAdministrative();
		skillHousework = data.getSkillHousework();
		skillDoityourself = data.getSkillDoityourself();
		id = data.getId();
		email = data.getEmail();
		longitude = data.getLongitude();
	}

	public CustomerData toData() {
		CustomerData data = new CustomerData();
		fillData(data);
		return data;
	}

	public void fillData(CustomerData data) {
		data.setServiceId(serviceId);
		data.setLastName(lastName);
		data.setCountry(country);
		data.setCivility(civility);
		data.setAddress(address);
		data.setSkillNursing(skillNursing);
		data.setCity(city);
		data.setLattitude(lattitude);
		data.setPostalCode(postalCode);
		data.setBirthDate(TimeHelper.toDate(birthDate));
		data.setSkillChildhood(skillChildhood);
		data.setSkillCompagny(skillCompagny);
		data.setSkillShopping(skillShopping);
		data.setFirstName(firstName);
		data.setNationality(nationality);
		data.setPhone(phone);
		data.setSkillAdministrative(skillAdministrative);
		data.setSkillHousework(skillHousework);
		data.setSkillDoityourself(skillDoityourself);
		data.setEmail(email);
		data.setLongitude(longitude);
	}

	public void check() throws APWebException {
		List<APWebError> errors = new ArrayList<APWebError>();
		if (CustomerFields.LAST_NAME.getValidator().getState(lastName)) {
			errors.add(new APWebError("AP_CUSTOMER_INVALID_FIELDS", "Invalid field 'lastName'"));
		}
		if (CustomerFields.COUNTRY.getValidator().getState(country)) {
			errors.add(new APWebError("AP_CUSTOMER_INVALID_FIELDS", "Invalid field 'country'"));
		}
		if (CustomerFields.CIVILITY.getValidator().getState(civility)) {
			errors.add(new APWebError("AP_CUSTOMER_INVALID_FIELDS", "Invalid field 'civility'"));
		}
		if (CustomerFields.ADDRESS.getValidator().getState(address)) {
			errors.add(new APWebError("AP_CUSTOMER_INVALID_FIELDS", "Invalid field 'address'"));
		}
		if (CustomerFields.CITY.getValidator().getState(city)) {
			errors.add(new APWebError("AP_CUSTOMER_INVALID_FIELDS", "Invalid field 'city'"));
		}
		if (CustomerFields.POSTAL_CODE.getValidator().getState(postalCode)) {
			errors.add(new APWebError("AP_CUSTOMER_INVALID_FIELDS", "Invalid field 'postalCode'"));
		}
		if (CustomerFields.BIRTH_DATE.getValidator().getState(birthDate)) {
			errors.add(new APWebError("AP_CUSTOMER_INVALID_FIELDS", "Invalid field 'birthDate'"));
		}
		if (CustomerFields.FIRST_NAME.getValidator().getState(firstName)) {
			errors.add(new APWebError("AP_CUSTOMER_INVALID_FIELDS", "Invalid field 'firstName'"));
		}
		if (CustomerFields.NATIONALITY.getValidator().getState(nationality)) {
			errors.add(new APWebError("AP_CUSTOMER_INVALID_FIELDS", "Invalid field 'nationality'"));
		}
		if (CustomerFields.PHONE.getValidator().getState(phone)) {
			errors.add(new APWebError("AP_CUSTOMER_INVALID_FIELDS", "Invalid field 'phone'"));
		}
		if (errors.size() > 0) {
			throw new APWebException("AP_CUSTOMER_INVALID_FIELDS", "Invalid fields within 'customer'", errors, Status.BAD_REQUEST);
		}
	}

}
