package org.ap.auxpro.helpers;

import static com.mongodb.client.model.Filters.and;
import static com.mongodb.client.model.Filters.eq;

import java.time.LocalDate;

import javax.ws.rs.core.SecurityContext;

import org.ap.auxpro.bean.OfferBean;
import org.ap.auxpro.internal.MailSender;
import org.ap.common.TimeHelper;
import org.ap.web.internal.APWebException;
import org.ap.web.internal.UUIDGenerator;
import org.ap.web.storage.Mongo;
import org.bson.Document;

import com.mongodb.MongoWriteException;

public class OfferHelper {

	public static Object createOffer(SecurityContext sc, OfferBean offerBean) throws APWebException {
		String result = "";
		try {
			// Insert the new offer in database
			Document document = new Document();
			String id = UUIDGenerator.nextId();
			document.append("id", id);
			document.append("auxiliaryId", offerBean.auxiliaryId);
			document.append("hideToAux", offerBean.hideToAux);
			document.append("customerId", offerBean.customerId);
			document.append("serviceId", offerBean.serviceId);
			document.append("creationDate", TimeHelper.toIntegers(LocalDate.now()));
			document.append("interventionId", offerBean.interventionId);
			document.append("hideToSad", offerBean.hideToSad);
			document.append("sadStatus", "PENDING");
			document.append("sadStatusChanged", TimeHelper.toIntegers(LocalDate.now()));
			Mongo.get().collection("offer").insertOne(document);			
			result = "{\"id\": \"" + id + "\"}";
		} catch (MongoWriteException e) {
			throw APWebException.MONGO_WRITE_EXCEPTION;
		}
		try {
			// Send notification mail if needed
			Document documentAuxiliary = Mongo.get().collection("auxiliary").find(and(eq("id", offerBean.auxiliaryId))).first();
			boolean notify = documentAuxiliary.getBoolean("notifyOffersMail");
			if (notify) {
				MailSender.sendAuxiliaryOffer(documentAuxiliary.getString("email"), documentAuxiliary.getString("firstName"));
			}
		} catch (Exception e) {
			// Still the offer was created so we dont want to crash here
			e.printStackTrace();
		}		
		return result;
	}

	public static Object putOffer(SecurityContext sc, String id, OfferBean offerBean) throws APWebException {
		// TODO Auto-generated method stub
		return null;
	}

}
