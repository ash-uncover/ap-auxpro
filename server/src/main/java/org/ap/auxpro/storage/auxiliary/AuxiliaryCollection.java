package org.ap.auxpro.storage.auxiliary;

import static com.mongodb.client.model.Filters.*;
import org.bson.Document;
import org.bson.conversions.Bson;
import org.ap.common.mongo.Mongo;
import org.ap.common.web.exception.APWebException;
import java.util.List;
import java.util.ArrayList;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.result.DeleteResult;

/* This class was auto-generated by the JavaWriter */
public class AuxiliaryCollection {

	public static MongoCollection<Document> getCollection() throws APWebException {
		return Mongo.get().collection("auxiliary");
	}

	public static AuxiliaryData getByAuthId(String authId) throws APWebException {
		Document document = getCollection().find(eq("authId", authId)).first();
		return fromDocument(document);
	}

	public static boolean deleteByAuthId(String authId) throws APWebException {
		Document document = getCollection().findOneAndDelete(eq("authId", authId));
		return document != null;
	}

	public static AuxiliaryData getById(String id) throws APWebException {
		Document document = getCollection().find(eq("id", id)).first();
		return fromDocument(document);
	}

	public static boolean deleteById(String id) throws APWebException {
		Document document = getCollection().findOneAndDelete(eq("id", id));
		return document != null;
	}

	public static List<AuxiliaryData> getAll() throws APWebException {
		FindIterable<Document> documents = getCollection().find();
		List<AuxiliaryData> result = new ArrayList<AuxiliaryData>();
		for (Document document: documents){
			result.add(fromDocument(document));
		}
		return result;
	}

	public static List<AuxiliaryData> get(Bson condition) throws APWebException {
		FindIterable<Document> documents = getCollection().find(condition);
		List<AuxiliaryData> result = new ArrayList<AuxiliaryData>();
		for (Document document: documents){
			result.add(fromDocument(document));
		}
		return result;
	}

	public static void create(AuxiliaryData data) throws APWebException {
		Document document = toDocument(data);
		getCollection().insertOne(document);
	}

	public static boolean update(AuxiliaryData data) throws APWebException {
		Document document = toDocument(data);
		Document result = getCollection().findOneAndUpdate(eq("id", data.getId()), new Document("$set", document));
		return result != null;
	}

	public static boolean updateNull(AuxiliaryData data) throws APWebException {
		Document document = toNullDocument(data);
		Document result = getCollection().findOneAndUpdate(eq("id", data.getId()), new Document("$set", document));
		return result != null;
	}

	public static boolean delete(AuxiliaryData data) throws APWebException {
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
	public static AuxiliaryData fromDocument(Document document) {
		if(document == null) {
			return null;
		}
		AuxiliaryData data = new AuxiliaryData();
		data.authId = document.getString("authId");
		data.country = document.getString("country");
		data.lastName = document.getString("lastName");
		data.civility = document.getString("civility");
		data.city = document.getString("city");
		data.skillChildrenGame = document.getInteger("skillChildrenGame");
		data.skillHouse = document.getInteger("skillHouse");
		data.lastUpdateDate = document.getDate("lastUpdateDate");
		data.postalCode = document.getString("postalCode");
		data.isTutoSkipped = document.getBoolean("isTutoSkipped");
		data.description = document.getString("description");
		data.socialNumber = document.getString("socialNumber");
		data.accountExpiryDate = document.getDate("accountExpiryDate");
		data.profilProgression = document.getInteger("profilProgression");
		data.skillBeauty = document.getInteger("skillBeauty");
		data.notifyOffersSms = document.getBoolean("notifyOffersSms");
		data.notifyAuxpros = document.getBoolean("notifyAuxpros");
		data.skillHandicap = document.getInteger("skillHandicap");
		data.skillIllness = document.getInteger("skillIllness");
		data.birthCountry = document.getString("birthCountry");
		data.skillChildrenSchool = document.getInteger("skillChildrenSchool");
		data.profilCompleted = document.getBoolean("profilCompleted");
		data.id = document.getString("id");
		data.diploma = (List<String>)document.get("diploma");
		data.skillChildrenKeep = document.getInteger("skillChildrenKeep");
		data.skillOldCare = document.getInteger("skillOldCare");
		data.longitude = document.getDouble("longitude");
		data.address = document.getString("address");
		data.skillNursing = document.getInteger("skillNursing");
		data.skillChildrenCare = document.getInteger("skillChildrenCare");
		data.lattitude = document.getDouble("lattitude");
		data.skillFood = document.getInteger("skillFood");
		data.accountType = document.getString("accountType");
		data.notifyPartners = document.getBoolean("notifyPartners");
		data.birthCity = document.getString("birthCity");
		data.avatar = document.getString("avatar");
		data.creationDate = document.getDate("creationDate");
		data.skillCompany = document.getInteger("skillCompany");
		data.birthDate = document.getDate("birthDate");
		data.firstName = document.getString("firstName");
		data.nationality = document.getString("nationality");
		data.isEntrepreneur = document.getString("isEntrepreneur");
		data.phone = document.getString("phone");
		data.skillTransport = document.getInteger("skillTransport");
		data.skillClothes = document.getInteger("skillClothes");
		data.notifyOffersMail = document.getBoolean("notifyOffersMail");
		data.skillPet = document.getInteger("skillPet");
		return data;
	}

	public static Document toDocument(AuxiliaryData auxiliary) {
		Document document = new Document();
		if (auxiliary.authId != null)
			document.append("authId", auxiliary.authId);
		if (auxiliary.country != null)
			document.append("country", auxiliary.country);
		if (auxiliary.lastName != null)
			document.append("lastName", auxiliary.lastName);
		if (auxiliary.civility != null)
			document.append("civility", auxiliary.civility);
		if (auxiliary.city != null)
			document.append("city", auxiliary.city);
		if (auxiliary.skillChildrenGame != null)
			document.append("skillChildrenGame", auxiliary.skillChildrenGame);
		if (auxiliary.skillHouse != null)
			document.append("skillHouse", auxiliary.skillHouse);
		if (auxiliary.lastUpdateDate != null)
			document.append("lastUpdateDate", auxiliary.lastUpdateDate);
		if (auxiliary.postalCode != null)
			document.append("postalCode", auxiliary.postalCode);
		if (auxiliary.isTutoSkipped != null)
			document.append("isTutoSkipped", auxiliary.isTutoSkipped);
		if (auxiliary.description != null)
			document.append("description", auxiliary.description);
		if (auxiliary.socialNumber != null)
			document.append("socialNumber", auxiliary.socialNumber);
		if (auxiliary.accountExpiryDate != null)
			document.append("accountExpiryDate", auxiliary.accountExpiryDate);
		if (auxiliary.profilProgression != null)
			document.append("profilProgression", auxiliary.profilProgression);
		if (auxiliary.skillBeauty != null)
			document.append("skillBeauty", auxiliary.skillBeauty);
		if (auxiliary.notifyOffersSms != null)
			document.append("notifyOffersSms", auxiliary.notifyOffersSms);
		if (auxiliary.notifyAuxpros != null)
			document.append("notifyAuxpros", auxiliary.notifyAuxpros);
		if (auxiliary.skillHandicap != null)
			document.append("skillHandicap", auxiliary.skillHandicap);
		if (auxiliary.skillIllness != null)
			document.append("skillIllness", auxiliary.skillIllness);
		if (auxiliary.birthCountry != null)
			document.append("birthCountry", auxiliary.birthCountry);
		if (auxiliary.skillChildrenSchool != null)
			document.append("skillChildrenSchool", auxiliary.skillChildrenSchool);
		if (auxiliary.profilCompleted != null)
			document.append("profilCompleted", auxiliary.profilCompleted);
		if (auxiliary.id != null)
			document.append("id", auxiliary.id);
		if (auxiliary.diploma != null)
			document.append("diploma", auxiliary.diploma);
		if (auxiliary.skillChildrenKeep != null)
			document.append("skillChildrenKeep", auxiliary.skillChildrenKeep);
		if (auxiliary.skillOldCare != null)
			document.append("skillOldCare", auxiliary.skillOldCare);
		if (auxiliary.longitude != null)
			document.append("longitude", auxiliary.longitude);
		if (auxiliary.address != null)
			document.append("address", auxiliary.address);
		if (auxiliary.skillNursing != null)
			document.append("skillNursing", auxiliary.skillNursing);
		if (auxiliary.skillChildrenCare != null)
			document.append("skillChildrenCare", auxiliary.skillChildrenCare);
		if (auxiliary.lattitude != null)
			document.append("lattitude", auxiliary.lattitude);
		if (auxiliary.skillFood != null)
			document.append("skillFood", auxiliary.skillFood);
		if (auxiliary.accountType != null)
			document.append("accountType", auxiliary.accountType);
		if (auxiliary.notifyPartners != null)
			document.append("notifyPartners", auxiliary.notifyPartners);
		if (auxiliary.birthCity != null)
			document.append("birthCity", auxiliary.birthCity);
		if (auxiliary.avatar != null)
			document.append("avatar", auxiliary.avatar);
		if (auxiliary.creationDate != null)
			document.append("creationDate", auxiliary.creationDate);
		if (auxiliary.skillCompany != null)
			document.append("skillCompany", auxiliary.skillCompany);
		if (auxiliary.birthDate != null)
			document.append("birthDate", auxiliary.birthDate);
		if (auxiliary.firstName != null)
			document.append("firstName", auxiliary.firstName);
		if (auxiliary.nationality != null)
			document.append("nationality", auxiliary.nationality);
		if (auxiliary.isEntrepreneur != null)
			document.append("isEntrepreneur", auxiliary.isEntrepreneur);
		if (auxiliary.phone != null)
			document.append("phone", auxiliary.phone);
		if (auxiliary.skillTransport != null)
			document.append("skillTransport", auxiliary.skillTransport);
		if (auxiliary.skillClothes != null)
			document.append("skillClothes", auxiliary.skillClothes);
		if (auxiliary.notifyOffersMail != null)
			document.append("notifyOffersMail", auxiliary.notifyOffersMail);
		if (auxiliary.skillPet != null)
			document.append("skillPet", auxiliary.skillPet);
		return document;
	}

	public static Document toNullDocument(AuxiliaryData auxiliary) {
		Document document = new Document();
		document.append("authId", auxiliary.authId);
		document.append("country", auxiliary.country);
		document.append("lastName", auxiliary.lastName);
		document.append("civility", auxiliary.civility);
		document.append("city", auxiliary.city);
		document.append("skillChildrenGame", auxiliary.skillChildrenGame);
		document.append("skillHouse", auxiliary.skillHouse);
		document.append("lastUpdateDate", auxiliary.lastUpdateDate);
		document.append("postalCode", auxiliary.postalCode);
		document.append("isTutoSkipped", auxiliary.isTutoSkipped);
		document.append("description", auxiliary.description);
		document.append("socialNumber", auxiliary.socialNumber);
		document.append("accountExpiryDate", auxiliary.accountExpiryDate);
		document.append("profilProgression", auxiliary.profilProgression);
		document.append("skillBeauty", auxiliary.skillBeauty);
		document.append("notifyOffersSms", auxiliary.notifyOffersSms);
		document.append("notifyAuxpros", auxiliary.notifyAuxpros);
		document.append("skillHandicap", auxiliary.skillHandicap);
		document.append("skillIllness", auxiliary.skillIllness);
		document.append("birthCountry", auxiliary.birthCountry);
		document.append("skillChildrenSchool", auxiliary.skillChildrenSchool);
		document.append("profilCompleted", auxiliary.profilCompleted);
		document.append("id", auxiliary.id);
		document.append("diploma", auxiliary.diploma);
		document.append("skillChildrenKeep", auxiliary.skillChildrenKeep);
		document.append("skillOldCare", auxiliary.skillOldCare);
		document.append("longitude", auxiliary.longitude);
		document.append("address", auxiliary.address);
		document.append("skillNursing", auxiliary.skillNursing);
		document.append("skillChildrenCare", auxiliary.skillChildrenCare);
		document.append("lattitude", auxiliary.lattitude);
		document.append("skillFood", auxiliary.skillFood);
		document.append("accountType", auxiliary.accountType);
		document.append("notifyPartners", auxiliary.notifyPartners);
		document.append("birthCity", auxiliary.birthCity);
		document.append("avatar", auxiliary.avatar);
		document.append("creationDate", auxiliary.creationDate);
		document.append("skillCompany", auxiliary.skillCompany);
		document.append("birthDate", auxiliary.birthDate);
		document.append("firstName", auxiliary.firstName);
		document.append("nationality", auxiliary.nationality);
		document.append("isEntrepreneur", auxiliary.isEntrepreneur);
		document.append("phone", auxiliary.phone);
		document.append("skillTransport", auxiliary.skillTransport);
		document.append("skillClothes", auxiliary.skillClothes);
		document.append("notifyOffersMail", auxiliary.notifyOffersMail);
		document.append("skillPet", auxiliary.skillPet);
		return document;
	}

}
