package org.ap.auxpro.helpers;

import static com.mongodb.client.model.Filters.eq;

import java.lang.reflect.Field;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.SecurityContext;

import org.ap.auxpro.bean.AuxiliaryPutBean;
import org.ap.auxpro.bean.PromotionCodePostBean;
import org.ap.auxpro.constants.EAuxiliaryDiploma;
import org.ap.auxpro.constants.EAuxiliarySkills;
import org.ap.auxpro.constants.EGeozoneType;
import org.ap.auxpro.storage.auxiliary.AuxiliaryCollection;
import org.ap.auxpro.storage.auxiliary.AuxiliaryData;
import org.ap.auxpro.storage.auxiliary.AuxiliaryFields;
import org.ap.auxpro.storage.geozone.GeozoneCollection;
import org.ap.auxpro.storage.geozone.GeozoneData;
import org.ap.auxpro.storage.promotioncode.PromotioncodeCollection;
import org.ap.auxpro.storage.promotioncode.PromotioncodeData;
import org.ap.common.time.TimeHelper;
import org.ap.common.util.UUIDGenerator;
import org.ap.common.validators.EValidatorState;
import org.ap.common.web.exception.APWebException;
public class AuxiliaryHelper {

	public static void getDiplomas(AuxiliaryPutBean auxiliaryBean) {
		List<String> checkedList = new ArrayList<String>();
		checkedList.add(EAuxiliaryDiploma._NO_DIPLOMA.getName());
		if (auxiliaryBean.diploma == null) {
			auxiliaryBean.diploma = new ArrayList<String>();
		}
		for (String diploma : auxiliaryBean.diploma) {
			if (!checkedList.contains(diploma)) {
				checkedList.add(diploma);
			}
		}
		if (checkedList.size() > 1 && checkedList.contains(EAuxiliaryDiploma._NO_DIPLOMA.getName())) {
			checkedList.remove(EAuxiliaryDiploma._NO_DIPLOMA.getName());
		}
		auxiliaryBean.diploma = checkedList;
	}

	public static void checkSkills(AuxiliaryPutBean auxiliaryBean) {
		int defaultSkillValue = 0;
		Set<EAuxiliaryDiploma> diplomas = new HashSet<EAuxiliaryDiploma>();
		diplomas.add(EAuxiliaryDiploma._NO_DIPLOMA);
		for (String diplomaName : auxiliaryBean.diploma) {
			diplomas.add(EAuxiliaryDiploma.getByName(diplomaName));
		}
		diplomas.add(EAuxiliaryDiploma._NO_DIPLOMA);
		Set<EAuxiliarySkills> skillsAvailable = DiplomaHelper.getDiplomaSkills(diplomas);

		for (EAuxiliarySkills skill: EAuxiliarySkills.values()) {
			try {
				Field field = AuxiliaryPutBean.class.getField(skill.getName());
				Integer value = (Integer)field.get(auxiliaryBean);
				if (value == null) {
					value = 0;
				}
				if (value < 0) value = 0;
				if (value > 5) value = 5;
				if (!skillsAvailable.contains(skill)) {
					value = defaultSkillValue;
				}
				field.set(auxiliaryBean, value);
			} catch (Exception e) {
				System.err.println("Error while setting auxiliary skill: " + skill);
			}
		}
	}

	public static void beforePutAuxiliary(SecurityContext sc, String id, AuxiliaryPutBean auxiliaryBean) throws APWebException {
		if (!sc.isUserInRole(id)) {
			throw new APWebException("forbidden", Status.FORBIDDEN);
		}
		AuxiliaryData data = AuxiliaryCollection.getById(id);
		// Check profil progress & completion
		boolean profilCompleted = true;
		int profilProgress = 0;
		// Check skills (total: 30)
		AuxiliaryHelper.getDiplomas(auxiliaryBean);
		AuxiliaryHelper.checkSkills(auxiliaryBean);
		// Check avatar (total: 40)
		if (auxiliaryBean.avatar != null) {
			profilProgress += 10;
		}
		// Check civil info (total: 50)
		if (
				AuxiliaryFields.CIVILITY.getValidator().check(auxiliaryBean.civility).getState().equals(EValidatorState.SUCCESS) &&
				AuxiliaryFields.LAST_NAME.getValidator().check(auxiliaryBean.lastName).getState().equals(EValidatorState.SUCCESS) &&
				AuxiliaryFields.FIRST_NAME.getValidator().check(auxiliaryBean.firstName).getState().equals(EValidatorState.SUCCESS)
				) {
			profilProgress += 10;
		} else {
			profilCompleted = false;
		}
		// Check birth info (total: 60)
		if (
				AuxiliaryFields.NATIONALITY.getValidator().check(auxiliaryBean.nationality).getState().equals(EValidatorState.SUCCESS) &&
				AuxiliaryFields.BIRTH_DATE.getValidator().check(TimeHelper.toLocalDate(auxiliaryBean.birthDate)).getState().equals(EValidatorState.SUCCESS) &&
				AuxiliaryFields.BIRTH_CITY.getValidator().check(auxiliaryBean.birthCity).getState().equals(EValidatorState.SUCCESS) &&
				AuxiliaryFields.BIRTH_COUNTRY.getValidator().check(auxiliaryBean.birthCountry).getState().equals(EValidatorState.SUCCESS)
				) {
			profilProgress += 10;
		} else {
			profilCompleted = false;
		}
		// Check address info (total: 70)
		if (
				AuxiliaryFields.ADDRESS.getValidator().check(auxiliaryBean.address).getState().equals(EValidatorState.SUCCESS) &&
				AuxiliaryFields.POSTAL_CODE.getValidator().check(auxiliaryBean.postalCode).getState().equals(EValidatorState.SUCCESS) &&
				AuxiliaryFields.CITY.getValidator().check(auxiliaryBean.city).getState().equals(EValidatorState.SUCCESS) &&
				AuxiliaryFields.COUNTRY.getValidator().check(auxiliaryBean.country).getState().equals(EValidatorState.SUCCESS)
				) {
			profilProgress += 10;
		} else {
			profilCompleted = false;
		}
		// Check contact info (total: 80)
		if (
				AuxiliaryFields.PHONE.getValidator().check(auxiliaryBean.phone).getState().equals(EValidatorState.SUCCESS)
				) {
			profilProgress += 10;
		} else {
			profilCompleted = false;
		}
		// Check profesionnal info (total: 90)
		if (
				AuxiliaryFields.DESCRIPTION.getValidator().check(auxiliaryBean.description).getState().equals(EValidatorState.SUCCESS) &&
				AuxiliaryFields.IS_ENTREPRENEUR.getValidator().check(auxiliaryBean.isEntrepreneur).getState().equals(EValidatorState.SUCCESS) &&
				AuxiliaryFields.DIPLOMA.getValidator().check(auxiliaryBean.diploma.toArray()).getState().equals(EValidatorState.SUCCESS)
				) {
			profilProgress += 10;
		}
		// Check secret info (total: 100)
		if (
				AuxiliaryFields.SOCIAL_NUMBER.getValidator().check(auxiliaryBean.socialNumber).getState().equals(EValidatorState.SUCCESS)
				) {
			profilProgress += 10;
		}

		if (Boolean.TRUE.equals(data.getProfilCompleted()) && !profilCompleted) {
			throw new APWebException("Invalid data", Status.BAD_REQUEST);
		}

		if (profilCompleted && GeozoneCollection.get(eq("auxiliaryId", data.getId())).size() == 0) {
			GeozoneData geozone = new GeozoneData();
			geozone.setId(UUIDGenerator.nextId());
			geozone.setCreationDate(new Date());
			geozone.setLastUpdateDate(new Date());			
			geozone.setAuxiliaryId(data.getId());
			geozone.setAddress(auxiliaryBean.address);
			geozone.setCity(auxiliaryBean.city);
			geozone.setLattitude(auxiliaryBean.lattitude);
			geozone.setLongitude(auxiliaryBean.longitude);
			geozone.setPostalCode(auxiliaryBean.postalCode);
			geozone.setRadius(2000);
			geozone.setType(EGeozoneType._AREA.getName());			
			GeozoneCollection.create(geozone);			
		}

		data.setProfilProgression(profilProgress);
		data.setProfilCompleted(profilCompleted);
		AuxiliaryCollection.update(data);
	}

	public static int computeScore(int baseScore) {
		return Math.min(5, Math.round(baseScore / 5));
	}

	public static Object postPromotionCode(SecurityContext sc, String id, PromotionCodePostBean promotionCodePostBean) throws APWebException {
		PromotioncodeData codeData = PromotioncodeCollection.getByName(promotionCodePostBean.name);
		if (codeData == null) {
			throw new APWebException("bad code", Status.BAD_REQUEST);
		}
		AuxiliaryData auxiliaryData = AuxiliaryCollection.getById(id);
		Date codeDate = codeData.getValidityDate();
		LocalDate codeLocalDate = codeDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
		LocalDate currentLocalDate = null;
		if (auxiliaryData.getAccountExpiryDate() != null) {
			Date currentDate = auxiliaryData.getAccountExpiryDate();
			currentLocalDate = currentDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
		}

		if (currentLocalDate == null || codeLocalDate.isAfter(currentLocalDate)) {
			auxiliaryData.setAccountExpiryDate(codeDate);
			auxiliaryData.setAccountType("Premium");
			AuxiliaryCollection.update(auxiliaryData);
		} else {
			throw new APWebException("code already given", Status.BAD_REQUEST);
		}
		return null;
	}
}
