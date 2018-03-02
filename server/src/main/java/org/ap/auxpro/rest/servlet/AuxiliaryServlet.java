package org.ap.auxpro.rest.servlet;

import javax.ws.rs.*;
import javax.ws.rs.core.*;
import javax.ws.rs.core.Response.*;
import org.ap.common.web.servlet.APServletBase;
import org.ap.auxpro.bean.AuxiliaryGetBean;
import org.ap.auxpro.storage.auxiliary.AuxiliaryData;
import org.ap.auxpro.storage.auxiliary.AuxiliaryCollection;
import org.ap.common.exception.APWebException;
import org.bson.conversions.Bson;
import static com.mongodb.client.model.Filters.*;
import org.ap.auxpro.storage.auxiliary.AuxiliaryFields;
import org.ap.common.web.http.URLHelper;
import java.util.List;
import java.util.ArrayList;
import org.ap.auxpro.bean.AuxiliaryPostBean;
import org.ap.auxpro.storage.apauth.ApauthCollection;
import org.ap.auxpro.storage.apauth.ApauthData;
import com.mongodb.MongoWriteException;
import org.ap.auxpro.internal.MailSender;
import org.ap.auxpro.internal.ETokenType;
import org.ap.common.time.TimeHelper;
import org.ap.common.util.UUIDGenerator;
import org.ap.auxpro.bean.AuxiliaryPutBean;
import org.ap.auxpro.helpers.AuxiliaryHelper;
import java.util.Date;
import org.ap.auxpro.bean.AuxiliaryQuestionaryBean;
import org.ap.auxpro.bean.PromotionCodePostBean;
import org.ap.auxpro.bean.ServiceGetBean;
import org.ap.auxpro.storage.service.ServiceData;
import org.ap.auxpro.storage.service.ServiceCollection;
import org.ap.auxpro.storage.service.ServiceFields;
import org.ap.auxpro.bean.CustomerBean;
import org.ap.auxpro.storage.customer.CustomerData;
import org.ap.auxpro.storage.customer.CustomerCollection;
import org.ap.auxpro.storage.customer.CustomerFields;
import org.ap.auxpro.bean.InterventionBean;
import org.ap.auxpro.storage.intervention.InterventionData;
import org.ap.auxpro.storage.intervention.InterventionCollection;
import org.ap.auxpro.storage.intervention.InterventionFields;
import org.ap.auxpro.bean.OfferBean;
import org.ap.auxpro.storage.offer.OfferData;
import org.ap.auxpro.storage.offer.OfferCollection;
import org.ap.auxpro.storage.offer.OfferFields;
import org.ap.auxpro.bean.MissionBean;
import org.ap.auxpro.storage.mission.MissionData;
import org.ap.auxpro.storage.mission.MissionCollection;
import org.ap.auxpro.storage.mission.MissionFields;
import org.ap.auxpro.bean.IndisponibilityBean;
import org.ap.auxpro.storage.indisponibility.IndisponibilityData;
import org.ap.auxpro.storage.indisponibility.IndisponibilityCollection;
import org.ap.auxpro.storage.indisponibility.IndisponibilityFields;
import org.ap.auxpro.bean.GeozoneBean;
import org.ap.auxpro.storage.geozone.GeozoneData;
import org.ap.auxpro.storage.geozone.GeozoneCollection;
import org.ap.auxpro.storage.geozone.GeozoneFields;

/* This class was auto-generated by the JavaWriter */
@Path("/auxiliarys")
public class AuxiliaryServlet extends APServletBase {

	public static final String PATH = "/auxiliarys";

	@GET
	@Produces({MediaType.APPLICATION_JSON})
	public Response getAuxiliarys(@Context SecurityContext sc, @Context UriInfo info) {
		try {
			List<Bson> conditions = new ArrayList<Bson>();
			
			for (String key : info.getQueryParameters().keySet()) {
				AuxiliaryFields field = AuxiliaryFields.byId(key);
				if (field != null) {
					List<String> filterValues = info.getQueryParameters().get(key);
					List<Bson> subConditions = URLHelper.parseFilters(key, filterValues, field.getType());
					conditions.add(or(subConditions));
				}
			}
			
			List<AuxiliaryData> datas = null;
			if (conditions.size() > 0) {
				datas = AuxiliaryCollection.get(and(conditions));
			} else {
				datas = AuxiliaryCollection.getAll();
			}
			
			List<AuxiliaryGetBean> beanList = new ArrayList<AuxiliaryGetBean>();
			for (AuxiliaryData data : datas) {
				ApauthData dataAuth = ApauthCollection.getById(data.getAuthId());
				if (dataAuth == null) {
					return Response.status(Status.NOT_FOUND).build();
				}
				AuxiliaryGetBean bean = new AuxiliaryGetBean(data, dataAuth);
				beanList.add(bean);
			}
			
			return Response.status(Status.OK).entity(beanList.toArray(new AuxiliaryGetBean[beanList.size()])).build();
			
		} catch (APWebException e) {
			return sendException(e);
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@POST
	@Consumes({MediaType.APPLICATION_JSON})
	public Response postAuxiliary(@Context SecurityContext sc, AuxiliaryPostBean auxiliaryPostBean) {
		try {
			ApauthData dataAuth = ApauthCollection.getByUsername(auxiliaryPostBean.username);
			AuxiliaryData dataEntity;
			if(dataAuth != null) {
				if(dataAuth.getRegistered()) {
					throw APWebException.AP_AUTH_REG_001;
				} else {
					AuxiliaryCollection.deleteByAuthId(dataAuth.id);
					ApauthCollection.delete(dataAuth);
				}
			}
			dataAuth = ApauthCollection.getByEmail(auxiliaryPostBean.email);
			if(dataAuth != null) {
				if(dataAuth.getRegistered()) {
					throw APWebException.AP_AUTH_REG_002;
				} else {
					AuxiliaryCollection.deleteByAuthId(dataAuth.id);
					ApauthCollection.delete(dataAuth);
				}
			}
			
			List<String> roles = new ArrayList<String>();
			roles.add("auxiliary");
			roles.add("apauth");
			
			dataAuth = new ApauthData();
			dataAuth.setId(UUIDGenerator.nextId());
			dataAuth.setEntityId(UUIDGenerator.nextId());
			dataAuth.setUsername(auxiliaryPostBean.username);
			dataAuth.setPassword(auxiliaryPostBean.password);
			dataAuth.setEmail(auxiliaryPostBean.email);
			dataAuth.setType("auxiliary");
			dataAuth.setRoles(roles);
			dataAuth.setRegistered(Boolean.FALSE);
			dataAuth.setActive(Boolean.TRUE);
			dataAuth.setToken(UUIDGenerator.nextCode());
			dataAuth.setTokenType(ETokenType.REGISTER.name());
			dataAuth.setTokenDateTime(TimeHelper.nowDateTimeIntegers());
			ApauthCollection.create(dataAuth);
			
			dataEntity = new AuxiliaryData();
			dataEntity.setId(dataAuth.getEntityId());
			dataEntity.setAuthId(dataAuth.getId());
			dataEntity.setCreationDate(new Date());
			dataEntity.setLastUpdateDate(new Date());
			AuxiliaryCollection.create(dataEntity);
			
			MailSender.getInstance().sendRegistrationMail(dataAuth);
			
			return Response.status(Status.CREATED).build();
			
		} catch (MongoWriteException e) {
			return Response.status(Status.FORBIDDEN).build();
		} catch (APWebException e) {
			return sendException(e);
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@GET
	@Path("/{id}")
	@Produces({MediaType.APPLICATION_JSON})
	public Response getAuxiliary(@Context SecurityContext sc, @PathParam("id") final String id) {
		try {
			AuxiliaryData data = AuxiliaryCollection.getById(id);
			if (data == null) {
				return Response.status(Status.NOT_FOUND).build();
			}
			ApauthData dataAuth = ApauthCollection.getById(data.getAuthId());
			if (dataAuth == null) {
				return Response.status(Status.NOT_FOUND).build();
			}
			AuxiliaryGetBean bean = new AuxiliaryGetBean(data, dataAuth);
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
	public Response putAuxiliary(@Context SecurityContext sc, @PathParam("id") final String id, AuxiliaryPutBean auxiliaryPutBean) {
		try {
			AuxiliaryHelper.beforePutAuxiliary(sc, id, auxiliaryPutBean);
			// Get actual data object
			AuxiliaryData data = AuxiliaryCollection.getById(id);
			// Check data exists
			if (data == null) {
				throw new APWebException("auxiliary not found", "AP_AUXILIARY_NOTFOUND", Status.BAD_REQUEST);
			}
			// Update the data object
			data.setLastUpdateDate(new Date());
			auxiliaryPutBean.fillData(data);
			// Store the updated data object
			AuxiliaryCollection.updateNull(data);
			// Send the response
			return Response.status(Status.OK).build();
			
		} catch (APWebException e) {
			return sendException(e);
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@POST
	@Path("/{id}/questionary")
	@Consumes({MediaType.APPLICATION_JSON})
	@Produces({MediaType.APPLICATION_JSON})
	public Response postAuxiliaryQuestionary(@Context SecurityContext sc, @PathParam("id") final String id, AuxiliaryQuestionaryBean auxiliaryQuestionaryBean) {
		try {
			Object bean = AuxiliaryHelper.postAuxiliaryQuestionary(sc, id, auxiliaryQuestionaryBean);
			return Response.status(Status.OK).entity(bean).build();
			
		} catch (APWebException e) {
			return sendException(e);
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@POST
	@Path("/{id}/code")
	@Consumes({MediaType.APPLICATION_JSON})
	@Produces({MediaType.APPLICATION_JSON})
	public Response postAuxiliaryCode(@Context SecurityContext sc, @PathParam("id") final String id, PromotionCodePostBean promotionCodePostBean) {
		try {
			Object bean = AuxiliaryHelper.postPromotionCode(sc, id, promotionCodePostBean);
			return Response.status(Status.OK).entity(bean).build();
			
		} catch (APWebException e) {
			return sendException(e);
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@GET
	@Path("/{auxiliaryId}/services")
	@Produces({MediaType.APPLICATION_JSON})
	public Response getAuxiliaryServices(@Context SecurityContext sc, @PathParam("auxiliaryId") final String auxiliaryId, @Context UriInfo info) {
		try {
			List<Bson> conditions = new ArrayList<Bson>();
			
			for (String key : info.getQueryParameters().keySet()) {
				ServiceFields field = ServiceFields.byId(key);
				if (field != null) {
					List<String> filterValues = info.getQueryParameters().get(key);
					List<Bson> subConditions = URLHelper.parseFilters(key, filterValues, field.getType());
					conditions.add(or(subConditions));
				}
			}
			
			conditions.add(eq("auxiliaryId", auxiliaryId));
			List<ServiceData> datas = null;
			if (conditions.size() > 0) {
				datas = ServiceCollection.get(and(conditions));
			} else {
				datas = ServiceCollection.getAll();
			}
			
			List<ServiceGetBean> beanList = new ArrayList<ServiceGetBean>();
			for (ServiceData data : datas) {
				ApauthData dataAuth = ApauthCollection.getById(data.getAuthId());
				if (dataAuth == null) {
					return Response.status(Status.NOT_FOUND).build();
				}
				ServiceGetBean bean = new ServiceGetBean(data, dataAuth);
				beanList.add(bean);
			}
			
			return Response.status(Status.OK).entity(beanList.toArray(new ServiceGetBean[beanList.size()])).build();
			
		} catch (APWebException e) {
			return sendException(e);
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@GET
	@Path("/{auxiliaryId}/customers")
	@Produces({MediaType.APPLICATION_JSON})
	public Response getAuxiliaryCustomers(@Context SecurityContext sc, @PathParam("auxiliaryId") final String auxiliaryId, @Context UriInfo info) {
		try {
			List<Bson> conditions = new ArrayList<Bson>();
			
			for (String key : info.getQueryParameters().keySet()) {
				CustomerFields field = CustomerFields.byId(key);
				if (field != null) {
					List<String> filterValues = info.getQueryParameters().get(key);
					List<Bson> subConditions = URLHelper.parseFilters(key, filterValues, field.getType());
					conditions.add(or(subConditions));
				}
			}
			
			conditions.add(eq("auxiliaryId", auxiliaryId));
			List<CustomerData> datas = null;
			if (conditions.size() > 0) {
				datas = CustomerCollection.get(and(conditions));
			} else {
				datas = CustomerCollection.getAll();
			}
			
			List<CustomerBean> beanList = new ArrayList<CustomerBean>();
			for (CustomerData data : datas) {
				CustomerBean bean = new CustomerBean(data);
				beanList.add(bean);
			}
			
			return Response.status(Status.OK).entity(beanList.toArray(new CustomerBean[beanList.size()])).build();
			
		} catch (APWebException e) {
			return sendException(e);
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@GET
	@Path("/{auxiliaryId}/interventions")
	@Produces({MediaType.APPLICATION_JSON})
	public Response getAuxiliaryInterventions(@Context SecurityContext sc, @PathParam("auxiliaryId") final String auxiliaryId, @Context UriInfo info) {
		try {
			List<Bson> conditions = new ArrayList<Bson>();
			
			for (String key : info.getQueryParameters().keySet()) {
				InterventionFields field = InterventionFields.byId(key);
				if (field != null) {
					List<String> filterValues = info.getQueryParameters().get(key);
					List<Bson> subConditions = URLHelper.parseFilters(key, filterValues, field.getType());
					conditions.add(or(subConditions));
				}
			}
			
			conditions.add(eq("auxiliaryId", auxiliaryId));
			List<InterventionData> datas = null;
			if (conditions.size() > 0) {
				datas = InterventionCollection.get(and(conditions));
			} else {
				datas = InterventionCollection.getAll();
			}
			
			List<InterventionBean> beanList = new ArrayList<InterventionBean>();
			for (InterventionData data : datas) {
				InterventionBean bean = new InterventionBean(data);
				beanList.add(bean);
			}
			
			return Response.status(Status.OK).entity(beanList.toArray(new InterventionBean[beanList.size()])).build();
			
		} catch (APWebException e) {
			return sendException(e);
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@GET
	@Path("/{auxiliaryId}/offers")
	@Produces({MediaType.APPLICATION_JSON})
	public Response getAuxiliaryOffers(@Context SecurityContext sc, @PathParam("auxiliaryId") final String auxiliaryId, @Context UriInfo info) {
		try {
			List<Bson> conditions = new ArrayList<Bson>();
			
			for (String key : info.getQueryParameters().keySet()) {
				OfferFields field = OfferFields.byId(key);
				if (field != null) {
					List<String> filterValues = info.getQueryParameters().get(key);
					List<Bson> subConditions = URLHelper.parseFilters(key, filterValues, field.getType());
					conditions.add(or(subConditions));
				}
			}
			
			conditions.add(eq("auxiliaryId", auxiliaryId));
			List<OfferData> datas = null;
			if (conditions.size() > 0) {
				datas = OfferCollection.get(and(conditions));
			} else {
				datas = OfferCollection.getAll();
			}
			
			List<OfferBean> beanList = new ArrayList<OfferBean>();
			for (OfferData data : datas) {
				OfferBean bean = new OfferBean(data);
				beanList.add(bean);
			}
			
			return Response.status(Status.OK).entity(beanList.toArray(new OfferBean[beanList.size()])).build();
			
		} catch (APWebException e) {
			return sendException(e);
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@GET
	@Path("/{auxiliaryId}/missions")
	@Produces({MediaType.APPLICATION_JSON})
	public Response getAuxiliaryMissions(@Context SecurityContext sc, @PathParam("auxiliaryId") final String auxiliaryId, @Context UriInfo info) {
		try {
			List<Bson> conditions = new ArrayList<Bson>();
			
			for (String key : info.getQueryParameters().keySet()) {
				MissionFields field = MissionFields.byId(key);
				if (field != null) {
					List<String> filterValues = info.getQueryParameters().get(key);
					List<Bson> subConditions = URLHelper.parseFilters(key, filterValues, field.getType());
					conditions.add(or(subConditions));
				}
			}
			
			conditions.add(eq("auxiliaryId", auxiliaryId));
			List<MissionData> datas = null;
			if (conditions.size() > 0) {
				datas = MissionCollection.get(and(conditions));
			} else {
				datas = MissionCollection.getAll();
			}
			
			List<MissionBean> beanList = new ArrayList<MissionBean>();
			for (MissionData data : datas) {
				MissionBean bean = new MissionBean(data);
				beanList.add(bean);
			}
			
			return Response.status(Status.OK).entity(beanList.toArray(new MissionBean[beanList.size()])).build();
			
		} catch (APWebException e) {
			return sendException(e);
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@GET
	@Path("/{auxiliaryId}/indisponibilitys")
	@Produces({MediaType.APPLICATION_JSON})
	public Response getAuxiliaryIndisponibilitys(@Context SecurityContext sc, @PathParam("auxiliaryId") final String auxiliaryId, @Context UriInfo info) {
		try {
			List<Bson> conditions = new ArrayList<Bson>();
			
			for (String key : info.getQueryParameters().keySet()) {
				IndisponibilityFields field = IndisponibilityFields.byId(key);
				if (field != null) {
					List<String> filterValues = info.getQueryParameters().get(key);
					List<Bson> subConditions = URLHelper.parseFilters(key, filterValues, field.getType());
					conditions.add(or(subConditions));
				}
			}
			
			conditions.add(eq("auxiliaryId", auxiliaryId));
			List<IndisponibilityData> datas = null;
			if (conditions.size() > 0) {
				datas = IndisponibilityCollection.get(and(conditions));
			} else {
				datas = IndisponibilityCollection.getAll();
			}
			
			List<IndisponibilityBean> beanList = new ArrayList<IndisponibilityBean>();
			for (IndisponibilityData data : datas) {
				IndisponibilityBean bean = new IndisponibilityBean(data);
				beanList.add(bean);
			}
			
			return Response.status(Status.OK).entity(beanList.toArray(new IndisponibilityBean[beanList.size()])).build();
			
		} catch (APWebException e) {
			return sendException(e);
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@GET
	@Path("/{auxiliaryId}/geozones")
	@Produces({MediaType.APPLICATION_JSON})
	public Response getAuxiliaryGeozones(@Context SecurityContext sc, @PathParam("auxiliaryId") final String auxiliaryId, @Context UriInfo info) {
		try {
			List<Bson> conditions = new ArrayList<Bson>();
			
			for (String key : info.getQueryParameters().keySet()) {
				GeozoneFields field = GeozoneFields.byId(key);
				if (field != null) {
					List<String> filterValues = info.getQueryParameters().get(key);
					List<Bson> subConditions = URLHelper.parseFilters(key, filterValues, field.getType());
					conditions.add(or(subConditions));
				}
			}
			
			conditions.add(eq("auxiliaryId", auxiliaryId));
			List<GeozoneData> datas = null;
			if (conditions.size() > 0) {
				datas = GeozoneCollection.get(and(conditions));
			} else {
				datas = GeozoneCollection.getAll();
			}
			
			List<GeozoneBean> beanList = new ArrayList<GeozoneBean>();
			for (GeozoneData data : datas) {
				GeozoneBean bean = new GeozoneBean(data);
				beanList.add(bean);
			}
			
			return Response.status(Status.OK).entity(beanList.toArray(new GeozoneBean[beanList.size()])).build();
			
		} catch (APWebException e) {
			return sendException(e);
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

}
