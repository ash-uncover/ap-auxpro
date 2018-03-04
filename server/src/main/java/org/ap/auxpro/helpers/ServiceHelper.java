package org.ap.auxpro.helpers;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;

import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.SecurityContext;

import org.ap.auxpro.bean.PromotionCodePostBean;
import org.ap.auxpro.bean.ServicePutBean;
import org.ap.auxpro.storage.promotioncode.PromotioncodeCollection;
import org.ap.auxpro.storage.promotioncode.PromotioncodeData;
import org.ap.auxpro.storage.service.ServiceCollection;
import org.ap.auxpro.storage.service.ServiceData;
import org.ap.auxpro.storage.service.ServiceFields;
import org.ap.common.exception.APWebException;

public class ServiceHelper {

	public static void beforePutService(SecurityContext sc, String id, ServicePutBean serviceBean) throws APWebException {
		ServiceData data = ServiceCollection.getById(id);
		// Check profil completion
		boolean profilCompleted = true;
		if (!ServiceFields.ADDRESS.getValidator().getState(serviceBean.address)) {
			profilCompleted = false;
		}
		if (!ServiceFields.POSTAL_CODE.getValidator().getState(serviceBean.postalCode)) {
			profilCompleted = false;
		}
		if (!ServiceFields.CITY.getValidator().getState(serviceBean.city)) {
			profilCompleted = false;
		}
		if (!ServiceFields.COUNTRY.getValidator().getState(serviceBean.country)) {
			profilCompleted = false;
		}
		if (!ServiceFields.PHONE.getValidator().getState(serviceBean.phone)) {
			profilCompleted = false;
		}
		if (!ServiceFields.SOCIAL_REASON.getValidator().getState(serviceBean.socialReason)) {
			profilCompleted = false;
		}
		if (!ServiceFields.SIRET.getValidator().getState(serviceBean.siret)) {
			profilCompleted = false;
		}
		if (!ServiceFields.FUNCTION.getValidator().getState(serviceBean.function)) {
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
		Date codeDate = codeData.getValidityDate();
		LocalDate codeLocalDate = codeDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
		LocalDate currentLocalDate = null;
		Date currentDate = null;
		if (serviceData.getAccountExpiryDate() != null) {
			currentDate = serviceData.getAccountExpiryDate();
			currentLocalDate = currentDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
		}
		
		if (currentLocalDate == null || codeLocalDate.isAfter(currentLocalDate)) {
			serviceData.setAccountExpiryDate(codeDate);
			serviceData.setAccountType("Premium");
			ServiceCollection.update(serviceData);
		} else {
			throw new APWebException("code already given", Status.BAD_REQUEST);
		}
		return null;
	}

}
