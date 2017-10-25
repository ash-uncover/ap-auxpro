package org.ap.auxpro.helpers;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.SecurityContext;

import org.ap.auxpro.bean.PromotionCodePostBean;
import org.ap.auxpro.bean.ServiceGetBean;
import org.ap.auxpro.bean.ServicePutBean;
import org.ap.auxpro.storage.PromotioncodeCollection;
import org.ap.auxpro.storage.PromotioncodeData;
import org.ap.auxpro.storage.ServiceCollection;
import org.ap.auxpro.storage.ServiceData;
import org.ap.auxpro.storage.ServiceFields;
import org.ap.common.TimeHelper;
import org.ap.common.validators.IValidator;
import org.ap.web.internal.APWebException;
import org.bson.Document;

public class ServiceHelper {

	@SuppressWarnings("unchecked")
	public static void beforePutService(SecurityContext sc, String id, ServicePutBean serviceBean) throws APWebException {
		ServiceData data = ServiceCollection.getById(id);
		// Check profil completion
		boolean profilCompleted = true;
		if (!((IValidator<String>)ServiceFields.ADDRESS.getValidator()).getState(serviceBean.address)) {
			profilCompleted = false;
		}
		if (!((IValidator<String>)ServiceFields.POSTAL_CODE.getValidator()).getState(serviceBean.postalCode)) {
			profilCompleted = false;
		}
		if (!((IValidator<String>)ServiceFields.CITY.getValidator()).getState(serviceBean.city)) {
			profilCompleted = false;
		}
		if (!((IValidator<String>)ServiceFields.COUNTRY.getValidator()).getState(serviceBean.country)) {
			profilCompleted = false;
		}
		if (!((IValidator<String>)ServiceFields.PHONE.getValidator()).getState(serviceBean.phone)) {
			profilCompleted = false;
		}
		if (!((IValidator<String>)ServiceFields.SOCIAL_REASON.getValidator()).getState(serviceBean.socialReason)) {
			profilCompleted = false;
		}
		if (!((IValidator<String>)ServiceFields.SIRET.getValidator()).getState(serviceBean.siret)) {
			profilCompleted = false;
		}
		if (!((IValidator<String>)ServiceFields.FUNCTION.getValidator()).getState(serviceBean.function)) {
			profilCompleted = false;
		}
		
		if (!profilCompleted && Boolean.TRUE.equals(data.getProfilCompleted())) {
			throw new APWebException("profil invalid", Status.BAD_REQUEST);
		}

		// Update profil status
		data.setProfilCompleted(profilCompleted);
		ServiceCollection.update(data);
	}
	
	public static Object postPromotionCode(SecurityContext sc, String id, PromotionCodePostBean promotionCodePostBean) throws APWebException {
		PromotioncodeData codeData = PromotioncodeCollection.getByName(promotionCodePostBean.name);
		if (codeData == null) {
			throw new APWebException("bad code", Status.BAD_REQUEST);
		}
		ServiceData serviceData = ServiceCollection.getById(id);
		LocalDate codeDate = TimeHelper.toLocalDate(codeData.getValidityDate());
		LocalDate currentDate = null;
		if (serviceData.getAccountExpiryDate() != null) {
			currentDate = TimeHelper.toLocalDate(serviceData.getAccountExpiryDate());
		}
		
		if (currentDate == null || codeDate.isAfter(currentDate)) {
			serviceData.setAccountExpiryDate(TimeHelper.toIntegers(codeDate));
			serviceData.setAccountType("Premium");
			ServiceCollection.update(serviceData);
		} else {
			throw new APWebException("code already given", Status.BAD_REQUEST);
		}
		return null;
	}

}
