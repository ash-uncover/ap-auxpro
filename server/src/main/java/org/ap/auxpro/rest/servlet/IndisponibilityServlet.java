package org.ap.auxpro.rest.servlet;

import javax.ws.rs.*;
import javax.ws.rs.core.*;
import javax.ws.rs.core.Response.*;
import org.ap.common.web.servlet.APServletBase;
import org.ap.auxpro.bean.IndisponibilityBean;
import org.ap.auxpro.storage.indisponibility.IndisponibilityData;
import org.ap.auxpro.storage.indisponibility.IndisponibilityCollection;
import org.ap.common.exception.APWebException;
import org.ap.common.util.UUIDGenerator;
import java.util.Date;
import org.ap.common.time.TimeHelper;
import com.mongodb.MongoWriteException;

/* This class was auto-generated by the JavaWriter */
@Path("/indisponibilitys")
public class IndisponibilityServlet extends APServletBase {

	public static final String PATH = "/indisponibilitys";

	@POST
	@Consumes({MediaType.APPLICATION_JSON})
	@Produces({MediaType.APPLICATION_JSON})
	public Response postIndisponibility(@Context SecurityContext sc, IndisponibilityBean indisponibilityBean) {
		try {
			IndisponibilityData data = new IndisponibilityData();
			data.setId(UUIDGenerator.nextId());
			data.setCreationDate(new Date());
			data.setLastUpdateDate(new Date());
			data.setAuxiliaryId(indisponibilityBean.auxiliaryId);
			data.setPeriod(indisponibilityBean.period);
			data.setEndDate(TimeHelper.toDate(indisponibilityBean.endDate));
			data.setDays(indisponibilityBean.days);
			data.setStartTime(indisponibilityBean.startTime);
			data.setEndTime(indisponibilityBean.endTime);
			data.setStartDate(TimeHelper.toDate(indisponibilityBean.startDate));
			IndisponibilityCollection.create(data);
			return Response.status(Status.CREATED).entity("{\"id\": \"" + data.id + "\"}").build();
			
		} catch (MongoWriteException e) {
			return Response.status(Status.FORBIDDEN).build();
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@GET
	@Path("/{id}")
	@Produces({MediaType.APPLICATION_JSON})
	public Response getIndisponibility(@Context SecurityContext sc, @PathParam("id") final String id) {
		try {
			IndisponibilityData data = IndisponibilityCollection.getById(id);
			if(data == null) {
				return Response.status(Status.NOT_FOUND).build();
			}
			IndisponibilityBean bean = new IndisponibilityBean();
			bean.auxiliaryId = data.getAuxiliaryId();
			bean.period = data.getPeriod();
			bean.endDate = TimeHelper.toIntegers(data.getEndDate());
			bean.lastUpdateDate = TimeHelper.toIntegers(data.getLastUpdateDate());
			bean.days = data.getDays();
			bean.startTime = data.getStartTime();
			bean.endTime = data.getEndTime();
			bean.id = data.getId();
			bean.creationDate = TimeHelper.toIntegers(data.getCreationDate());
			bean.startDate = TimeHelper.toIntegers(data.getStartDate());
			
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
	public Response putIndisponibility(@Context SecurityContext sc, @PathParam("id") final String id, IndisponibilityBean indisponibilityBean) {
		try {
			// Get actual data object
			IndisponibilityData data = IndisponibilityCollection.getById(id);
			// Check data exists
			if (data == null) {
				throw new APWebException("indisponibility not found", "AP_INDISPONIBILITY_NOTFOUND", Status.BAD_REQUEST);
			}
			// Update the data object
			data.setLastUpdateDate(new Date());
			data.setAuxiliaryId(indisponibilityBean.auxiliaryId);
			data.setPeriod(indisponibilityBean.period);
			data.setEndDate(TimeHelper.toDate(indisponibilityBean.endDate));
			data.setDays(indisponibilityBean.days);
			data.setStartTime(indisponibilityBean.startTime);
			data.setEndTime(indisponibilityBean.endTime);
			data.setStartDate(TimeHelper.toDate(indisponibilityBean.startDate));
			// Store the updated data object
			IndisponibilityCollection.updateNull(data);
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
	public Response deleteIndisponibility(@Context SecurityContext sc, @PathParam("id") final String id) {
		try {
			// Try to delete the entity
			if (!IndisponibilityCollection.deleteById(id)) {
				throw new APWebException("indisponibility not found", "AP_INDISPONIBILITY_NOTFOUND", Status.BAD_REQUEST);
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
