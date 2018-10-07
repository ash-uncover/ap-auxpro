package org.ap.auxpro.helpers;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import org.ap.auxpro.constants.EAuxiliaryDiploma;
import org.ap.auxpro.constants.EAuxiliarySkills;
import org.ap.auxpro.constants.EPeopleCategory;

public class DiplomaHelper {

	public static Set<EPeopleCategory> getDiplomaCategories(EAuxiliaryDiploma diploma) {
		Set<EPeopleCategory> result = new HashSet<EPeopleCategory>();
		switch (diploma) {
		case _DIPLOMA_AAPAPD:
			break;
		case _DIPLOMA_ADVF:
			break;
		case _DIPLOMA_ASSITANT_MATERNEL:
			break;
		case _DIPLOMA_AUXILIAIRE_PUERI:
			break;
		case _DIPLOMA_BAC_ASSP:
			break;
		case _DIPLOMA_BEP_ACCOMPAGNEMENT:
			break;
		case _DIPLOMA_BEPA:
			break;
		case _DIPLOMA_CAP_ASSITANT:
			break;
		case _DIPLOMA_CAP_ENFANCE:
			break;
		case _DIPLOMA_CAPA:
			break;
		case _DIPLOMA_DEAES:
			break;
		case _DIPLOMA_DEAF:
			break;
		case _DIPLOMA_DEAMP:
			break;
		case _DIPLOMA_DEAS:
			break;
		case _DIPLOMA_DEAVS:
			break;
		case _DIPLOMA_DEEJE:
			break;
		case _DIPLOMA_FAMILY:
			break;
		case _DIPLOMA_MENTION:
			break;
		case _DIPLOMA_TITRE_PRO:
			break;
		case _NO_DIPLOMA:
			break;
		default:
			break;
		}
		return result;
	}
	
	public static Set<EPeopleCategory> getDiplomaCategories(Collection<EAuxiliaryDiploma> diplomas) {
		Set<EPeopleCategory> result = new HashSet<EPeopleCategory>();
		for (EAuxiliaryDiploma diploma : diplomas) {
			result.addAll(DiplomaHelper.getDiplomaCategories(diploma));
		}
		return result;
	}
	
	public static Set<EAuxiliarySkills> getDiplomaSkills(EAuxiliaryDiploma diploma) {
		Set<EAuxiliarySkills> result = new HashSet<EAuxiliarySkills>();
		switch (diploma) {
		case _DIPLOMA_AAPAPD:
			break;
		case _DIPLOMA_ADVF:
			break;
		case _DIPLOMA_ASSITANT_MATERNEL:
			break;
		case _DIPLOMA_AUXILIAIRE_PUERI:
			break;
		case _DIPLOMA_BAC_ASSP:
			break;
		case _DIPLOMA_BEP_ACCOMPAGNEMENT:
			break;
		case _DIPLOMA_BEPA:
			break;
		case _DIPLOMA_CAP_ASSITANT:
			break;
		case _DIPLOMA_CAP_ENFANCE:
			break;
		case _DIPLOMA_CAPA:
			break;
		case _DIPLOMA_DEAES:
			break;
		case _DIPLOMA_DEAF:
			break;
		case _DIPLOMA_DEAMP:
			break;
		case _DIPLOMA_DEAS:
			break;
		case _DIPLOMA_DEAVS:
			break;
		case _DIPLOMA_DEEJE:
			break;
		case _DIPLOMA_FAMILY:
			break;
		case _DIPLOMA_MENTION:
			break;
		case _DIPLOMA_TITRE_PRO:
			break;
		case _NO_DIPLOMA:
			result.add(EAuxiliarySkills._SKILL_BEAUTY);
			break;
		default:
			break;
		}
		return result;
	}
	
	public static Set<EAuxiliarySkills> getDiplomaSkills(Collection<EAuxiliaryDiploma> diplomas) {
		Set<EAuxiliarySkills> result = new HashSet<EAuxiliarySkills>();
		for (EAuxiliaryDiploma diploma : diplomas) {
			result.addAll(DiplomaHelper.getDiplomaSkills(diploma));
		}
		return result;
	}

	public static Set<EAuxiliarySkills> getCategorySkills(EPeopleCategory category) {
		Set<EAuxiliarySkills> result = new HashSet<EAuxiliarySkills>();
		switch (category) {
		case _AUTONOMOUS:
			break;
		case _CHILDREN:
			break;
		case _HANDICAP:
			break;
		case _OLD_PEOPLE:
			break;
		default:
			break;
		}
		return result;
	}
	
	public static Set<EAuxiliarySkills> getCategorySkills(Collection<EPeopleCategory> categories) {
		Set<EAuxiliarySkills> result = new HashSet<EAuxiliarySkills>();
		for (EPeopleCategory category: categories) {
			result.addAll(DiplomaHelper.getCategorySkills(category));
		}
		return result;
	}
	
	public static Set<EAuxiliaryDiploma> getCategoryDiplomas(EPeopleCategory category) {
		Set<EAuxiliaryDiploma> result = new HashSet<EAuxiliaryDiploma>();
		switch (category) {
		case _AUTONOMOUS:
			break;
		case _CHILDREN:
			break;
		case _HANDICAP:
			break;
		case _OLD_PEOPLE:
			break;
		default:
			break;
		}
		return result;
	}
	
	public static Set<EAuxiliaryDiploma> getCategoryDiplomas(Collection<EPeopleCategory> categories) {
		Set<EAuxiliaryDiploma> result = new HashSet<EAuxiliaryDiploma>();
		for (EPeopleCategory category: categories) {
			result.addAll(DiplomaHelper.getCategoryDiplomas(category));
		}
		return result;
	}
}
