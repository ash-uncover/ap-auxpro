package org.ap.auxpro.bean;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;
import org.ap.auxpro.storage.customer.CustomerData;
import org.ap.common.time.TimeHelper;

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

}
