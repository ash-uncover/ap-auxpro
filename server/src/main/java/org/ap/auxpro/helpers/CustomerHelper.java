package org.ap.auxpro.helpers;

import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.SecurityContext;

import org.ap.auxpro.bean.CustomerBean;
import org.ap.auxpro.storage.customer.CustomerCollection;
import org.ap.auxpro.storage.customer.CustomerData;
import org.ap.common.web.exception.APWebException;

public class CustomerHelper {

	/* SERVLET HELPERS */
	
	public static void beforePutCustomer(SecurityContext sc, String id, CustomerBean customerBean) throws APWebException {
		checkOwnership(sc, id);
	}
	
	public static void beforeDeleteCustomer(SecurityContext sc, String id) throws APWebException {
		checkOwnership(sc, id);
	}
	
	/* INTERNAL METHODS */
	
	public static void checkOwnership(SecurityContext sc, String id) throws APWebException {
		CustomerData data = CustomerCollection.getById(id);
		if (!sc.isUserInRole(data.getServiceId())) {
			throw new APWebException("forbidden", Status.FORBIDDEN);
		}
	}
}
