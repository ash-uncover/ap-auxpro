package org.ap.auxpro.helpers;

import java.util.ArrayList;

import org.ap.auxpro.bean.AuxiliaryPutBean;
import org.ap.auxpro.constants.EAuxiliaryDiploma;
import org.junit.Test;

import junit.framework.TestCase;

public class AuxiliaryHelperTest {

	// Method checkDiplomas //
	
	@Test
	public void testV_checkDiplomas_diplomasNull() {
		AuxiliaryPutBean bean = new AuxiliaryPutBean();
		AuxiliaryHelper.checkDiplomas(bean);
		TestCase.assertNotNull(bean.diploma);
		TestCase.assertTrue(bean.diploma.contains(EAuxiliaryDiploma._NO_DIPLOMA.getName()));
		TestCase.assertEquals(1, bean.diploma.size());
	}
	
	@Test
	public void testV_checkDiplomas_diplomasEmpty() {
		AuxiliaryPutBean bean = new AuxiliaryPutBean();
		bean.diploma = new ArrayList<String>();
		AuxiliaryHelper.checkDiplomas(bean);
		TestCase.assertNotNull(bean.diploma);
		TestCase.assertTrue(bean.diploma.contains(EAuxiliaryDiploma._NO_DIPLOMA.getName()));
		TestCase.assertEquals(1, bean.diploma.size());
	}
	
	@Test
	public void testV_checkDiplomas_dupplicateDiplomas() {
		AuxiliaryPutBean bean = new AuxiliaryPutBean();
		bean.diploma = new ArrayList<String>();
		bean.diploma.add(EAuxiliaryDiploma._DIPLOMA_ADVF.getName());
		bean.diploma.add(EAuxiliaryDiploma._DIPLOMA_ADVF.getName());
		AuxiliaryHelper.checkDiplomas(bean);
		TestCase.assertTrue(bean.diploma.contains(EAuxiliaryDiploma._NO_DIPLOMA.getName()));
		TestCase.assertTrue(bean.diploma.contains(EAuxiliaryDiploma._DIPLOMA_ADVF.getName()));
		TestCase.assertEquals(2, bean.diploma.size());
	}
	
	@Test
	public void testV_checkDiplomas_severalDiplomas() {
		AuxiliaryPutBean bean = new AuxiliaryPutBean();
		bean.diploma = new ArrayList<String>();
		bean.diploma.add(EAuxiliaryDiploma._DIPLOMA_ADVF.getName());
		bean.diploma.add(EAuxiliaryDiploma._DIPLOMA_BAC_ASSP.getName());
		AuxiliaryHelper.checkDiplomas(bean);
		TestCase.assertTrue(bean.diploma.contains(EAuxiliaryDiploma._NO_DIPLOMA.getName()));
		TestCase.assertTrue(bean.diploma.contains(EAuxiliaryDiploma._DIPLOMA_ADVF.getName()));
		TestCase.assertTrue(bean.diploma.contains(EAuxiliaryDiploma._DIPLOMA_BAC_ASSP.getName()));
		TestCase.assertEquals(3, bean.diploma.size());
	}
	
	// Method checkSkills //
	
	@Test
	public void testV_checkSkills_noDiploma() {
		AuxiliaryPutBean bean = new AuxiliaryPutBean();
		AuxiliaryHelper.checkDiplomas(bean);
		AuxiliaryHelper.checkSkills(bean);
		// No diploma skills
		TestCase.assertEquals(0, bean.skillBeauty.intValue());
		// Diploma skills
		TestCase.assertEquals(2, bean.skillChildrenCare.intValue());
		TestCase.assertEquals(2, bean.skillChildrenGame.intValue());
		TestCase.assertEquals(2, bean.skillChildrenKeep.intValue());
		TestCase.assertEquals(2, bean.skillChildrenSchool.intValue());
		TestCase.assertEquals(2, bean.skillClothes.intValue());
		TestCase.assertEquals(2, bean.skillCompany.intValue());
		TestCase.assertEquals(2, bean.skillFood.intValue());
		TestCase.assertEquals(2, bean.skillHandicap.intValue());
		TestCase.assertEquals(2, bean.skillHouse.intValue());
		TestCase.assertEquals(2, bean.skillIllness.intValue());
		TestCase.assertEquals(2, bean.skillNursing.intValue());
		TestCase.assertEquals(2, bean.skillOldCare.intValue());
		TestCase.assertEquals(2, bean.skillPet.intValue());
		TestCase.assertEquals(2, bean.skillTransport.intValue());
	}
	
	@Test
	public void testV_checkSkills_belowZeroToZero() {
		AuxiliaryPutBean bean = new AuxiliaryPutBean();
		bean.skillBeauty = -3;
		AuxiliaryHelper.checkDiplomas(bean);
		AuxiliaryHelper.checkSkills(bean);
		TestCase.assertEquals(0, bean.skillBeauty.intValue());
	}
	
	@Test
	public void testV_checkSkills_overFiveToFive() {
		AuxiliaryPutBean bean = new AuxiliaryPutBean();
		bean.skillBeauty = 13;
		AuxiliaryHelper.checkDiplomas(bean);
		AuxiliaryHelper.checkSkills(bean);
		TestCase.assertEquals(5, bean.skillBeauty.intValue());
	}
	
	@Test
	public void testV_checkSkills_diplomaOk() {
		AuxiliaryPutBean bean = new AuxiliaryPutBean();
		bean.skillBeauty = 4;
		AuxiliaryHelper.checkDiplomas(bean);
		AuxiliaryHelper.checkSkills(bean);
		TestCase.assertEquals(4, bean.skillBeauty.intValue());
	}
}
