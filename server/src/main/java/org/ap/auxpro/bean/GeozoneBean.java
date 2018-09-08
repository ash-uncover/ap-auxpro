package org.ap.auxpro.bean;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;
import org.ap.auxpro.storage.geozone.GeozoneData;
import org.ap.common.time.TimeHelper;
import org.ap.common.web.exception.APWebException;
import org.ap.common.validators.ValidationState;
import org.ap.common.validators.EValidatorState;
import org.ap.common.web.exception.APWebError;
import java.util.ArrayList;
import javax.ws.rs.core.Response.Status;
import org.ap.auxpro.storage.geozone.GeozoneFields;

/* This class was auto-generated by the JavaWriter */
@JsonIgnoreProperties(ignoreUnknown=true)
public class GeozoneBean {

	public String auxiliaryId;
	public String address;
	public Double lattitude;
	public String city;
	public List<Integer> lastUpdateDate;
	public String postalCode;
	public String id;
	public String type;
	public Integer radius;
	public List<Integer> creationDate;
	public Double longitude;

	public GeozoneBean() {
	}

	public GeozoneBean(GeozoneData data) {
		auxiliaryId = data.getAuxiliaryId();
		address = data.getAddress();
		lattitude = data.getLattitude();
		city = data.getCity();
		lastUpdateDate = TimeHelper.toIntegers(data.getLastUpdateDate());
		postalCode = data.getPostalCode();
		id = data.getId();
		type = data.getType();
		radius = data.getRadius();
		creationDate = TimeHelper.toIntegers(data.getCreationDate());
		longitude = data.getLongitude();
	}

	public GeozoneData toData() {
		GeozoneData data = new GeozoneData();
		fillData(data);
		return data;
	}

	public void fillData(GeozoneData data) {
		data.setAuxiliaryId(auxiliaryId);
		data.setAddress(address);
		data.setLattitude(lattitude);
		data.setCity(city);
		data.setPostalCode(postalCode);
		data.setType(type);
		data.setRadius(radius);
		data.setLongitude(longitude);
	}

	public void check() throws APWebException {
		List<APWebError> errors = new ArrayList<APWebError>();
		ValidationState addressState = GeozoneFields.ADDRESS.getValidator().check(address);
		if (!addressState.getState().equals(EValidatorState.SUCCESS)) {
			errors.add(new APWebError("AP_GEOZONE_INVALID_FIELDS", "Invalid field 'address'"));
		}
		ValidationState lattitudeState = GeozoneFields.LATTITUDE.getValidator().check(lattitude);
		if (!lattitudeState.getState().equals(EValidatorState.SUCCESS)) {
			errors.add(new APWebError("AP_GEOZONE_INVALID_FIELDS", "Invalid field 'lattitude'"));
		}
		ValidationState cityState = GeozoneFields.CITY.getValidator().check(city);
		if (!cityState.getState().equals(EValidatorState.SUCCESS)) {
			errors.add(new APWebError("AP_GEOZONE_INVALID_FIELDS", "Invalid field 'city'"));
		}
		ValidationState postalCodeState = GeozoneFields.POSTAL_CODE.getValidator().check(postalCode);
		if (!postalCodeState.getState().equals(EValidatorState.SUCCESS)) {
			errors.add(new APWebError("AP_GEOZONE_INVALID_FIELDS", "Invalid field 'postalCode'"));
		}
		ValidationState typeState = GeozoneFields.TYPE.getValidator().check(type);
		if (!typeState.getState().equals(EValidatorState.SUCCESS)) {
			errors.add(new APWebError("AP_GEOZONE_INVALID_FIELDS", "Invalid field 'type'"));
		}
		ValidationState radiusState = GeozoneFields.RADIUS.getValidator().check(radius);
		if (!radiusState.getState().equals(EValidatorState.SUCCESS)) {
			errors.add(new APWebError("AP_GEOZONE_INVALID_FIELDS", "Invalid field 'radius'"));
		}
		ValidationState longitudeState = GeozoneFields.LONGITUDE.getValidator().check(longitude);
		if (!longitudeState.getState().equals(EValidatorState.SUCCESS)) {
			errors.add(new APWebError("AP_GEOZONE_INVALID_FIELDS", "Invalid field 'longitude'"));
		}
		if (errors.size() > 0) {
			throw new APWebException("AP_GEOZONE_INVALID_FIELDS", "Invalid fields within 'geozone'", errors, Status.BAD_REQUEST);
		}
	}

}
