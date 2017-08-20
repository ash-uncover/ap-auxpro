package org.ap.auxpro.storage;

import org.bson.Document;
import org.bson.conversions.Bson;
import org.ap.web.storage.Mongo;
import static com.mongodb.client.model.Filters.*;
import org.ap.web.internal.APWebException;
import java.util.List;
import java.util.ArrayList;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.result.DeleteResult;

/* This class was auto-generated by the JavaWriter */
public class MissionCollection {

	public static MongoCollection<Document> getCollection() throws APWebException {
		return Mongo.get().collection("mission");
	}

	public static MissionData getById(String id) throws APWebException {
		Document document = getCollection().find(eq("id", id)).first();
		return fromDocument(document);
	}

	public static boolean deleteById(String id) throws APWebException {
		Document document = getCollection().findOneAndDelete(eq("id", id));
		return document != null;
	}

	public static List<MissionData> getAll() throws APWebException {
		FindIterable<Document> documents = getCollection().find();
		List<MissionData> result = new ArrayList<MissionData>();
		for (Document document: documents){
			result.add(fromDocument(document));
		}
		return result;
	}

	public static List<MissionData> get(Bson condition) throws APWebException {
		FindIterable<Document> documents = getCollection().find(condition);
		List<MissionData> result = new ArrayList<MissionData>();
		for (Document document: documents){
			result.add(fromDocument(document));
		}
		return result;
	}

	public static void create(MissionData data) throws APWebException {
		Document document = toDocument(data);
		getCollection().insertOne(document);
	}

	public static boolean update(MissionData data) throws APWebException {
		Document document = toDocument(data);
		Document result = getCollection().findOneAndUpdate(eq("id", data.getId()), new Document("$set", document));
		return result != null;
	}

	public static boolean updateNull(MissionData data) throws APWebException {
		Document document = toNullDocument(data);
		Document result = getCollection().findOneAndUpdate(eq("id", data.getId()), new Document("$set", document));
		return result != null;
	}

	public static boolean delete(MissionData data) throws APWebException {
		Document result = getCollection().findOneAndDelete(eq("id", data.getId()));
		return result != null;
	}

	public static long deleteMany(Bson condition) throws APWebException {
		DeleteResult result = getCollection().deleteMany(condition);
		return result.getDeletedCount();
	}

	public static long drop() throws APWebException {
		long result = getCollection().count();
		getCollection().drop();
		return result;
	}

	@SuppressWarnings("unchecked")
	public static MissionData fromDocument(Document document) {
		if(document == null) {
			return null;
		}
		MissionData data = new MissionData();
		data.date = (List<Integer>)document.get("date");
		data.auxStatus = document.getString("auxStatus");
		data.auxStatusChanged = (List<Integer>)document.get("auxStatusChanged");
		data.auxiliaryId = document.getString("auxiliaryId");
		data.hideToAux = document.getBoolean("hideToAux");
		data.customerId = document.getString("customerId");
		data.sadStatus = document.getString("sadStatus");
		data.sadStatusChanged = (List<Integer>)document.get("sadStatusChanged");
		data.id = document.getString("id");
		data.serviceId = document.getString("serviceId");
		data.interventionId = document.getString("interventionId");
		data.hideToSad = document.getBoolean("hideToSad");
		return data;
	}

	public static Document toDocument(MissionData mission) {
		Document document = new Document();
		if (mission.date != null)
			document.append("date", mission.date);
		if (mission.auxStatus != null)
			document.append("auxStatus", mission.auxStatus);
		if (mission.auxStatusChanged != null)
			document.append("auxStatusChanged", mission.auxStatusChanged);
		if (mission.auxiliaryId != null)
			document.append("auxiliaryId", mission.auxiliaryId);
		if (mission.hideToAux != null)
			document.append("hideToAux", mission.hideToAux);
		if (mission.customerId != null)
			document.append("customerId", mission.customerId);
		if (mission.sadStatus != null)
			document.append("sadStatus", mission.sadStatus);
		if (mission.sadStatusChanged != null)
			document.append("sadStatusChanged", mission.sadStatusChanged);
		if (mission.id != null)
			document.append("id", mission.id);
		if (mission.serviceId != null)
			document.append("serviceId", mission.serviceId);
		if (mission.interventionId != null)
			document.append("interventionId", mission.interventionId);
		if (mission.hideToSad != null)
			document.append("hideToSad", mission.hideToSad);
		return document;
	}

	public static Document toNullDocument(MissionData mission) {
		Document document = new Document();
		document.append("date", mission.date);
		document.append("auxStatus", mission.auxStatus);
		document.append("auxStatusChanged", mission.auxStatusChanged);
		document.append("auxiliaryId", mission.auxiliaryId);
		document.append("hideToAux", mission.hideToAux);
		document.append("customerId", mission.customerId);
		document.append("sadStatus", mission.sadStatus);
		document.append("sadStatusChanged", mission.sadStatusChanged);
		document.append("id", mission.id);
		document.append("serviceId", mission.serviceId);
		document.append("interventionId", mission.interventionId);
		document.append("hideToSad", mission.hideToSad);
		return document;
	}

}
