import Skills from 'utils/constants/Skills'

class SkillUtils {

	static getName(skill) {
		switch (skill) {
			case Skills.SKILL_HOUSEWORK:
			case Skills.SKILL_HOUSEWORK.key: return 'Entretien maison'
			case Skills.SKILL_CHILDHOOD:
			case Skills.SKILL_CHILDHOOD.key: return 'Aide petite enfance'
			case Skills.SKILL_SHOPPING:
			case Skills.SKILL_SHOPPING.key: return 'Courses & aide au repas'
			case Skills.SKILL_NURSING:
			case Skills.SKILL_NURSING.key: return 'Nursing'
			case Skills.SKILL_COMPAGNY:
			case Skills.SKILL_COMPAGNY.key: return 'Dame de compagnie'
			case Skills.SKILL_ADMINISTRATIVE:
			case Skills.SKILL_ADMINISTRATIVE.key: return 'Aide administrative'
			case Skills.SKILL_DOITYOURSELF:
			case Skills.SKILL_DOITYOURSELF.key: return 'Petit bricolage'
		}
	}
}
export default SkillUtils