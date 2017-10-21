package org.ap.auxpro.rest.servlet;

import javax.ws.rs.*;
import javax.ws.rs.core.*;
import javax.ws.rs.core.Response.*;
import org.ap.web.rest.servlet.APServletBase;
import org.ap.auxpro.bean.AuxiliaryBean;
import org.ap.auxpro.storage.AuxiliaryData;
import org.ap.auxpro.storage.AuxiliaryCollection;
import org.ap.web.internal.APWebException;
import java.util.List;
import java.util.ArrayList;
import org.ap.auxpro.bean.AuxiliaryCredentialsBean;
import org.ap.auxpro.storage.ApauthCollection;
import org.ap.auxpro.storage.ApauthData;
import org.ap.web.internal.UUIDGenerator;
import com.mongodb.MongoWriteException;
import org.ap.auxpro.internal.MailSender;
import org.ap.auxpro.internal.ETokenType;
import org.ap.common.TimeHelper;
import org.ap.auxpro.helpers.AuxiliaryHelper;
import org.ap.auxpro.bean.AuxiliaryQuestionaryBean;
import org.ap.auxpro.bean.ServiceBean;
import org.ap.auxpro.storage.ServiceData;
import org.ap.auxpro.storage.ServiceCollection;
import static com.mongodb.client.model.Filters.*;
import org.ap.auxpro.bean.CustomerBean;
import org.ap.auxpro.storage.CustomerData;
import org.ap.auxpro.storage.CustomerCollection;
import org.ap.auxpro.bean.InterventionBean;
import org.ap.auxpro.storage.InterventionData;
import org.ap.auxpro.storage.InterventionCollection;
import org.ap.auxpro.bean.OfferBean;
import org.ap.auxpro.storage.OfferData;
import org.ap.auxpro.storage.OfferCollection;
import org.ap.auxpro.bean.MissionBean;
import org.ap.auxpro.storage.MissionData;
import org.ap.auxpro.storage.MissionCollection;
import org.ap.auxpro.bean.IndisponibilityBean;
import org.ap.auxpro.storage.IndisponibilityData;
import org.ap.auxpro.storage.IndisponibilityCollection;
import org.ap.auxpro.bean.GeozoneBean;
import org.ap.auxpro.storage.GeozoneData;
import org.ap.auxpro.storage.GeozoneCollection;

/* This class was auto-generated by the JavaWriter */
@Path("/auxiliarys")
public class AuxiliaryServlet extends APServletBase {

	public static final String PATH = "/auxiliarys";

	@GET
	@Produces({MediaType.APPLICATION_JSON})
	public Response getAuxiliarys(@Context SecurityContext sc) {
		try {
			List<AuxiliaryData> datas = AuxiliaryCollection.getAll();
			
			List<AuxiliaryBean> beanList = new ArrayList<AuxiliaryBean>();
			for (AuxiliaryData data : datas) {
				AuxiliaryBean bean = new AuxiliaryBean();
				bean.country = data.getCountry();
				bean.lastName = data.getLastName();
				bean.civility = data.getCivility();
				bean.city = data.getCity();
				bean.lastUpdateDate = data.getLastUpdateDate();
				bean.postalCode = data.getPostalCode();
				bean.isTutoSkipped = data.getIsTutoSkipped();
				bean.description = data.getDescription();
				bean.socialNumber = data.getSocialNumber();
				bean.accountExpiryDate = data.getAccountExpiryDate();
				bean.profilProgression = data.getProfilProgression();
				bean.skillShopping = data.getSkillShopping();
				bean.notifyOffersSms = data.getNotifyOffersSms();
				bean.notifyAuxpros = data.getNotifyAuxpros();
				bean.birthCountry = data.getBirthCountry();
				bean.profilCompleted = data.getProfilCompleted();
				bean.addressChecked = data.getAddressChecked();
				bean.diploma = data.getDiploma();
				bean.skillDoityourself = data.getSkillDoityourself();
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
				bean.creationDate = data.getCreationDate();
				bean.birthDate = data.getBirthDate();
				bean.skillChildhood = data.getSkillChildhood();
				bean.skillCompagny = data.getSkillCompagny();
				bean.firstName = data.getFirstName();
				bean.skillAnswers = data.getSkillAnswers();
				bean.nationality = data.getNationality();
				bean.isEntrepreneur = data.getIsEntrepreneur();
				bean.phone = data.getPhone();
				bean.skillAdministrative = data.getSkillAdministrative();
				bean.phoneChecked = data.getPhoneChecked();
				bean.skillHousework = data.getSkillHousework();
				bean.idCardNumber = data.getIdCardNumber();
				bean.notifyOffersMail = data.getNotifyOffersMail();
				
				beanList.add(bean);
			}
			
			return Response.status(Status.OK).entity(beanList.toArray(new AuxiliaryBean[beanList.size()])).build();
			
		} catch (APWebException e) {
			return sendException(e);
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@POST
	@Consumes({MediaType.APPLICATION_JSON})
	public Response postAuxiliary(@Context SecurityContext sc, AuxiliaryCredentialsBean auxiliaryCredentialsBean) {
		try {
			ApauthData dataAuth = ApauthCollection.getByUsername(auxiliaryCredentialsBean.username);
			AuxiliaryData dataEntity;
			if(dataAuth != null) {
				if(dataAuth.getRegistered()) {
					throw APWebException.AP_AUTH_REG_001;
				} else {
					AuxiliaryCollection.deleteByAuthId(dataAuth.id);
					ApauthCollection.delete(dataAuth);
				}
			}
			dataAuth = ApauthCollection.getByEmail(auxiliaryCredentialsBean.email);
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
			dataAuth.setUsername(auxiliaryCredentialsBean.username);
			dataAuth.setPassword(auxiliaryCredentialsBean.password);
			dataAuth.setEmail(auxiliaryCredentialsBean.email);
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
			dataEntity.setCreationDate(TimeHelper.nowDateTimeIntegers());
			dataEntity.setLastUpdateDate(TimeHelper.nowDateTimeIntegers());
			dataEntity.setEmailChecked(auxiliaryCredentialsBean.emailChecked);
			AuxiliaryCollection.create(dataEntity);
			
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
	public Response getAuxiliary(@Context SecurityContext sc, @PathParam("id") final String id) {
		try {
			AuxiliaryData data = AuxiliaryCollection.getById(id);
			if(data == null) {
				return Response.status(Status.NOT_FOUND).build();
			}
			AuxiliaryBean bean = new AuxiliaryBean();
			bean.country = data.getCountry();
			bean.lastName = data.getLastName();
			bean.civility = data.getCivility();
			bean.city = data.getCity();
			bean.lastUpdateDate = data.getLastUpdateDate();
			bean.postalCode = data.getPostalCode();
			bean.isTutoSkipped = data.getIsTutoSkipped();
			bean.description = data.getDescription();
			bean.socialNumber = data.getSocialNumber();
			bean.accountExpiryDate = data.getAccountExpiryDate();
			bean.profilProgression = data.getProfilProgression();
			bean.skillShopping = data.getSkillShopping();
			bean.notifyOffersSms = data.getNotifyOffersSms();
			bean.notifyAuxpros = data.getNotifyAuxpros();
			bean.birthCountry = data.getBirthCountry();
			bean.profilCompleted = data.getProfilCompleted();
			bean.addressChecked = data.getAddressChecked();
			bean.diploma = data.getDiploma();
			bean.skillDoityourself = data.getSkillDoityourself();
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
			bean.creationDate = data.getCreationDate();
			bean.birthDate = data.getBirthDate();
			bean.skillChildhood = data.getSkillChildhood();
			bean.skillCompagny = data.getSkillCompagny();
			bean.firstName = data.getFirstName();
			bean.skillAnswers = data.getSkillAnswers();
			bean.nationality = data.getNationality();
			bean.isEntrepreneur = data.getIsEntrepreneur();
			bean.phone = data.getPhone();
			bean.skillAdministrative = data.getSkillAdministrative();
			bean.phoneChecked = data.getPhoneChecked();
			bean.skillHousework = data.getSkillHousework();
			bean.idCardNumber = data.getIdCardNumber();
			bean.notifyOffersMail = data.getNotifyOffersMail();
			
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
	public Response putAuxiliary(@Context SecurityContext sc, @PathParam("id") final String id, AuxiliaryBean auxiliaryBean) {
		try {
			AuxiliaryHelper.beforePutAuxiliary(sc, id, auxiliaryBean);
			// Get actual data object
			AuxiliaryData data = AuxiliaryCollection.getById(id);
			// Check data exists
			if (data == null) {
				throw new APWebException("auxiliary not found", "AP_AUXILIARY_NOTFOUND", Status.BAD_REQUEST);
			}
			// Update the data object
			data.setLastUpdateDate(TimeHelper.nowDateTimeIntegers());
			data.setCountry(auxiliaryBean.country);
			data.setLastName(auxiliaryBean.lastName);
			data.setCivility(auxiliaryBean.civility);
			data.setCity(auxiliaryBean.city);
			data.setPostalCode(auxiliaryBean.postalCode);
			data.setIsTutoSkipped(auxiliaryBean.isTutoSkipped);
			data.setDescription(auxiliaryBean.description);
			data.setSocialNumber(auxiliaryBean.socialNumber);
			data.setAccountExpiryDate(auxiliaryBean.accountExpiryDate);
			data.setProfilProgression(auxiliaryBean.profilProgression);
			data.setSkillShopping(auxiliaryBean.skillShopping);
			data.setNotifyOffersSms(auxiliaryBean.notifyOffersSms);
			data.setNotifyAuxpros(auxiliaryBean.notifyAuxpros);
			data.setBirthCountry(auxiliaryBean.birthCountry);
			data.setProfilCompleted(auxiliaryBean.profilCompleted);
			data.setAddressChecked(auxiliaryBean.addressChecked);
			data.setDiploma(auxiliaryBean.diploma);
			data.setSkillDoityourself(auxiliaryBean.skillDoityourself);
			data.setLongitude(auxiliaryBean.longitude);
			data.setSkillNursing(auxiliaryBean.skillNursing);
			data.setAddress(auxiliaryBean.address);
			data.setLattitude(auxiliaryBean.lattitude);
			data.setAccountType(auxiliaryBean.accountType);
			data.setNotifyPartners(auxiliaryBean.notifyPartners);
			data.setBirthCity(auxiliaryBean.birthCity);
			data.setAvatar(auxiliaryBean.avatar);
			data.setAreSkillSet(auxiliaryBean.areSkillSet);
			data.setBirthDate(auxiliaryBean.birthDate);
			data.setSkillChildhood(auxiliaryBean.skillChildhood);
			data.setSkillCompagny(auxiliaryBean.skillCompagny);
			data.setFirstName(auxiliaryBean.firstName);
			data.setSkillAnswers(auxiliaryBean.skillAnswers);
			data.setNationality(auxiliaryBean.nationality);
			data.setIsEntrepreneur(auxiliaryBean.isEntrepreneur);
			data.setPhone(auxiliaryBean.phone);
			data.setSkillAdministrative(auxiliaryBean.skillAdministrative);
			data.setPhoneChecked(auxiliaryBean.phoneChecked);
			data.setSkillHousework(auxiliaryBean.skillHousework);
			data.setIdCardNumber(auxiliaryBean.idCardNumber);
			data.setNotifyOffersMail(auxiliaryBean.notifyOffersMail);
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

	@DELETE
	@Path("/{id}")
	public Response deleteAuxiliary(@Context SecurityContext sc, @PathParam("id") final String id) {
		try {
			// Try to delete the entity
			if (!AuxiliaryCollection.deleteById(id)) {
				throw new APWebException("auxiliary not found", "AP_AUXILIARY_NOTFOUND", Status.BAD_REQUEST);
			}
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

	@GET
	@Path("/{auxiliaryId}/services")
	@Produces({MediaType.APPLICATION_JSON})
	public Response getAuxiliaryServices(@Context SecurityContext sc, @PathParam("auxiliaryId") final String auxiliaryId) {
		try {
			List<ServiceData> datas = ServiceCollection.get(and(eq("auxiliaryId", auxiliaryId)));
			
			List<ServiceBean> beanList = new ArrayList<ServiceBean>();
			for (ServiceData data : datas) {
				ServiceBean bean = new ServiceBean();
				bean.country = data.getCountry();
				bean.address = data.getAddress();
				bean.city = data.getCity();
				bean.lattitude = data.getLattitude();
				bean.lastUpdateDate = data.getLastUpdateDate();
				bean.accountType = data.getAccountType();
				bean.postalCode = data.getPostalCode();
				bean.isTutoSkipped = data.getIsTutoSkipped();
				bean.notifyPartners = data.getNotifyPartners();
				bean.avatar = data.getAvatar();
				bean.accountExpiryDate = data.getAccountExpiryDate();
				bean.creationDate = data.getCreationDate();
				bean.siret = data.getSiret();
				bean.notifyAuxpros = data.getNotifyAuxpros();
				bean.phone = data.getPhone();
				bean.phoneChecked = data.getPhoneChecked();
				bean.function = data.getFunction();
				bean.profilCompleted = data.getProfilCompleted();
				bean.addressChecked = data.getAddressChecked();
				bean.id = data.getId();
				bean.socialReason = data.getSocialReason();
				bean.longitude = data.getLongitude();
				
				beanList.add(bean);
			}
			
			return Response.status(Status.OK).entity(beanList.toArray(new ServiceBean[beanList.size()])).build();
			
		} catch (APWebException e) {
			return sendException(e);
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@GET
	@Path("/{auxiliaryId}/customers")
	@Produces({MediaType.APPLICATION_JSON})
	public Response getAuxiliaryCustomers(@Context SecurityContext sc, @PathParam("auxiliaryId") final String auxiliaryId) {
		try {
			List<CustomerData> datas = CustomerCollection.get(and(eq("auxiliaryId", auxiliaryId)));
			
			List<CustomerBean> beanList = new ArrayList<CustomerBean>();
			for (CustomerData data : datas) {
				CustomerBean bean = new CustomerBean();
				bean.lastName = data.getLastName();
				bean.country = data.getCountry();
				bean.civility = data.getCivility();
				bean.address = data.getAddress();
				bean.skillNursing = data.getSkillNursing();
				bean.city = data.getCity();
				bean.lattitude = data.getLattitude();
				bean.lastUpdateDate = data.getLastUpdateDate();
				bean.postalCode = data.getPostalCode();
				bean.creationDate = data.getCreationDate();
				bean.birthDate = data.getBirthDate();
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
				bean.serviceId = data.getServiceId();
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
	@Path("/{auxiliaryId}/interventions")
	@Produces({MediaType.APPLICATION_JSON})
	public Response getAuxiliaryInterventions(@Context SecurityContext sc, @PathParam("auxiliaryId") final String auxiliaryId) {
		try {
			List<InterventionData> datas = InterventionCollection.get(and(eq("auxiliaryId", auxiliaryId)));
			
			List<InterventionBean> beanList = new ArrayList<InterventionBean>();
			for (InterventionData data : datas) {
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
	public Response getAuxiliaryOffers(@Context SecurityContext sc, @PathParam("auxiliaryId") final String auxiliaryId) {
		try {
			List<OfferData> datas = OfferCollection.get(and(eq("auxiliaryId", auxiliaryId)));
			
			List<OfferBean> beanList = new ArrayList<OfferBean>();
			for (OfferData data : datas) {
				OfferBean bean = new OfferBean();
				bean.auxStatus = data.getAuxStatus();
				bean.auxStatusChanged = data.getAuxStatusChanged();
				bean.hideToAux = data.getHideToAux();
				bean.auxiliaryId = data.getAuxiliaryId();
				bean.lastUpdateDate = data.getLastUpdateDate();
				bean.sadStatusChanged = data.getSadStatusChanged();
				bean.creationDate = data.getCreationDate();
				bean.customerId = data.getCustomerId();
				bean.sadStatus = data.getSadStatus();
				bean.id = data.getId();
				bean.serviceId = data.getServiceId();
				bean.hideToSad = data.getHideToSad();
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
	@Path("/{auxiliaryId}/missions")
	@Produces({MediaType.APPLICATION_JSON})
	public Response getAuxiliaryMissions(@Context SecurityContext sc, @PathParam("auxiliaryId") final String auxiliaryId) {
		try {
			List<MissionData> datas = MissionCollection.get(and(eq("auxiliaryId", auxiliaryId)));
			
			List<MissionBean> beanList = new ArrayList<MissionBean>();
			for (MissionData data : datas) {
				MissionBean bean = new MissionBean();
				bean.date = data.getDate();
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
	public Response getAuxiliaryIndisponibilitys(@Context SecurityContext sc, @PathParam("auxiliaryId") final String auxiliaryId) {
		try {
			List<IndisponibilityData> datas = IndisponibilityCollection.get(and(eq("auxiliaryId", auxiliaryId)));
			
			List<IndisponibilityBean> beanList = new ArrayList<IndisponibilityBean>();
			for (IndisponibilityData data : datas) {
				IndisponibilityBean bean = new IndisponibilityBean();
				bean.period = data.getPeriod();
				bean.auxiliaryId = data.getAuxiliaryId();
				bean.endDate = data.getEndDate();
				bean.lastUpdateDate = data.getLastUpdateDate();
				bean.days = data.getDays();
				bean.startTime = data.getStartTime();
				bean.endTime = data.getEndTime();
				bean.id = data.getId();
				bean.creationDate = data.getCreationDate();
				bean.startDate = data.getStartDate();
				
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
	public Response getAuxiliaryGeozones(@Context SecurityContext sc, @PathParam("auxiliaryId") final String auxiliaryId) {
		try {
			List<GeozoneData> datas = GeozoneCollection.get(and(eq("auxiliaryId", auxiliaryId)));
			
			List<GeozoneBean> beanList = new ArrayList<GeozoneBean>();
			for (GeozoneData data : datas) {
				GeozoneBean bean = new GeozoneBean();
				bean.auxiliaryId = data.getAuxiliaryId();
				bean.address = data.getAddress();
				bean.lattitude = data.getLattitude();
				bean.city = data.getCity();
				bean.lastUpdateDate = data.getLastUpdateDate();
				bean.postalCode = data.getPostalCode();
				bean.id = data.getId();
				bean.type = data.getType();
				bean.radius = data.getRadius();
				bean.creationDate = data.getCreationDate();
				bean.longitude = data.getLongitude();
				
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
