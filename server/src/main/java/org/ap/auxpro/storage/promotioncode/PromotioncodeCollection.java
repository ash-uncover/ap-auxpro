package org.ap.auxpro.storage.promotioncode;

import static com.mongodb.client.model.Filters.*;
import org.bson.Document;
import org.bson.conversions.Bson;
import org.ap.common.mongo.Mongo;
import org.ap.common.exception.APWebException;
import java.util.List;
import java.util.ArrayList;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.result.DeleteResult;

/* This class was auto-generated by the JavaWriter */
public class PromotioncodeCollection {

	public static MongoCollection<Document> getCollection() throws APWebException {
		return Mongo.get().collection("promotioncode");
	}

	public static PromotioncodeData getByName(String name) throws APWebException {
		Document document = getCollection().find(eq("name", name)).first();
		return fromDocument(document);
	}

	public static boolean deleteByName(String name) throws APWebException {
		Document document = getCollection().findOneAndDelete(eq("name", name));
		return document != null;
	}

	public static PromotioncodeData getById(String id) throws APWebException {
		Document document = getCollection().find(eq("id", id)).first();
		return fromDocument(document);
	}

	public static boolean deleteById(String id) throws APWebException {
		Document document = getCollection().findOneAndDelete(eq("id", id));
		return document != null;
	}

	public static List<PromotioncodeData> getAll() throws APWebException {
		FindIterable<Document> documents = getCollection().find();
		List<PromotioncodeData> result = new ArrayList<PromotioncodeData>();
		for (Document document: documents){
			result.add(fromDocument(document));
		}
		return result;
	}

	public static List<PromotioncodeData> get(Bson condition) throws APWebException {
		FindIterable<Document> documents = getCollection().find(condition);
		List<PromotioncodeData> result = new ArrayList<PromotioncodeData>();
		for (Document document: documents){
			result.add(fromDocument(document));
		}
		return result;
	}

	public static void create(PromotioncodeData data) throws APWebException {
		Document document = toDocument(data);
		getCollection().insertOne(document);
	}

	public static boolean update(PromotioncodeData data) throws APWebException {
		Document document = toDocument(data);
		Document result = getCollection().findOneAndUpdate(eq("id", data.getId()), new Document("$set", document));
		return result != null;
	}

	public static boolean updateNull(PromotioncodeData data) throws APWebException {
		Document document = toNullDocument(data);
		Document result = getCollection().findOneAndUpdate(eq("id", data.getId()), new Document("$set", document));
		return result != null;
	}

	public static boolean delete(PromotioncodeData data) throws APWebException {
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

	public static PromotioncodeData fromDocument(Document document) {
		if(document == null) {
			return null;
		}
		PromotioncodeData data = new PromotioncodeData();
		data.lastUpdateDate = document.getDate("lastUpdateDate");
		data.validityDate = document.getDate("validityDate");
		data.name = document.getString("name");
		data.id = document.getString("id");
		data.creationDate = document.getDate("creationDate");
		return data;
	}

	public static Document toDocument(PromotioncodeData promotioncode) {
		Document document = new Document();
		if (promotioncode.lastUpdateDate != null)
			document.append("lastUpdateDate", promotioncode.lastUpdateDate);
		if (promotioncode.validityDate != null)
			document.append("validityDate", promotioncode.validityDate);
		if (promotioncode.name != null)
			document.append("name", promotioncode.name);
		if (promotioncode.id != null)
			document.append("id", promotioncode.id);
		if (promotioncode.creationDate != null)
			document.append("creationDate", promotioncode.creationDate);
		return document;
	}

	public static Document toNullDocument(PromotioncodeData promotioncode) {
		Document document = new Document();
		document.append("lastUpdateDate", promotioncode.lastUpdateDate);
		document.append("validityDate", promotioncode.validityDate);
		document.append("name", promotioncode.name);
		document.append("id", promotioncode.id);
		document.append("creationDate", promotioncode.creationDate);
		return document;
	}

}
