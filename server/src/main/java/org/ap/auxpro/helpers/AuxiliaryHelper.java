package org.ap.auxpro.helpers;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;

import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.SecurityContext;

import org.ap.auxpro.bean.AuxiliaryPutBean;
import org.ap.auxpro.bean.AuxiliaryQuestionaryBean;
import org.ap.auxpro.bean.PromotionCodePostBean;
import org.ap.auxpro.storage.auxiliary.AuxiliaryCollection;
import org.ap.auxpro.storage.auxiliary.AuxiliaryData;
import org.ap.auxpro.storage.auxiliary.AuxiliaryFields;
import org.ap.auxpro.storage.promotioncode.PromotioncodeCollection;
import org.ap.auxpro.storage.promotioncode.PromotioncodeData;
import org.ap.common.TimeHelper;
import org.ap.common.validators.IValidator;
import org.ap.web.internal.APWebException;

public class AuxiliaryHelper {

	@SuppressWarnings("unchecked")
	public static void beforePutAuxiliary(SecurityContext sc, String id, AuxiliaryPutBean auxiliaryBean) throws APWebException {
		if (!sc.isUserInRole(id)) {
			throw new APWebException("forbidden", Status.FORBIDDEN);
		}
		AuxiliaryData data = AuxiliaryCollection.getById(id);
		// Check profil progress & completion
		boolean profilCompleted = true;
		int profilProgress = 0;
		// Check skills (total: 30)
		if (data.getAreSkillSet() != null && data.getAreSkillSet()) {
			profilProgress += 30;
		}
		// Check avatar (total: 40)
		if (auxiliaryBean.avatar != null) {
			profilProgress += 10;
		}
		// Check civil info (total: 50)
		if (
			((IValidator<String>)AuxiliaryFields.CIVILITY.getValidator()).getState(auxiliaryBean.civility) &&
			((IValidator<String>)AuxiliaryFields.LAST_NAME.getValidator()).getState(auxiliaryBean.lastName) &&
			((IValidator<String>)AuxiliaryFields.FIRST_NAME.getValidator()).getState(auxiliaryBean.firstName)
		) {
			profilProgress += 10;
		} else {
			profilCompleted = false;
		}
		// Check birth info (total: 60)
		if (
			((IValidator<String>)AuxiliaryFields.NATIONALITY.getValidator()).getState(auxiliaryBean.nationality) &&
			((IValidator<LocalDate>)AuxiliaryFields.BIRTH_DATE.getValidator()).getState(TimeHelper.toLocalDate(auxiliaryBean.birthDate)) &&
			((IValidator<String>)AuxiliaryFields.BIRTH_CITY.getValidator()).getState(auxiliaryBean.birthCity) &&
			((IValidator<String>)AuxiliaryFields.BIRTH_COUNTRY.getValidator()).getState(auxiliaryBean.birthCountry)
		) {
			profilProgress += 10;
		} else {
			profilCompleted = false;
		}
		// Check address info (total: 70)
		if (
			((IValidator<String>)AuxiliaryFields.ADDRESS.getValidator()).getState(auxiliaryBean.address) &&
			((IValidator<String>)AuxiliaryFields.POSTAL_CODE.getValidator()).getState(auxiliaryBean.postalCode) &&
			((IValidator<String>)AuxiliaryFields.CITY.getValidator()).getState(auxiliaryBean.city) &&
			((IValidator<String>)AuxiliaryFields.COUNTRY.getValidator()).getState(auxiliaryBean.country)
		) {
			profilProgress += 10;
		} else {
			profilCompleted = false;
		}
		// Check contact info (total: 80)
		if (
			((IValidator<String>)AuxiliaryFields.PHONE.getValidator()).getState(auxiliaryBean.phone)
		) {
			profilProgress += 10;
		} else {
			profilCompleted = false;
		}
		// Check profesionnal info (total: 90)
		if (
			((IValidator<String>)AuxiliaryFields.DESCRIPTION.getValidator()).getState(auxiliaryBean.description) &&
			((IValidator<String>)AuxiliaryFields.IS_ENTREPRENEUR.getValidator()).getState(auxiliaryBean.isEntrepreneur) &&
			((IValidator<Object[]>)AuxiliaryFields.DIPLOMA.getValidator()).getState(auxiliaryBean.diploma.toArray())
		) {
			profilProgress += 10;
		}
		// Check secret info (total: 100)
		if (
			((IValidator<String>)AuxiliaryFields.ID_CARD_NUMBER.getValidator()).getState(auxiliaryBean.idCardNumber) &&
			((IValidator<String>)AuxiliaryFields.SOCIAL_NUMBER.getValidator()).getState(auxiliaryBean.socialNumber)
		) {
			profilProgress += 10;
		}
		
		if (Boolean.TRUE.equals(data.getProfilCompleted()) && !profilCompleted) {
			throw new APWebException("Invalid data", Status.BAD_REQUEST);
		}

		data.setProfilProgression(profilProgress);
		data.setProfilCompleted(profilCompleted);
		AuxiliaryCollection.update(data);
	}

	public static Object postAuxiliaryQuestionary(SecurityContext sc, String id, AuxiliaryQuestionaryBean bean) throws APWebException {
		AuxiliaryData data = AuxiliaryCollection.getById(id);
		if (Boolean.TRUE.equals(data.getAreSkillSet())) {
			throw new APWebException("Questionary already filled", Status.BAD_REQUEST);
		}
		int ch = 0;
		int ho = 0;
		int co = 0;
		int sh = 0;
		int nu = 0;
		int ad = 0; 
		int di = 0;
		boolean isComplete = true;
		for (EQuestion q : EQuestion.values()) {
			Integer answer = bean.skillAnswers.get(q.getIndex());
			if (answer == null) {
				isComplete = false;
			} else {
				ch += q.getAnswers()[answer].getChildhood();
				ho += q.getAnswers()[answer].getHousework();
				co += q.getAnswers()[answer].getCompagny();
				sh += q.getAnswers()[answer].getShopping();
				nu += q.getAnswers()[answer].getNursing();
				ad += q.getAnswers()[answer].getAdministrative();
				di += q.getAnswers()[answer].getDoityourself();
			}
		}
		if (isComplete) {
			data.setAreSkillSet(true);
			data.setProfilProgression(data.getProfilProgression() + 30);
			data.setSkillChildhood(computeScore(ch));
			data.setSkillHousework(computeScore(ho));
			data.setSkillCompagny(computeScore(co));
			data.setSkillShopping(computeScore(sh));
			data.setSkillNursing(computeScore(nu));
			data.setSkillAdministrative(computeScore(ad));
			data.setSkillDoityourself(computeScore(di));
		}
		data.setSkillAnswers(bean.skillAnswers);
		AuxiliaryCollection.update(data);
		return null;
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
