package org.ap.auxpro.rest.servlet;

import javax.ws.rs.*;
import javax.ws.rs.core.*;
import javax.ws.rs.core.Response.*;
import org.ap.common.web.servlet.APServletBase;
import org.ap.auxpro.bean.OfferPostBean;
import org.ap.common.exception.APWebException;
import javax.annotation.security.RolesAllowed;
import org.ap.auxpro.helpers.OfferHelper;
import org.ap.auxpro.bean.OfferBean;
import org.ap.auxpro.storage.offer.OfferData;
import org.ap.auxpro.storage.offer.OfferCollection;
import org.ap.common.time.TimeHelper;
import org.ap.auxpro.bean.OfferEmptyBean;

/* This class was auto-generated by the JavaWriter */
@Path("/offers")
public class OfferServlet extends APServletBase {

	public static final String PATH = "/offers";

	@POST
	@Consumes({MediaType.APPLICATION_JSON})
	@Produces({MediaType.APPLICATION_JSON})
	@RolesAllowed("service")
	public Response postOffer(@Context SecurityContext sc, OfferPostBean offerPostBean) {
		try {
			Object bean = OfferHelper.createOffer(sc, offerPostBean);
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
	public Response getOffer(@Context SecurityContext sc, @PathParam("id") final String id) {
		try {
			OfferData data = OfferCollection.getById(id);
			if(data == null) {
				return Response.status(Status.NOT_FOUND).build();
			}
			OfferBean bean = new OfferBean();
			bean.auxStatus = data.getAuxStatus();
			bean.auxStatusChanged = TimeHelper.toIntegers(data.getAuxStatusChanged());
			bean.hideToAux = data.getHideToAux();
			bean.lastUpdateDate = TimeHelper.toIntegers(data.getLastUpdateDate());
			bean.sadStatus = data.getSadStatus();
			bean.sadStatusChanged = TimeHelper.toIntegers(data.getSadStatusChanged());
			bean.id = data.getId();
			bean.creationDate = TimeHelper.toIntegers(data.getCreationDate());
			bean.hideToSad = data.getHideToSad();
			bean.auxiliaryId = data.getAuxiliaryId();
			bean.customerId = data.getCustomerId();
			bean.serviceId = data.getServiceId();
			bean.interventionId = data.getInterventionId();
			
			return Response.status(Status.OK).entity(bean).build();
			
		} catch (APWebException e) {
			return sendException(e);
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@PUT
	@Path("/{id}/accept")
	@Consumes({MediaType.APPLICATION_JSON})
	@RolesAllowed("auxiliary")
	public Response putOfferAccepts(@Context SecurityContext sc, @PathParam("id") final String id, OfferEmptyBean offerEmptyBean) {
		try {
			Object bean = OfferHelper.putOfferAccept(sc, id, offerEmptyBean);
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
	@RolesAllowed("auxiliary")
	public Response putOfferDeclines(@Context SecurityContext sc, @PathParam("id") final String id, OfferEmptyBean offerEmptyBean) {
		try {
			Object bean = OfferHelper.putOfferDecline(sc, id, offerEmptyBean);
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
	@RolesAllowed("service")
	public Response putOfferConfirms(@Context SecurityContext sc, @PathParam("id") final String id, OfferEmptyBean offerEmptyBean) {
		try {
			Object bean = OfferHelper.putOfferConfirm(sc, id, offerEmptyBean);
			return Response.status(Status.OK).entity(bean).build();
			
		} catch (APWebException e) {
			return sendException(e);
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

}
