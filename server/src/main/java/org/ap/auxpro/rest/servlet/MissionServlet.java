package org.ap.auxpro.rest.servlet;

import javax.ws.rs.*;
import javax.ws.rs.core.*;
import javax.ws.rs.core.Response.*;
import org.ap.common.web.servlet.APServletBase;
import org.ap.auxpro.bean.MissionBean;
import org.ap.auxpro.storage.mission.MissionData;
import org.ap.auxpro.storage.mission.MissionCollection;
import org.ap.common.exception.APWebException;
import javax.annotation.security.RolesAllowed;
import java.util.Date;
import org.ap.common.time.TimeHelper;

/* This class was auto-generated by the JavaWriter */
@Path("/missions")
public class MissionServlet extends APServletBase {

	public static final String PATH = "/missions";

	@GET
	@Path("/{id}")
	@Produces({MediaType.APPLICATION_JSON})
	@RolesAllowed("apauth")
	public Response getMission(@Context SecurityContext sc, @PathParam("id") final String id) {
		try {
			MissionData data = MissionCollection.getById(id);
			if (data == null) {
				return Response.status(Status.NOT_FOUND).build();
			}
			MissionBean bean = new MissionBean(data);
			return Response.status(Status.OK).entity(bean).build();
			
		} catch (APWebException e) {
			return sendException(e);
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@PUT
	@Path("/{id}")
	@Consumes({MediaType.APPLICATION_JSON})
	@RolesAllowed("apauth")
	public Response putMission(@Context SecurityContext sc, @PathParam("id") final String id, MissionBean missionBean) {
		try {
			// Get actual data object
			MissionData data = MissionCollection.getById(id);
			// Check data exists
			if (data == null) {
				throw new APWebException("mission not found", "AP_MISSION_NOTFOUND", Status.BAD_REQUEST);
			}
			// Update the data object
			data.setLastUpdateDate(new Date());
			data.setAuxiliaryId(missionBean.auxiliaryId);
			data.setCustomerId(missionBean.customerId);
			data.setServiceId(missionBean.serviceId);
			data.setInterventionId(missionBean.interventionId);
			data.setDate(TimeHelper.toDate(missionBean.date));
			data.setAuxStatus(missionBean.auxStatus);
			data.setAuxStatusChanged(TimeHelper.toDate(missionBean.auxStatusChanged));
			data.setHideToAux(missionBean.hideToAux);
			data.setSadStatus(missionBean.sadStatus);
			data.setSadStatusChanged(TimeHelper.toDate(missionBean.sadStatusChanged));
			data.setHideToSad(missionBean.hideToSad);
			// Store the updated data object
			MissionCollection.updateNull(data);
			// Send the response
			return Response.status(Status.OK).build();
			
		} catch (APWebException e) {
			return sendException(e);
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@DELETE
	@Path("/{id}")
	@RolesAllowed("apauth")
	public Response deleteMission(@Context SecurityContext sc, @PathParam("id") final String id) {
		try {
			// Try to delete the entity
			if (!MissionCollection.deleteById(id)) {
				throw new APWebException("mission not found", "AP_MISSION_NOTFOUND", Status.BAD_REQUEST);
			}
			// Send the response
			return Response.status(Status.OK).build();
			
		} catch (APWebException e) {
			return sendException(e);
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

}
