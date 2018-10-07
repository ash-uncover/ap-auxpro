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
		for (DiplomaMappings mapping: DiplomaMappings.values()) {
			if (mapping.diploma.equals(diploma)) {
				result.add(mapping.category);
			}
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
		for (DiplomaMappings mapping: DiplomaMappings.values()) {
			if (mapping.diploma.equals(diploma)) {
				result.add(mapping.skill);
			}
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
		for (DiplomaMappings mapping: DiplomaMappings.values()) {
			if (mapping.category.equals(category)) {
				result.add(mapping.skill);
			}
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
		for (DiplomaMappings mapping: DiplomaMappings.values()) {
			if (mapping.category.equals(category)) {
				result.add(mapping.diploma);
			}
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
