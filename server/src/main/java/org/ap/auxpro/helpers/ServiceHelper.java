package org.ap.auxpro.helpers;

import java.time.LocalDate;

import javax.ws.rs.core.SecurityContext;

import org.ap.auxpro.bean.ServiceBean;
import org.ap.auxpro.storage.ServiceFields;
import org.ap.common.TimeHelper;
import org.ap.common.validators.IValidator;

public class ServiceHelper {

	@SuppressWarnings("unchecked")
	public static void beforePutService(SecurityContext sc, String id, ServiceBean serviceBean) {
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

		// Update profil status
		serviceBean.profilCompleted = profilCompleted;
	}

}
