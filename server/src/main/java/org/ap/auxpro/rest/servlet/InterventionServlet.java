package org.ap.auxpro.rest.servlet;

import javax.ws.rs.*;
import javax.ws.rs.core.*;
import javax.ws.rs.core.Response.*;
import org.ap.web.rest.servlet.APServletBase;
import org.ap.auxpro.bean.InterventionPostBean;
import org.ap.auxpro.storage.InterventionData;
import org.ap.auxpro.storage.InterventionCollection;
import org.ap.web.internal.APWebException;
import org.ap.web.internal.UUIDGenerator;
import com.mongodb.MongoWriteException;
import org.ap.common.TimeHelper;
import javax.annotation.security.RolesAllowed;
import org.ap.auxpro.helpers.InterventionHelper;
import org.ap.auxpro.bean.InterventionBean;
import org.ap.auxpro.bean.InterventionPutBean;
import java.util.List;
import java.util.ArrayList;
import org.ap.auxpro.bean.InterventionEmptyBean;

/* This class was auto-generated by the JavaWriter */
@Path("/interventions")
public class InterventionServlet extends APServletBase {

	public static final String PATH = "/interventions";

	@POST
	@Consumes({MediaType.APPLICATION_JSON})
	@Produces({MediaType.APPLICATION_JSON})
	@RolesAllowed("service")
	public Response postIntervention(@Context SecurityContext sc, InterventionPostBean interventionPostBean) {
		try {
			Object bean = InterventionHelper.createIntervention(sc, interventionPostBean);
			return Response.status(Status.OK).entity(bean).build();
			
		} catch (APWebException e) {
			return sendException(e);
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@GET
	@Path("/{id}")
	@Produces({MediaType.APPLICATION_JSON})
	@RolesAllowed("apauth")
	public Response getIntervention(@Context SecurityContext sc, @PathParam("id") final String id) {
		try {
			InterventionData data = InterventionCollection.getById(id);
			if(data == null) {
				return Response.status(Status.NOT_FOUND).build();
			}
			InterventionBean bean = new InterventionBean();
			bean.period = data.getPeriod();
			bean.auxiliaryId = data.getAuxiliaryId();
			bean.endDate = data.getEndDate();
			bean.lastUpdateDate = data.getLastUpdateDate();
			bean.sadStatusChanged = data.getSadStatusChanged();
			bean.creationDate = data.getCreationDate();
			bean.customerId = data.getCustomerId();
			bean.sadStatus = data.getSadStatus();
			bean.days = data.getDays();
			bean.startTime = data.getStartTime();
			bean.endTime = data.getEndTime();
			bean.id = data.getId();
			bean.serviceId = data.getServiceId();
			bean.hideToSad = data.getHideToSad();
			bean.startDate = data.getStartDate();
			
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
	@RolesAllowed("service")
	public Response putIntervention(@Context SecurityContext sc, @PathParam("id") final String id, InterventionPutBean interventionPutBean) {
		try {
			// Get actual data object
			InterventionData data = InterventionCollection.getById(id);
			// Check data exists
			if (data == null) {
				throw new APWebException("intervention not found", "AP_INTERVENTION_NOTFOUND", Status.BAD_REQUEST);
			}
			// Update the data object
			data.setLastUpdateDate(TimeHelper.nowDateTimeIntegers());
			data.setPeriod(interventionPutBean.period);
			data.setEndDate(interventionPutBean.endDate);
			data.setCustomerId(interventionPutBean.customerId);
			data.setDays(interventionPutBean.days);
			data.setStartTime(interventionPutBean.startTime);
			data.setEndTime(interventionPutBean.endTime);
			data.setServiceId(interventionPutBean.serviceId);
			data.setHideToSad(interventionPutBean.hideToSad);
			data.setStartDate(interventionPutBean.startDate);
			// Store the updated data object
			InterventionCollection.updateNull(data);
			// Send the response
			return Response.status(Status.OK).build();
			
		} catch (APWebException e) {
			return sendException(e);
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@GET
	@Path("/{id}/match")
	@Produces({MediaType.APPLICATION_JSON})
	@RolesAllowed("service")
	public Response getInterventionMatchs(@Context SecurityContext sc, @PathParam("id") final String id) {
		try {
			Object bean = InterventionHelper.getInterventionMatch(sc, id);
			return Response.status(Status.OK).entity(bean).build();
			
		} catch (APWebException e) {
			return sendException(e);
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@PUT
	@Path("/{id}/cancel")
	@Consumes({MediaType.APPLICATION_JSON})
	@RolesAllowed("service")
	public Response putInterventionCancels(@Context SecurityContext sc, @PathParam("id") final String id, InterventionEmptyBean interventionEmptyBean) {
		try {
			Object bean = InterventionHelper.putInterventionCancel(sc, id, interventionEmptyBean);
			return Response.status(Status.OK).entity(bean).build();
			
		} catch (APWebException e) {
			return sendException(e);
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

}
