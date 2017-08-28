import Skills from 'utils/constants/Skills'

class SkillUtils {

	static getName(skill) {
		switch (skill) {
			case Skills.SKILLHOUSEWORK: return 'Entretien maison'
			case Skills.SKILLCHILDHOOD: return 'Aide petite enfance'
			case Skills.SKILLSHOPPING: return 'Courses & aide au repas'
			case Skills.SKILLNURSING: return 'Nursing'
			case Skills.SKILLCOMPAGNY: return 'Dame de compagnie'
			case Skills.SKILLADMINISTRATIVE: return 'Aide administrative'
			case Skills.SKILLDOITYOURSELF: return 'Petit bricolage'
		}
	}
}
export default SkillUtils