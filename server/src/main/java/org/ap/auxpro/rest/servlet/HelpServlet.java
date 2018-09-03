package org.ap.auxpro.rest.servlet;

import javax.ws.rs.*;
import javax.ws.rs.core.*;
import javax.ws.rs.core.Response.*;
import org.ap.common.web.servlet.APServletBase;
import io.swagger.annotations.Api;
import org.ap.auxpro.bean.HelpTopicBean;
import org.ap.auxpro.storage.helptopic.HelptopicData;
import org.ap.auxpro.storage.helptopic.HelptopicCollection;
import org.ap.common.exception.APWebException;
import org.bson.conversions.Bson;
import static com.mongodb.client.model.Filters.*;
import org.ap.auxpro.storage.helptopic.HelptopicFields;
import java.util.List;
import java.util.ArrayList;
import org.ap.auxpro.bean.HelpFaqBean;
import org.ap.auxpro.storage.helpfaq.HelpfaqData;
import org.ap.auxpro.storage.helpfaq.HelpfaqCollection;
import org.ap.auxpro.storage.helpfaq.HelpfaqFields;

/* This class was auto-generated by the JavaWriter */
@Path("/help")
@Api(value="help")
public class HelpServlet extends APServletBase {

	public static final String PATH = "/help";

	@GET
	@Path("/topics")
	@Produces({MediaType.APPLICATION_JSON})
	public Response getHelpTopics(@Context SecurityContext sc, @Context UriInfo info) {
		try {
			List<Bson> conditions = loadQueryFilter(info.getQueryParameters(), HelptopicFields.class);
			
			List<HelptopicData> datas = null;
			if (conditions.size() > 0) {
				datas = HelptopicCollection.get(and(conditions));
			} else {
				datas = HelptopicCollection.getAll();
			}
			
			List<HelpTopicBean> beanList = new ArrayList<HelpTopicBean>();
			for (HelptopicData data : datas) {
				HelpTopicBean bean = new HelpTopicBean(data);
				beanList.add(bean);
			}
			
			return Response.status(Status.OK).entity(beanList).build();
			
		} catch (APWebException e) {
			return sendException(e);
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@GET
	@Path("/faqs")
	@Produces({MediaType.APPLICATION_JSON})
	public Response getHelpFaqs(@Context SecurityContext sc, @Context UriInfo info) {
		try {
			List<Bson> conditions = loadQueryFilter(info.getQueryParameters(), HelpfaqFields.class);
			
			List<HelpfaqData> datas = null;
			if (conditions.size() > 0) {
				datas = HelpfaqCollection.get(and(conditions));
			} else {
				datas = HelpfaqCollection.getAll();
			}
			
			List<HelpFaqBean> beanList = new ArrayList<HelpFaqBean>();
			for (HelpfaqData data : datas) {
				HelpFaqBean bean = new HelpFaqBean(data);
				beanList.add(bean);
			}
			
			return Response.status(Status.OK).entity(beanList).build();
			
		} catch (APWebException e) {
			return sendException(e);
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

}
