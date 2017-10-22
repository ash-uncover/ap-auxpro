package org.ap.auxpro.helpers;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.core.SecurityContext;

import org.ap.auxpro.bean.ServiceBean;
import org.ap.auxpro.storage.ServiceCollection;
import org.ap.auxpro.storage.ServiceData;
import org.ap.auxpro.storage.ServiceFields;
import org.ap.common.validators.IValidator;
import org.ap.web.internal.APWebException;
import org.bson.Document;

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

	public static Object getValidServices(SecurityContext sc) throws APWebException {
		Document doc = new Document().append("profilCompleted", true);
		List<ServiceData> datas = ServiceCollection.get(doc);
		List<ServiceBean> beanList = new ArrayList<ServiceBean>();
		for (ServiceData data : datas) {
			ServiceBean bean = new ServiceBean();
			bean.country = data.getCountry();
			bean.address = data.getAddress();
			bean.city = data.getCity();
			bean.lattitude = data.getLattitude();
			bean.lastUpdateDate = data.getLastUpdateDate();
			bean.accountType = data.getAccountType();
			bean.postalCode = data.getPostalCode();
			bean.isTutoSkipped = data.getIsTutoSkipped();
			bean.notifyPartners = data.getNotifyPartners();
			bean.avatar = data.getAvatar();
			bean.accountExpiryDate = data.getAccountExpiryDate();
			bean.creationDate = data.getCreationDate();
			bean.siret = data.getSiret();
			bean.notifyAuxpros = data.getNotifyAuxpros();
			bean.phone = data.getPhone();
			bean.phoneChecked = data.getPhoneChecked();
			bean.function = data.getFunction();
			bean.profilCompleted = data.getProfilCompleted();
			bean.addressChecked = data.getAddressChecked();
			bean.id = data.getId();
			bean.socialReason = data.getSocialReason();
			bean.longitude = data.getLongitude();
			
			beanList.add(bean);
		}
		return beanList.toArray(new ServiceBean[beanList.size()]);
	}

}
