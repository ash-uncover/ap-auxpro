package org.ap.auxpro.rest.servlet;

import javax.ws.rs.*;
import javax.ws.rs.core.*;
import javax.ws.rs.core.Response.*;
import org.ap.web.rest.servlet.APServletBase;
import org.ap.auxpro.bean.ServiceGetBean;
import org.ap.auxpro.storage.service.ServiceData;
import org.ap.auxpro.storage.service.ServiceCollection;
import org.ap.web.internal.APWebException;
import org.bson.conversions.Bson;
import static com.mongodb.client.model.Filters.*;
import org.ap.auxpro.storage.service.ServiceFields;
import java.util.List;
import java.util.ArrayList;
import org.ap.common.TimeHelper;
import org.ap.auxpro.bean.ServicePostBean;
import org.ap.auxpro.storage.apauth.ApauthCollection;
import org.ap.auxpro.storage.apauth.ApauthData;
import org.ap.web.internal.UUIDGenerator;
import com.mongodb.MongoWriteException;
import org.ap.auxpro.internal.MailSender;
import org.ap.auxpro.internal.ETokenType;
import org.ap.auxpro.bean.ServicePutBean;
import org.ap.auxpro.helpers.ServiceHelper;
import java.util.Date;
import org.ap.auxpro.bean.PromotionCodePostBean;
import org.ap.auxpro.bean.AuxiliaryGetBean;
import org.ap.auxpro.storage.auxiliary.AuxiliaryData;
import org.ap.auxpro.storage.auxiliary.AuxiliaryCollection;
import org.ap.auxpro.storage.auxiliary.AuxiliaryFields;
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

/* This class was auto-generated by the JavaWriter */
@Path("/services")
public class ServiceServlet extends APServletBase {

	public static final String PATH = "/services";

	@GET
	@Produces({MediaType.APPLICATION_JSON})
	public Response getServices(@Context SecurityContext sc, @Context UriInfo info) {
		try {
			List<Bson> conditions = new ArrayList<Bson>();
			
			for (String key : info.getQueryParameters().keySet()) {
				ServiceFields field = ServiceFields.byId(key);
				if (field != null) {
					List<Bson> subConditions = new ArrayList<Bson>();
					for (String value : info.getQueryParameters().get(key)) {
						if (field.getType().equals("Boolean")) {
							subConditions.add(eq(key, new Boolean(value)));
						} else {
							subConditions.add(eq(key, value));
						}
					}
					conditions.add(or(subConditions));
				}
			}
			
			List<ServiceData> datas = null;
			if (conditions.size() > 0) {
				datas = ServiceCollection.get(and(conditions));
			} else {
				datas = ServiceCollection.getAll();
			}
			
			List<ServiceGetBean> beanList = new ArrayList<ServiceGetBean>();
			for (ServiceData data : datas) {
				ServiceGetBean bean = new ServiceGetBean();
				bean.country = data.getCountry();
				bean.address = data.getAddress();
				bean.city = data.getCity();
				bean.lattitude = data.getLattitude();
				bean.lastUpdateDate = TimeHelper.toIntegers(data.getLastUpdateDate());
				bean.accountType = data.getAccountType();
				bean.postalCode = data.getPostalCode();
				bean.isTutoSkipped = data.getIsTutoSkipped();
				bean.notifyPartners = data.getNotifyPartners();
				bean.accountExpiryDate = TimeHelper.toIntegers(data.getAccountExpiryDate());
				bean.avatar = data.getAvatar();
				bean.creationDate = TimeHelper.toIntegers(data.getCreationDate());
				bean.siret = data.getSiret();
				bean.notifyAuxpros = data.getNotifyAuxpros();
				bean.phone = data.getPhone();
				bean.function = data.getFunction();
				bean.profilCompleted = data.getProfilCompleted();
				bean.id = data.getId();
				bean.socialReason = data.getSocialReason();
				bean.longitude = data.getLongitude();
				
				beanList.add(bean);
			}
			
			return Response.status(Status.OK).entity(beanList.toArray(new ServiceGetBean[beanList.size()])).build();
			
		} catch (APWebException e) {
			return sendException(e);
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@POST
	@Consumes({MediaType.APPLICATION_JSON})
	public Response postService(@Context SecurityContext sc, ServicePostBean servicePostBean) {
		try {
			ApauthData dataAuth = ApauthCollection.getByUsername(servicePostBean.username);
			ServiceData dataEntity;
			if(dataAuth != null) {
				if(dataAuth.getRegistered()) {
					throw APWebException.AP_AUTH_REG_001;
				} else {
					ServiceCollection.deleteByAuthId(dataAuth.id);
					ApauthCollection.delete(dataAuth);
				}
			}
			dataAuth = ApauthCollection.getByEmail(servicePostBean.email);
			if(dataAuth != null) {
				if(dataAuth.getRegistered()) {
					throw APWebException.AP_AUTH_REG_002;
				} else {
					ServiceCollection.deleteByAuthId(dataAuth.id);
					ApauthCollection.delete(dataAuth);
				}
			}
			
			List<String> roles = new ArrayList<String>();
			roles.add("service");
			roles.add("apauth");
			
			dataAuth = new ApauthData();
			dataAuth.setId(UUIDGenerator.nextId());
			dataAuth.setEntityId(UUIDGenerator.nextId());
			dataAuth.setUsername(servicePostBean.username);
			dataAuth.setPassword(servicePostBean.password);
			dataAuth.setEmail(servicePostBean.email);
			dataAuth.setType("service");
			dataAuth.setRoles(roles);
			dataAuth.setRegistered(Boolean.FALSE);
			dataAuth.setActive(Boolean.TRUE);
			dataAuth.setToken(UUIDGenerator.nextCode());
			dataAuth.setTokenType(ETokenType.REGISTER.name());
			dataAuth.setTokenDateTime(TimeHelper.nowDateTimeIntegers());
			ApauthCollection.create(dataAuth);
			
			dataEntity = new ServiceData();
			dataEntity.setId(dataAuth.getEntityId());
			dataEntity.setAuthId(dataAuth.getId());
			dataEntity.setCreationDate(new Date());
			dataEntity.setLastUpdateDate(new Date());
			ServiceCollection.create(dataEntity);
			
			MailSender.sendRegistrationMail(dataAuth);
			
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
	public Response getService(@Context SecurityContext sc, @PathParam("id") final String id) {
		try {
			ServiceData data = ServiceCollection.getById(id);
			if(data == null) {
				return Response.status(Status.NOT_FOUND).build();
			}
			ServiceGetBean bean = new ServiceGetBean();
			bean.country = data.getCountry();
			bean.address = data.getAddress();
			bean.city = data.getCity();
			bean.lattitude = data.getLattitude();
			bean.lastUpdateDate = TimeHelper.toIntegers(data.getLastUpdateDate());
			bean.accountType = data.getAccountType();
			bean.postalCode = data.getPostalCode();
			bean.isTutoSkipped = data.getIsTutoSkipped();
			bean.notifyPartners = data.getNotifyPartners();
			bean.accountExpiryDate = TimeHelper.toIntegers(data.getAccountExpiryDate());
			bean.avatar = data.getAvatar();
			bean.creationDate = TimeHelper.toIntegers(data.getCreationDate());
			bean.siret = data.getSiret();
			bean.notifyAuxpros = data.getNotifyAuxpros();
			bean.phone = data.getPhone();
			bean.function = data.getFunction();
			bean.profilCompleted = data.getProfilCompleted();
			bean.id = data.getId();
			bean.socialReason = data.getSocialReason();
			bean.longitude = data.getLongitude();
			
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
	public Response putService(@Context SecurityContext sc, @PathParam("id") final String id, ServicePutBean servicePutBean) {
		try {
			ServiceHelper.beforePutService(sc, id, servicePutBean);
			// Get actual data object
			ServiceData data = ServiceCollection.getById(id);
			// Check data exists
			if (data == null) {
				throw new APWebException("service not found", "AP_SERVICE_NOTFOUND", Status.BAD_REQUEST);
			}
			// Update the data object
			data.setLastUpdateDate(new Date());
			data.setCountry(servicePutBean.country);
			data.setAddress(servicePutBean.address);
			data.setCity(servicePutBean.city);
			data.setLattitude(servicePutBean.lattitude);
			data.setPostalCode(servicePutBean.postalCode);
			data.setIsTutoSkipped(servicePutBean.isTutoSkipped);
			data.setNotifyPartners(servicePutBean.notifyPartners);
			data.setAvatar(servicePutBean.avatar);
			data.setSiret(servicePutBean.siret);
			data.setNotifyAuxpros(servicePutBean.notifyAuxpros);
			data.setPhone(servicePutBean.phone);
			data.setFunction(servicePutBean.function);
			data.setSocialReason(servicePutBean.socialReason);
			data.setLongitude(servicePutBean.longitude);
			// Store the updated data object
			ServiceCollection.updateNull(data);
			// Send the response
			return Response.status(Status.OK).build();
			
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
	public Response postServiceCode(@Context SecurityContext sc, @PathParam("id") final String id, PromotionCodePostBean promotionCodePostBean) {
		try {
			Object bean = ServiceHelper.postPromotionCode(sc, id, promotionCodePostBean);
			return Response.status(Status.OK).entity(bean).build();
			
		} catch (APWebException e) {
			return sendException(e);
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@GET
	@Path("/{serviceId}/auxiliarys")
	@Produces({MediaType.APPLICATION_JSON})
	public Response getServiceAuxiliarys(@Context SecurityContext sc, @PathParam("serviceId") final String serviceId, @Context UriInfo info) {
		try {
			List<Bson> conditions = new ArrayList<Bson>();
			
			for (String key : info.getQueryParameters().keySet()) {
				AuxiliaryFields field = AuxiliaryFields.byId(key);
				if (field != null) {
					List<Bson> subConditions = new ArrayList<Bson>();
					for (String value : info.getQueryParameters().get(key)) {
						if (field.getType().equals("Boolean")) {
							subConditions.add(eq(key, new Boolean(value)));
						} else {
							subConditions.add(eq(key, value));
						}
					}
					conditions.add(or(subConditions));
				}
			}
			
			conditions.add(eq("serviceId", serviceId));
			List<AuxiliaryData> datas = null;
			if (conditions.size() > 0) {
				datas = AuxiliaryCollection.get(and(conditions));
			} else {
				datas = AuxiliaryCollection.getAll();
			}
			
			List<AuxiliaryGetBean> beanList = new ArrayList<AuxiliaryGetBean>();
			for (AuxiliaryData data : datas) {
				AuxiliaryGetBean bean = new AuxiliaryGetBean();
				bean.country = data.getCountry();
				bean.lastName = data.getLastName();
				bean.civility = data.getCivility();
				bean.city = data.getCity();
				bean.lastUpdateDate = TimeHelper.toIntegers(data.getLastUpdateDate());
				bean.postalCode = data.getPostalCode();
				bean.isTutoSkipped = data.getIsTutoSkipped();
				bean.description = data.getDescription();
				bean.socialNumber = data.getSocialNumber();
				bean.accountExpiryDate = TimeHelper.toIntegers(data.getAccountExpiryDate());
				bean.profilProgression = data.getProfilProgression();
				bean.skillShopping = data.getSkillShopping();
				bean.notifyOffersSms = data.getNotifyOffersSms();
				bean.notifyAuxpros = data.getNotifyAuxpros();
				bean.birthCountry = data.getBirthCountry();
				bean.profilCompleted = data.getProfilCompleted();
				bean.skillDoityourself = data.getSkillDoityourself();
				bean.diploma = data.getDiploma();
				bean.id = data.getId();
				bean.longitude = data.getLongitude();
				bean.skillNursing = data.getSkillNursing();
				bean.address = data.getAddress();
				bean.lattitude = data.getLattitude();
				bean.accountType = data.getAccountType();
				bean.notifyPartners = data.getNotifyPartners();
				bean.birthCity = data.getBirthCity();
				bean.avatar = data.getAvatar();
				bean.areSkillSet = data.getAreSkillSet();
				bean.creationDate = TimeHelper.toIntegers(data.getCreationDate());
				bean.birthDate = TimeHelper.toIntegers(data.getBirthDate());
				bean.skillChildhood = data.getSkillChildhood();
				bean.skillCompagny = data.getSkillCompagny();
				bean.firstName = data.getFirstName();
				bean.skillAnswers = data.getSkillAnswers();
				bean.nationality = data.getNationality();
				bean.isEntrepreneur = data.getIsEntrepreneur();
				bean.phone = data.getPhone();
				bean.skillAdministrative = data.getSkillAdministrative();
				bean.skillHousework = data.getSkillHousework();
				bean.idCardNumber = data.getIdCardNumber();
				bean.notifyOffersMail = data.getNotifyOffersMail();
				
				beanList.add(bean);
			}
			
			return Response.status(Status.OK).entity(beanList.toArray(new AuxiliaryGetBean[beanList.size()])).build();
			
		} catch (APWebException e) {
			return sendException(e);
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@GET
	@Path("/{serviceId}/customers")
	@Produces({MediaType.APPLICATION_JSON})
	public Response getServiceCustomers(@Context SecurityContext sc, @PathParam("serviceId") final String serviceId, @Context UriInfo info) {
		try {
			List<Bson> conditions = new ArrayList<Bson>();
			
			for (String key : info.getQueryParameters().keySet()) {
				CustomerFields field = CustomerFields.byId(key);
				if (field != null) {
					List<Bson> subConditions = new ArrayList<Bson>();
					for (String value : info.getQueryParameters().get(key)) {
						if (field.getType().equals("Boolean")) {
							subConditions.add(eq(key, new Boolean(value)));
						} else {
							subConditions.add(eq(key, value));
						}
					}
					conditions.add(or(subConditions));
				}
			}
			
			conditions.add(eq("serviceId", serviceId));
			List<CustomerData> datas = null;
			if (conditions.size() > 0) {
				datas = CustomerCollection.get(and(conditions));
			} else {
				datas = CustomerCollection.getAll();
			}
			
			List<CustomerBean> beanList = new ArrayList<CustomerBean>();
			for (CustomerData data : datas) {
				CustomerBean bean = new CustomerBean();
				bean.serviceId = data.getServiceId();
				bean.lastName = data.getLastName();
				bean.country = data.getCountry();
				bean.civility = data.getCivility();
				bean.address = data.getAddress();
				bean.skillNursing = data.getSkillNursing();
				bean.city = data.getCity();
				bean.lattitude = data.getLattitude();
				bean.lastUpdateDate = TimeHelper.toIntegers(data.getLastUpdateDate());
				bean.postalCode = data.getPostalCode();
				bean.creationDate = TimeHelper.toIntegers(data.getCreationDate());
				bean.birthDate = TimeHelper.toIntegers(data.getBirthDate());
				bean.skillChildhood = data.getSkillChildhood();
				bean.skillCompagny = data.getSkillCompagny();
				bean.skillShopping = data.getSkillShopping();
				bean.firstName = data.getFirstName();
				bean.nationality = data.getNationality();
				bean.phone = data.getPhone();
				bean.skillAdministrative = data.getSkillAdministrative();
				bean.skillHousework = data.getSkillHousework();
				bean.skillDoityourself = data.getSkillDoityourself();
				bean.id = data.getId();
				bean.email = data.getEmail();
				bean.longitude = data.getLongitude();
				
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
	@Path("/{serviceId}/interventions")
	@Produces({MediaType.APPLICATION_JSON})
	public Response getServiceInterventions(@Context SecurityContext sc, @PathParam("serviceId") final String serviceId, @Context UriInfo info) {
		try {
			List<Bson> conditions = new ArrayList<Bson>();
			
			for (String key : info.getQueryParameters().keySet()) {
				InterventionFields field = InterventionFields.byId(key);
				if (field != null) {
					List<Bson> subConditions = new ArrayList<Bson>();
					for (String value : info.getQueryParameters().get(key)) {
						if (field.getType().equals("Boolean")) {
							subConditions.add(eq(key, new Boolean(value)));
						} else {
							subConditions.add(eq(key, value));
						}
					}
					conditions.add(or(subConditions));
				}
			}
			
			conditions.add(eq("serviceId", serviceId));
			List<InterventionData> datas = null;
			if (conditions.size() > 0) {
				datas = InterventionCollection.get(and(conditions));
			} else {
				datas = InterventionCollection.getAll();
			}
			
			List<InterventionBean> beanList = new ArrayList<InterventionBean>();
			for (InterventionData data : datas) {
				InterventionBean bean = new InterventionBean();
				bean.auxiliaryId = data.getAuxiliaryId();
				bean.period = data.getPeriod();
				bean.endDate = TimeHelper.toIntegers(data.getEndDate());
				bean.lastUpdateDate = TimeHelper.toIntegers(data.getLastUpdateDate());
				bean.sadStatusChanged = TimeHelper.toIntegers(data.getSadStatusChanged());
				bean.creationDate = TimeHelper.toIntegers(data.getCreationDate());
				bean.sadStatus = data.getSadStatus();
				bean.days = data.getDays();
				bean.diplomas = data.getDiplomas();
				bean.startTime = data.getStartTime();
				bean.endTime = data.getEndTime();
				bean.id = data.getId();
				bean.hideToSad = data.getHideToSad();
				bean.startDate = TimeHelper.toIntegers(data.getStartDate());
				bean.customerId = data.getCustomerId();
				bean.serviceId = data.getServiceId();
				
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
	@Path("/{serviceId}/offers")
	@Produces({MediaType.APPLICATION_JSON})
	public Response getServiceOffers(@Context SecurityContext sc, @PathParam("serviceId") final String serviceId, @Context UriInfo info) {
		try {
			List<Bson> conditions = new ArrayList<Bson>();
			
			for (String key : info.getQueryParameters().keySet()) {
				OfferFields field = OfferFields.byId(key);
				if (field != null) {
					List<Bson> subConditions = new ArrayList<Bson>();
					for (String value : info.getQueryParameters().get(key)) {
						if (field.getType().equals("Boolean")) {
							subConditions.add(eq(key, new Boolean(value)));
						} else {
							subConditions.add(eq(key, value));
						}
					}
					conditions.add(or(subConditions));
				}
			}
			
			conditions.add(eq("serviceId", serviceId));
			List<OfferData> datas = null;
			if (conditions.size() > 0) {
				datas = OfferCollection.get(and(conditions));
			} else {
				datas = OfferCollection.getAll();
			}
			
			List<OfferBean> beanList = new ArrayList<OfferBean>();
			for (OfferData data : datas) {
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
	@Path("/{serviceId}/missions")
	@Produces({MediaType.APPLICATION_JSON})
	public Response getServiceMissions(@Context SecurityContext sc, @PathParam("serviceId") final String serviceId, @Context UriInfo info) {
		try {
			List<Bson> conditions = new ArrayList<Bson>();
			
			for (String key : info.getQueryParameters().keySet()) {
				MissionFields field = MissionFields.byId(key);
				if (field != null) {
					List<Bson> subConditions = new ArrayList<Bson>();
					for (String value : info.getQueryParameters().get(key)) {
						if (field.getType().equals("Boolean")) {
							subConditions.add(eq(key, new Boolean(value)));
						} else {
							subConditions.add(eq(key, value));
						}
					}
					conditions.add(or(subConditions));
				}
			}
			
			conditions.add(eq("serviceId", serviceId));
			List<MissionData> datas = null;
			if (conditions.size() > 0) {
				datas = MissionCollection.get(and(conditions));
			} else {
				datas = MissionCollection.getAll();
			}
			
			List<MissionBean> beanList = new ArrayList<MissionBean>();
			for (MissionData data : datas) {
				MissionBean bean = new MissionBean();
				bean.auxiliaryId = data.getAuxiliaryId();
				bean.customerId = data.getCustomerId();
				bean.serviceId = data.getServiceId();
				bean.interventionId = data.getInterventionId();
				bean.date = TimeHelper.toIntegers(data.getDate());
				bean.auxStatus = data.getAuxStatus();
				bean.auxStatusChanged = TimeHelper.toIntegers(data.getAuxStatusChanged());
				bean.hideToAux = data.getHideToAux();
				bean.lastUpdateDate = TimeHelper.toIntegers(data.getLastUpdateDate());
				bean.sadStatus = data.getSadStatus();
				bean.sadStatusChanged = TimeHelper.toIntegers(data.getSadStatusChanged());
				bean.id = data.getId();
				bean.creationDate = TimeHelper.toIntegers(data.getCreationDate());
				bean.hideToSad = data.getHideToSad();
				
				beanList.add(bean);
			}
			
			return Response.status(Status.OK).entity(beanList.toArray(new MissionBean[beanList.size()])).build();
			
		} catch (APWebException e) {
			return sendException(e);
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

}
