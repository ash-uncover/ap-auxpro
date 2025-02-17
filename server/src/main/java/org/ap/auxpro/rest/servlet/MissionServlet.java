package org.ap.auxpro.rest.servlet;

import javax.ws.rs.*;
import javax.ws.rs.core.*;
import javax.ws.rs.core.Response.*;
import org.ap.common.web.servlet.APServletBase;
import io.swagger.annotations.Api;
import org.ap.auxpro.bean.MissionBean;
import io.swagger.annotations.ApiOperation;
import org.ap.auxpro.storage.mission.MissionData;
import org.ap.auxpro.storage.mission.MissionCollection;
import org.ap.common.web.exception.APWebException;
import org.ap.common.web.auth.APSecured;
import javax.annotation.security.RolesAllowed;
import java.util.Date;

/* This class was auto-generated by the JavaWriter */
@Path("/missions")
@Api(value="missions")
public class MissionServlet extends APServletBase {

	public static final String PATH = "/missions";

	@GET
	@Path("/{id}")
	@APSecured
	@Produces({MediaType.APPLICATION_JSON})
	@ApiOperation(value="Find missions by id",response=MissionBean.class)
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
	@APSecured
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
			missionBean.fillData(data);
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
	@APSecured
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
