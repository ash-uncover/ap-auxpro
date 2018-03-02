package org.ap.auxpro.storage;

import java.util.Set;
import java.util.HashSet;

/* This class was auto-generated by the JavaWriter */
public enum ECollections {

	APMAIL (new String[] {}),
	APAUTH (new String[] {}),
	AUXILIARY (new String[] {}),
	CUSTOMER (new String[] {"SERVICE"}),
	GEOZONE (new String[] {"AUXILIARY"}),
	HELPTOPIC (new String[] {}),
	HELPFAQ (new String[] {}),
	INDISPONIBILITY (new String[] {"AUXILIARY"}),
	INTERVENTION (new String[] {"AUXILIARY", "CUSTOMER", "SERVICE"}),
	MISSION (new String[] {"AUXILIARY", "CUSTOMER", "SERVICE", "INTERVENTION"}),
	OFFER (new String[] {"AUXILIARY", "CUSTOMER", "SERVICE", "INTERVENTION"}),
	PROMOTIONCODE (new String[] {}),
	SERVICE (new String[] {}),
	;

	public Set<String> _links;

	private ECollections(String[] links) {
		_links = new HashSet<String>();
		for (String link: links) {
			_links.add(link);
		}
	}

	public String getName() {
		return name().toLowerCase();
	}

}
