package org.ap.auxpro.rest.servlet;

import javax.ws.rs.*;
import javax.ws.rs.core.*;
import javax.ws.rs.core.Response.*;
import org.ap.web.rest.servlet.APServletBase;
import org.ap.auxpro.bean.OfferBean;
import org.ap.auxpro.storage.OfferData;
import org.ap.auxpro.storage.OfferCollection;
import org.ap.web.internal.APWebException;
import org.ap.web.internal.UUIDGenerator;
import com.mongodb.MongoWriteException;
import org.ap.common.TimeHelper;
import org.ap.auxpro.helpers.OfferHelper;

/* This class was auto-generated by the JavaWriter */
@Path("/offers")
public class OfferServlet extends APServletBase {

	public static final String PATH = "/offers";

	@POST
	@Consumes({MediaType.APPLICATION_JSON})
	public Response postOffer(@Context SecurityContext sc, OfferBean offerBean) {
		try {
			Object bean = OfferHelper.createOffer(sc, offerBean);
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
	public Response getOffer(@Context SecurityContext sc, @PathParam("id") final String id) {
		try {
			OfferData data = OfferCollection.getById(id);
			if(data == null) {
				return Response.status(Status.NOT_FOUND).build();
			}
			OfferBean bean = new OfferBean();
			bean.auxStatus = data.getAuxStatus();
			bean.auxStatusChanged = data.getAuxStatusChanged();
			bean.auxiliaryId = data.getAuxiliaryId();
			bean.hideToAux = data.getHideToAux();
			bean.lastUpdateDate = data.getLastUpdateDate();
			bean.sadStatusChanged = data.getSadStatusChanged();
			bean.creationDate = data.getCreationDate();
			bean.customerId = data.getCustomerId();
			bean.sadStatus = data.getSadStatus();
			bean.id = data.getId();
			bean.serviceId = data.getServiceId();
			bean.interventionId = data.getInterventionId();
			bean.hideToSad = data.getHideToSad();
			
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
	public Response putOffer(@Context SecurityContext sc, @PathParam("id") final String id, OfferBean offerBean) {
		try {
			Object bean = OfferHelper.putOffer(sc, id, offerBean);
			return Response.status(Status.OK).entity(bean).build();
			
		} catch (APWebException e) {
			return sendException(e);
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@DELETE
	@Path("/{id}")
	public Response deleteOffer(@Context SecurityContext sc, @PathParam("id") final String id) {
		try {
			// Try to delete the entity
			if (!OfferCollection.deleteById(id)) {
				throw new APWebException("offer not found", "AP_OFFER_NOTFOUND", Status.BAD_REQUEST);
			}
			// Send the response
			return Response.status(Status.OK).build();
			
		} catch (APWebException e) {
			return sendException(e);
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@PUT
	@Path("/{id}/accept")
	@Consumes({MediaType.APPLICATION_JSON})
	public Response putOfferAccepts(@Context SecurityContext sc, @PathParam("id") final String id, OfferBean offerBean) {
		try {
			Object bean = OfferHelper.putOfferAccept(sc, id, offerBean);
			return Response.status(Status.OK).entity(bean).build();
			
		} catch (APWebException e) {
			return sendException(e);
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@PUT
	@Path("/{id}/decline")
	@Consumes({MediaType.APPLICATION_JSON})
	public Response putOfferDeclines(@Context SecurityContext sc, @PathParam("id") final String id, OfferBean offerBean) {
		try {
			Object bean = OfferHelper.putOfferDecline(sc, id, offerBean);
			return Response.status(Status.OK).entity(bean).build();
			
		} catch (APWebException e) {
			return sendException(e);
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@PUT
	@Path("/{id}/confirm")
	@Consumes({MediaType.APPLICATION_JSON})
	public Response putOfferConfirms(@Context SecurityContext sc, @PathParam("id") final String id, OfferBean offerBean) {
		try {
			Object bean = OfferHelper.putOfferConfirm(sc, id, offerBean);
			return Response.status(Status.OK).entity(bean).build();
			
		} catch (APWebException e) {
			return sendException(e);
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

}
