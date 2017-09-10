package org.ap.auxpro.helpers;

public class AuxiliaryMatchScore {
	public String auxiliaryId;
	public int geoScore;
	public int timeScore;
	public int skillScore;
	
	public Integer getTotal() {
		if (timeScore == 0) return 0;
		return geoScore + timeScore + skillScore;
	}
}
