package org.ap.auxpro.helpers;

import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.SecurityContext;

import org.ap.auxpro.bean.GeozoneBean;
import org.ap.auxpro.storage.geozone.GeozoneCollection;
import org.ap.auxpro.storage.geozone.GeozoneData;
import org.ap.common.web.exception.APWebException;

public class GeozoneHelper {

	/* SERVLET HELPERS */
	
	public static void beforePutGeozone(SecurityContext sc, String id, GeozoneBean geozoneBean) throws APWebException {
		checkOwnership(sc, id);
	}
	
	public static void beforeDeleteGeozone(SecurityContext sc, String id) throws APWebException {
		checkOwnership(sc, id);
	}
	
	/* INTERNAL METHODS */
	
	public static void checkOwnership(SecurityContext sc, String id) throws APWebException {
		GeozoneData data = GeozoneCollection.getById(id);
		if (!sc.isUserInRole(data.getAuxiliaryId())) {
			throw new APWebException("forbidden", Status.FORBIDDEN);
		}
	}
}
