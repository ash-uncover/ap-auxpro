package org.ap.auxpro.helpers;

import javax.ws.rs.core.SecurityContext;

import org.ap.auxpro.bean.AuxiliaryQuestionaryBean;
import org.ap.auxpro.storage.AuxiliaryCollection;
import org.ap.auxpro.storage.AuxiliaryData;
import org.ap.web.internal.APWebException;

public class AuxiliaryHelper {
	public static Object postAuxiliaryQuestionary(SecurityContext sc, String id, AuxiliaryQuestionaryBean bean) throws APWebException {
		int ch = 0;
		int ho = 0;
		int co = 0;
		int sh = 0;
		int nu = 0;
		int ad = 0; 
		int di = 0;
		boolean isComplete = true;
		for (EQuestion q : EQuestion.values()) {
			Integer answer = bean.skillAnswers.get(q.getIndex());
			if (answer == null) {
				isComplete = false;
			} else {
				ch += q.getAnswers()[answer].getChildhood();
				ho += q.getAnswers()[answer].getHousework();
				co += q.getAnswers()[answer].getCompagny();
				sh += q.getAnswers()[answer].getShopping();
				nu += q.getAnswers()[answer].getNursing();
				ad += q.getAnswers()[answer].getAdministrative();
				di += q.getAnswers()[answer].getDoityourself();
			}
		}
		AuxiliaryData auxiliary = AuxiliaryCollection.getById(id);
		if (isComplete) {
			auxiliary.setAreSkillSet(true);
			auxiliary.setSkillChildhood(computeScore(ch));
			auxiliary.setSkillHousework(computeScore(ho));
			auxiliary.setSkillCompagny(computeScore(co));
			auxiliary.setSkillShopping(computeScore(sh));
			auxiliary.setSkillNursing(computeScore(nu));
			auxiliary.setSkillAdministrative(computeScore(ad));
			auxiliary.setSkillDoityourself(computeScore(di));
		}
		auxiliary.setSkillAnswers(bean.skillAnswers);
		AuxiliaryCollection.update(auxiliary);
		return null;
	}

	public static int computeScore(int baseScore) {
		return Math.min(5, Math.round(baseScore * 5 / 25));
	}

}
