import Diploma from 'utils/constants/Diploma'

class DiplomaUtils {

	static getDiplomas() {
		return Diploma.VALUES.reduce(function (filtered, value) { 
			let name = DiplomaUtils.getName(value.key)
			if (name) {
				filtered.push({
					key: value.key,
					value: name
				})
			}
			return filtered
		}, []).sort(function (value1, value2) {
			if (value1.key === Diploma.DIPLOMA_NONE.key) return -1
			if (value2.key === Diploma.DIPLOMA_NONE.key) return 1
			if (value1.key === Diploma.DIPLOMA_STUDY.key) return -1
			if (value2.key === Diploma.DIPLOMA_STUDY.key) return 1
			return (value1.value.localeCompare(value2.value))
		})
	}

	static getName(skill) {
		switch (skill) {
			case Diploma.DIPLOMA_NONE:
			case Diploma.DIPLOMA_NONE.key: return 'Aucun diplôme'
			case Diploma.DIPLOMA_STUDY:
			case Diploma.DIPLOMA_STUDY.key: return 'En formation'
			case Diploma.DIPLOMA_1:
			case Diploma.DIPLOMA_1.key: return "Agent d'accompagnement auprès des personnes âgées et des personnes dépendantes (AAPAPD)"
			case Diploma.DIPLOMA_2:
			case Diploma.DIPLOMA_2.key: return "Animateur en gérontologie"
			case Diploma.DIPLOMA_3:
			case Diploma.DIPLOMA_3.key: return "Assistant informatique et internet à domicile"
			case Diploma.DIPLOMA_4:
			case Diploma.DIPLOMA_4.key: return "Assistant maternel / Garde d'enfants"
			case Diploma.DIPLOMA_5:
			case Diploma.DIPLOMA_5.key: return "Assistant(e) de vie dépendance"
			case Diploma.DIPLOMA_6:
			case Diploma.DIPLOMA_6.key: return "Auxiliaire de gérontologie"
			case Diploma.DIPLOMA_7:
			case Diploma.DIPLOMA_7.key: return "Auxiliaire paramédical"
			case Diploma.DIPLOMA_8:
			case Diploma.DIPLOMA_8.key: return "Baccalauréat professionnel Accompagnement, soins et services à la personne. Option A : à domicile"
			case Diploma.DIPLOMA_9:
			case Diploma.DIPLOMA_9.key: return "Baccalauréat professionnel Accompagnement, soins et services à la personne. Option B : en structure"
			case Diploma.DIPLOMA_10:
			case Diploma.DIPLOMA_10.key: return "Baccalauréat professionnel Services aux personnes et aux territoires"
			case Diploma.DIPLOMA_11:
			case Diploma.DIPLOMA_11.key: return "BEP Accompagnements, soins et services à la personne"
			case Diploma.DIPLOMA_12:
			case Diploma.DIPLOMA_12.key: return "BEPA Spécialité 'services aux personnes'"
			case Diploma.DIPLOMA_13:
			case Diploma.DIPLOMA_13.key: return "BTS Économie sociale et familiale (ESF)"
			case Diploma.DIPLOMA_14:
			case Diploma.DIPLOMA_14.key: return "BTS Services et prestations en secteur sanitaire et social (SP3S)"
			case Diploma.DIPLOMA_15:
			case Diploma.DIPLOMA_15.key: return "CAP  Accompagnant éducatif petite enfance"
			case Diploma.DIPLOMA_16:
			case Diploma.DIPLOMA_16.key: return "CAP Assistant(e) technique en milieu familial et collectif"
			case Diploma.DIPLOMA_17:
			case Diploma.DIPLOMA_17.key: return "CAPA  Option services aux personnes et vente en milieu rural"
			case Diploma.DIPLOMA_18:
			case Diploma.DIPLOMA_18.key: return "Conducteur accompagnateur de personnes à mobilité réduite"
			case Diploma.DIPLOMA_19:
			case Diploma.DIPLOMA_19.key: return "Conseiller en économie sociale et familiale (DECSF)"
			case Diploma.DIPLOMA_20:
			case Diploma.DIPLOMA_20.key: return "DEAES Accompagnant éducatif et social"
			case Diploma.DIPLOMA_21:
			case Diploma.DIPLOMA_21.key: return "Diplôme d'État Aide médico-psychologique (DEAMP) fusionné avec le (DEAVS) nouvel intitulé : DEAES Accompagnant éducatif et social"
			case Diploma.DIPLOMA_22:
			case Diploma.DIPLOMA_22.key: return "Diplôme d'État Assistant(e) familial(e) (DEAF)"
			case Diploma.DIPLOMA_23:
			case Diploma.DIPLOMA_23.key: return "Diplôme d'Etat Auxiliaire de vie sociale (DEAVS) fusionné avec le (DEAMP) nouvel intitulé  : DEAES Accompagnant éducatif et social"
			case Diploma.DIPLOMA_24:
			case Diploma.DIPLOMA_24.key: return "Diplôme d'État d'assistant de service social (DEASS)"
			case Diploma.DIPLOMA_25:
			case Diploma.DIPLOMA_25.key: return "Diplôme d'État d'éducateur de jeunes enfants (DEEJE)"
			case Diploma.DIPLOMA_26:
			case Diploma.DIPLOMA_26.key: return "Diplôme d'État d'éducateur spécialisé (DEES)"
			case Diploma.DIPLOMA_27:
			case Diploma.DIPLOMA_27.key: return "Diplôme d'État d'éducateur technique spécialisé (DETS)"
			case Diploma.DIPLOMA_28:
			case Diploma.DIPLOMA_28.key: return "Diplôme d'État de moniteur éducateur (DEME)"
			case Diploma.DIPLOMA_29:
			case Diploma.DIPLOMA_29.key: return "Diplôme d'État de technicien d'intervention sociale et familiale (DETISF)"
			case Diploma.DIPLOMA_30:
			case Diploma.DIPLOMA_30.key: return "DUT carrières sociales Assistance sociale"
			case Diploma.DIPLOMA_31:
			case Diploma.DIPLOMA_31.key: return "Employé familial"
			case Diploma.DIPLOMA_32:
			case Diploma.DIPLOMA_32.key: return "Mention complémentaire Aide à domicile"
			case Diploma.DIPLOMA_33:
			case Diploma.DIPLOMA_33.key: return "Socio-esthéticienne"
			case Diploma.DIPLOMA_34:
			case Diploma.DIPLOMA_34.key: return "Surveillant(e) – visiteur(e) de nuit en secteur social et médico-social"
			case Diploma.DIPLOMA_35:
			case Diploma.DIPLOMA_35.key: return "Titre professionnel Agent(e) de propreté et d'hygiène"
			case Diploma.DIPLOMA_36:
			case Diploma.DIPLOMA_36.key: return "Titre professionnel Assistant(e) de vie aux familles (ADVF)"
		}
	}

	static getList(diplomas) {
		return (diplomas || []).map(DiplomaUtils.getName)
	}
	
	static resolveDiplomas(oldList, newList) {
		if (newList.indexOf(Diploma.DIPLOMA_NONE.key) !== -1) {
			if (oldList.indexOf(Diploma.DIPLOMA_NONE.key) === -1) {
				return [Diploma.DIPLOMA_NONE.key]
			} else {
				newList.splice(newList.indexOf(Diploma.DIPLOMA_NONE.key), 1)
				return newList
			}
		} else if (newList.indexOf(Diploma.DIPLOMA_STUDY.key) !== -1) {
			if (oldList.indexOf(Diploma.DIPLOMA_STUDY.key) === -1) {
				return [Diploma.DIPLOMA_STUDY.key]
			} else {
				newList.splice(newList.indexOf(Diploma.DIPLOMA_STUDY.key), 1)
				return newList
			}
		}
		return newList
	}
}
export default DiplomaUtils